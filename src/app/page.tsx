import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth, signInWithGoogle, signInWithGitHub, signInWithLinkedIn } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * Login Page Component
 * This is the main entry point of the application
 * It handles the social login buttons and their actions
 * If user is already authenticated, redirects to dashboard
 */
export default async function Login() {
  // Check if user is already authenticated
  const session = await auth();
  if (session) {
    redirect('/dashboard');
  }

  /**
   * Server Action for Google Login
   * This function is called when the Google login button is clicked
   * It initiates the OAuth flow with Google
   */
  async function signInGoogleAction() {
    'use server';
    await signInWithGoogle();
  }

  /**
   * Server Action for GitHub Login
   * This function is called when the GitHub login button is clicked
   * It initiates the OAuth flow with GitHub
   */
  async function signInGitHubAction() {
    'use server';
    await signInWithGitHub();
  }

  /**
   * Server Action for LinkedIn Login
   * This function is called when the LinkedIn login button is clicked
   * It initiates the OAuth flow with LinkedIn
   */
  async function signInLinkedInAction() {
    'use server';
    await signInWithLinkedIn();
  }

  return (
    // Main container with centered content and gray background
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Login card with social login options */}
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Social Login</CardTitle>
          <CardDescription>Sign in with your social account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Google Login Button */}
          <form action={signInGoogleAction}>
            <Button className="w-full mb-2">Login with Google</Button>
          </form>
          {/* GitHub Login Button */}
          <form action={signInGitHubAction}>
            <Button className="w-full mb-2" variant="outline">Login with GitHub</Button>
          </form>
          {/* LinkedIn Login Button */}
          <form action={signInLinkedInAction}>
            <Button className="w-full" variant="secondary">Login with LinkedIn</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
