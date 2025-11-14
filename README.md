# Booking System - Modern Service Reservation Application

## Table of Contents

- [About](#about)
- [Key Features](#key-features)
- [Technical Choices](#technical-choices)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Project Structure](#project-structure)
- [Business Rules](#business-rules)

## About

This is a modern booking management system that allows users to browse available services, book time slots, and manage their reservations. The application includes an admin panel for managing services and time slots.

**Domain:** Service booking and appointment management

**Purpose:** This project demonstrates best practices in software architecture, code quality, and maintainability by implementing a clean, layered architecture with proper separation of concerns.

## Key Features

### For Users
- **Email-based Authentication**: Simple login system using email only (no password required)
- **Service Catalog**: Browse available services with descriptions and duration
- **Time Slot Booking**: View available time slots and make reservations
- **Reservation Management**: View all reservations and cancel upcoming bookings
- **Duplicate Prevention**: System prevents double-booking the same slot

### For Administrators
- **Service Management**: Add, edit, and remove services
- **Slot Management**: Create and manage time slots for each service
- **Capacity Control**: Set and manage capacity for each time slot

## Technical Choices

### Stack: Vue.js + TypeScript + Vite

**Why Vue.js?**
- **Progressive Framework**: Easy to learn yet powerful for complex applications
- **Reactive Data System**: Automatic UI updates with minimal boilerplate
- **Component-Based**: Encourages reusability and maintainability
- **Excellent Tooling**: First-class TypeScript support and great developer experience

**Why TypeScript?**
- **Type Safety**: Catch errors at compile-time, not runtime
- **Better IDE Support**: Autocomplete, refactoring, and inline documentation
- **Self-Documenting**: Types serve as inline documentation
- **Refactoring Confidence**: Safe refactoring with compiler checks

**Why Vite?**
- **Lightning Fast**: Instant server start and Hot Module Replacement (HMR)
- **Modern Build Tool**: Optimized production builds with rollup
- **Zero Config**: Works out of the box with sensible defaults

### Additional Technologies

- **Pinia**: Modern state management for Vue 3 (lighter and more intuitive than Vuex)
- **Vue Router**: Official routing solution with navigation guards for authentication
- **Vitest**: Fast unit testing framework with native ESM support
- **ESLint + Prettier**: Code quality and consistent formatting
- **LocalStorage**: Simple persistence solution (can be easily replaced with a backend API)

## Architecture

This project follows a **layered architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│   (Vue Components, Views, Router)       │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         State Management Layer          │
│            (Pinia Stores)               │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Business Logic Layer            │
│           (Services)                    │
│  - AuthService                          │
│  - BookingService                       │
│  - ServiceManagementService             │
│  - SlotManagementService                │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Data Access Layer               │
│         (Repositories)                  │
│  - BaseRepository                       │
│  - ServiceRepository                    │
│  - SlotRepository                       │
│  - ReservationRepository                │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Persistence Layer               │
│         (localStorage)                  │
└─────────────────────────────────────────┘
```

### Layer Responsibilities

1. **Presentation Layer** (Views/Components)
   - User interface and user interactions
   - No business logic
   - Communicates only with stores

2. **State Management** (Pinia Stores)
   - Application state
   - Orchestrates service calls
   - Provides reactive data to components

3. **Business Logic** (Services)
   - Contains all business rules
   - Validates data
   - Coordinates between repositories
   - No UI concerns

4. **Data Access** (Repositories)
   - CRUD operations
   - Data persistence
   - No business logic

5. **Models**
   - Type definitions
   - Data structures
   - Shared across all layers

### Benefits of This Architecture

- **Testability**: Each layer can be tested independently
- **Maintainability**: Changes in one layer don't affect others
- **Scalability**: Easy to replace localStorage with a real backend
- **Reusability**: Business logic can be reused across different UIs
- **Clear Responsibilities**: Each class/file has a single, well-defined purpose

## Installation

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x

### Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd project_legacy
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Development Server

Start the development server with hot reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Default Admin Access

For testing admin features, use one of these emails:
- `admin@example.com`
- `admin@booking.com`

Any other email will have regular user access.

## Testing

### Run Unit Tests

```bash
npm run test
```

### Run Tests in UI Mode

```bash
npm run test:ui
```

### Test Coverage

```bash
npm run test:coverage
```

### Test Files

Tests are located in `src/__tests__/` and cover:
- Authentication logic
- Booking rules (double booking prevention, capacity checks)
- Service management (CRUD operations, validation)
- Business rule enforcement

## Code Quality

### Linting

Check and fix code issues:

```bash
npm run lint
```

### Formatting

Format code with Prettier:

```bash
npm run format
```

### Quality Tools in Place

- **ESLint**: Static code analysis with Vue and TypeScript rules
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict type checking enabled
- **Vitest**: Unit testing framework

## Project Structure

```
project_legacy/
├── src/
│   ├── models/              # Data models and types
│   │   ├── User.ts
│   │   ├── Service.ts
│   │   ├── Slot.ts
│   │   └── Reservation.ts
│   │
│   ├── repositories/        # Data access layer
│   │   ├── BaseRepository.ts
│   │   ├── ServiceRepository.ts
│   │   ├── SlotRepository.ts
│   │   └── ReservationRepository.ts
│   │
│   ├── services/            # Business logic layer
│   │   ├── AuthService.ts
│   │   ├── BookingService.ts
│   │   ├── ServiceManagementService.ts
│   │   └── SlotManagementService.ts
│   │
│   ├── stores/              # State management (Pinia)
│   │   ├── auth.ts
│   │   ├── services.ts
│   │   ├── slots.ts
│   │   └── bookings.ts
│   │
│   ├── views/               # Page components
│   │   ├── HomeView.vue
│   │   ├── LoginView.vue
│   │   ├── ServicesView.vue
│   │   ├── ServiceDetailView.vue
│   │   ├── MyReservationsView.vue
│   │   └── AdminView.vue
│   │
│   ├── components/          # Reusable components
│   │   └── AppHeader.vue
│   │
│   ├── router/              # Routing configuration
│   │   └── index.ts
│   │
│   ├── utils/               # Utility functions
│   │   └── idGenerator.ts
│   │
│   ├── __tests__/           # Unit tests
│   │   ├── AuthService.test.ts
│   │   ├── BookingService.test.ts
│   │   └── ServiceManagementService.test.ts
│   │
│   ├── App.vue              # Root component
│   └── main.ts              # Application entry point
│
├── .eslintrc.cjs            # ESLint configuration
├── .prettierrc.json         # Prettier configuration
├── .gitignore               # Git ignore rules
├── vite.config.ts           # Vite configuration
├── vitest.config.ts         # Vitest configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## Business Rules

### Booking Rules

1. **Double Booking Prevention**: A user cannot book the same slot twice
2. **Capacity Management**: Each slot has a maximum capacity that cannot be exceeded
3. **Future Bookings Only**: Users can only book slots in the future
4. **Cancellation Restriction**: Users can only cancel their own future reservations

### Service Management Rules

1. **Unique Names**: Service names must be unique
2. **Required Fields**: Service name is mandatory
3. **Cascading Deletion**: Deleting a service removes all its associated slots and reservations

### Slot Management Rules

1. **Future Slots Only**: Slots must be created for future dates
2. **Positive Capacity**: Slot capacity must be a positive integer
3. **Capacity Reduction**: Cannot reduce capacity below current reservation count

### Authentication Rules

1. **Email Validation**: Must be a valid email format
2. **Admin Access**: Specific emails have admin privileges
3. **Session Persistence**: User session persists across page refreshes

## Data Models

### Service
```typescript
{
  id: string
  name: string
  description?: string
  duration?: number  // in minutes
  createdAt: string  // ISO 8601
}
```

### Slot
```typescript
{
  id: string
  serviceId: string
  datetime: string   // ISO 8601
  capacity: number
  createdAt: string  // ISO 8601
}
```

### Reservation
```typescript
{
  id: string
  slotId: string
  userEmail: string
  createdAt: string  // ISO 8601
}
```

### User
```typescript
{
  email: string
  isAdmin: boolean
  lastLogin: string  // ISO 8601
}
```

## Future Enhancements

Potential improvements for future iterations:

- [ ] Backend API integration (replace localStorage)
- [ ] Real authentication with passwords and JWT
- [ ] Email notifications for bookings
- [ ] Calendar view for slots
- [ ] Service categories and filtering
- [ ] User profile management
- [ ] Booking history and analytics
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Mobile app (React Native/Flutter)

## License

This project is part of an educational assignment.

## Author

Built as a refactoring exercise to demonstrate software engineering best practices.
