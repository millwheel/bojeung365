# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**bojeung365** is a Next.js web application providing guaranteed company information and guidance. It features a community-driven platform with board systems for notices, events, reviews, and reports.

**Tech Stack:**
- Next.js 15.5.3 with React 19.1.0 (App Router)
- TypeScript 5
- Tailwind CSS 4 with PostCSS
- TipTap 3.10.2 (rich text editor)
- React Query v5 (server state management)
- Axios (HTTP client with JWT authentication)

## Common Commands

### Development
```bash
npm run dev              # Start development server (http://localhost:3000)
npm run build           # Create production build
npm start               # Start production server
npm run lint            # Run ESLint
```

### Development with Backend
The application connects to a backend API at `http://localhost:8080` (configurable via `process.env.NEXT_PUBLIC_API_URL`). Ensure the backend is running before starting the dev server.

## Architecture & Code Organization

### Directory Structure

```
src/
├── app/                 # Next.js App Router
│   ├── main/           # Main authenticated routes (dashboard, boards)
│   ├── password/       # Auth-related (change, recovery)
│   ├── register/       # Registration
│   └── layout.tsx      # Root layout with GNB, LNB, footer
├── board/              # Board business logic components
│   ├── eventBoard.tsx, noticeBoard.tsx, reviewBoard.tsx, reportBoard.tsx
├── component/          # Reusable UI components
│   ├── tiptap/         # Rich text editor UI components
│   ├── boardTable.tsx  # Shared board table component
│   ├── pagination.tsx  # Pagination component
│   ├── ratingStar.tsx  # Star rating for reviews
│   └── [other UI]
├── hook/               # Custom React hooks (useMe for user profile)
├── lib/                # Libraries & API
│   ├── api.ts          # API wrapper (GET, POST, PUT, DELETE)
│   ├── apiClient.ts    # Axios instance with JWT interceptors
│   └── tokenStore.ts   # JWT token management (localStorage)
├── type/               # TypeScript types
│   ├── postResponse.ts # Notice, Event, Review, Report types
│   ├── boardResponse.ts
│   ├── postRequest.ts
│   ├── userType.ts
│   └── [other types]
└── util/               # Utility functions
    ├── dataFormatter.ts
    ├── moneyFormatter.ts
    ├── richTextImageUploader.ts
    └── tempImageStorage.ts
```

### Key Architectural Patterns

**1. Board System Design**
- Four board types share similar structure: Notice, Event, Review, Report
- Board components (`src/board/`) handle fetching and list logic
- Reusable `boardTable.tsx` and `tableRow.tsx` for display
- Detail routes use `postFrame.tsx` wrapper for consistent layout

**2. Authentication & API**
- JWT tokens stored in localStorage via `tokenStore.ts`
- Axios interceptors automatically attach Authorization header
- 401 responses trigger token clearance
- User profile loaded via `useMe` hook with React Query
- Generic `ApiResult<T>` type ensures consistent error handling

**3. Component Hierarchy**
- Root layout (`src/app/layout.tsx`) contains GNB, LNB, and main content
- LNB (left nav) includes notice-specific variant (`lnbNoticeBoard.tsx`)
- Board pages use layout composition with reusable board components

**4. Rich Text Editor Integration**
- TipTap editor setup in `useDefaultTipTapEditor.ts`
- Toolbar with color, font size, image upload, and text styling
- Image uploads handled via `richTextImageUploader.ts`
- Temporary image storage in `tempImageStorage.ts` before post submission

**5. Type-Safe API**
- All API responses use `ApiResult<T>` wrapper
- Specific types for each board post type (Notice, Event, Review, Report)
- Error response typed in `error.ts`
- Post creation/update requests have dedicated `postRequest.ts` types

## Important Implementation Details

### API Integration
- **API Wrapper** (`src/lib/api.ts`): Provides `get()`, `post()`, `put()`, `delete()` methods
- **Error Handling**: Centralizes error responses; 401 clears auth state
- **Token Refresh**: Interceptor checks token validity before requests
- **Base URL**: Configurable via environment variable (default: `http://localhost:8080`)

### Authentication Flow
1. User logs in via `/login` component
2. JWT token stored in localStorage by `tokenStore.ts`
3. `useMe` hook fetches user profile on app load
4. Axios interceptor attaches token to all requests
5. Protected routes wrapped in auth check (check existing route implementations)

### Review Board Features
- Rating system with stars (1-5) for site reliability, exchange speed, dividends
- Betting information tracking
- Comment system on review posts
- Recent commits show focus on review detail display and rating component

### Editor Components
- Text formatting: bold, italic, underline, strikethrough
- Block elements: headings, lists, blockquotes, code blocks
- Customization: font size dropdown, color picker
- Image insertion with upload capability

## Development Guidelines

### Adding New Board Types
1. Create board component in `src/board/[BoardType]Board.tsx`
2. Add type definitions in `src/type/postResponse.ts`
3. Create route folder in `src/app/main/[route]/`
4. Reuse `boardTable.tsx`, `pagination.tsx`, `postFrame.tsx`
5. Add LNB navigation item in `src/component/lnb.tsx`

### Adding New API Endpoints
1. Define request/response types in `src/type/`
2. Use `api.get()`, `api.post()`, etc. from `src/lib/api.ts`
3. Handle errors via the centralized error type
4. Use React Query if caching/synchronization needed

### Working with Rich Text
- Import `useDefaultTipTapEditor` for consistent editor setup
- Use `tiptapViewer.tsx` to display rich text content
- Image uploads persist to temporary storage before post submit
- Toolbar components are composable and reusable

### Type Definitions
- All API responses must match TypeScript types
- Use `ApiResult<T>` wrapper for consistency
- Post types (Notice, Event, Review, Report) are exported from `src/type/postResponse.ts`
- Extend existing types rather than creating duplicates

## Configuration Files

- **tsconfig.json**: Path alias `@/*` maps to `src/`; strict mode enabled
- **next.config.ts**: Minimal configuration (no special plugins)
- **eslint.config.mjs**: Extends Next.js rules (next/core-web-vitals, next/typescript)
- **postcss.config.mjs**: Uses @tailwindcss/postcss v4
- **.env.local**: Contains `NEXT_PUBLIC_API_URL` (API base URL)

## Current Limitations & Future Considerations

- **No testing framework**: Consider adding Jest or Vitest if test coverage is needed
- **Client-side auth state**: User profile only synced via `useMe` hook; consider Redux/Zustand for complex auth scenarios
- **Image storage**: Images use temporary local storage; production should integrate with cloud storage (S3, Cloudinary, etc.)
- **Pagination**: Currently implemented per-board; no global pagination state
- **Error handling**: Currently generic; could be more granular per-endpoint

## Recent Development Focus

Recent commits indicate focus on:
- Review system details and display
- Rating star component implementation
- Review board enhancements

These suggest the review feature is actively being refined.