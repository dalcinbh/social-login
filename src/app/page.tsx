import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth, signInWithGoogle } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();
  if (session) {
    redirect('/dashboard');
  }
  async function signInAction() {
    'use server';
    await signInWithGoogle();
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login Social</CardTitle>
          <CardDescription>Faça seu login com sua conta google</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form action={signInAction}>
            <Button className="w-full">Login com o Google</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
