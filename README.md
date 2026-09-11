# CampusFix
CampusFix is a simple web application that lets students report, search, and track common campus issues through an interactive dashboard.
# CampusFix
### A frontend campus issue-reporting portal

CampusFix is a beginner-friendly single-page web application that helps students report and discover common campus issues in one place.

Users can report common issues such as broken projectors, faulty fans, slow Wi-Fi, water leakage, cleanliness concerns, damaged furniture, and hostel maintenance problems. The interface immediately displays each new report and updates a live issue dashboard.

---

## Project Overview

CampusFix was created to practise core frontend development concepts through a realistic campus-based problem.

The project is intentionally built as a **frontend prototype** using HTML, CSS, and JavaScript. Instead of using a backend or database, issue data is kept in a JavaScript array while the page is open.

The main goal was to understand how user input can be converted into data, how that data can be displayed dynamically, and how the user interface can update when data changes.

### Main User Journey

```text
Student fills report form
          ↓
JavaScript creates an issue object
          ↓
Issue is added to the issues array
          ↓
Issue card appears on the page
          ↓
Dashboard counts and graph update
          ↓
Student can search or filter reported issues
```

---

## Problem Statement

Campus issues are often reported through informal messages, calls, or conversations. This makes it difficult to organise reports, identify issue categories, and quickly understand which problems are most common.

For example, a student may notice:

- A broken fan in a classroom
- A projector that does not turn on
- Slow Wi-Fi in the library
- A leaking tap in a hostel
- An unclean washroom
- A broken streetlight near a pathway

CampusFix provides a simple interface for recording these concerns in a structured way. It collects the issue title, category, location, description, and priority.

---

## Features

### Issue Reporting

- Students can enter an issue title.
- Students can choose an appropriate category.
- Students can enter the location where the issue occurred.
- Students can add a detailed description.
- Students can select Low, Medium, or High priority.
- Every new issue starts with the status `Pending`.

### Issue Discovery

- Search issues by title, category, or location.
- Filter issues by:
  - All Issues
  - Pending
  - In Progress
  - Resolved
- Display a helpful message when no matching issue is found.

### Dashboard

- Shows total number of issues.
- Shows count of Pending issues.
- Shows count of In Progress issues.
- Shows count of Resolved issues.
- Displays status distribution through dynamic horizontal bars.

### User Interface

- Clean card-based design.
- Responsive layout for mobile screens.
- Colour-coded priority badges:
  - High: red
  - Medium: orange
  - Low: green
- Input focus effects and button hover effects for improved usability.

---

## Project Structure

```text
CampusFix/
├── index.html
├── style.css
├── script.js
├── README.md
└── screenshots/
    ├── home-page.png
    ├── report-form.png
    └── dashboard.png
```

| File | Responsibility |
|---|---|
| `index.html` | Defines the page structure: form, dashboard, graph, filters, and issue-list container. |
| `style.css` | Controls colours, spacing, cards, responsive layout, priority badges, and graph design. |
| `script.js` | Stores issue data, handles form submission, searches/filtering, renders cards, and updates dashboard values. |

---

## Installation Instructions

This project does not need any package installation, server, or database.

1. Download or clone this repository.
2. Open the `CampusFix` folder.
3. Make sure these files are in the same folder:

```text
index.html
style.css
script.js
README.md
```

4. Double-click `index.html`.
5. The website opens in Google Chrome, Microsoft Edge, or another browser.
6. Fill in the issue-report form and click **Report Issue** to test the application.

---

## Dataset Used

No external dataset, API, or database is used in this project.

The application uses manually created sample issue data in `script.js`. This was appropriate for a frontend prototype because it allowed me to focus on JavaScript data handling and UI updates before introducing backend complexity.

The data is stored in an array named `issues`.

```javascript
const issues = [
  {
    title: "Broken Projector",
    category: "Classroom Equipment",
    location: "AB-2, Room 304",
    description: "The projector does not turn on.",
    priority: "High",
    status: "Pending"
  }
];
```

Each issue is represented as an object with six properties:

| Property | Purpose |
|---|---|
| `title` | Short name of the issue |
| `category` | Type of issue, such as Electrical or Wi-Fi |
| `location` | Campus location where the issue was found |
| `description` | More detailed explanation |
| `priority` | Low, Medium, or High |
| `status` | Pending, In Progress, or Resolved |

---

## Methodology

### 1. Building the HTML structure

`index.html` defines the webpage structure.

Important elements include:

- `form id="issue-form"`: identifies the report form.
- `div id="issues-list"`: the container where JavaScript displays issue cards.
- `input id="search-input"`: allows users to search issue data.
- `select id="status-filter"`: allows users to filter by status.
- Dashboard IDs such as `total-count` and `pending-count`: allow JavaScript to update displayed values.

### 2. Collecting form data

JavaScript selects the form using:

```javascript
const form = document.getElementById("issue-form");
```

When the student clicks **Report Issue**, JavaScript detects the submit event:

```javascript
form.addEventListener("submit", function (event) {
  event.preventDefault();
});
```

`event.preventDefault()` stops the browser from refreshing the webpage after form submission.

The entered form values are read using `.value`:

```javascript
const title = document.getElementById("title").value;
```

### 3. Creating and storing a new issue

When the form is submitted, the project creates a new JavaScript object:

```javascript
const newIssue = {
  title: document.getElementById("title").value,
  category: document.getElementById("category").value,
  location: document.getElementById("location").value,
  description: document.getElementById("description").value,
  priority: document.getElementById("priority").value,
  status: "Pending"
};
```

The object is added to the issue array:

```javascript
issues.push(newIssue);
```

This is why the application can display multiple reported issues while the webpage remains open.

### 4. Rendering issue cards

The `renderIssues()` function displays issue cards on the webpage.

