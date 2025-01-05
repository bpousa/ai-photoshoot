# AI PhotoShoot

A platform for AI-powered photo generation and white-label business solutions.

## Features

### Core Features
- Custom photo generation with LORA model training
- Pre-made professional poses and styles
- Video conversion with cinematic effects
- AI-assisted prompt improvement

### Business Platform
- White-label client portals
- Custom domain support
- Brand customization
- Package management
- Client analytics

### Client Features
- Photo/video generation
- Gallery management
- Package selection
- Download center

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **Backend**: 
  - Supabase (Auth, Database)
  - Vercel (Hosting, Domains)
  - AWS S3 (Storage)
- **AI Integration**:
  - fal.ai (Flux LORA, Kling)
  - Anthropic Claude (Prompt assistance)
- **Payments**: Stripe

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-photoshoot.git
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

## Project Structure

```
/src
  /app             # Next.js 14 app directory
    /api           # API routes
    /studio        # Business/admin dashboard
    /client        # Client portal
  /components      # React components
  /lib            # Utility functions
  /services       # External service integrations
  /types          # TypeScript type definitions
  /hooks          # Custom React hooks
  /utils          # Helper functions
```

## Business Features

### Package Management
- Custom package creation
- Credit management
- Client assignment
- Usage tracking

### White Label
- Custom domains
- Brand customization
- Client portal theming
- Email templates

### Analytics
- Usage metrics
- Revenue tracking
- Client engagement
- Generation analytics

## Environment Setup

See `.env.example` for required environment variables.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and confidential.