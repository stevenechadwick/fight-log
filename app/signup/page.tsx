import { getServerSession } from "next-auth";
import SignupForm from "./form";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }

  return (
    <SignupForm />
  )
}