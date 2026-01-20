---
name: react-patterns-2026
description: Modern React 19 and Next.js 15 best practices for 2026. Checks Server Components usage, React Compiler optimization, Actions pattern, modern hooks (use, useOptimistic, useActionState), proper directive placement, and 2026 web platform features. Use when reviewing React code for latest patterns, modernization, or framework-specific optimization.
---

# React 19 & Modern Web Patterns (2026)

## Review Process

Check code against current React 19 and 2026 web platform best practices.

---

## React 19 Compiler

### Automatic Memoization

**The React Compiler automatically memoizes components and values**—you no longer need manual optimization in most cases.

**Remove These (Unless Profiling Shows Specific Need):**
```jsx
// ❌ OLD - Manual memoization (React 18 pattern)
const MemoizedComponent = React.memo(ExpensiveComponent);

const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// ✅ NEW - Let compiler handle it (React 19)
const ExpensiveComponent = ({ data }) => {
  const value = computeExpensiveValue(data.a, data.b); // Auto-memoized
  const handleClick = () => doSomething(data.a, data.b); // Auto-memoized
  return <div>{value}</div>;
};
```

**When Manual Memo IS Still Needed:**
- Profiling shows specific performance bottleneck
- Comparing complex objects that compiler can't infer stability for
- Third-party libraries that haven't adopted compiler patterns

**Compiler Requirements:**
- Small, focused components (compiler works best on < 200 lines)
- Pure functions with no side effects in render
- Stable references for props when possible

---

## Server vs Client Components

### Server Components (Default in Next.js App Router)

**Server Components run on the server and don't ship JavaScript to the client.**

```jsx
// ✅ Server Component (no directive = server by default in App Router)
async function ProductList() {
  // Can directly access database, file system, env variables
  const products = await db.products.findMany();
  const apiKey = process.env.SECRET_API_KEY; // Safe on server
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**Server Component Benefits:**
- Direct database/API access
- Zero client JavaScript for static content
- Automatic code splitting
- Better SEO (HTML rendered on server)
- Secure (sensitive data/logic stays server-side)

**Server Component Limitations:**
- ❌ No useState, useEffect, or otheHooks
- ❌ No browser APIs (window, localStorage, etc.)
- ❌ No event handlers (onClick, onChange, etc.)
- ❌ No Context providers/consumers

### Client Components (Explicit)

**Client Components run in the browser and can use hooks, state, and events.**

```jsx
'use client'; // ✅ Explicit directive at top of file

import { useState } from 'react';

function InteractiveButton() {
  const [count, setCount] = useState(0); // ✅ Hooks work
  
  return (
    <button onClick={() => setCount(count + 1)}> {/* ✅ Events work */}
      Clicked {count} times
    </button>
  );
}
```

**When to Use 'use client':**
- Component uses React hooks (useState, useEffect, useContext, etc.)
- Needs event handlers (onClick, onSubmit, onChange, etc.)
- Uses browser APIs (window, document, localStorage, etc.)
- Needs to create Context providers
- Third-party libraries that require client-side rendering

**Best Practices:**
- Keep 'use client' boundary as low as possible in tree
- Extract only interactive parts into Client Components
- Pass server-fetched data as props to Client Components

**Boundary Example:**
```jsx
// ❌ BAD - Entire page is client just for one button
'use client';

async function ProductPage() {
  const [liked, setLiked] = useState(false);
  const product = await fetchProduct(); // CAN'T do async in client component!
  
  return (
    <div>
      <h1>{product.name}</h1>
      <button onClick={() => setLiked(!liked)}>
        {liked ? '❤️' : '🤍'}
      </button>
    </div>
  );
}

// ✅ GOOD - Server Component wraps Client Component
async function ProductPage() {
  const product = await fetchProduct(); // ✅ Server-side fetch
  
  return (
    <div>
      <h1>{product.name}</h1>
      <LikeButton productId={product.id} /> {/* ✅ Client only for interaction */}
    </div>
  );
}

// In separate file:
'use client';
function LikeButton({ productId }) {
  const [liked, setLiked] = useState(false);
  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? '❤️' : '🤍'}
    </button>
  );
}
```

---

## Actions Pattern

### Server Actions (Replaces Manual Form Handling)

**Actions simplify data mutations and automatically handle pending states.**

```jsx
// ✅ Server Action (in Server Component file or separate file with 'use server')
'use server';

async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  
  // Validate
  if (!title || !content) {
    return { error: 'Title and content required' };
  }
  
  // Mutate database
  const post = await db.post.create({
    data: { title, content, authorId: getServerSession().userId }
  });
  
  // Revalidate cache
  revalidatePath('/posts');
  
  // Redirect
  redirect(`/posts/${post.id}`);
}

