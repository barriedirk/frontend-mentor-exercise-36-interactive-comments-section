# Frontend Mentor - Interactive comments section

![Design preview for the Interactive comments section coding challenge](preview.jpg)

* [Github](https://github.com/barriedirk/frontend-mentor-exercise-36-interactive-comments-section)
* [URL Site](https://barriedirk.github.io/frontend-mentor-exercise-36-interactive-comments-section/#/)
* [Repository Frontend Mentor](https://www.frontendmentor.io/profile/barriedirk)

[Unit-Test and Integration using karma-jasmine](test-unit-test-integration-karma.png)
[Unit-Test and Integration using vitest](test-vitest.png)
[E22 using cypress](test-cypress.png)

## ✅ Testing Summary – *Interactive Comments Section*

This project includes a full testing suite to ensure functionality, user interaction, and UI consistency across all components. Tests were written using **Jasmine + Karma** and **Vitest** for unit/integration, and **Cypress** for end-to-end testing.

---

### 🧪 Unit Tests

Focused on validating individual components, services, pipes, and directives in isolation.

#### 🧱 Components
- **CommentCardState**
  - Initializes with default values
  - Supports state updates
  - Handles `isYourOwnComment` and `replyingTo` flags
- **Comments**
  - Instantiates properly
- **CommentContent**
  - Instantiates properly
- **CommentShortcut**
  - Emits `edit` event when Edit clicked
  - Emits `delete` event on modal confirmation
  - Emits `reply` event on Reply clicked
  - Conditionally renders buttons based on ownership
- **CommentHeader**
  - Instantiates properly
- **ModalDeleteCommentComponent**
  - Instantiates properly
- **App**
  - Creates the app instance
- **CommentUpvote**
  - Instantiates properly

#### ⏳ Pipe
- **TimeAgoPipe**
  - Formats time differences correctly (e.g., 3 days ago, 5 hours ago)
  - Returns empty string for invalid or null input

#### 🧰 Service
- **ModalDeleteCommentService**
  - Handles modal open/close behavior

#### ⚡ Directive
- **AutoFocusDirective**
  - Focuses input element after view initialization

---

### 🔗 Integration Tests

Validated how components interact in real usage scenarios and covered UI updates and interaction flows.

#### 💬 Commenting System
- **Comments Component**
  - Renders correct number of top-level comments
  - Displays new comment input box
  - Inserts reply input dynamically on "Reply" click
  - Threads replies correctly
  - Calls `replyComment` as expected

#### 🧑‍💻 CommentCard
- Renders content and action buttons
- Displays Delete/Edit buttons for user-owned comments
- Emits correct events on Edit, Delete, and Reply actions
- Updates comment via `updateContent`

#### 🧭 App Layout
- Renders `<main class="main_content">` from routed component

---

### 🧪 Test Suite Stats

- **Specs**: 40  
- **Failures**: 0  
- **Tools**: Jasmine + Karma  
- **Randomized seed**: 40249

---

### 🚀 End-to-End (E2E) Tests – Cypress

Used Cypress to validate full user flows in a browser environment.

#### 📋 Test Suite: `Comments Feature – Actions Flow`
- ✅ **Reply to Comment**  
  Shows reply input and successfully submits a reply.
- ✅ **Upvote / Downvote**  
  Increments and decrements score correctly for top-level comments.
- ✅ **Create Comment**  
  Adds a new top-level comment via the input box.
- ✅ **Delete Comment**  
  Deletes the penultimate comment after modal confirmation.
- ✅ **Edit Comment**  
  Edits the penultimate comment and saves the changes.

---

### ✅ E2E Suite Stats

- **Tests**: 5  
- **Failures**: 0  
- **Tool**: Cypress
