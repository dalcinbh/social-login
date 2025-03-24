import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import LinkedIn from "next-auth/providers/linkedin";

// Debug logs to verify environment variables availability
console.log("Google Client ID available?", !!process.env.GOOGLE_CLIENT_ID);
console.log("Google Client Secret available?", !!process.env.GOOGLE_CLIENT_SECRET);
console.log("GitHub ID available?", !!process.env.GITHUB_ID);
console.log("LinkedIn ID available?", !!process.env.LINKEDIN_ID);
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
console.log("AUTH_REDIRECT_GOOGLE:", process.env.AUTH_REDIRECT_GOOGLE);
console.log("AUTH_REDIRECT_GITHUB:", process.env.AUTH_REDIRECT_GITHUB);
console.log("AUTH_REDIRECT_LINKEDIN:", process.env.AUTH_REDIRECT_LINKEDIN);

/**
 * NextAuth.js Configuration
 * This exports the authentication utilities needed throughout the application
 * - auth: For checking authentication status
 * - handlers: For handling API routes
 * - signIn/signOut: For authentication actions
 */
export const {auth, handlers, signIn, signOut} = NextAuth({
    // Configure OAuth providers
    providers: [
        // Google OAuth configuration
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent", // Always ask for user consent
                    access_type: "offline", // Get refresh token
                    response_type: "code" // Authorization code flow
                }
            }
        }),
        // GitHub OAuth configuration
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        // LinkedIn OAuth configuration
        LinkedIn({
            clientId: process.env.LINKEDIN_ID,
            clientSecret: process.env.LINKEDIN_SECRET,
            authorization: {
                params: {
                    scope: 'openid profile email' // Request basic profile information
                }
            }
        })
    ],
    debug: true, // Enable debug messages in development
    callbacks: {
        // Called when signing in - use this to verify or modify the session
        async signIn({ user, account, profile }) {
            console.log("Login attempt:", { email: user.email, provider: account?.provider });
            return true; // Allow sign in
        },
        // Called during navigation - use this to customize redirect behavior
        async redirect({ url, baseUrl }) {
            console.log("Redirecting to:", url, "from:", baseUrl);
            // Force redirect to dashboard after successful authentication
            if (url.includes('/api/auth/callback') || url === baseUrl || url === '/' || url.startsWith(baseUrl)) {
                return `${baseUrl}/dashboard`;
            }
            return url;
        },
        // Called whenever a session is checked - use this to customize session data
        async session({ session }) {
            console.log("Session created:", session);
            return session;
        }
    },
    // Configure custom pages
    pages: {
        signIn: '/', // Use home page as sign-in page
        error: '/', // Return to home page on error
        signOut: '/' // Return to home page after sign out
    },
    // NextAuth.js base path and security settings
    basePath: "/api/auth",
    trustHost: true
})

/**
 * Helper function to initiate Google OAuth flow
 * This is called from the login page when clicking the Google button
 */
export async function signInWithGoogle() {
    console.log("Starting Google login flow");
    await signIn('google')
}

/**
 * Helper function to initiate GitHub OAuth flow
 * This is called from the login page when clicking the GitHub button
 */
export async function signInWithGitHub() {
    console.log("Starting GitHub login flow");
    await signIn('github')
}

/**
 * Helper function to initiate LinkedIn OAuth flow
 * This is called from the login page when clicking the LinkedIn button
 */
export async function signInWithLinkedIn() {
    console.log("Starting LinkedIn login flow");
    await signIn('linkedin')
}

/**
 * Helper function to handle sign out
 * This is called from the dashboard when clicking the logout button
 * It will redirect to the home page after successful logout
 */
export async function signOutUser() {
    console.log("Starting logout process");
    await signOut({ redirect: true, redirectTo: '/' });
}