// In component:
function CreatePostForm() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Title" />
      <textarea name="content" placeholder="Content" />
      <button type="submit">Create Post</button>
    </form>
  );
}
```

**Actions Automatically:**
- Handle pending states (no manual loading state management)
- Work with progressive enhancement (form works without JS)
- Integrate with Suspense boundaries
- Handle errors and re-throws to Error Boundaries

### useActionState Hook

**For client-side state from Server Actions:**

```jsx
'use client';

import { useActionState } from 'react';

function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, null);
  
  return (
    <form action={formAction}>
      <input name="email" type="email" />
      <textarea name="message" />
      
      {state?.error && <span className="error">{state.error}</span>}
      {state?.success && <span className="success">Message sent!</span>}
      
      <button type="submit" disabled={isPending}>
        {isPending ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

### useOptimistic Hook

**For optimistic UI updates:**

```jsx
'use client';

import { useOptimistic } from 'react';

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [... state, { ...newTodo, pending: true }]
  );
  
  async function addTodo(formData) {
    const text = formData.get('text');
    
    // Show optimistically
    addOptimisticTodo({ id: Date.now(), text });
    
    // Actually create
    await createTodo(text);
  }
  
  return (
    <div>
      <form action={addTodo}>
        <input name="text" />
        <button>Add</button>
      </form>
      <ul>
        {optimisticTodos.map(todo => (
          <li key={todo.id} style={{ opacity: todo.pending ? 0.5 : 1 }}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### useFormStatus Hook

**For form submission state in child components:**

```jsx
'use client';

import { useFormStatus } from 'react-dom';

function  SubmitButton() {
  const { pending, data, method } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

// Used in form:
function MyForm() {
  return (
    <form action={serverAction}>
      <input name="name" />
      <SubmitButton /> {/* Automatically knows form state */}
    </form>
  );
}
```

---

## Modern Hooks

### use() Hook

**Read Promises or Context without useEffect:**

```jsx
// ❌ OLD - Using useEffect for promises
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  if (!user) return <Loading />;
  return <div>{user.name}</div>;
}

// ✅ NEW - Using use() hook
import { use } from 'react';

function UserProfile({ userPromise }) {
  const user = use(userPromise); // Suspends until promise resolves
  return <div>{user.name}</div>;
}

// Wrap with Suspense:
function Page() {
  const userPromise = fetchUser(userId);
  
  return (
    <Suspense fallback={<Loading />}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}
```

**use() with Context:**
```jsx
import { use } from 'react';

function Component() {
  const theme = use(ThemeContext); // Alternative to useContext
  return <div className={theme}>Content</div>;
}
```

---

## Next.js 15 App Router Patterns

### Data Fetching

```jsx
// ✅ Server Component - fetch in component
async function PostPage({ params }) {
  const post = await db.post.findUnique({
    where: { id: params.id }
  });
  
  return <article>{post.content}</article>;
}

// ✅ Parallel data fetching
async function Dashboard() {
  const [user, posts, analytics] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchAnalytics()
  ]);
  
  return <DashboardLayout user={user} posts={posts} analytics={analytics} />;
}
```

### Streaming with Suspense

```jsx
async function Page() {
  return (
    <div>
      <Header /> {/* Renders immediately */}
      
      <Suspense fallback={<Skeleton />}>
        <SlowComponent /> {/* Streams in when ready */}
      </Suspense>
      
      <Suspense fallback={<Skeleton />}>
        <AnotherSlowComponent /> {/* Streams independently */}
      </Suspense>
    </div>
  );
}
```

### Metadata API

```jsx
// ✅ Static metadata
export const metadata = {
  title: 'My Page',
  description: 'Page description',
  openGraph: {
    title: 'My Page',
    description: 'Page description',
    images: ['/og-image.png'],
  },
};

// ✅ Dynamic metadata
export async function generateMetadata({ params }) {
  const product = await fetchProduct(params.id);
  
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  };
}
```

### Image Optimization

```jsx
import Image from 'next/image';

// ✅ Automatic optimization
<Image
  src="/product.jpg"
  alt="Product photo"
  width={800}
  height={600}
  priority={aboveFold} // LCP optimization
  placeholder="blur" // Better loading UX
  blurDataURL={lowResImage}
/>
```

---

## 2026 Web Platform Features

### View Transitions API

```jsx
'use client';

