# AI PhotoShoot Deployment Guide

## Hosting Requirements

### Vercel (Main App Hosting)
- **Plan**: Pro ($20/month/member)
- **Features**:
  - Serverless functions
  - Edge functions
  - Image optimization
- **Limits**:
  - Serverless Function Size: 50MB
  - Response Body Size: 4.5MB
  - Deployment Size: 500MB
  - Execution Timeout: 900s (important for AI processing)

### Supabase (Database & Auth)
- **Plan**: Pro ($25/month)
- **Features**:
  - Authentication
  - PostgreSQL Database
  - Storage
- **Specs**:
  - Database: 8GB
  - Storage: 100GB
  - Bandwidth: 250GB
  - Daily Backups

### AWS S3 (Media Storage)
- **Estimated Cost**: $5-20/month
- **Usage Rates**:
  - Storage: ~$0.023/GB
  - Transfer: ~$0.09/GB

## Deployment Steps

### 1. Initial Setup

```bash
# Clone repository
git clone https://github.com/yourusername/ai-photoshoot.git
cd ai-photoshoot

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### 2. Supabase Setup

1. Create new project at [supabase.com](https://supabase.com)
2. Run database migrations:
```sql
-- In Supabase SQL editor
-- Run migrations in order:
\i src/db/schema/01_photo_prompts.sql
\i src/db/schema/02_prompt_variations.sql
\i src/db/schema/03_prompt_analytics.sql
```
3. Configure auth providers in Supabase dashboard
4. Copy API keys to .env.local

### 3. Vercel Setup

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Link project:
```bash
vercel link
```

3. Add environment variables:
```bash
vercel env pull .env.local
```

4. Configure project settings:
- Enable Edge Functions
- Increase function timeout
- Configure build settings

### 4. AWS S3 Setup

1. Create bucket
2. Configure CORS:
```json
{
  "CORSRules": [
    {
      "AllowedOrigins": ["https://your-domain.com"],
      "AllowedMethods": ["GET", "POST"],
      "AllowedHeaders": ["*"],
      "MaxAgeSeconds": 3000
    }
  ]
}
```
3. Set up IAM user with restricted permissions

## Testing Environment

### Local Development
```bash
# Run development server
npm run dev

# Test API endpoints
curl http://localhost:3000/api/health
```

### Preview Deployments
```bash
# Create preview deployment
vercel

# Get preview URL
vercel ls
```

## Resource Limits

### Vercel Serverless Functions
- Max Duration: 900s
- Max Memory: 1024MB
- Concurrency: 1000

### fal.ai Integration
- Training Time: 5-15 minutes
- Generation Time: 2-5 seconds
- Batch Size: 10

### Rate Limits
- Photos: 100/hour
- Videos: 20/hour
- Training: 5/hour

## Monitoring & Maintenance

### Health Checks
- API endpoint: `/api/health`
- Database connection
- S3 access
- AI service status

### Error Handling
- Failed generations are logged to Supabase
- Retry mechanism for transient failures
- Error notifications via webhook

### Backups
- Daily database backups (Supabase)
- S3 bucket versioning
- Configuration backups

## Cost Optimization

### Tips
1. Use caching for generated images
2. Implement queue for bulk operations
3. Clean up unused training models
4. Monitor API usage

### Cost Breakdown (Estimated)
- Vercel: $20-40/month
- Supabase: $25/month
- S3: $5-20/month
- AI Services: Pay per use

## Security Considerations

1. API Rate Limiting
2. Input Validation
3. Access Control
4. Data Encryption
5. Regular Security Audits