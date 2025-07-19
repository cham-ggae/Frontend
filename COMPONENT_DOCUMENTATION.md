# Component Documentation

This document provides detailed documentation for all React components in the CHAM application.

## Table of Contents

1. [UI Components](#ui-components)
2. [Feature Components](#feature-components)
3. [Layout Components](#layout-components)
4. [Animation Components](#animation-components)

## UI Components

### `Button`

A versatile button component with multiple variants and sizes.

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

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="outline">Outline Button</Button>
<Button variant="destructive">Delete</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>

// As child component
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

**Variants:**
- `default`: Primary button with solid background
- `destructive`: Red button for dangerous actions
- `outline`: Button with border and transparent background
- `secondary`: Secondary button with muted colors
- `ghost`: Transparent button with hover effects
- `link`: Text-only button styled as a link

---

### `Card`

Container component for grouping related content.

**Usage:**
```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

### `Dialog`

Modal dialog component for overlays and popups.

**Usage:**
```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <p>Dialog content here</p>
  </DialogContent>
</Dialog>
```

---

### `Input`

Form input component with consistent styling.

**Usage:**
```tsx
import { Input } from '@/components/ui/input'

<Input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

---

### `Label`

Form label component that works with form inputs.

**Usage:**
```tsx
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
</div>
```

## Feature Components

### `ThemeToggle`

Component for switching between light and dark themes.

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

// Basic usage
<ThemeToggle />

// Customized
<ThemeToggle variant="ghost" size="sm" className="ml-4" />
```

**Features:**
- Automatically shows sun/moon icon based on current theme
- Smooth theme transition
- Persists theme preference in localStorage

---

### `PlantDisplay`

Interactive plant visualization component that shows growth progress.

**Props:**
```typescript
interface PlantDisplayProps {
  showDetails?: boolean
}
```

**Usage:**
```tsx
import { PlantDisplay } from '@/components/plant-display'

// Full display with details
<PlantDisplay showDetails={true} />

// Minimal display
<PlantDisplay showDetails={false} />
```

**Features:**
- Animated plant growth transitions
- Progress bar with percentage
- Growth sparkle effects
- Nutrient effect indicators
- Support for different plant types (flower/tree)
- Level-based progression system

**Plant Stages:**
- **Level 1**: 새싹 (Seedling)
- **Level 2**: 줄기 (Stem)
- **Level 3**: 잎사귀/가지 (Leaves/Branches)
- **Level 4**: 꽃봉오리/작은 나무 (Bud/Small Tree)
- **Level 5**: 꽃/나무 (Flower/Tree)

---

### `FamilyWatering`

Component for family members to water plants together.

**Usage:**
```tsx
import { FamilyWatering } from '@/components/family-watering'

<FamilyWatering />
```

**Features:**
- Shows family member avatars
- Interactive watering animation
- Real-time progress updates
- Collaborative plant care

---

### `DailyMissions`

Component displaying daily tasks and missions.

**Usage:**
```tsx
import { DailyMissions } from '@/components/daily-missions'

<DailyMissions />
```

**Features:**
- Daily task list
- Progress tracking
- Reward system integration
- Task completion animations

---

### `QuizModal`

Interactive quiz component for plant-related questions.

**Usage:**
```tsx
import { QuizModal } from '@/components/quiz-modal'

<QuizModal
  isOpen={isQuizOpen}
  onClose={() => setIsQuizOpen(false)}
  onComplete={(score) => handleQuizComplete(score)}
/>
```

**Features:**
- Multiple choice questions
- Score tracking
- Progress indicator
- Animated transitions

---

### `MessageCardDisplay`

Component for displaying message cards in a grid or list format.

**Usage:**
```tsx
import { MessageCardDisplay } from '@/components/message-card-display'

<MessageCardDisplay
  messages={messageList}
  onCardClick={(message) => handleCardClick(message)}
/>
```

**Features:**
- Responsive grid layout
- Card hover effects
- Click interactions
- Loading states

---

### `MessageCardDetail`

Detailed view component for individual message cards.

**Usage:**
```tsx
import { MessageCardDetail } from '@/components/message-card-detail'

<MessageCardDetail
  message={selectedMessage}
  onClose={() => setSelectedMessage(null)}
/>
```

**Features:**
- Full message content display
- User information
- Timestamp formatting
- Action buttons

---

### `MessageCardModal`

Modal component for creating or editing message cards.

**Usage:**
```tsx
import { MessageCardModal } from '@/components/message-card-modal'

<MessageCardModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSave={(messageData) => handleSave(messageData)}
  initialData={editingMessage}
/>
```

**Features:**
- Form validation
- Rich text editing
- Image upload support
- Draft saving

---

### `TypingAnimation`

Animated typing effect component for text display.

**Usage:**
```tsx
import { TypingAnimation } from '@/components/typing-animation'

<TypingAnimation
  text="Hello, welcome to CHAM!"
  speed={50}
  onComplete={() => console.log('Animation complete')}
/>
```

**Props:**
```typescript
interface TypingAnimationProps {
  text: string
  speed?: number        // Typing speed in milliseconds
  onComplete?: () => void
  className?: string
}
```

**Features:**
- Customizable typing speed
- Completion callback
- Cursor blinking effect
- Pause and resume functionality

## Layout Components

### `Sidebar`

Navigation sidebar component for the application.

**Usage:**
```tsx
import { Sidebar } from '@/components/sidebar'

<Sidebar />
```

**Features:**
- Collapsible navigation
- Active route highlighting
- User profile section
- Theme toggle integration

---

## Animation Components

### Motion Components

The application uses Framer Motion for animations. Common patterns:

**Fade In Animation:**
```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content here
</motion.div>
```

**Growth Animation:**
```tsx
<motion.div
  initial={{ scale: 0.8 }}
  animate={{ scale: 1 }}
  whileHover={{ scale: 1.05 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  Scalable content
</motion.div>
```

**List Animation:**
```tsx
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

## Chat Components

### Chat Interface Components

Located in `src/components/chat/`:

**Usage patterns:**
```tsx
// Chat message component
<ChatMessage
  message={message}
  isOwn={message.userId === currentUser.id}
  timestamp={message.createdAt}
/>

// Chat input component
<ChatInput
  onSend={(message) => handleSendMessage(message)}
  placeholder="Type your message..."
  disabled={isLoading}
/>

// Chat container
<ChatContainer
  messages={messages}
  onLoadMore={() => loadMoreMessages()}
  hasMore={hasMoreMessages}
/>
```

## Login Components

### Authentication UI Components

Located in `src/components/login/`:

**Usage patterns:**
```tsx
// Login form
<LoginForm
  onSubmit={(credentials) => handleLogin(credentials)}
  loading={isLoading}
  error={loginError}
/>

// Social login buttons
<SocialLoginButtons
  onKakaoLogin={() => startKakaoLogin()}
  onGoogleLogin={() => startGoogleLogin()}
/>
```

## Provider Components

### Context Providers

Located in `src/components/providers/`:

**Usage:**
```tsx
// Query provider for React Query
<QueryProvider>
  <App />
</QueryProvider>

// Combined providers
<Providers>
  <ThemeProvider>
    <AuthProvider>
      <PlantProvider>
        <App />
      </PlantProvider>
    </AuthProvider>
  </ThemeProvider>
</Providers>
```

## Component Best Practices

### 1. Props Interface

Always define TypeScript interfaces for component props:

```typescript
interface ComponentProps {
  title: string
  optional?: boolean
  onAction: (data: any) => void
  children?: React.ReactNode
}

export function Component({ title, optional = false, onAction, children }: ComponentProps) {
  // Component implementation
}
```

### 2. Default Props

Use default parameters instead of defaultProps:

```typescript
interface Props {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary'
}

export function Component({ size = 'md', variant = 'primary' }: Props) {
  // Implementation
}
```

### 3. Event Handlers

Use descriptive names for event handlers:

```typescript
const handleSubmit = (event: FormEvent) => {
  event.preventDefault()
  // Handle submission
}

const handleInputChange = (value: string) => {
  // Handle input change
}
```

### 4. Conditional Rendering

Use early returns for cleaner code:

```typescript
export function Component({ data }: Props) {
  if (!data) {
    return <LoadingSpinner />
  }

  if (data.error) {
    return <ErrorMessage error={data.error} />
  }

  return (
    <div>
      {/* Main content */}
    </div>
  )
}
```

### 5. CSS Classes

Use the `cn` utility for conditional classes:

```typescript
import { cn } from '@/lib/utils'

const className = cn(
  'base-class',
  {
    'active-class': isActive,
    'disabled-class': isDisabled,
  },
  additionalClasses
)
```

### 6. Animation Patterns

Consistent animation patterns using Framer Motion:

```typescript
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}
```

This documentation covers all the major components in the CHAM application. Each component is designed to be reusable, accessible, and follows consistent patterns for maintainability.