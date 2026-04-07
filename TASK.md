# Candidate Task

You are given a working Nuxt 4 news application. Your job is split into two parts: a new feature implementation and a code quality improvement pass.
Read both sections fully before you start.

---

## Part 1 — Login Modal Feature

### Overview

Clicking the **Login** button in the navbar must open a login modal.
The modal must be available on every page that currently exists and on any page that will be added to the project in the future.

### Requirements

**Modal behavior**
- The modal is triggered from the navbar Login button.
- It must be globally present across all pages — think carefully about where modal state lives and how it is shared.
- On the **news detail page only**, the modal must display a contextual message that includes the title of the article currently being viewed. Example:

  > Sign in to easily read more articles like "*{article title}*"

  On all other pages the modal should not include this message.

**Authentication**
- Add static credentials to the project so the server route can validate against them.
- When the user submits the login form, the Vue app must make an API call to a Nuxt server route you write (e.g. `POST /api/auth/login`). The server route checks the submitted credentials and returns success or an error.
- There is no server-side session. Once the server confirms the credentials are correct, the Vue app stores the user info on the client side. This state must survive a browser tab close and reopen. The user stays logged in until they explicitly log out.

**Navbar state**
- When logged out: show the Login button.
- When logged in: replace the Login button with the user's name and a Logout button.

---

## Part 2 — Code Quality Improvements

Review the existing codebase with an engineer's eye. Refactor anything that reduces readability, introduces a potential bug,
weakens type safety, hurts maintainability, or is missing for SEO. You are not limited to the examples below — treat this as a real codebase you are taking ownership of.

Direct implementation is preferred over a list, but if something would take disproportionate time to implement,
a written note explaining the issue and your proposed solution is acceptable.

---

## Notes

- You may use any tools you like, including AI assistants, to help you write the code.
- However, you must be able to explain every decision — what you changed, what you left as-is, and why — as if you wrote every line yourself.
- Keep Nuxt 4, TypeScript, SCSS, Composition API.
