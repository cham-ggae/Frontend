# CHAM Developer Guide

A comprehensive guide for developers working on the CHAM (Chat Application) project.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Quick Start](#quick-start)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [API Integration](#api-integration)
6. [State Management](#state-management)
7. [Authentication Flow](#authentication-flow)
8. [Testing Guidelines](#testing-guidelines)
9. [Deployment](#deployment)
10. [Contributing](#contributing)

## Project Overview

CHAM is a Next.js-based family chat application with plant-growing gamification features. The application includes:

- **Authentication**: Kakao OAuth integration with JWT tokens
- **Real-time Chat**: Streaming chat responses with AI integration
- **Plant Growing Game**: Interactive plant visualization with family collaboration
- **Theme Support**: Light/dark mode with persistent preferences
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Animation**: Framer Motion
- **State Management**: Zustand
- **HTTP Client**: Axios with interceptors
- **Authentication**: JWT with refresh tokens
- **Development**: ESLint, TypeScript strict mode

## Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Access to the backend API server
- Kakao OAuth application credentials

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd cham
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_ADDR=http://localhost:8090
   ```

4. **Start development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the application:**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── basic-info/         # User basic information page
│   ├── chat/               # Chat interface pages
│   ├── dashboard/          # Main dashboard
│   ├── family-space/       # Family collaboration space
│   ├── login/              # Authentication pages
│   ├── my-page/            # User profile pages
│   ├── plant-game/         # Plant growing game
│   ├── result/             # Results and achievements
│   └── survey/             # User surveys
├── components/             # Reusable React components
│   ├── chat/               # Chat-specific components
│   ├── login/              # Authentication components
│   ├── providers/          # Context providers
│   └── ui/                 # Base UI components (Radix UI)
├── contexts/               # React contexts
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries
│   ├── api/                # API client and functions
│   └── store/              # Zustand stores
├── page/                   # Page components (legacy structure)
├── service/                # Service layer functions
├── store/                  # Additional stores
├── types/                  # TypeScript type definitions
└── utils/                  # Utility functions
```

## Development Workflow

### 1. Creating New Components

Follow the established patterns:

```typescript
// components/my-component.tsx
"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface MyComponentProps {
  title: string
  optional?: boolean
  onAction: (data: any) => void
  className?: string
}

export function MyComponent({ 
  title, 
  optional = false, 
  onAction, 
  className 
}: MyComponentProps) {
  const [state, setState] = useState(false)

  return (
    <div className={cn("base-classes", className)}>
      <h2>{title}</h2>
      {optional && <p>Optional content</p>}
      <button onClick={() => onAction({ state })}>
        Action
      </button>
    </div>
  )
}
```

### 2. API Integration

Use the provided API clients:

```typescript
// For authenticated requests
import { authenticatedApiClient } from '@/lib/api/axios'

export const fetchUserData = async () => {
  const response = await authenticatedApiClient.get('/user/profile')
  return response.data
}

// For public requests
import { apiClient } from '@/lib/api/axios'

export const fetchPublicData = async () => {
  const response = await apiClient.get('/public/data')
  return response.data
}
```

### 3. State Management

Use Zustand stores for global state:

```typescript
// stores/my-store.ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface MyState {
  count: number
  increment: () => void
  decrement: () => void
}

export const useMyStore = create<MyState>()(
  devtools((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
  }), {
    name: 'my-store'
  })
)
```

### 4. Custom Hooks

Create reusable hooks for common functionality:

```typescript
// hooks/useMyFeature.ts
import { useState, useEffect } from 'react'
import { useMyStore } from '@/stores/my-store'

export function useMyFeature() {
  const [loading, setLoading] = useState(false)
  const { count, increment } = useMyStore()

  const performAction = async () => {
    setLoading(true)
    try {
      await someAsyncOperation()
      increment()
    } finally {
      setLoading(false)
    }
  }

  return {
    count,
    loading,
    performAction
  }
}
```

## API Integration

### Authentication Flow

The application uses a secure authentication flow:

1. **Login**: User clicks Kakao login → Redirects to OAuth
2. **Callback**: OAuth returns with code → Exchange for JWT tokens
3. **Storage**: Access token in memory, refresh token in HttpOnly cookie
4. **Requests**: Automatic token attachment and refresh

### API Client Configuration

```typescript
// Automatic token handling
const response = await authenticatedApiClient.get('/protected-endpoint')

// Manual error handling
import { handleApi } from '@/utils/handleApi'

const { data, error } = await handleApi(async () => {
  return await authenticatedApiClient.post('/api/data', payload)
})

if (error) {
  // Handle error
  console.error(error)
} else {
  // Use data
  console.log(data)
}
```

### Streaming API

For chat streaming:

```typescript
import { useChatStream } from '@/hooks/useChatStream'

function ChatComponent() {
  const { message, isStreaming, start, stop } = useChatStream()

  const handleSend = (prompt: string) => {
    start(prompt)
  }

  return (
    <div>
      <div>{message}</div>
      <button onClick={() => handleSend("Hello")} disabled={isStreaming}>
        Send
      </button>
      <button onClick={stop} disabled={!isStreaming}>
        Stop
      </button>
    </div>
  )
}
```

## State Management

### Zustand Store Pattern

The application uses Zustand for state management with the following pattern:

```typescript
// 1. Define interfaces
interface StoreState {
  data: any[]
  loading: boolean
  error: string | null
}

interface StoreActions {
  fetchData: () => Promise<void>
  addItem: (item: any) => void
  clearError: () => void
}

// 2. Create store with devtools
export const useStore = create<StoreState & StoreActions>()(
  devtools((set, get) => ({
    // State
    data: [],
    loading: false,
    error: null,

    // Actions
    fetchData: async () => {
      set({ loading: true, error: null })
      try {
        const data = await apiCall()
        set({ data, loading: false })
      } catch (error) {
        set({ error: error.message, loading: false })
      }
    },

    addItem: (item) => {
      set((state) => ({ data: [...state.data, item] }))
    },

    clearError: () => set({ error: null })
  }), {
    name: 'store-name'
  })
)
```

### Selectors

Create specific selectors for performance:

```typescript
// Specific selectors
export const useStoreData = () => useStore((state) => state.data)
export const useStoreLoading = () => useStore((state) => state.loading)
export const useStoreError = () => useStore((state) => state.error)
```

## Authentication Flow

### Login Process

1. **Initiate Login**:
   ```typescript
   import { useAuth } from '@/hooks/useAuth'
   
   const { login } = useAuth()
   login() // Redirects to Kakao OAuth
   ```

2. **Handle Callback**:
   ```typescript
   // pages/login/callback/kakao/page.tsx
   const code = searchParams.get('code')
   await handleKakaoCallback(code)
   ```

3. **Check Authentication**:
   ```typescript
   const { isAuthenticated, user } = useAuth()
   
   if (!isAuthenticated) {
     // Show login UI
   } else {
     // Show authenticated content
     console.log(user.nickname)
   }
   ```

### Protected Routes

Use middleware for route protection:

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('refreshToken')
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
```

## Testing Guidelines

### Component Testing

```typescript
// __tests__/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### API Testing

```typescript
// __tests__/api/auth.test.ts
import { handleKakaoCallback } from '@/lib/api/auth'

describe('Auth API', () => {
  it('handles successful login', async () => {
    const result = await handleKakaoCallback('valid-code')
    expect(result).toHaveProperty('email')
    expect(result).toHaveProperty('nickname')
  })
})
```

### Hook Testing

```typescript
// __tests__/hooks/useAuth.test.ts
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '@/hooks/useAuth'

describe('useAuth', () => {
  it('provides authentication state', () => {
    const { result } = renderHook(() => useAuth())
    
    expect(result.current.isAuthenticated).toBe(false)
    expect(typeof result.current.login).toBe('function')
    expect(typeof result.current.logout).toBe('function')
  })
})
```

## Deployment

### Environment Variables

Set up production environment variables:

```bash
# .env.production
NEXT_PUBLIC_ADDR=https://api.production.com
NODE_ENV=production
```

### Build Process

```bash
# Install dependencies
npm ci

# Build the application
npm run build

# Start production server
npm run start
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## Contributing

### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages

### Git Workflow

1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes and commit: `git commit -m "feat: add new feature"`
3. Push branch: `git push origin feature/new-feature`
4. Create pull request
5. Code review and merge

### Pull Request Guidelines

- Include description of changes
- Add tests for new functionality
- Update documentation if needed
- Ensure all checks pass

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat(auth): add Kakao OAuth integration`
- `fix(chat): resolve streaming connection issues`
- `docs(api): update authentication documentation`

## Troubleshooting

### Common Issues

1. **Authentication Issues**:
   - Check environment variables
   - Verify OAuth configuration
   - Clear cookies and localStorage

2. **Build Errors**:
   - Update Node.js version
   - Clear node_modules and reinstall
   - Check TypeScript errors

3. **API Connection Issues**:
   - Verify backend server is running
   - Check CORS configuration
   - Validate API endpoints

### Debug Mode

Enable debug logging:

```typescript
// Enable Zustand devtools
const store = create(devtools(storeImplementation, {
  name: 'store-name',
  enabled: process.env.NODE_ENV === 'development'
}))

// Enable axios request logging
console.log('API Request:', config.url, config.data)
```

## Additional Resources

- [API Documentation](./API_DOCUMENTATION.md)
- [Component Documentation](./COMPONENT_DOCUMENTATION.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

This developer guide provides a comprehensive overview of working with the CHAM application. For specific API details, refer to the API Documentation, and for component usage, see the Component Documentation.