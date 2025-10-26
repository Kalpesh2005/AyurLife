# AyurLife - Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Component Structure](#component-structure)
3. [State Management](#state-management)
4. [Routing](#routing)
5. [Authentication](#authentication)
6. [Prakriti Calculation](#prakriti-calculation)
7. [Styling System](#styling-system)
8. [API Integration](#api-integration)
9. [Performance Optimization](#performance-optimization)
10. [Security Considerations](#security-considerations)

---

## Architecture Overview

AyurLife is built using a modern React architecture with the following key principles:

### Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: shadcn/ui built on Radix UI primitives
- **Styling**: Tailwind CSS for utility-first styling
- **Routing**: React Router v6 for client-side navigation
- **Form Management**: React Hook Form with Zod validation
- **State Management**: React Context API and local state

### Application Flow

```
User Access → Landing Page → Authentication → Questionnaire → Results → Dashboard
                                    ↓
                              Admin Panel (for admins)
```

---

## Component Structure

### Component Hierarchy

```
App
├── Navbar (persistent)
├── Routes
│   ├── Landing
│   ├── Login
│   ├── Register
│   ├── Questionnaire
│   │   ├── QuestionCard
│   │   ├── ProgressBar
│   │   └── NavigationButtons
│   ├── Results
│   │   ├── DoshaChart
│   │   ├── RecommendationCard
│   │   └── ShareButton
│   ├── Dashboard
│   │   ├── ProfileCard
│   │   ├── HistoryList
│   │   └── RecommendationPanel
│   └── Admin
│       ├── UserTable
│       ├── AnalyticsChart
│       └── StatisticsCard
└── Toast (global notifications)
```

### Component Guidelines

#### Functional Components

All components use functional components with hooks:

```typescript
import React from 'react';

interface ComponentProps {
  title: string;
  onAction: () => void;
}

export const Component: React.FC<ComponentProps> = ({ title, onAction }) => {
  // Component logic
  return <div>{title}</div>;
};
```

#### Custom Hooks

Custom hooks are stored in `src/hooks/`:

```typescript
// use-toast.ts
export const useToast = () => {
  // Toast logic
  return { toast };
};

// use-mobile.tsx
export const useMobile = () => {
  // Mobile detection logic
  return isMobile;
};
```

---

## State Management

### Local State

Component-level state using `useState`:

```typescript
const [answers, setAnswers] = useState<Record<string, number>>({});
```

### Context API

For global state (authentication, user data):

```typescript
// AuthContext example
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Local Storage

Persistent data storage:

```typescript
// Store user data
localStorage.setItem('user', JSON.stringify(userData));

// Retrieve user data
const user = JSON.parse(localStorage.getItem('user') || 'null');
```

---

## Routing

### Route Configuration

Routes are defined in `App.tsx`:

```typescript
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/questionnaire" element={<ProtectedRoute><Questionnaire /></ProtectedRoute>} />
    <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

### Protected Routes

Routes that require authentication:

```typescript
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = checkAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};
```

---

## Authentication

### Authentication Flow

1. User registers/logs in
2. Credentials validated
3. User data stored in localStorage
4. User redirected to dashboard
5. Protected routes check authentication status

### Implementation

```typescript
// lib/auth.ts
export const login = (email: string, password: string): User | null => {
  // Validate credentials
  // Store user data
  // Return user object
};

export const logout = (): void => {
  localStorage.removeItem('user');
  // Clear other user data
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('user');
};
```

---

## Prakriti Calculation

### Algorithm Overview

The Prakriti calculation analyzes user responses to determine their dosha composition.

### Calculation Logic

```typescript
// lib/prakriti.ts
export interface DoshaScores {
  vata: number;
  pitta: number;
  kapha: number;
}

export const calculatePrakriti = (answers: Record<string, number>): DoshaScores => {
  const scores = { vata: 0, pitta: 0, kapha: 0 };
  
  // Each question contributes to one or more doshas
  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      // Add weighted scores based on answer
      scores.vata += question.vataWeight * answer;
      scores.pitta += question.pittaWeight * answer;
      scores.kapha += question.kaphaWeight * answer;
    }
  });
  
  // Normalize scores to percentages
  const total = scores.vata + scores.pitta + scores.kapha;
  return {
    vata: (scores.vata / total) * 100,
    pitta: (scores.pitta / total) * 100,
    kapha: (scores.kapha / total) * 100,
  };
};
```

### Question Structure

```typescript
interface Question {
  id: string;
  text: string;
  category: 'physical' | 'mental' | 'behavioral';
  vataWeight: number;
  pittaWeight: number;
  kaphaWeight: number;
}
```

---

## Styling System

### Tailwind CSS

Utility-first CSS framework configuration:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: '#10b981',
        secondary: '#3b82f6',
        // Custom color palette
      },
    },
  },
};
```

### Component Styling

```typescript
// Using Tailwind classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
</div>
```

### shadcn/ui Components

Pre-built, customizable components:

```typescript
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

<Button variant="default" size="lg">
  Click Me
</Button>
```

---

## API Integration

### Future Backend Integration

The application is designed to integrate with a REST API:

```typescript
// Example API service
class ApiService {
  private baseUrl = process.env.VITE_API_URL;
  
  async register(userData: RegisterData) {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  }
  
  async submitAssessment(answers: Answers) {
    const response = await fetch(`${this.baseUrl}/assessment/submit`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(answers),
    });
    return response.json();
  }
}
```

---

## Performance Optimization

### Code Splitting

```typescript
// Lazy loading routes
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Admin = lazy(() => import('./pages/Admin'));

<Suspense fallback={<LoadingSpinner />}>
  <Dashboard />
</Suspense>
```

### Memoization

```typescript
// Memoize expensive calculations
const doshaResults = useMemo(() => {
  return calculatePrakriti(answers);
}, [answers]);

// Memoize callbacks
const handleSubmit = useCallback(() => {
  // Submit logic
}, [dependencies]);
```

### Image Optimization

- Use WebP format for images
- Implement lazy loading for images
- Use appropriate image sizes

---

## Security Considerations

### Input Validation

```typescript
// Using Zod for validation
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```

### XSS Prevention

- Sanitize user inputs
- Use React's built-in XSS protection
- Avoid dangerouslySetInnerHTML

### Authentication Security

- Store tokens securely
- Implement token expiration
- Use HTTPS in production
- Implement CSRF protection

### Data Privacy

- Encrypt sensitive data
- Follow GDPR guidelines
- Implement proper consent mechanisms
- Secure API endpoints

---

## Development Best Practices

### Code Quality

- Use TypeScript for type safety
- Follow ESLint rules
- Write meaningful comments
- Keep functions small and focused

### Testing

```typescript
// Example test structure
describe('Prakriti Calculation', () => {
  it('should calculate correct dosha percentages', () => {
    const answers = { /* test data */ };
    const result = calculatePrakriti(answers);
    expect(result.vata + result.pitta + result.kapha).toBe(100);
  });
});
```

### Git Workflow

1. Create feature branch
2. Make changes
3. Write tests
4. Commit with conventional commits
5. Create pull request
6. Code review
7. Merge to main

---

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Build successful
- [ ] All tests passing
- [ ] Performance optimized
- [ ] Security audit completed
- [ ] Documentation updated
- [ ] Analytics configured
- [ ] Error tracking setup
- [ ] Backup strategy in place

---

## Troubleshooting Guide

### Common Development Issues

1. **Port conflicts**: Change port in `vite.config.ts`
2. **Module resolution**: Check `tsconfig.json` paths
3. **Build errors**: Clear `node_modules` and reinstall
4. **Type errors**: Update type definitions

### Production Issues

1. **Routing issues**: Configure server for SPA
2. **Environment variables**: Ensure all vars are set
3. **Performance**: Enable gzip compression
4. **CORS**: Configure CORS headers

---

For more information, refer to the [README.md](README.md) and [CONTRIBUTING.md](CONTRIBUTING.md) files.
