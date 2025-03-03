import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex my-12 min-h-[calc(100vh-80px)] w-full items-center justify-center">
      <SignUp />
    </div>
  );
}
