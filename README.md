# Ticket App Frontend

Frontend application for the Ticket Management System, built with **React**, **Vite**, and **Tailwind CSS**.

## 📋 Description

This project is a modern web application for managing support tickets. It features a responsive user interface, secure authentication, and a dashboard for viewing and managing tickets.

## ✨ Features

- **Authentication**: Secure Login and Registration pages with JWT handling.
- **Dashboard**: Overview of ticket statistics and a list of active tickets.
- **Ticket Management**: Create, view, and manage support tickets.
- **Responsive Design**: Fully responsive interface built with Tailwind CSS.
- **State Management**: Efficient global state management using Zustand.
- **Modern UI**: Polished UI components using Shadcn UI (Radix UI).

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing**: [React Router DOM 7](https://reactrouter.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Date Handling**: [date-fns](https://date-fns.org/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm or yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://dev.azure.com/mandresbuelvas/ticket/_git/ticket-frontend
    cd ticket-frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    pnpm install
    # or
    yarn install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## 🏗️ Build

To build the application for production:

```bash
npm run build
```

## 📂 Project Structure

```
src/
├── api/            # API integration (Axios setup)
├── auth/           # Authentication module (Pages, Services, Store)
├── components/     # Reusable UI components
│   ├── custom/     # App-specific components
│   └── ui/         # Shadcn UI components
├── dashboard/      # Dashboard module
├── interfaces/     # TypeScript interfaces/types
├── lib/            # Utility functions
├── ticket/         # Ticket module
└── main.tsx        # Entry point
```

## 👤 Author

**Marlon Buelvas**

---

*Verified with React 19 and Vite 6*