First, it clears old cards:

```javascript
issuesList.innerHTML = "";
```

Then it loops through matching issues:

```javascript
filteredIssues.forEach(function (issue) {
  // Create one issue card
});
```

A template literal creates the HTML for every issue card:

```javascript
const issueCard = `
  <article>
    <h3>${issue.title}</h3>
  </article>
`;
```

`${issue.title}` inserts the actual title from the current issue object.

### 5. Search logic

The user’s search input is converted to lowercase:

```javascript
const searchText = searchInput.value.toLowerCase();
```

The application checks whether the search value is present in an issue title, category, or location:

```javascript
issue.title.toLowerCase().includes(searchText)
```

Using `toLowerCase()` makes search case-insensitive. Searching `library`, `Library`, or `LIBRARY` produces the same result.

### 6. Filter logic

The status filter uses this condition:

```javascript
selectedStatus === "All" || issue.status === selectedStatus;
```

This means:

- If the selected option is `All`, display every issue.
- Otherwise, display only issues whose status matches the selected status.

Search and filter conditions are combined using:

```javascript
return matchesStatus && matchesSearch;
```

This ensures that an issue must satisfy both conditions before it is displayed.

### 7. Dashboard calculations

The dashboard is updated by the `updateDashboard()` function.

The total number of issues is calculated using:

```javascript
const total = issues.length;
```

The Pending count is calculated using `filter()`:

```javascript
const pending = issues.filter(function (issue) {
  return issue.status === "Pending";
}).length;
```

The calculated number is displayed using:

```javascript
pendingCount.textContent = pending;
```

The same logic is used for In Progress and Resolved issues.

### 8. Graph calculation

Each graph bar is given a width based on its percentage of total issues:

```javascript
pendingBar.style.width = (pending / total) * 100 + "%";
```

For example:

```text
Total issues = 4
Pending issues = 2

(2 / 4) × 100 = 50%
```

Therefore, the Pending bar becomes 50% wide.

### 9. CSS design decisions

`style.css` is responsible for visual design.

| CSS Concept | How it is used |
|---|---|
| Flexbox | Stacks form fields and arranges navigation content. |
| CSS Grid | Creates the dashboard-card layout. |
| Media Query | Adjusts dashboard cards and navigation for smaller screens. |
| `:hover` | Changes button colour when the mouse moves over it. |
| `:focus` | Highlights an input field when a user clicks it. |
| `border-radius` | Creates rounded cards, fields, and buttons. |
| `box-shadow` | Gives cards visual depth. |

---

## Technologies Used

| Technology | Purpose in CampusFix |
|---|---|
| HTML5 | Page structure, form fields, dashboard, search input, and filters |
| CSS3 | Design, responsive layout, cards, buttons, graph bars, and badges |
| JavaScript | Form handling, data storage, dynamic rendering, filtering, search, and dashboard updates |
| GitHub | Version control and project hosting |

---

## Results

The completed project successfully demonstrates:

- A student can report an issue without reloading the page.
- New issues are added to a JavaScript array.
- New issue cards appear dynamically.
- Dashboard counts update after issue submission.
- The Pending graph bar updates after issue submission.
- Search works across title, category, and location.
- Status filtering works independently and together with search.
- Priority is displayed with meaningful colours.

### Functional Testing

| Test | Expected Result | Result |
|---|---|---|
| Submit a valid issue form | A new Pending issue card appears | Passed |
| Submit an empty required field | Browser prevents form submission | Passed |
| Search `library` | Wi-Fi Library issue appears | Passed |
| Select `Pending` filter | Only Pending issue cards appear | Passed |
| Search unavailable text | “No issues found” message appears | Passed |
| Add a new issue | Total and Pending values increase | Passed |

---

## Challenges Faced

### Connecting HTML, CSS, and JavaScript files

The HTML, CSS, and JavaScript files must be correctly linked. Otherwise, styling or functionality will not work.

```html
<link rel="stylesheet" href="style.css">
<script src="script.js"></script>
```

Both files must be in the same project folder as `index.html`.

### Preventing page refresh on form submission

HTML forms refresh the page by default after submission.

**Solution:**

```javascript
event.preventDefault();
```

This allowed the application to add a new issue card without reloading the page.

### Keeping the UI and data updated

When a new issue is added, the issue list, dashboard counts, and graph must show current data.

**Solution:**

```javascript
renderIssues();
updateDashboard();
```

These functions are called after adding a new issue.

### Combining search and filters

Search and filtering needed to work together, not separately.

**Solution:**

```javascript
return matchesStatus && matchesSearch;
```

This displays only issues that meet both conditions.

---

## Future Improvements

The current version is intentionally frontend-only. The following features could make it closer to a real campus reporting system:

- Convert the project to React using the `useState` Hook
- Store issues in `localStorage` so they remain after refresh
- Add a backend and database
- Add secure student and administrator authentication
- Allow only authorised staff to update issue status
- Add issue submission date and time
- Allow students to upload an image of the problem
- Add sorting by newest report or highest priority
- Add notifications after issue submission
- Add a map or campus-block selection system

---

## Screenshots

### Home Page

<img width="1912" height="962" alt="image" src="https://github.com/user-attachments/assets/39642522-7208-4f23-a6a8-b214a47b4f71" />

### Issue Report Form

<img width="1917" height="957" alt="image" src="https://github.com/user-attachments/assets/ce4857eb-8d5b-409a-b666-b6102a5d3f68" />

### Dashboard and Issue Cards
<img width="1912" height="947" alt="image" src="https://github.com/user-attachments/assets/cc4f7819-8b4c-4fb2-a44f-a78ab99eb6f7" />

---

## Author

Created by **THANISHKKA VANTHAVASI VISWANATH**
