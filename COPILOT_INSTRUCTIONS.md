# BounceUp – Copilot Instructions

## Project Overview
Bouncy castle rental platform (Angular 17 + PrimeNG 17 + SCSS).

## Architecture
- **Standalone components** (no NgModules)
- **Lazy loading** via `loadComponent()` in routes
- **Reactive Forms** for all forms
- **Services** in `src/app/services/` abstract all HTTP calls

## Folder Structure
```
src/app/
├── layout/          # Navbar, Footer, LayoutComponent
├── models/          # TypeScript interfaces (product, booking, availability, contact)
├── pages/           # Routed page components (home, catalog, booking, contact, admin)
│   ├── product-detail/
│   └── ...
└── services/        # API service layer (ProductService, BookingService, ...)
```

## API Endpoints (backend-ready)
| Method | Endpoint        | Service             |
|--------|-----------------|---------------------|
| GET    | /products       | ProductService      |
| GET    | /availability   | AvailabilityService |
| POST   | /booking        | BookingService      |
| GET    | /bookings       | BookingService      |
| POST   | /contact        | ContactService      |

## Design System
- **Primary color:** `#FF6B35` (orange)
- **Dark color:** `#1a1a2e` (dark navy)
- **Font:** Inter
- **Border radius:** 8–16px
- **Mobile-first:** all layouts use CSS Grid with `auto-fill`/`minmax`

## PrimeNG Version: 17
- Use `primeng/resources/themes/lara-light-blue/theme.css` 
- `InputTextareaModule` (not `TextareaModule`)
- `CalendarModule` for date picker
- `DropdownModule` for selects
- `TableModule` for admin view

## Key Commands
```bash
npm start          # ng serve --open
npm run build      # ng build
```
