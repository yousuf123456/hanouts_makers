import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center py-12">
      <SignIn />
    </div>
  );
}
