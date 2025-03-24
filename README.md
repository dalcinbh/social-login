# Social Login with Next.js and NextAuth

A modern, secure, and easy-to-use social login implementation using Next.js 14, NextAuth.js, and Tailwind CSS. This project provides authentication through multiple providers (Google, GitHub, and LinkedIn) with a clean and responsive UI.

## Features

- 🔐 Multiple OAuth providers (Google, GitHub, LinkedIn)
- 🎨 Modern UI with Tailwind CSS and Shadcn/ui
- 🚀 Server-side rendering with Next.js 14
- 📱 Fully responsive design
- 🔒 Secure authentication flow
- 🎯 TypeScript support

## Prerequisites

Before you begin, ensure you have installed:
- Node.js 18.x or later
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/dalcinbh/social-login.git
cd social-login
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Copy the environment variables example:
```bash
cp .env.local.example .env.local
```

## Configuration

### Setting up OAuth Providers

#### Local Development (localhost:3000)

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials > Create Credentials > OAuth Client ID
5. Set the authorized redirect URI to: `http://localhost:3000/api/auth/callback/google`
6. Copy the Client ID and Client Secret to your `.env.local`

#### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click on "New OAuth App"
3. Set Homepage URL to: `http://localhost:3000`
4. Set Authorization callback URL to: `http://localhost:3000/api/auth/callback/github`
5. Copy the Client ID and Client Secret to your `.env.local`

#### LinkedIn OAuth
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/apps)
2. Create a new app
3. Under Auth settings, add the redirect URL: `http://localhost:3000/api/auth/callback/linkedin`
4. Copy the Client ID and Client Secret to your `.env.local`

### Moving to Production

When deploying your application to a production environment (e.g., example.com), you'll need to:

1. Update OAuth Provider Settings:
   - Go to each provider's developer console (Google, GitHub, LinkedIn)
   - Add new redirect URIs for your production domain:
     ```
     https://example.com/api/auth/callback/google
     https://example.com/api/auth/callback/github
     https://example.com/api/auth/callback/linkedin
     ```
   - You can keep both localhost and production URLs for development/production environments

2. Update Environment Variables:
   Create a new `.env.production` file with:
   ```env
   NEXTAUTH_URL="https://example.com"
   AUTH_URL="https://example.com"
   
   # Use production OAuth credentials
   GOOGLE_CLIENT_ID="your-production-google-client-id"
   GOOGLE_CLIENT_SECRET="your-production-google-client-secret"
   
   GITHUB_ID="your-production-github-client-id"
   GITHUB_SECRET="your-production-github-client-secret"
   
   LINKEDIN_ID="your-production-linkedin-client-id"
   LINKEDIN_SECRET="your-production-linkedin-client-secret"
   
   # Disable debug in production
   NODE_ENV="production"
   NEXTAUTH_DEBUG=false
   ```

3. Security Considerations for Production:
   - Generate a new strong `AUTH_SECRET` for production
   - Enable HTTPS
   - Set appropriate security headers
   - Consider rate limiting
   - Monitor authentication attempts

## Required Dependencies

```bash
# Core dependencies
npm install next@14 react react-dom
npm install next-auth@beta

# UI dependencies
npm install @radix-ui/react-slot
npm install class-variance-authority
npm install clsx
npm install tailwindcss
npm install @radix-ui/react-icons
npm install lucide-react

# Type definitions
npm install -D @types/node @types/react @types/react-dom
```

Or using yarn:
```bash
# Core dependencies
yarn add next@14 react react-dom
yarn add next-auth@beta

# UI dependencies
yarn add @radix-ui/react-slot
yarn add class-variance-authority
yarn add clsx
yarn add tailwindcss
yarn add @radix-ui/react-icons
yarn add lucide-react

# Type definitions
yarn add -D @types/node @types/react @types/react-dom
```

## Running the Application

1. Start the development server:
```bash
npm run dev
# or
yarn dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── dashboard/      # Dashboard page (protected)
│   │   └── page.tsx       # Home page with login
│   ├── components/         # UI components
│   ├── lib/               # Authentication and utilities
│   └── types/             # TypeScript definitions
├── public/                # Static files
└── .env.local.example    # Environment variables example
```

## Security Considerations

- All OAuth secrets are stored in environment variables
- Server-side authentication handling
- Secure session management
- Protected routes implementation
- CSRF protection through NextAuth.js

## Troubleshooting

### Common Issues

1. **Callback URL Mismatch**
   - Error: "The redirect_uri does not match the registered value"
   - Solution: Double-check that your callback URLs exactly match what's configured in the OAuth providers
   - Pay attention to:
     - http vs https
     - Trailing slashes
     - Correct order in path segments (e.g., `/callback/google` not `/google/callback`)

2. **Environment Variables Not Loading**
   - Ensure `.env.local` exists and is in the root directory
   - Restart the development server after changing environment variables
   - Check that variable names match exactly (they're case sensitive)

3. **Session Not Persisting**
   - Verify `AUTH_SECRET` is set and is a strong random string
   - Check that cookies are not being blocked
   - Ensure your domain is correctly set in production

### Development Tips

1. **Using Multiple OAuth Providers**
   - Test each provider individually first
   - Keep separate development and production credentials
   - Use different browser profiles for testing multiple accounts

2. **Debugging Authentication Flow**
   - Enable debug logs with `NEXTAUTH_DEBUG=true`
   - Use browser dev tools to check network requests
   - Monitor the server console for authentication events

3. **Local Development Best Practices**
   - Use `localhost:3000` for consistent behavior
   - Don't commit `.env.local` to version control
   - Keep a backup of your OAuth credentials

## Deployment Checklist

Before deploying to production:

1. **Environment Setup**
   - [ ] Generate new `AUTH_SECRET` for production
   - [ ] Create production OAuth credentials
   - [ ] Configure production callback URLs
   - [ ] Set `NODE_ENV=production`
   - [ ] Disable debug mode

2. **Security Measures**
   - [ ] Enable HTTPS
   - [ ] Set up CSP headers
   - [ ] Configure session security
   - [ ] Implement rate limiting
   - [ ] Set up monitoring

3. **Testing**
   - [ ] Test all OAuth providers in production
   - [ ] Verify session persistence
   - [ ] Check secure cookie settings
   - [ ] Test logout flow
   - [ ] Validate error handling

## Version History

- v0.2.0 - Added LinkedIn provider, complete documentation, production setup
- v0.1.0 - Initial release with Google and GitHub authentication

## Contributing

Feel free to open issues and pull requests!

## License

MIT License - feel free to use this in your own projects!
