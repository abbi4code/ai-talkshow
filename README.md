## WAVE – AI Talkshow/Podcast Generator

WAVE is an AI-powered podcast creation and listening platform. Create AI-generated talkshow episodes from prompts, synthesize voices, generate cover art, and share them with others. It includes discovery, profiles, and a persistent audio player for a smooth listening experience across the app.

### Key Features
- **Authentication**: Protected routes using Clerk middleware; public access to `/`, `/sign-in`, `/sign-up`.
- **Create Podcast**: Compose a show from prompts, select a voice, generate audio, and attach a thumbnail.
- **Text-to-Speech Voices**: Multiple voice options exposed in `voiceDetails` (e.g., alloy, echo, fable, onyx, nova, shimmer).
- **AI Integrations**:
  - **ElevenLabs** for voice synthesis via `app/api/elevenlabs/route.ts`.
  - **Gemini** (Google Generative AI) via `app/api/gemeni/route.ts` for text/content assistance.
  - **Stable Diffusion / Replicate / Hugging Face** endpoints for image generation.
- **Discovery**: Browse and search episodes on `/discover`.
- **Podcast Pages**: Detailed pages with metadata and controls at `/podcasts/[podcastID]`.
- **Profiles**: User pages at `/profile/[profileID]`.
- **Persistent Player**: Global bottom podcast player managed by `providers/AudioProvider.tsx` and `components/PodcastPlayer.tsx`.
- **Responsive Navigation**: Desktop sidebars (`LeftSidebar`, `RightSidebar`) and a mobile sheet nav (`Navmod`) with active route highlighting.
- **Data & Search**: Convex database with search indexes on author, title, and description.

### Tech Stack
- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Auth**: Clerk (`middleware.ts`, `providers/ConvexClerkProvider.tsx`)
- **Backend/Data**: Convex (tables: `podcasts`, `users`; storage for audio/images)
- **AI Providers**: ElevenLabs, Google Gemini, Hugging Face, Replicate, Stable Diffusion

### App Structure (high level)
- `app/(auth)/*`: Auth layout and pages (`/sign-in`, `/sign-up`)
- `app/(main)/*`: Core application routes
  - `/home` – main feed
  - `/discover` – discovery and search
  - `/create-pod` – podcast creation flow
  - `/podcasts/[podcastID]` – episode detail page
  - `/profile/[profileID]` – user profile
- `app/api/*`: AI-related API routes (`elevenlabs`, `gemeni`, `huggingface`, `replicate`, `stable-diffusion`)
- `components/*`: UI components including player, cards, sidebars, and UI primitives
- `convex/*`: schema, server functions, and generated client bindings
- `providers/*`: global providers (Clerk+Convex, Audio)

### Data Model (Convex)
`convex/schema.ts` defines two tables:
- `podcasts`: stores audio/image storage IDs, author info, prompts, voice type, duration, and views. Search indexes on author, title, and description.
- `users`: stores Clerk-linked user profiles (`clerkId`, `email`, `imageUrl`, `name`).

### Navigation
`constants/const.ts` defines sidebar routes and available voices:
- Sidebar links: `/home`, `/discover`, `/create-pod`
- Voice presets: alloy, echo, fable, onyx, nova, shimmer

---

## Getting Started

### Prerequisites
- Node.js 18+
- Convex project URL
- Clerk application (publishable + secret keys)
- API keys/tokens for AI providers you intend to use

### Environment Variables
Create a `.env.local` with the following (as applicable):

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-team-xxxx.convex.cloud

# AI Providers
ELEVENLABS_API_KEY=...
REPLICATE_API_TOKEN=...
HUGGINGFACE_TOKEN=...
GOOGLE_API_KEY=... # for Gemini
```

### Install & Run

```bash
npm install
npm run dev
# open http://localhost:3000
```

---

## Notable Implementation Details
- **Clerk Protection**: `middleware.ts` protects all non-public routes; `/`, `/sign-in`, `/sign-up` remain public.
- **Global Player**: `providers/AudioProvider.tsx` clears selection on `/create-pod` to prevent conflicts; `components/PodcastPlayer.tsx` renders at the app root for persistence.
- **Responsive Nav**: `components/Navmod.tsx` uses a sheet-based mobile nav with active state highlighting via `usePathname`.
- **Convex Storage**: Audio and images can be stored with storage IDs and referenced via URLs when available.

---

## API Routes
- `app/api/elevenlabs/route.ts` – text-to-speech synthesis
- `app/api/gemeni/route.ts` – Gemini-powered text/content assistance
- `app/api/huggingface/route.ts` – image or model inference
- `app/api/replicate/route.ts` – model inference (e.g., image generation)
- `app/api/stable-diffusion/route.ts` – image generation

---

## Scripts
```bash
npm run dev       # start local dev server
npm run build     # build for production
npm run start     # run production build
```

---

## License
MIT – see LICENSE (or update this section with your preferred license).
