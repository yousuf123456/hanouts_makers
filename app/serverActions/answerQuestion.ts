"use server";

import prisma from "../_libs/prismadb";
import { revalidatePath } from "next/cache";
import { getServerSession } from "../actions/getServerSession";
import { routes } from "../constants/routes";

interface Params {
  bucketId: string;
  questionId: string;
  answer: string;
}

export const answerQuestion = async (params: Params) => {
  try {
    const session = await getServerSession();

    if (!session) return "Unauthorized";

    const { questionId, bucketId, answer } = params;

    const updatedQuestionBucket = await prisma.$runCommandRaw({
      findAndModify: "QuestionsBucket",
      query: {
        _id: { $oid: bucketId },
        questions: { $elemMatch: { _id: { $oid: questionId } } },
      },
      update: {
        $set: {
          "questions.$.answer": answer,
          "questions.$.answeredAt": { $date: new Date().toISOString() },
        },
      },
    });

    revalidatePath(routes.manageQuestions);

    return "Succesfully Answered To Question";
  } catch (e) {
    console.log(e);
    return "Something goes wrong";
  }
};
