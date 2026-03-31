# CarWash Admin Dashboard - Integration Guide

## Overview

This is a complete **frontend-only** Super Admin Dashboard for the CarWash booking platform. The dashboard is fully responsive, features a modern SaaS design, and is ready to be integrated with your backend API.

## Demo Credentials

**Email:** `admin@carwash.com`  
**Password:** `password123`

## Features Included

### 📊 Dashboard Home
- KPI cards showing: Total Users, Active Reservations, Car Wash Centers, Total Revenue
- Revenue trend chart (monthly revenue vs target)
- Reservation status pie chart
- Top performing centers widget

### 👥 Users Management
- View all users with search functionality
- Filter by user type (Customer, Center Owner, Admin)
- View user status (Active/Inactive)
- See join dates

### 📅 Reservations Management
- Complete reservation listing
- Search by reservation ID, customer, or center
- View reservation details: service, date/time, amount, status
- Filter by status (Completed, Pending, Cancelled, No-show)

### 🏢 Centers Management
- Car wash center directory
- Search by name or city
- View center ratings and reservation counts
- Grid layout for easy browsing

### 🧹 Services Management
- Browse all available car wash services
- View pricing and duration
- Organize by service category
- Search functionality

### 📈 Analytics Page
- Peak hours analysis (customer bookings by time)
- Customer satisfaction ratings distribution
- Key metrics: Average rating, Response time, Cancellation rate

### ⚙️ Settings Page
- Account settings management
- Security/password change
- Notification preferences
- Account management options

## Architecture

### Technology Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui
- **Charts:** Recharts
- **Icons:** Lucide React
- **State Management:** React Context API

### File Structure
```
/app
  /login - Login page
  /dashboard - Dashboard layout wrapper
    /page.tsx - Dashboard home
    /users - Users management
    /reservations - Reservations management
    /centers - Centers management
    /services - Services management
    /analytics - Analytics page
    /settings - Settings page

/components
  /dashboard
    /sidebar.tsx - Navigation sidebar
    /header.tsx - Top header with user menu
    /charts - Chart components
    /widgets - Widget components

/lib
  /auth-context.tsx - Authentication context
  /mock-data.ts - Mock data for demo
  /utils.ts - Utility functions
```

## Integrating with Backend API

### 1. Update Authentication Context

Replace the mock authentication in `/lib/auth-context.tsx` with your actual API calls:

```typescript
const login = useCallback(async (email: string, password: string) => {
  setIsLoading(true);
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    if (data.success) {
      setUser(data.user);
      // Store token in localStorage/cookies if needed
    }
  } finally {
    setIsLoading(false);
  }
}, []);
```

### 2. Replace Mock Data with API Calls

Update each page to fetch data from your backend instead of using `mock-data.ts`. Example for Users page:

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // Rest of component...
}
```

### 3. Update API Endpoints

Replace API paths with your actual backend endpoints:

| Feature | Current Mock | Your API Endpoint |
|---------|-------------|-------------------|
| Login | Mock | `POST /api/auth/login` |
| Get Users | Mock Data | `GET /api/users` |
| Get Reservations | Mock Data | `GET /api/reservations` |
| Get Centers | Mock Data | `GET /api/centers` |
| Get Services | Mock Data | `GET /api/services` |
| Get Analytics | Mock Data | `GET /api/analytics` |

### 4. Add Error Handling

Implement proper error handling and loading states:

```typescript
const [error, setError] = useState<string | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchData().catch(err => {
    setError(err.message);
    setLoading(false);
  });
}, []);
```

## Design System

### Colors
The dashboard uses a semantic color system defined in `app/globals.css`:
- Primary: Used for main actions and focus states
- Muted: Neutral background colors
- Destructive: Error and delete actions
- Chart colors: Distinct colors for data visualization

### Responsive Breakpoints
- Mobile: < 768px (sidebar collapses to menu)
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Typography
- Headings: Geist font family (default)
- Body: Geist font family
- Code: Geist Mono

## Customization

### Theme Colors
Edit `/app/globals.css` to change the color scheme. Update CSS variables under `:root` and `.dark` selectors.

### Add New Pages
1. Create folder under `/app/dashboard/[feature]`
2. Add `page.tsx` with your component
3. Add menu item in `/components/dashboard/sidebar.tsx`

### Modify Layout
Edit `/components/dashboard/sidebar.tsx` and `/components/dashboard/header.tsx` for layout changes.

## Performance Optimizations

- Next.js 15 App Router with automatic code splitting
- Client-side routing for instant navigation
- Recharts for optimized chart rendering
- Image optimization with next/image
- Mobile-first responsive design

## Security Notes

⚠️ **Important:** This is a frontend application. Ensure:
- API endpoints are properly secured (CORS, authentication tokens)
- Sensitive data is validated on backend
- Use HTTPS in production
- Implement proper rate limiting
- Store authentication tokens securely

## Deployment

### Deploy to Vercel
```bash
npm run build
vercel deploy
```

### Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=https://your-api.com
NEXT_PUBLIC_ENVIRONMENT=production
```

## Support & Next Steps

1. **Connect your backend APIs** - Replace mock data with real API calls
2. **Implement authentication** - Update auth context with your auth system
3. **Add form handling** - Implement create/edit/delete operations
4. **Configure deployment** - Set up CI/CD pipeline
5. **Add monitoring** - Integrate error tracking and analytics

## Components Used

All UI components are from shadcn/ui:
- Card, Button, Input
- Form components
- Dialog/Modal (if needed)
- All components are customizable via Tailwind CSS

## Charts & Visualization

Uses Recharts library for:
- Line charts (Revenue trends)
- Bar charts (Analytics)
- Pie charts (Status distribution)

All charts are fully responsive and customizable.
