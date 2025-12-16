const projects = [
  {
    title: "GoMental",
    desc: "A mental health support platform designed to help users in Bangladesh connect with psychologists/psychiatrists, book appointments, order medicines, and get first‑aid support, all from an Android app.",
    tags: ["Android", "Java", "SQLite"],
    demo: "", // add a URL if you have one
    code: "https://github.com/A-lii/GoMental"
  },
  {
    title: "Bookstagram",
    desc: "Social-style website for bookworms. It organizes reads, capture thoughts, and share recommendations with a clean UI.",
    tags: ["Web", "HTML", "CSS", "JavaScript"],
    demo: "",
    code: "https://github.com/A-lii/Bookstagram"
  },
  {
    title: "ASD Detection (Q-CHAT10 & SRS)",
    desc: "Supervised ML pipeline exploring ASD early-screening with Q-CHAT10 & SRS: preprocessing, feature selection, model training, evaluation.",
    tags: ["Python", "ML", "Pandas", "Scikit-learn"],
    demo: "",
    code: "https://github.com/A-lii/ASD-detection-using-Q-CHAT10-and-SRS"
  },
  {
    title: "CNN vs ML: Animal Image Classification",
    desc: "Comparative study: CNN vs classical ML baselines on animal images; experiments, metrics, and discussion of overfitting/generalization.",
    tags: ["Deep Learning", "CNN", "Python"],
    demo: "",
    code: "https://github.com/A-lii/Comparative-Analysis-Of-CNN-and-ML-Models-for-effective-Animal-Image-Classification"
  },
  {
    title: "Environmentalist Portfolio",
    desc: "Minimal personal site concept focusing on environmental storytelling and project highlights.",
    tags: ["HTML", "CSS", "Design"],
    demo: "",
    code: "https://github.com/A-lii/environmentalist-portfolio"
  }
];

// ---- Render cards with uniform base size and hover-to-expand description ----
function renderProjects(list) {
  const grid = document.getElementById("projectGrid");
  grid.innerHTML = "";

  list.forEach(p => {
    const el = document.createElement("article");
    el.className = "card";
    el.innerHTML = `
      <h3>${p.title}</h3>
      <p class="desc">${p.desc}</p>
      <div class="tags">${(p.tags||[]).map(t => `<span class="tag">${t}</span>`).join("")}</div>
      <div class="card-actions">
        ${p.demo ? `<a class="btn" href="${p.demo}" target="_blank" rel="noopener">Demo</a>` : ""}
        <a class="btn ghost" href="${p.code}" target="_blank" rel="noopener">Code</a>
      </div>
    `;
    grid.appendChild(el);
  });

  // year + theme toggle (kept from previous setup)
  document.getElementById("year").textContent = new Date().getFullYear();
  const root = document.documentElement;
  const current = localStorage.getItem("theme");
  if (current) root.setAttribute("data-theme", current);
  document.getElementById("themeToggle").addEventListener("click", ()=>{
    const t = root.getAttribute("data-theme")==="dark" ? "" : "dark";
    if (t) root.setAttribute("data-theme","dark"); else root.removeAttribute("data-theme");
    localStorage.setItem("theme", t ? "dark" : "");
  });
}

renderProjects(projects);
