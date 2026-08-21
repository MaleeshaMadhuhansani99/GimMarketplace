# GIMMarketplace

A full-stack marketplace application where users can browse, search, filter, create, and delete listings. Built with a React + TypeScript + Redux frontend and a Node.js + Express + SQLite backend.

## Features

-  Browse listings in a responsive grid layout
-  Global search accessible from any page
-  Filter listings by category, min price, and max price
-  Sort listings (newest, oldest, price ascending/descending)
-  Pagination
-  Create new listings with image upload
-  Delete listings with confirmation dialog
-  Image preview on upload
-  Client-side and server-side form validation
-  Skeleton loading states
-  Consistent error handling with retry options
-  Empty state handling

## Tech Stack

### Frontend
- **React** with **TypeScript**
- **Vite** — build tool and dev server
- **Redux Toolkit** — state management
- **React Router** — client-side routing
- **Tailwind CSS** — styling
- **react-icons** (Feather icons) — iconography

### Backend
- **Node.js** with **Express**
- **TypeScript**
- **SQLite** (via `better-sqlite3`) — database
- **Multer** — image upload handling

## Project Structure

```
GimMarketplace/
├── frontend/
│   └── src/
│       ├── app/                  # App entry, providers, root component
│       ├── components/           # Shared, reusable UI components
│       │   ├── badge/
│       │   ├── dialog/
│       │   ├── empty-state/
│       │   ├── error/
│       │   ├── form/
│       │   ├── loading/
│       │   ├── pagination/
│       │   └── search/
│       ├── features/
│       │   └── listing/
│       │       ├── components/   # Listing-specific components
│       │       ├── hooks/        # Listing-specific hooks
│       │       ├── pages/        # Route-level pages
│       │       ├── utils/        # Validation and helpers
│       │       ├── listingsApi.ts
│       │       └── listingsSlice.ts
│       ├── routes/               # Route definitions
│       ├── store/                # Redux store configuration
│       ├── types/                # Global/shared types
│       └── utils/                # Shared utility functions
│
└── backend/
    └── src/
        ├── config/
        │   └── database.ts       # SQLite connection setup
        ├── listings/
        │   ├── listings.controller.ts
        │   ├── listings.service.ts
        │   ├── listings.routes.ts
        │   └── listings.types.ts
        ├── utils/
        │   └── apiResponse.ts    # Consistent API response helpers
        └── public/
            └── images/           # Uploaded listing images
```

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installation

Clone the repository and install dependencies for both frontend and backend:

```bash
git clone <repository-url>
cd GimMarketplace

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_BACKEND_URL=http://localhost:3000
VITE_API_URL=http://localhost:3000/api
```

Create a `.env` file in the `backend` directory (adjust as needed):

```env
DATABASE_URL="file:./dev.db"
PORT=3000
```

### Running the Application

**Backend:**

```bash
cd backend
npm run dev
```
After starting the server db folder will be created under backend folder with the marketplace.db file

**Seeding:**

```bash
cd backend
npm run seed
```

**Frontend:**

```bash
cd frontend
npm run dev
```

The frontend will typically be available at `http://localhost:5173`, and the backend API at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint                    | Description                          |
|--------|------------------------------|---------------------------------------|
| GET    | `/listings`                 | Get all listings (supports pagination, search, sort, and filters via query params) |
| GET    | `/listings/:id`              | Get a single listing by ID           |
| POST   | `/listings/create`           | Create a new listing (multipart form data with image) |
| DELETE | `/listings/:id`              | Delete a listing by ID               |

### Query Parameters for `GET /listings`

| Parameter   | Type   | Description                                  |
|-------------|--------|-----------------------------------------------|
| `page`      | number | Page number (default: 1)                     |
| `limit`     | number | Items per page (default: 8)                  |
| `search`    | string | Search term (matches title or description)   |
| `sort`      | string | `newest` \| `oldest` \| `price_asc` \| `price_desc` |
| `category`  | string | Filter by category                           |
| `minPrice`  | number | Minimum price filter                         |
| `maxPrice`  | number | Maximum price filter                         |

### Response Shape

All API responses follow a consistent shape:

```json
{
  "success": true,
  "data": { },
  "message": "Optional message"
}
```

## Data Model

```ts
interface Listing {
  id: number
  title: string
  description: string
  condition: 'New' | 'Like New' | 'Good' | 'Fair' | 'Used'
  price: number
  category: Category
  image_url: string | null
  created_at: string
}
```

## Architecture Notes

- **Feature-based folder structure**: domain-specific logic (components, pages, API calls, Redux slice) lives under `features/listing/`, while generic, reusable UI (buttons, dialogs, form inputs, pagination) lives in shared `components/`.
- **Container/presentational pattern**: components like `ListingSearchContainer` handle Redux wiring and business logic, delegating rendering to plain, reusable presentational components like `SearchInput`.
- **Consistent error handling**: shared `ErrorState`, `EmptyState`, and `NotFoundState` components are used across the app for predictable, recoverable error UX.
- **Validation on both layers**: form validation is duplicated intentionally on the frontend (for immediate UX feedback) and backend (as the source of truth, since the API must not trust client input).

