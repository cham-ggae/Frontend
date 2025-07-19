# CHAM Quick Reference Guide

A quick reference for common patterns, imports, and code snippets used in the CHAM application.

## Common Imports

### Authentication
```typescript
import { useAuth } from '@/hooks/useAuth'
import { useAuthStore } from '@/lib/store/authStore'
import { startKakaoLogin, logout, handleKakaoCallback } from '@/lib/api/auth'
```

### API Clients
```typescript
import { apiClient, authenticatedApiClient } from '@/lib/api/axios'
import { handleApi } from '@/utils/handleApi'
```

### UI Components
```typescript
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
```

### Utilities
```typescript
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
```

### Theme
```typescript
import { useTheme } from '@/contexts/theme-context'
import { ThemeToggle } from '@/components/theme-toggle'
```

### Chat
```typescript
import { useChatStream } from '@/hooks/useChatStream'
```

## Common Patterns

### Authentication Check
```typescript
const { isAuthenticated, user, login, logout } = useAuth()

if (!isAuthenticated) {
  return <Button onClick={login}>Login with Kakao</Button>
}

return (
  <div>
    <p>Welcome, {user?.nickname}!</p>
    <Button onClick={logout}>Logout</Button>
  </div>
)
```

### API Call with Error Handling
```typescript
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)

const fetchData = async () => {
  setLoading(true)
  setError(null)
  
  const { data, error } = await handleApi(async () => {
    return await authenticatedApiClient.get('/api/data')
  })
  
  if (error) {
    setError(error)
  } else {
    // Handle success
    console.log(data)
  }
  
  setLoading(false)
}
```

### Form with State
```typescript
const [formData, setFormData] = useState({
  name: '',
  email: ''
})

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  // Handle form submission
}

const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData(prev => ({
    ...prev,
    [field]: e.target.value
  }))
}

return (
  <form onSubmit={handleSubmit}>
    <div>
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        value={formData.name}
        onChange={handleChange('name')}
      />
    </div>
    <div>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        value={formData.email}
        onChange={handleChange('email')}
      />
    </div>
    <Button type="submit">Submit</Button>
  </form>
)
```

### Modal Pattern
```typescript
const [isOpen, setIsOpen] = useState(false)

return (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger asChild>
      <Button>Open Modal</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Modal Title</DialogTitle>
      </DialogHeader>
      <p>Modal content here</p>
      <Button onClick={() => setIsOpen(false)}>Close</Button>
    </DialogContent>
  </Dialog>
)
```

### Loading State
```typescript
const [loading, setLoading] = useState(false)

if (loading) {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  )
}
```

### Error Boundary
```typescript
const [error, setError] = useState<string | null>(null)

if (error) {
  return (
    <div className="text-center p-4">
      <p className="text-red-500 mb-4">{error}</p>
      <Button onClick={() => setError(null)}>Try Again</Button>
    </div>
  )
}
```

## Animation Patterns

### Fade In
```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### Slide Up
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Scale Animation
```typescript
<motion.div
  initial={{ scale: 0.8 }}
  animate={{ scale: 1 }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  Content
</motion.div>
```

### Stagger Children
```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ staggerChildren: 0.1 }}
>
  {items.map((item, index) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## Styling Patterns

### Conditional Classes
```typescript
const buttonClass = cn(
  'px-4 py-2 rounded-md font-medium transition-colors',
  {
    'bg-blue-500 text-white': variant === 'primary',
    'bg-gray-200 text-gray-800': variant === 'secondary',
    'opacity-50 cursor-not-allowed': disabled,
  },
  className
)
```

### Theme-Aware Styling
```typescript
const { isDarkMode } = useTheme()

const containerClass = cn(
  'p-4 rounded-lg border',
  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
)
```

### Responsive Classes
```typescript
const gridClass = cn(
  'grid gap-4',
  'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
)
```

## State Management Patterns

### Zustand Store
```typescript
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface StoreState {
  items: any[]
  loading: boolean
  addItem: (item: any) => void
  removeItem: (id: string) => void
  setLoading: (loading: boolean) => void
}

export const useStore = create<StoreState>()(
  devtools((set) => ({
    items: [],
    loading: false,
    
    addItem: (item) => set((state) => ({
      items: [...state.items, item]
    })),
    
    removeItem: (id) => set((state) => ({
      items: state.items.filter(item => item.id !== id)
    })),
    
    setLoading: (loading) => set({ loading })
  }), {
    name: 'store-name'
  })
)
```

### Store Selectors
```typescript
// Specific selectors for performance
export const useStoreItems = () => useStore((state) => state.items)
export const useStoreLoading = () => useStore((state) => state.loading)
```

## Chat Streaming Pattern
```typescript
const { message, isStreaming, error, start, stop } = useChatStream()

const handleSend = (prompt: string) => {
  start(prompt)
}

return (
  <div className="space-y-4">
    <div className="min-h-[200px] p-4 border rounded-lg">
      {message || 'No message yet...'}
    </div>
    
    <div className="flex gap-2">
      <Input
        placeholder="Type your message..."
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSend(e.currentTarget.value)
            e.currentTarget.value = ''
          }
        }}
        disabled={isStreaming}
      />
      <Button onClick={stop} disabled={!isStreaming}>
        Stop
      </Button>
    </div>
    
    {error && (
      <p className="text-red-500 text-sm">Error: {error.message}</p>
    )}
  </div>
)
```

## Custom Hook Pattern
```typescript
import { useState, useEffect } from 'react'

export function useCustomHook(dependency: any) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const result = await someAsyncOperation(dependency)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (dependency) {
      fetchData()
    }
  }, [dependency])

  return { data, loading, error }
}
```

## Environment Variables
```typescript
// Access environment variables
const apiUrl = process.env.NEXT_PUBLIC_ADDR
const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'
```

## Route Navigation
```typescript
import { useRouter } from 'next/navigation'

const router = useRouter()

// Navigate programmatically
router.push('/dashboard')
router.replace('/login')
router.back()
```

## TypeScript Patterns

### Component Props
```typescript
interface ComponentProps {
  title: string
  optional?: boolean
  onAction?: (data: any) => void
  children?: React.ReactNode
  className?: string
}

export function Component({ 
  title, 
  optional = false, 
  onAction, 
  children,
  className 
}: ComponentProps) {
  // Component implementation
}
```

### Event Handlers
```typescript
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  // Handle click
}

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  // Handle input change
}

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  // Handle form submission
}
```

### API Response Types
```typescript
interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

interface User {
  id: string
  email: string
  nickname: string
}

// Usage
const response: ApiResponse<User> = await api.getUser()
```

## Testing Snippets

### Component Test
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { Component } from './Component'

test('renders and handles interaction', () => {
  const mockHandler = jest.fn()
  
  render(<Component onAction={mockHandler} />)
  
  const button = screen.getByRole('button')
  fireEvent.click(button)
  
  expect(mockHandler).toHaveBeenCalledTimes(1)
})
```

### Hook Test
```typescript
import { renderHook, act } from '@testing-library/react'
import { useCustomHook } from './useCustomHook'

test('hook returns expected values', () => {
  const { result } = renderHook(() => useCustomHook('test'))
  
  expect(result.current.loading).toBe(false)
  expect(result.current.data).toBe(null)
})
```

This quick reference covers the most commonly used patterns and snippets in the CHAM application. Keep this handy for quick copy-paste during development!