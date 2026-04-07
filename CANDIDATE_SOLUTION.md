# 🧩 Technical Case Study – Solution Document

## 📌 Table of Contents

1. API Key Exposure & Pagination Calls
2. Pagination State Persistence
3. CSS Duplication & Theme Optimization 
4. Internationalization (i18n)
5. Back Navigation Issue
6. Error Handling Improvements
7. Environment Configuration
8. Image Optimization
9. Build Tool Optimization
10. Nuxt Built-in Features Review
11. Folder Structure Improvements
12. Future Improvements (Additional Recommendations for Production)
13. Conclusion



## 1. API Key Exposure & Pagination Calls

### Issue Description

The issue was that on the initial load, the API call was being executed on the server side (SSR). However, when the user interacted with pagination, the API request was triggered from the client side instead of the server.

There were multiple reasons behind this behavior:

1. In the configuration file, the API key was defined under the public runtime config:

   ```js
   public: {
     newsApiKey: '',
   }
   ```

   Since it was public, it became accessible on the client side.

2. The UI was directly calling the external API, which caused the request to be executed from the browser during client-side interactions.



### Problem Flow

**Before:**

```
Browser → NewsData API (API key exposed)
```

* Initial Load → Server-Side Rendering (SSR)
* Pagination → Client-side request (API exposed in browser)



### Why This Is a Problem

SSR alone is not sufficient to secure APIs because:

* After hydration, the client takes control of the application.
* Any API call made from the browser exposes sensitive data such as API keys.


### Correct Approach (Recommended Flow)

```
Client → /api/news → Server → NewsData API
```


### Why This Approach Is Better

* API keys remain hidden on the server
* Centralized API handling
* Better control over requests and responses
* Improved security



### Solution Implemented

The API calls were moved to Nuxt server routes:

**Best Practice:**

* Use Nuxt server APIs (`/server/api`) to handle external API communication.



### Final Flow

**After:**

```
Browser → /api/news → Server → NewsData API
```


Here is your **professional English version of Point 2**, refined and structured for documentation:

---

## Issue 2: Pagination State Not Persisting

The pagination value was being stored in memory (runtime state), which caused it to reset on page refresh. This happens because in-memory state is lost whenever the application reloads.


### Problem

* Pagination state was not persistent
* On refresh → state resets → user loses current page
* Poor user experience


### Possible Solutions Considered

#### Option 1 — Store Value in URL (Query Parameters)

Store the pagination value in the URL as query parameters.

**Pros:**

* Persists on refresh
* Shareable (users can share the exact page state)
* SEO-friendly
* SSR-safe

**Cons:**

* URL may look slightly cluttered


### Option 2 — Use Browser Storage (localStorage / sessionStorage)

Store pagination value in browser storage.

**Pros:**

* Hidden from URL
* Persists on refresh

**Cons:**

* Not SSR-friendly
* Not shareable
* Can cause hydration mismatch issues


### Option 3 — Use State Management (Pinia with Persistence)

Store pagination state in a global store (e.g., Pinia) with persistence enabled.

**Pros:**

* Clean and centralized state management

**Cons:**

* Same limitations as localStorage (relies on client-side storage)
* Not SSR-safe by default
* Not shareable



## Final Decision

**Option 1 (URL Query Parameters) was selected** because it provides:

* Persistence across refresh
* Better compatibility with SSR
* Shareable state via URL
* Improved SEO behavior

---


## Issue 3: Repeated CSS and Lack of Centralized Theme Management

CSS styles were being repeated across multiple pages, and there was no centralized system for managing themes such as colors, font families, and font sizes.


### Problem

* Duplicate CSS across pages
* No single source of truth for theme variables (colors, typography, spacing, etc.)
* Difficult to maintain and scale styling
* No easy way to update theme (e.g., changing colors globally)


### Possible Approaches Considered

One approach was to use a CSS framework or a Nuxt UI library.

**Benefits:**

* No need to maintain custom design documentation
* Strong community support
* Ready-to-use components and styles
* Lightweight and optimized in many cases


### Solution Implemented

Instead of introducing a third-party library, a custom styling system was implemented using **SCSS variables and mixins**.

#### 1. SCSS Variables

* All theme-related values (colors, font sizes, font families, etc.) were moved into a centralized variables file.
* This allows easy updates (e.g., changing the primary color in one place updates the entire application).
* Improves readability and maintainability.

#### 2. SCSS Mixins

* Mixins were created for commonly repeated styles.
* This avoids rewriting the same CSS multiple times.
* Improves reusability and consistency.

#### 3. Utility / Reusable Classes

* For frequently used styles, reusable CSS classes were created.
* This reduces duplication and speeds up development.


### Benefits of This Approach

* Eliminates duplicated styles
* Centralized theme management
* Easier maintenance and scalability
* Enables quick theme updates (e.g., one-click color changes)
* Cleaner and more structured styling system

---

## Issue 4: No Localization Support and Scattered Static Content

The application was only available in the English locale, and all static content was hardcoded separately within individual files. There was no centralized localization system or JSON-based translation structure.


### Problem

* Application supported only one language (English)
* Static content duplicated across multiple files
* No centralized source for managing translations
* Difficult to scale for multiple regions or languages
* High maintenance effort when updating content


### Possible Approaches Considered

One simple approach was to create a centralized JSON file and move all static content into it.

**Pros:**

* Easy to implement
* Centralized content management

**Cons:**

* Lacks advanced features like language detection and SSR support
* Not scalable for multi-language applications


