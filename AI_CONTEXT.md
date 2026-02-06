# AI Project Context: Ticket App Frontend

This document provides essential context for an AI assistant to understand and contribute to the Ticket App Frontend project.

## 📋 Project Overview

A modern web application for managing support tickets, featuring secure authentication, a detailed dashboard, and ticket management workflows.

## 🛠️ Technology Stack

- **Core**: [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (using `@tailwindcss/vite` plugin)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (based on [Radix UI](https://www.radix-ui.com/))
- **Routing**: [React Router DOM 7](https://reactrouter.com/) (using `createBrowserRouter`)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query v5](https://tanstack.com/query)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 📂 Project Structure

The project follows a modular architecture:

```text
src/
├── admin/          # Admin-specific modules (Layouts, Pages)
├── api/            # Base Axios configuration and interceptors
├── auth/           # Authentication flow (Login, Register, Store)
├── components/     # UI Library
│   ├── custom/     # Domain-specific reusable components
│   └── ui/         # Shadcn/Radix primitive components
├── dashboard/      # User dashboard and statistics components
├── hooks/          # Shared custom hooks
├── interfaces/     # Global TypeScript definitions
├── lib/            # Utilities (e.g., `cn` for Tailwind class merging)
├── ticket/         # Ticket lifecycle (Creation, View, Services)
├── user/           # User profile and related functionality
├── app.router.tsx  # Centralized routing configuration
├── TicketApp.tsx   # Root component with Providers
└── main.tsx        # Application entry point
```

## 🏗️ Architectural Patterns

### 1. Data Fetching & State

- **Server State**: Managed via **TanStack Query**. Services are located within their respective module folders (e.g., `src/ticket/service/`).
- **Global UI/Auth State**: Managed via **Zustand**. See `src/auth/store/AuthStore.ts`.
- **LocalStorage**: Used for persisting auth tokens and user info.

### 2. Routing

- Uses `createBrowserRouter` in `src/app.router.tsx`.
- Implements nested routing with Layout components (`AuthLayout`, `DashboardLayout`, etc.).

### 3. Styling & UI

- **Tailwind 4**: CSS-only configuration (mostly). Check `src/index.css`.
- **Responsive Design**: Mobile-first approach.
  - _Pattern_: Use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-5` for dashboard cards.

### 4. Components

- **Primitive UI**: Found in `src/components/ui`. These should not be edited unless changing the design system.
- **Feature Components**: Built by composing UI primitives.

## 🔑 Key Conventions for AI

- **Always use TypeScript**: Define interfaces in `src/interfaces` or locally if specific to a service.
- **Service Pattern**: API calls should be in `service` files, returning `Promise<DefaultResponse<T>>`.
- **Hooks**: Prefer TanStack Query `useQuery` and `useMutation` for data interactions.
- **Styling**: Use Tailwind classes. Avoid custom CSS unless absolutely necessary.
- **Icons**: Use `lucide-react`.

## 🚀 Common Commands

- `npm run dev`: Start development server.
- `npm run build`: Production build.
- `npm run lint`: ESlint check.

---

_Created on: 2026-01-22_
