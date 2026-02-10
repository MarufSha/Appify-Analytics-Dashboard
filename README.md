This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Tech Stack Used

- Next.js (App Router) – Routing, layouts, and SSR
- React 18
- TypeScript
- Tailwind CSS – Styling
- shadcn/ui – Accessible UI components
- Recharts – Charts and data visualization
- Zustand – Global state management
- next-themes – Dark/Light theme support
- lucide-react – Icons

## Architecture Decisions

- App Router + Route Groups
  Used route groups to isolate dashboard-related layouts and routes.

- Feature-based folder structure
  UI components, state, services, and utilities are organized by responsibility to improve scalability and maintainability.

- Centralized state management (Zustand)
  Filters, role selection, loading, and error states are managed globally to ensure consistent updates across KPIs and charts.

- Derived view model pattern
  Raw data is transformed into a computed dashboard view, keeping UI components simple and declarative.

- Client-only theme toggle
  Theme switching is isolated into a client-only component to avoid SSR hydration mismatches.

## Assumptions Made

- Mock data represents a realistic analytics API response.

- Two roles exist: Admin (full access) and Manager (restricted access).

- Supported date ranges are Last 7 days, Last 30 days, and Last 12 months.

- CSV exports reflect the currently selected filters and role.

- Data size is small-to-medium and suitable for client-side rendering.
