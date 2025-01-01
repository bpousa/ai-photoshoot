# AI PhotoShoot

An AI-powered photo generation service that creates custom photos based on user uploads and pre-made poses.

## Features

- Upload personal photos for AI training
- Browse and select from pre-made pose templates
- Generate personalized photos using fal.ai integration
- Subscription-based photo generation service

## Tech Stack

- Next.js 14 (React framework)
- TypeScript
- Tailwind CSS
- Stripe for payments
- fal.ai for AI model training and inference
- Supabase for database and authentication
- AWS S3 for image storage

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in your credentials
4. Run the development server: `npm run dev`

## Project Structure

```
/src
  /app             # Next.js 14 app directory
  /components      # React components
  /lib            # Utility functions and shared logic
  /types          # TypeScript type definitions
  /services       # External service integrations
```