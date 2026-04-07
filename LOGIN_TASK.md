# 🧩 Login Modal Feature Implementation

## 📌 Table of Contents

1. [Task Overview](#task-overview)  
2. [Important Points About the Task](#important-points-about-the-task)  
   2.1 [Placement of Login Modal](#placement-of-login-modal)  
   2.2 [Why Use Cookies Instead of LocalStorage](#why-use-cookies-instead-of-localstorage)  
   2.3 [Using a Single Composable](#using-a-single-composable)  
   2.4 [Why Not Use Pinia (Nuxt State Management)](#why-not-use-pinia-nuxt-state-management)  
   2.5 [Password Validation](#password-validation)  
3. [Future Security Enhancements](#future-security-enhancements)


---

## Task Overview

The goal was to implement a reusable and secure Login Modal that can be accessed across the entire application while ensuring proper state management and server-side rendering support.

### Login Modal Architecture

- **LoginModal (Vue)**  
  ↓
- **POST /api/auth/login (Nuxt server route)**  
  ↓
- **Validate static credentials**  
  ↓
- **Return user data**  
  ↓
- **Store in cookie (persist across reloads)**  
  - Remains valid even when the tab is closed or reopened, until the expiry date


## Important Points About the Task

### Placement of Login Modal

- The modal was added inside the `app` folder instead of the layout.  
- This ensures that when a new page is added, the modal is automatically available on that page.  
- If it were placed in `layout/default`, it would only be available on pages using that layout.  
- Pages not using that layout would not have the modal by default.


## Why Use Cookies Instead of LocalStorage

### Issues with LocalStorage

Using localStorage had some limitations:

- No built-in expiration date.  
- Flash issue on page reload:  
  - After login, if the page is refreshed, the "Login" button appears briefly before switching to "Logout".  
  - This happens because server-side rendering initializes `user = null` (no localStorage on the server).  
  - The client then updates the state, causing a visible flash. 

### Why Cookies Were Used

Using cookies solves this issue:

- Cookies are sent with every request, allowing the server to read the auth state and render the correct navbar immediately no flash.  
- Nuxt's `useCookie` composable works on both server and client, so `useState` initializes from the cookie on the first SSR render:  
  * Reads the cookie during SSR and sets the real user on the first render.  
  * Server sends HTML with the correct navbar state (Login or Logout + name).  
  * Client hydrates against identical HTML no mismatch, no flash.  
  * Cookie persists for 30 days and survives tab close/reopen.  


## Using a Single Composable

- The login logic was moved into a single composable and injected into all nested components.  
- This allows reusability and consistent behavior across the application.  
- No prop drilling: modal state flows through shared `useState`, not through parent-to-child props across multiple layout levels.  
- Single modal instance: one `LoginModal` mounted at the layout level, triggered from anywhere in the app.  
- Separation of concerns:  
  - `useLoginModal` owns visibility  
  - `useAuth` owns credentials and session  
  - `LoginModal` owns the form UI  
- Context-aware: the article title is passed into the modal to show a relevant message (`auth.contextMessage`) when login is triggered from the article page.


## Why Not Use Pinia (Nuxt State Management)

| Current Approach | Pinia |
|-----------------|-------|
| Auth state: `useState + cookie` | Overkill for a single user object |
| Modal open/close: `provide/inject` | Overkill for a single boolean |
| Article title sharing: `useState` (fragile) | Slightly cleaner, but still global state |

Pinia would have been overkill for this simple use case.


## Password Validation

Validation rules were implemented for weak or strong passwords according to security requirements.


## Future Security Enhancements

- Use JWT stored in httpOnly cookies to prevent XSS attacks.  
- Add refresh tokens to maintain sessions securely.  
- Implement server-side middleware protection to secure routes.  
- Verify authentication tokens on every server request for added security. 
