/**
 * NextAuth.js Middleware Configuration
 * This middleware runs on every request to protect routes
 * It ensures that only authenticated users can access protected routes
 */
export { auth as middleware } from "@/lib/auth"

/**
 * Configure which routes should be protected by the middleware
 * In this case, we're protecting the dashboard route
 */
export const config = {
    matcher: ["/dashboard"]
}