### Solution Implemented

The **Nuxt i18n** module was integrated into the application.


### Why This Approach Was Chosen

Even though the current application is small and does not use a CMS, using Nuxt i18n provides several built-in advantages:

* Automatic locale detection
* Built-in support for both client-side and server-side rendering (SSR)
* Efficient caching mechanisms
* Structured and scalable translation management


### Benefits of This Approach

* Centralized translation files (e.g., JSON-based locales)
* Cleaner and more maintainable codebase
* Easy to add new languages in the future
* No need to update content across multiple components
* Faster and more efficient localization process


### Future Scalability

If the application is launched in other countries or regions:

* New languages can be added easily
* Changes can be managed from a single location (translation files)
* No need to modify individual components

---

## Issue 5: Back Button Navigation Issue

On the detail page, when the user clicked the back button, it was redirecting to the home page instead of navigating back to the previous page in the browser history.


### Problem

* Back button was not respecting user navigation history
* Poor user experience
* Unexpected redirection to the home page


### Solution Implemented

This issue was resolved by using the Nuxt router for navigation control.

* The link was replaced with a button
* The Nuxt router (`router.back()` / `navigateTo(-1)`) was used to navigate to the previous page in the browser history


### Result

* Users are now correctly redirected to the page they came from
* Navigation behavior is consistent with user expectations
* Improved overall user experience

---


## Issue 6: Error Handling

The application did not have proper error handling. There was no custom error page or error boundary implemented, which could lead to inconsistent UI and poor user experience when errors occurred.


### Problem

* No centralized error handling
* Errors were not gracefully displayed
* Lack of UI consistency across the application
* Repeated error handling logic across multiple components


### Solution Implemented

A **custom error page** and a **reusable error component** were created.

* For global errors that affect the entire application, the custom error page is displayed.
* For component-level errors, the error component handles the error locally, displaying the message only where the error occurs.
* The component is reusable: instead of rewriting error handling in each component, developers can simply pass an error message to the component.


### Benefits

* Centralized and consistent error handling
* Reusable error component reduces duplication
* Maintains UI consistency across the app
* Simplifies future error handling implementation


---

## Issue 7: Hardcoded API Base Path

The API base path was hardcoded in the application, which made it difficult to switch between environments (development, staging, production) and increased the risk of exposing sensitive endpoints.


### Problem

* Hardcoded API URLs reduce flexibility
* Environment-specific changes require code modification
* Higher chance of errors when deploying to different environments
* Difficult to maintain and scale



### Solution Implemented

The API base path was moved into an **environment variable** (`.env` file):

```env
NEWS_API_BASE_URL=https://example.com/api
```

* The application now reads the API base path dynamically from the environment.
* This approach allows easy switching between environments without changing the code.
* Keeps sensitive API information out of the codebase.


### Benefits

* Environment flexibility (dev/staging/production)
* Easier maintenance and deployment
* Reduced risk of exposing sensitive endpoints
* Centralized configuration management



---

## Issue 8: Image Optimization

The application previously did not have an optimized approach for handling images, which could affect performance and loading times.


### Problem

* Images were not optimized for different screen sizes
* Manual handling of responsive images and lazy loading
* Inconsistent image performance across pages
* Extra effort required for optimization


### Solution Implemented

**Nuxt Image** was integrated into the application.

This provides several built-in features:

* Uses a built-in provider to optimize both local and remote images
* Converts `src` to provider-optimized URLs automatically
* Automatically resizes images based on provided width and height
* Generates responsive sizes when using the `sizes` option
* Supports native lazy loading and other `<img>` attributes


### Benefits

* Optimized image loading improves performance and page speed
* Responsive images adapt to different devices automatically
* Lazy loading reduces initial page load
* Less manual work for developers and consistent behavior across the app

---


## Improvement 9: Nuxt Built-in Features Review

The project was using **npm scripts** for running the development server, which resulted in slower Hot Module Replacement (HMR) and overall build performance.


### Problem

* Slower HMR during development
* Reduced developer productivity
* Less efficient builds compared to modern tooling


### Solution Implemented

Switched from **npm** to **Vite** (or optionally Bun) as the development server and bundler.

**Benefits:**

* Faster Hot Module Replacement (HMR)
* Improved build and reload speeds
* Better developer experience and productivity
* Modern tooling optimized for performance

---


## Folder Structure Improvements
#### Organize the project into:


- Keep **feature-specific components inside feature folders**
- Place **reusable UI components in `common/`**
- Keep business logic inside **composables**
- Keep API-related logic inside **server/api**
- Use consistent naming conventions

### Future Improvements

- Introduce **domain-driven structure** for larger applications  
- Add **testing folders** per feature  
- Separate **UI and business logic layers more clearly** 

---

## Additional Recommendations for Production

While the above points improve development, performance, and maintainability, the following can further enhance the application for production readiness:


#### 1. Sentry Integration

* **Purpose:** Error monitoring and reporting for production applications.
* **Benefits:**

  * Detect and track runtime errors in real time
  * Provides detailed error stack traces and context
  * Helps developers quickly identify and fix issues
  * Supports both client-side and server-side error tracking


#### 2. Analytics Integration

* **Purpose:** Monitor and analyze user traffic and behavior.
* **Benefits:**

  * Track page views, user interactions, and conversion metrics
  * Identify popular features and pages
  * Make data-driven decisions to improve UX and performance
  * Useful for scaling and future product decisions

---
