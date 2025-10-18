// ------- Portfolio Data & Rendering -------
const USERNAME = window.PORTFOLIO_USERNAME || "A-lii";

function renderProjects(repos) {
  const grid = document.getElementById("projectGrid");
  grid.innerHTML = "";
  if (!repos.length) {
    const p = document.createElement("p");
    p.textContent = "No public repositories found yet. Add some or make them public on GitHub.";
    grid.appendChild(p);
    return;
  }

  repos.slice(0, 6).forEach(r => {
    const el = document.createElement("article");
    el.className = "card";
    const tags = [];
    if (r.language) tags.push(r.language);
    if (r.topics) tags.push(...r.topics.slice(0,3));
    const homepage = r.homepage && r.homepage.trim() ? r.homepage : null;

    el.innerHTML = `
      <h3>${r.name.replace(/[-_]/g,' ')}</h3>
      <p>${r.description || "No description added yet."}</p>
      <div class="tags">${tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
      <div style="margin-top:auto; display:flex; gap:10px; flex-wrap:wrap">
        ${homepage ? `<a class="btn" href="${homepage}" target="_blank" rel="noopener">Demo</a>` : ""}
        <a class="btn ghost" href="${r.html_url}" target="_blank" rel="noopener">Code</a>
      </div>
    `;
    grid.appendChild(el);
  });
}

async function fetchRepos() {
  try {
    const res = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`, {
      headers: { "Accept": "application/vnd.github+json" }
    });
    if (!res.ok) throw new Error("GitHub API error");
    let repos = await res.json();

    repos = repos.filter(r => !r.fork); // exclude forks
    // Sort: stars desc, then recently updated
    repos.sort((a,b)=> (b.stargazers_count - a.stargazers_count) || (new Date(b.updated_at)-new Date(a.updated_at)));
    renderProjects(repos);
  } catch (e) {
    console.error(e);
    renderProjects([]);
  }
}

document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle
const root = document.documentElement;
const current = localStorage.getItem("theme");
if (current) root.setAttribute("data-theme", current);
document.getElementById("themeToggle").addEventListener("click", ()=>{
  const t = root.getAttribute("data-theme")==="dark" ? "" : "dark";
  if (t) root.setAttribute("data-theme","dark"); else root.removeAttribute("data-theme");
  localStorage.setItem("theme", t ? "dark" : "");
});

fetchRepos();
