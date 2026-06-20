const state = {
  category: "all",
  query: "",
};

const grid = document.querySelector("#prompt-grid");
const filters = document.querySelector("#filters");
const search = document.querySelector("#search");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");

const categoryLabel = new Map(PROMPT_CATEGORIES.map((category) => [category.id, category.label]));

function normalize(value) {
  return value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getFilteredPrompts() {
  const query = normalize(state.query);

  return PROMPTS.filter((prompt) => {
    const matchesCategory = state.category === "all" || prompt.category === state.category;
    const searchable = normalize(`${prompt.title} ${prompt.purpose} ${prompt.level} ${prompt.inputs.join(" ")} ${prompt.prompt}`);
    return matchesCategory && (!query || searchable.includes(query));
  });
}

function renderFilters() {
  filters.innerHTML = PROMPT_CATEGORIES.map((category) => {
    const count = category.id === "all" ? PROMPTS.length : PROMPTS.filter((prompt) => prompt.category === category.id).length;
    return `
      <button class="filter-chip" type="button" data-category="${category.id}" aria-pressed="${category.id === state.category}">
        <span>${category.label}</span>
        <small>${count}</small>
      </button>
    `;
  }).join("");

  filters.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category || "all";
      render();
    });
  });
}

function renderPrompts() {
  const prompts = getFilteredPrompts();
  resultCount.textContent = `${prompts.length} prompt${prompts.length === 1 ? "" : "s"} encontrado${prompts.length === 1 ? "" : "s"}`;
  emptyState.hidden = prompts.length !== 0;

  grid.innerHTML = prompts.map((prompt, index) => `
    <article class="prompt-card" id="${prompt.id}">
      <details>
        <summary>
          <span class="prompt-index">${String(index + 1).padStart(2, "0")}</span>
          <span class="summary-copy">
            <span class="prompt-meta">
              <span>${categoryLabel.get(prompt.category)}</span>
              <span class="level level-${prompt.level}">raciocínio ${prompt.level}</span>
            </span>
            <strong>${prompt.title}</strong>
            <em>${prompt.purpose}</em>
          </span>
        </summary>
        <div class="prompt-content">
          <div class="prompt-recipe" aria-label="Resumo de uso do prompt">
            <div class="recipe-step">
              <span>Quando usar</span>
              <p>${prompt.purpose}</p>
            </div>
            <div class="recipe-step">
              <span>Insumos</span>
              <p>${prompt.inputs.slice(0, 3).join(", ")}</p>
            </div>
            <div class="recipe-step">
              <span>Revisão</span>
              <p>Conferir fatos, documentos, fonte oficial, sigilo, LGPD e estratégia antes de qualquer uso externo.</p>
            </div>
          </div>
          <div class="prompt-actions">
            <div>
              <span class="card-lbl">Prompt completo</span>
              <p>Substitua os campos entre colchetes antes de usar.</p>
            </div>
            <button class="copy-btn" type="button" data-copy="${prompt.id}">Copiar</button>
          </div>
          <pre id="text-${prompt.id}">${prompt.prompt}</pre>
          <div class="input-list">
            ${prompt.inputs.map((input) => `<span>${input}</span>`).join("")}
          </div>
        </div>
      </details>
    </article>
  `).join("");

  grid.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.dataset.copy;
      const text = document.querySelector(`#text-${id}`)?.textContent || "";
      await copyText(text);
      showFeedback(button);
    });
  });
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.top = "-999px";
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  area.remove();
}

function showFeedback(button) {
  const original = button.textContent;
  button.textContent = "Copiado";
  button.classList.add("copied");
  window.setTimeout(() => {
    button.textContent = original;
    button.classList.remove("copied");
  }, 1400);
}

function bindNavObserver() {
  const sections = document.querySelectorAll(".cover, .section");
  const navItems = document.querySelectorAll(".nav-item");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((item) => {
        item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { threshold: 0.28 });

  sections.forEach((section) => observer.observe(section));
}

function render() {
  renderFilters();
  renderPrompts();
}

search.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderPrompts();
});

render();
bindNavObserver();
