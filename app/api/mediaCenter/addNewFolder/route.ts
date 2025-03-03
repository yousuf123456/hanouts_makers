import prisma from "../../../_libs/prismadb";
import googleDrive from "../../../_libs/googleDrive";
import { NextResponse } from "next/server";
import { getCurrentVendor } from "@/app/actions/getCurrentVendor";
import { FolderStructureType } from "@/app/types";

function addSubfolder(
  folderStructure: FolderStructureType[],
  parentId: string | null,
  subfolder: FolderStructureType
) {
  if (!parentId) {
    folderStructure.push(subfolder);
    return folderStructure;
  }

  const parentFolder = findFolderById(folderStructure, parentId);

  if (parentFolder) {
    parentFolder.subfolders.push(subfolder);
  }

  return folderStructure;
}

function findFolderById(folderStructure: FolderStructureType[], id: string) {
  for (const folder of folderStructure) {
    if (folder.id === id) {
      return folder;
    } else if (folder.subfolders && folder?.subfolders?.length > 0) {
      const result: any = findFolderById(folder.subfolders, id);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

export async function POST(req: Request) {
  try {
    const userSTId = req.headers.get("x-user-id");

    if (!userSTId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const currentVendor = await getCurrentVendor({ userSTId: userSTId });

    if (!currentVendor) {
      return new NextResponse("Vendor Data Not Found", { status: 404 });
    }

    const { folderId, folderName } = await req.json();

    const folderIdToCreateAFolderIn = folderId || currentVendor.rootFolderId;

    var fileMetadata = {
      name: folderName,
      parents: [folderIdToCreateAFolderIn],
      mimeType: "application/vnd.google-apps.folder",
    };

    const response = (await googleDrive.files.create({
      //@ts-ignore
      resource: fileMetadata,
      fields: "id",
    })) as any;

    const newFolder = {
      id: response.data.id,
      name: folderName,
      images: [],
      subfolders: [],
    } as unknown as FolderStructureType;

    const newFolderStructure = addSubfolder(
      currentVendor.mediaCenterFolderStructure as FolderStructureType[],
      folderId,
      newFolder
    );

    await prisma.vendor.update({
      where: {
        id: currentVendor.id,
      },

      data: {
        mediaCenterFolderStructure: newFolderStructure,
      },
    });

    return NextResponse.json({ newStructure: newFolderStructure, newFolder });
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
