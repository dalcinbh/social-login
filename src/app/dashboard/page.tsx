import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  
  if (!session) {
    redirect('/');
  }

  async function signOutAction() {
    'use server';
    await signOut();
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[350px]">
            <CardHeader className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={session.user?.image || ""} />
                    <AvatarFallback>{session.user?.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <CardTitle>{session.user?.name || "Usuário"}</CardTitle>
                <CardDescription>{session.user?.email || ""}</CardDescription>
                <CardContent className="text-center">
                    <form action={signOutAction}>
                        <Button variant='destructive'>Logout</Button>
                    </form>
                </CardContent>
            </CardHeader>
        </Card>
    </div>
  );
}