# Florida Decks and Patios

A modern web application for Florida's premier custom deck and patio builders. Built with React, TypeScript, Tailwind CSS, and Lovable Cloud for a full-stack experience with real-time data persistence, contact lead management, and an AI-powered chat knowledge base.

## Features

- **Modern Portfolio**: Showcase deck and patio projects with before/after sliders and high-quality imagery
- **Service Pages**: Detailed information on decks, patios, pergolas, and other outdoor structures
- **Blog**: Educational content on deck maintenance, design trends, and project guides
- **Tools & Calculators**: Budget estimators, repair checkers, home value calculator, and violation decoder
- **Contact Forms**: Lead capture with real Supabase integration and form validation
- **AI Chat Widget**: Knowledge-based chatbot powered by Lovable AI for customer support
- **Admin Dashboard**: CMS for managing site content, testimonials, services, and chat knowledge base
- **Location Pages**: City-specific landing pages for Tampa, Orlando, Miami, Jacksonville, and more
- **SEO Optimized**: Semantic HTML, structured data, sitemaps, and metadata for search visibility

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Lovable Cloud (Supabase), PostgreSQL, Edge Functions, Realtime
- **Authentication**: Supabase Auth for admin access
- **Database**: PostgreSQL with Row-Level Security policies
- **State Management**: React Context, TanStack Query
- **AI/ML**: Lovable AI for embeddings and semantic search
- **Hosting**: Lovable Cloud / Vercel

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Development
```bash
# Install dependencies
npm install

# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

### Environment Variables
The project uses Lovable Cloud which automatically manages environment variables for Supabase connectivity. No manual .env configuration needed.

## Project Structure

```
src/
├── pages/           # Route pages (Home, Blog, Services, etc.)
├── components/      # Reusable UI components (Header, Footer, etc.)
├── contexts/        # React contexts (SiteDataContext for CMS)
├── hooks/          # Custom React hooks
├── data/           # Static data and seed content
├── assets/         # Images, logos, favicon
└── integrations/   # Supabase client and types
supabase/
├── functions/      # Edge functions (kb-chat, kb-embed, send-chat-transcript)
└── migrations/     # Database schema migrations
```

## Database Schema

**Key Tables:**
- `leads` - Contact form submissions with name, email, phone, city, service, budget, message
- `site_config` - CMS configuration (company info, services, testimonials)
- `knowledge_entries` - AI knowledge base entries with embeddings
- `chat_logs` - Chat widget conversation history

All tables use Row-Level Security (RLS) policies for data protection.

## Admin Dashboard

Access admin at `/admin/login` with Supabase authentication credentials.
- Edit company information, services, and testimonials
- Manage AI knowledge base entries
- View chat transcripts and lead submissions
- All changes persist to the cloud database and sync across devices

## Deployment

The site is published on Lovable Cloud at https://florida-decks-and-patios.lovable.app with a custom domain configured.

**Frontend Updates:**
1. Push code changes to GitHub
2. Click "Publish" in Lovable editor
3. Click "Update" in the publish dialog to deploy

**Backend Updates:**
- Edge function and database changes deploy automatically

## License

MIT

---

**Built with [Lovable](https://lovable.dev)** - The AI editor for full-stack web apps.
