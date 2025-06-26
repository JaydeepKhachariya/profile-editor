# Mini Profile Editor

A modern profile management application built with Next.js 14 (App Router), demonstrating best practices for server/client components, form handling, and state management.

## 🚀 Features

- **Public Profile View**: Server-side rendered profile page (`/profile`)
- **Private Profile Editor**: Client-side form with validation (`/edit-profile`)
- **Form Validation**: Zod schema validation with React Hook Form
- **Modern UI**: shadcn/ui components with Tailwind CSS
- **Data Fetching**: React Query for efficient data management
- **Global State**: Zustand for toast notifications
- **TypeScript**: Full type safety throughout the application

## 🏗️ Architecture

### Server vs Client Components
- **Server Component**: `app/(public)/profile/page.tsx` - Renders profile data server-side
- **Client Component**: `app/(private)/edit-profile/page.tsx` - Interactive form with client-side validation

### Route Structure
```
app/
├── (public)/profile/page.tsx     # Public profile view
├── (private)/edit-profile/page.tsx # Profile editing form
├── api/profile/route.ts          # API endpoints (GET, PUT)
├── layout.tsx                    # Root layout with navigation
└── page.tsx                      # Home page (redirects to profile)
```

### Technology Stack
- **Next.js 14** - App Router with Server & Client Components
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **React Query** - Server state management
- **Zustand** - Client state management (toasts)
- **shadcn/ui** - Modern UI components
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

## 🛠️ Installation

1. **Clone and navigate to the project:**
   ```bash
   cd C:\Users\HP\Documents\GitHub\mini-profile-editor
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
mini-profile-editor/
├── app/                          # Next.js App Router
│   ├── (public)/profile/         # Public routes
│   ├── (private)/edit-profile/   # Private routes
│   ├── api/profile/             # API routes
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── query-provider.tsx       # React Query setup
│   └── toast-notification.tsx   # Custom toast component
├── lib/
│   ├── utils.ts                 # Utility functions
│   ├── validations.ts           # Zod schemas
│   └── store.ts                 # Zustand store
└── Configuration files...
```

## 🎯 Key Features Demonstrated

### 1. Server & Client Components
- **Profile View**: Server Component for SEO and performance
- **Edit Form**: Client Component for interactivity

### 2. Form Handling & Validation
```typescript
// Zod schema with validation rules
export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  bio: z.string().max(500, "Bio must not exceed 500 characters.").optional(),
  // ... more fields
})
```

### 3. API Route Handlers
```typescript
// GET /api/profile - Fetch profile data
// PUT /api/profile - Update profile data
```

### 4. State Management
- **React Query**: Server state (profile data)
- **Zustand**: Client state (toast notifications)

### 5. Modern UI/UX
- Responsive design with Tailwind CSS
- Loading states and error handling
- Success/error toast notifications
- Form validation with real-time feedback

## 🚦 Usage

1. **View Profile**: Navigate to `/profile` to see the public profile view
2. **Edit Profile**: Click "Edit Profile" or navigate to `/edit-profile`
3. **Update Information**: Fill out the form and click "Save Changes"
4. **Validation**: Form validates inputs in real-time
5. **Success Feedback**: Toast notification confirms successful updates

## 🔧 Development

### Adding New Fields
1. Update the Zod schema in `lib/validations.ts`
2. Add form fields in the edit component
3. Update the profile display component

### Customizing UI
- Modify shadcn/ui components in `components/ui/`
- Update Tailwind configuration in `tailwind.config.js`
- Customize global styles in `app/globals.css`

## 📋 Requirements Fulfilled

✅ **App Router Structure**: Uses Next.js 14 App Router with route groups  
✅ **Server Components**: Profile view rendered server-side  
✅ **Client Components**: Edit form with client-side interactivity  
✅ **shadcn/ui**: Modern UI components (Card, Input, Button, etc.)  
✅ **Form Validation**: React Hook Form + Zod schema validation  
✅ **Data Fetching**: React Query for GET/PUT operations  
✅ **API Routes**: RESTful endpoints with proper error handling  
✅ **Global State**: Zustand for toast notifications  
✅ **TypeScript**: Full type safety throughout  

## 📝 Notes

- Mock data is used for demonstration (stored in memory)
- In production, replace with a real database
- Authentication simulation (no real auth implemented)
- Responsive design works on all screen sizes