function NavigationLink({ href, children }) {
  const router = useRouter();
  
  const handleClick = (e) => {
    e.preventDefault();
    
    // ✅ Smooth page transitions
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        router.push(href);
      });
    } else {
      router.push(href);
    }
  };
  
  return <a href={href} onClick={handleClick}>{children}</a>;
}
```

**CSS for transitions:**
```css
/* Define transition behavior */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.3s;
}
```

### Popover API

```jsx
// ✅ Native popover (no JavaScript required for basic functionality)
function HelpTooltip() {
  return (
    <>
      <button popovertarget="help-popover">
        Help
      </button>
      <div popover id="help-popover">
        <p>This is helpful information</p>
      </div>
    </>
  );
}
```

**With JavaScript control:**
```jsx
'use client';

function ControlledPopover() {
  const popoverRef = useRef(null);
  
  return (
    <>
      <button onClick={() => popoverRef.current?.showPopover()}>
        Show
      </button>
      <div ref={popoverRef} popover>
        Content
      </div>
    </>
  );
}
```

### Container Queries

```css
/* ✅ Component responds to container size, not viewport */
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}

@container card (max-width: 399px) {
  .card {
    display: block;
  }
}
```

### CSS :has() Selector

```css
/* ✅ Parent selectors based on children */
.card:has(img) {
  display: grid;
}

.card:not(:has(img)) {
  display: block;
}

/* ✅ Form validation styling */
form:has(:invalid) .submit-btn {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### CSS Nesting

```css
/* ✅ Native CSS nesting (no preprocessor needed) */
.button {
  padding: 8px 16px;
  
  &:hover {
    background: blue;
  }
  
  &.primary {
    background: green;
  }
  
  & .icon {
    margin-right: 8px;
  }
}
```

---

## Performance Optimization

### Core Web Vitals 2026

**INP (Interaction to Next Paint) - Replaced FID in March 2024:**
- Target: < 200ms
- Measures all interactions, not just first
- Check: Long tasks, heavy JavaScript, slow event handlers

**LCP (Largest Contentful Paint):**
- Target: < 2.5s
- Optimize: Images (use Next.js Image), fonts (preload), above-fold content

**CLS (Cumulative Layout Shift):**
- Target: < 0.1
- Fix: Set image dimensions, reserve space for dynamic content, avoid layout shifts

### Modern Image Formats

```jsx
// ✅ AVIF (best compression, wide support in 2026)
<Image
  src="/photo.avif" // or let Next.js auto-convert
  alt="Photo"
  width={800}
  height={600}
  formats={['avif', 'webp', 'jpeg']} // Fallbacks
/>
```

### Resource Preloading

```jsx
// In app layout or head:
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
<link rel="preconnect" href="https://api.example.com" />
```

---

## Common Anti-Patterns to Flag

### ❌ Mixing Server and Client inappropriately

```jsx
// ❌ BAD - Can't use hooks in Server Component
async function ServerComponent() {
  const [state, setState] = useState(0); // ERROR!
  const data = await fetchData();
  return <div>{data}</div>;
}

// ❌ BAD - Can't await in Client Component
'use client';
async function ClientComponent() {
  const data = await fetchData(); // ERROR!
  return <div>{data}</div>;
}
```

### ❌ Over-using 'use client'

```jsx
// ❌ BAD - Entire page is client for one button
'use client';
function Page() {
  const [count, setCount] = useState(0);
  return (
    <main>
      <StaticContent /> {/* Unnecessarily shipped to client */}
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </main>
  );
}

// ✅ GOOD - Only interactive part is client
function Page() {
  return (
    <main>
      <StaticContent /> {/* Server rendered */}
      <Counter /> {/* Client component */}
    </main>
  );
}
```

### ❌ Manual data fetching in Client Components

```jsx
// ❌ OLD PATTERN - useEffect for data fetching
'use client';
function Component() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(setData);
  }, []);
  // ...
}

// ✅ NEW PATTERN - Server Component or use() hook
async function Component() {
  const data = await fetchData(); // Server Component
  // ...
}
```

---

## Output Format

**✅ Modern Patterns Used:**
- Highlight usage of React 19 features
- Note correct Server/Client boundary
- Recognize optimization opportunities taken

**⚠️  Outdated Patterns:**
- Flag manual memoization (suggest removing if no performance issue)
- Identify old data fetching patterns
- Note missing opportunities for Server Components

**🔴 Framework Violations:**
- Incorrect 'use client' / 'use server' usage
- Hooks in Server Components
- Async operations in Client Components

**📈 Optimization Opportunities:**
- Suggest Image component for images
- Recommend Server Components for static content
- Identify Actions pattern opportunities
- Note web platform features that could be adopted

---

## References

- <a href="https://react.dev/blog/2024/12/05/react-19" target="_blank" rel="noopener">React 19 Release Notes</a>
- <a href="https://nextjs.org/docs" target="_blank" rel="noopener">Next.js 15 Documentation</a>
- <a href="https://web.dev/articles/vitals" target="_blank" rel="noopener">Core Web Vitals</a>
