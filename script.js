const form = document.getElementById("issue-form");
const issuesList = document.getElementById("issues-list");
const statusFilter = document.getElementById("status-filter");
const searchInput = document.getElementById("search-input");
const noResults = document.getElementById("no-results");

const totalCount = document.getElementById("total-count");
const pendingCount = document.getElementById("pending-count");
const progressCount = document.getElementById("progress-count");
const resolvedCount = document.getElementById("resolved-count");

const pendingBar = document.getElementById("pending-bar");
const progressBar = document.getElementById("progress-bar");
const resolvedBar = document.getElementById("resolved-bar");

const issues = [
  {
    title: "Broken Projector",
    category: "Classroom Equipment",
    location: "AB-2, Room 304",
    description: "The projector does not turn on.",
    priority: "High",
    status: "Pending"
  },
  {
    title: "Slow Wi-Fi in Library",
    category: "Internet & Technology",
    location: "Central Library",
    description: "Internet speed is very slow near the reading area.",
    priority: "Medium",
    status: "In Progress"
  },
  {
    title: "Water Dispenser Issue",
    category: "Water & Plumbing",
    location: "Block C",
    description: "The water dispenser is not working.",
    priority: "Low",
    status: "Resolved"
  }
];

function renderIssues() {
  const selectedStatus = statusFilter.value;
  const searchText = searchInput.value.toLowerCase();

  const filteredIssues = issues.filter(function (issue) {
    const matchesStatus =
      selectedStatus === "All" || issue.status === selectedStatus;

    const matchesSearch =
      issue.title.toLowerCase().includes(searchText) ||
      issue.category.toLowerCase().includes(searchText) ||
      issue.location.toLowerCase().includes(searchText);

    return matchesStatus && matchesSearch;
  });

  issuesList.innerHTML = "";

  if (filteredIssues.length === 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }

  filteredIssues.forEach(function (issue) {
    const priorityClass = issue.priority.toLowerCase();

    const issueCard = `
      <article>
        <h3>${issue.title}</h3>
        <p><strong>Category:</strong> ${issue.category}</p>
        <p><strong>Location:</strong> ${issue.location}</p>
        <p><strong>Description:</strong> ${issue.description}</p>
        <p>
          <strong>Priority:</strong>
          <span class="priority-badge ${priorityClass}">
            ${issue.priority}
          </span>
        </p>
        <p><strong>Status:</strong> ${issue.status}</p>
      </article>
    `;

    issuesList.innerHTML += issueCard;
  });
}

function updateDashboard() {
  const total = issues.length;

  const pending = issues.filter(function (issue) {
    return issue.status === "Pending";
  }).length;

  const inProgress = issues.filter(function (issue) {
    return issue.status === "In Progress";
  }).length;

  const resolved = issues.filter(function (issue) {
    return issue.status === "Resolved";
  }).length;

  totalCount.textContent = total;
  pendingCount.textContent = pending;
  progressCount.textContent = inProgress;
  resolvedCount.textContent = resolved;

  pendingBar.style.width = (pending / total) * 100 + "%";
  progressBar.style.width = (inProgress / total) * 100 + "%";
  resolvedBar.style.width = (resolved / total) * 100 + "%";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const newIssue = {
    title: document.getElementById("title").value,
    category: document.getElementById("category").value,
    location: document.getElementById("location").value,
    description: document.getElementById("description").value,
    priority: document.getElementById("priority").value,
    status: "Pending"
  };

  issues.push(newIssue);

  form.reset();
  renderIssues();
  updateDashboard();
});

statusFilter.addEventListener("change", function () {
  renderIssues();
});

searchInput.addEventListener("input", function () {
  renderIssues();
});

renderIssues();
updateDashboard();