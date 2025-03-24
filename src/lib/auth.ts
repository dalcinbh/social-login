import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// Log para depuração
console.log("Client ID disponível?", !!process.env.GOOGLE_CLIENT_ID);
console.log("Client Secret disponível?", !!process.env.GOOGLE_CLIENT_SECRET);
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
console.log("AUTH_REDIRECT:", process.env.AUTH_REDIRECT);

export const {auth, handlers, signIn, signOut} = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    debug: true,
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log("Tentativa de login:", { email: user.email });
            return true;
        },
        async redirect({ url, baseUrl }) {
            console.log("Redirecionando para:", url, "de:", baseUrl);
            // Força redirecionamento para o dashboard após autenticação bem-sucedida
            if (url.includes('/api/auth/callback') || url === baseUrl || url === '/' || url.startsWith(baseUrl)) {
                return `${baseUrl}/dashboard`;
            }
            return url;
        },
        async session({ session }) {
            console.log("Sessão criada:", session);
            return session;
        }
    },
    pages: {
        signIn: '/',
        error: '/',
    },
    basePath: "/api/auth",
    trustHost: true
})

export async function signInWithGoogle() {
    console.log("Iniciando login com Google");
    await signIn('google')
}