# API Documentation

This document provides comprehensive documentation for all public APIs, functions, and components in the CHAM (Chat Application) project.

## Table of Contents

1. [Authentication APIs](#authentication-apis)
2. [Hooks](#hooks)
3. [State Management](#state-management)
4. [Utilities](#utilities)
5. [Components](#components)
6. [Types](#types)
7. [Contexts](#contexts)

## Authentication APIs

### `startKakaoLogin()`

Redirects the user to Kakao OAuth login page.

**Usage:**
```typescript
import { startKakaoLogin } from '@/lib/api/auth'

// Redirect to Kakao login
startKakaoLogin()
```

**Returns:** `void`

---

### `handleKakaoCallback(code: string)`

Handles the OAuth callback from Kakao and exchanges the authorization code for JWT tokens.

**Parameters:**
- `code` (string): Authorization code received from Kakao

**Usage:**
```typescript
import { handleKakaoCallback } from '@/lib/api/auth'

try {
  const userInfo = await handleKakaoCallback('authorization_code')
  console.log(userInfo.email, userInfo.nickname)
} catch (error) {
  console.error('Login failed:', error)
}
```

**Returns:** `Promise<LoginResponse>`
- `email` (string): User's email address
- `nickname` (string): User's display name

**Throws:** Error if token exchange fails

---

### `refreshAccessToken()`

Refreshes the JWT access token using the HttpOnly refresh token cookie.

**Usage:**
```typescript
import { refreshAccessToken } from '@/lib/api/auth'

try {
  const newToken = await refreshAccessToken()
  // Token is automatically updated in the auth store
} catch (error) {
  // User will be logged out automatically
}
```

**Returns:** `Promise<string>` - New JWT access token

**Throws:** Error if refresh fails (triggers automatic logout)

---

### `logout()`

Logs out the user by invalidating tokens and clearing local state.

**Usage:**
```typescript
import { logout } from '@/lib/api/auth'

await logout()
// User is automatically redirected to login page
```

**Returns:** `Promise<void>`

---

### `testProtectedApi()`

Tests authenticated API access. Useful for verifying token validity.

**Usage:**
```typescript
import { testProtectedApi } from '@/lib/api/auth'

try {
  const result = await testProtectedApi()
  console.log('Authentication valid:', result)
} catch (error) {
  console.log('Authentication failed')
}
```

**Returns:** `Promise<string>` - Success message

## Hooks

### `useAuth()`

Main authentication hook that provides auth state and actions.

**Usage:**
```typescript
import { useAuth } from '@/hooks/useAuth'

function LoginComponent() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth()

  if (isLoading) return <div>Loading...</div>
  
  if (!isAuthenticated) {
    return <button onClick={login}>Login with Kakao</button>
  }

  return (
    <div>
      <p>Welcome, {user?.nickname}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

**Returns:**
- `user` (User | null): Current user information
- `isAuthenticated` (boolean): Authentication status
- `isLoading` (boolean): Loading state during auth operations
- `login` (function): Initiates Kakao login flow
- `logout` (function): Logs out the user

---

### `useChatStream()`

Hook for handling streaming chat responses from the API.

**Usage:**
```typescript
import { useChatStream } from '@/hooks/useChatStream'

function ChatComponent() {
  const { message, isStreaming, error, start, stop } = useChatStream()

  const handleSend = () => {
    start("Hello, how can you help me?")
  }

  return (
    <div>
      <button onClick={handleSend} disabled={isStreaming}>
        {isStreaming ? 'Sending...' : 'Send Message'}
      </button>
      <button onClick={stop} disabled={!isStreaming}>
        Stop
      </button>
      {error && <p>Error: {error.message}</p>}
      <div>{message}</div>
    </div>
  )
}
```

**Returns:**
- `message` (string): Accumulated streaming response
- `isStreaming` (boolean): Whether a stream is currently active
- `error` (Error | null): Any error that occurred during streaming
- `start` (function): Start streaming with a prompt
- `stop` (function): Abort the current stream

## State Management

### Auth Store

Global authentication state management using Zustand.

#### Store Actions

**`setAuth(token: string, user: User)`**
```typescript
import { useAuthStore } from '@/lib/store/authStore'

const { setAuth } = useAuthStore()
setAuth('jwt_token', { email: 'user@example.com', nickname: 'User' })
```

**`clearAuth()`**
```typescript
const { clearAuth } = useAuthStore()
clearAuth() // Clears all auth state
```

**`setLoading(loading: boolean)`**
```typescript
const { setLoading } = useAuthStore()
setLoading(true) // Show loading state
```

**`updateToken(token: string)`**
```typescript
const { updateToken } = useAuthStore()
updateToken('new_jwt_token') // Update token without changing user info
```

#### Selectors

**`useAccessToken()`**
```typescript
import { useAccessToken } from '@/lib/store/authStore'

const token = useAccessToken() // Returns current JWT token or null
```

**`useUser()`**
```typescript
import { useUser } from '@/lib/store/authStore'

const user = useUser() // Returns user info or null
```

**`useIsAuthenticated()`**
```typescript
import { useIsAuthenticated } from '@/lib/store/authStore'

const isAuth = useIsAuthenticated() // Returns boolean
```

**`useAuthLoading()`**
```typescript
import { useAuthLoading } from '@/lib/store/authStore'

const isLoading = useAuthLoading() // Returns boolean
```

**`useAuthState()`**
```typescript
import { useAuthState } from '@/lib/store/authStore'

const { accessToken, user, isAuthenticated, isLoading } = useAuthState()
```

## Utilities

### `cn(...inputs: ClassValue[])`

Utility function for merging Tailwind CSS classes with conflict resolution.

**Usage:**
```typescript
import { cn } from '@/lib/utils'

const className = cn(
  'base-class',
  'text-red-500',
  condition && 'conditional-class',
  { 'object-class': someCondition }
)
```

**Parameters:**
- `inputs` (ClassValue[]): Class names, objects, or conditional classes

**Returns:** `string` - Merged class string

---

### `handleApi<T>(fn: () => Promise<T>)`

Wrapper function for API calls with standardized error handling.

**Usage:**
```typescript
import { handleApi } from '@/utils/handleApi'

const { data, error } = await handleApi(async () => {
  return await someApiCall()
})

if (error) {
  console.error('API Error:', error)
} else {
  console.log('Success:', data)
}
```

**Parameters:**
- `fn` (function): Async function that returns a Promise

**Returns:** `Promise<{ data: T | null, error: string | null }>`

---

### `errorTracker(error: unknown)`

Extracts meaningful error messages from various error types.

**Usage:**
```typescript
import { errorTracker } from '@/utils/handleApi'

try {
  await someOperation()
} catch (error) {
  const message = errorTracker(error)
  showToast(message)
}
```

**Parameters:**
- `error` (unknown): Any error object

**Returns:** `string` - Human-readable error message

## Components

### `ThemeToggle`

A button component for switching between light and dark themes.

**Props:**
```typescript
interface ThemeToggleProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}
```

**Usage:**
```tsx
import { ThemeToggle } from '@/components/theme-toggle'

function Header() {
  return (
    <div>
      <ThemeToggle variant="outline" size="sm" />
    </div>
  )
}
```

---

### `Button`

Flexible button component with multiple variants and sizes.

**Props:**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}
```

**Usage:**
```tsx
import { Button } from '@/components/ui/button'

function MyComponent() {
  return (
    <div>
      <Button variant="default" size="lg">
        Primary Button
      </Button>
      <Button variant="outline" onClick={() => console.log('clicked')}>
        Outline Button
      </Button>
      <Button variant="ghost" size="icon">
        <IconComponent />
      </Button>
    </div>
  )
}
```

## Types

### `User`

User information interface.

```typescript
interface User {
  email: string      // User's email address
  nickname: string   // Display name
}
```

### `LoginResponse`

Response from successful Kakao login.

```typescript
interface LoginResponse {
  email: string      // User's email
  nickname: string   // User's nickname
}
```

### `ChatCompletionChunk`

Streaming chat response chunk structure.

```typescript
interface ChatCompletionChunk {
  id: string                           // Unique chat completion ID
  object: "chat.completion.chunk"      // Response type
  created: number                      // Unix timestamp
  model: string                        // AI model used
  service_tier: string                 // Service tier
  system_fingerprint: string           // System identifier
  choices: ChatCompletionChunkChoice[] // Response choices
}

interface ChatCompletionChunkChoice {
  index: number                    // Choice index
  delta: ChatCompletionDelta       // Content delta
  logprobs: null                   // Always null in streaming
  finish_reason: string | null     // Completion reason
}

interface ChatCompletionDelta {
  role?: "system" | "user" | "assistant"  // Message role
  content?: string                         // Content chunk
  refusal?: any                           // Refusal information
}
```

### `message`

Chat message interface.

```typescript
interface message {
  role: "system" | "user" | "assistant" | "function"
  content?: string
  name?: string
  function_call?: {
    name: string
    arguments: string
  }
}
```

## Contexts

### `ThemeProvider` & `useTheme()`

Theme management context for light/dark mode switching.

**Provider Usage:**
```tsx
import { ThemeProvider } from '@/contexts/theme-context'

function App({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}
```

**Hook Usage:**
```tsx
import { useTheme } from '@/contexts/theme-context'

function ThemeAwareComponent() {
  const { theme, toggleTheme, isDarkMode } = useTheme()

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Is dark mode: {isDarkMode}</p>
      <button onClick={toggleTheme}>
        Switch to {isDarkMode ? 'light' : 'dark'} mode
      </button>
    </div>
  )
}
```

**Returns:**
- `theme` ("light" | "dark"): Current theme
- `toggleTheme` (function): Toggle between themes
- `isDarkMode` (boolean): Whether dark mode is active

## API Clients

### `apiClient`

Axios instance for unauthenticated requests.

**Usage:**
```typescript
import { apiClient } from '@/lib/api/axios'

const response = await apiClient.get('/public-endpoint')
const result = await apiClient.post('/register', userData)
```

### `authenticatedApiClient`

Axios instance with automatic JWT token handling and refresh.

**Usage:**
```typescript
import { authenticatedApiClient } from '@/lib/api/axios'

// Token is automatically added to Authorization header
const response = await authenticatedApiClient.get('/protected-endpoint')
const result = await authenticatedApiClient.post('/user-data', data)
```

**Features:**
- Automatic JWT token attachment
- Automatic token refresh on 403 errors
- Request queuing during token refresh
- Automatic logout on refresh failure

## Error Handling

The application includes comprehensive error handling:

1. **API Errors**: Standardized error responses with user-friendly messages
2. **Authentication Errors**: Automatic token refresh and logout handling
3. **Network Errors**: Timeout and connection error handling
4. **Validation Errors**: Type-safe error handling with TypeScript

## Security Features

1. **JWT Tokens**: Access tokens stored in memory only (XSS protection)
2. **Refresh Tokens**: HttpOnly cookies (CSRF protection)
3. **Automatic Logout**: On token refresh failure
4. **Request Interceptors**: Automatic token attachment
5. **CORS Configuration**: Proper credentials handling

## Best Practices

1. **Use the provided hooks** instead of directly accessing stores
2. **Handle loading and error states** in your components
3. **Use the `handleApi` utility** for consistent error handling
4. **Implement proper cleanup** in components using streaming APIs
5. **Use TypeScript interfaces** for type safety
6. **Follow the established patterns** for new components and APIs

This documentation covers all public APIs, functions, and components in the CHAM application. For implementation details or additional examples, refer to the source code in the respective files.