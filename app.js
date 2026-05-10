const areaNames = {
  LC: "Linguagens e Códigos",
  CH: "Ciências Humanas",
  MT: "Matemática",
  CN: "Ciências da Natureza"
};

const disciplines = [
  { id: "port", name: "Português",  abbr: "Port." },
  { id: "mat",  name: "Matemática", abbr: "Mat."  },
  { id: "bio",  name: "Biologia",   abbr: "Bio."  },
  { id: "fis",  name: "Física",     abbr: "Fís."  },
  { id: "qui",  name: "Química",    abbr: "Quím." },
  { id: "hist", name: "História",   abbr: "Hist." },
  { id: "geo",  name: "Geografia",  abbr: "Geo."  },
  { id: "ing",  name: "Inglês",     abbr: "Ingl." }
];

const bimLabels = ["1º Bimestre", "2º Bimestre", "3º Bimestre", "4º Bimestre"];

// Mapeamento: área do simulado → disciplina + bimestre + campo preenchido
const vinculos = [
  { area: "LC", discId: "port", bim: 0, campo: "n2" },
  { area: "MT", discId: "mat",  bim: 0, campo: "n2" },
  { area: "CN", discId: "bio",  bim: 0, campo: "n2" },
  { area: "CH", discId: "hist", bim: 0, campo: "n2" }
];

// Notas N1 lançadas por professores: [bim0, bim1, bim2, bim3]
const rawTeacherN1 = {
  aluno01: { port:[7.5,8.0,null,null], mat:[8.0,7.5,null,null], bio:[7.0,null,null,null], fis:[6.5,null,null,null], qui:[7.5,null,null,null], hist:[6.0,7.0,null,null], geo:[8.0,null,null,null], ing:[7.0,null,null,null] },
  aluno02: { port:[6.5,7.0,null,null], mat:[5.5,6.0,null,null], bio:[6.0,null,null,null], fis:[5.0,null,null,null], qui:[6.0,null,null,null], hist:[7.0,6.5,null,null], geo:[7.0,null,null,null], ing:[6.5,null,null,null] },
  aluno03: { port:[9.0,8.5,null,null], mat:[8.5,9.0,null,null], bio:[8.0,null,null,null], fis:[7.5,null,null,null], qui:[8.5,null,null,null], hist:[8.0,9.0,null,null], geo:[9.0,null,null,null], ing:[8.0,null,null,null] },
  aluno04: { port:[5.0,6.0,null,null], mat:[6.0,5.5,null,null], bio:[5.5,null,null,null], fis:[4.5,null,null,null], qui:[5.0,null,null,null], hist:[6.0,5.5,null,null], geo:[6.5,null,null,null], ing:[5.5,null,null,null] },
  aluno05: { port:[7.0,7.5,null,null], mat:[7.5,8.0,null,null], bio:[7.5,null,null,null], fis:[6.0,null,null,null], qui:[7.0,null,null,null], hist:[7.0,7.5,null,null], geo:[7.5,null,null,null], ing:[7.0,null,null,null] }
};

const roles = {
  professor: {
    name: "Professor",
    user: "Marina A.",
    segment: "Ensino Médio",
    discipline: "Matemática",
    initials: "MA",
    icon: "book-open-check",
    pitch: "Lança e acompanha notas da disciplina vinculada."
  },
  coordenacao: {
    name: "Coordenação",
    user: "Renata S.",
    segment: "Ensino Médio",
    discipline: "Segmento",
    initials: "RS",
    icon: "network",
    pitch: "Acompanha turmas, pendências e consolidação do segmento."
  },
  auxiliar: {
    name: "Auxiliar",
    user: "Tiago L.",
    segment: "Ensino Médio",
    discipline: "Operação",
    initials: "TL",
    icon: "clipboard-check",
    pitch: "Confere turmas e ajusta notas de simulado."
  },
  admin: {
    name: "Admin",
    user: "Admin Geral",
    segment: "Todos",
    discipline: "Gestão",
    initials: "AG",
    icon: "shield-check",
    pitch: "Gerencia estrutura, usuários, vínculos e cadastros."
  }
};

const navItems = [
  { id: "painel",    label: "Painel",      icon: "layout-dashboard" },
  { id: "segmentos", label: "Segmentos",   icon: "layers-3" },
  { id: "turmas",    label: "Turmas",      icon: "users-round" },
  { id: "simulados", label: "Simulados",   icon: "file-spreadsheet" },
  { id: "avaliacoes",label: "Avaliações",  icon: "notebook-pen" },
  { id: "gestao",    label: "Gestão",      icon: "settings-2", adminOnly: true }
];

const segments = [
  { id: "fund1", name: "Fundamental I",  turmas: 8,  progress: 84, status: "Em dia" },
  { id: "fund2", name: "Fundamental II", turmas: 10, progress: 76, status: "Atenção" },
  { id: "medio", name: "Ensino Médio",   turmas: 9,  progress: 68, status: "Pendente" }
];

const turmas = [
  { id: "1a", serie: "1ª série", turma: "Turma A", segment: "Ensino Médio", students: 32, progress: 86, pending: 2 },
  { id: "1b", serie: "1ª série", turma: "Turma B", segment: "Ensino Médio", students: 31, progress: 72, pending: 5 },
  { id: "2a", serie: "2ª série", turma: "Turma A", segment: "Ensino Médio", students: 29, progress: 91, pending: 1 },
  { id: "2b", serie: "2ª série", turma: "Turma B", segment: "Ensino Médio", students: 30, progress: 64, pending: 8 },
  { id: "3a", serie: "3ª série", turma: "Turma A", segment: "Ensino Médio", students: 28, progress: 95, pending: 0 },
  { id: "3b", serie: "3ª série", turma: "Turma B", segment: "Ensino Médio", students: 27, progress: 70, pending: 6 }
];

const students = [
  { id: "aluno01", name: "Aluno 01", matricula: "2026014", turma: "1ª série A", scores: { LC: 8, CH: 7, MT: 9, CN: 8 }, status: "Completo" },
  { id: "aluno02", name: "Aluno 02", matricula: "2026027", turma: "1ª série A", scores: { LC: 7, CH: 8, MT: 6, CN: 7 }, status: "Parcial" },
  { id: "aluno03", name: "Aluno 03", matricula: "2026033", turma: "1ª série A", scores: { LC: 9, CH: 9, MT: 8, CN: 9 }, status: "Completo" },
  { id: "aluno04", name: "Aluno 04", matricula: "2026041", turma: "1ª série A", scores: { LC: 6, CH: 7, MT: 7, CN: 6 }, status: "Pendente" },
  { id: "aluno05", name: "Aluno 05", matricula: "2026050", turma: "1ª série A", scores: { LC: 8, CH: 8, MT: 7, CN: 8 }, status: "Completo" }
];

const simulados = [
  { id: "sim1", name: "Simulado Diagnóstico 1",         period: "1º bimestre", serie: "1ª série", segment: "Ensino Médio", status: "processado",         students: 152, inconsistencies: 3 },
  { id: "sim2", name: "Simulado Linguagens e Humanas",  period: "2º bimestre", serie: "2ª série", segment: "Ensino Médio", status: "aguardando planilha", students: 0,   inconsistencies: 0 },
  { id: "sim3", name: "Simulado Natureza e Matemática", period: "2º bimestre", serie: "3ª série", segment: "Ensino Médio", status: "cadastrado",           students: 0,   inconsistencies: 0 }
];

const avaliacoes = [
  { id: "av1", name: "Avaliação Parcial",        discipline: "Matemática",          turma: "1ª série A", period: "1º bimestre", status: "pendente",      done: 24, total: 32, createdAt: "2026-05-07" },
  { id: "av2", name: "Produção Textual",         discipline: "Linguagens",          turma: "1ª série B", period: "1º bimestre", status: "em lançamento", done: 18, total: 31 },
  { id: "av3", name: "Atividade Investigativa",  discipline: "Ciências da Natureza",turma: "2ª série A", period: "1º bimestre", status: "concluída",     done: 29, total: 29 },
  { id: "av4", name: "Seminário de Humanas",     discipline: "Ciências Humanas",    turma: "3ª série A", period: "1º bimestre", status: "concluída",     done: 28, total: 28 }
];

const users = [
  { name: "Marina A.",  profile: "Professor",   segment: "Ensino Médio", vinculo: "Matemática | 1ª A, 2ª A" },
  { name: "João F.",    profile: "Professor",   segment: "Ensino Médio", vinculo: "Física | 2ª A, 3ª B" },
  { name: "Renata S.",  profile: "Coordenação", segment: "Ensino Médio", vinculo: "Todas as turmas" },
  { name: "Tiago L.",   profile: "Auxiliar",    segment: "Ensino Médio", vinculo: "Operação de simulados" }
];

const state = {
  loggedIn: false,
  role: "admin",
  view: "painel",
  sidebarCollapsed: false,
  mobileOpen: false,
  selectedTurma: turmas[0],
  selectedStudent: students[0],
  selectedSimulado: simulados[0],
  processingDone: false,
  managementTab: "usuarios",
  selectedBimestre: 0
};

// Restaurar tema salvo antes do primeiro render
const savedTheme = localStorage.getItem("canhoto-theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

const app = document.querySelector("#app");

function scoreClass(score) {
  if (score >= 7) return "high";
  if (score >= 5) return "mid";
  return "low";
}

function formatNote(val) {
  if (val === null || val === undefined) return `<span class="muted">—</span>`;
  return val.toFixed(1);
}

function buildGradesData() {
  const result = {};
  students.forEach(student => {
    result[student.id] = {};
    disciplines.forEach(disc => {
      result[student.id][disc.id] = bimLabels.map((_, bim) => {
        const n1 = rawTeacherN1[student.id]?.[disc.id]?.[bim] ?? null;
        const vinculo = vinculos.find(v => v.discId === disc.id && v.bim === bim && v.campo === "n2");
        const n2 = vinculo ? (student.scores[vinculo.area] ?? null) : null;
        const isSimulado = !!vinculo && n2 !== null;
        const media = (n1 !== null && n2 !== null) ? (n1 + n2) / 2 : null;
        return { n1, n2, media, isSimulado };
      });
    });
  });
  return result;
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("canhoto-theme", next);
  render();
}

function isDark() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}

function daysUntilDeadline(createdAt, days = 7) {
  if (!createdAt) return null;
  const deadline = new Date(createdAt);
  deadline.setDate(deadline.getDate() + days);
  const now = new Date();
  return Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
}

function statusClass(value) {
  const text = String(value).toLowerCase();
  if (text.includes("concl") || text.includes("processado") || text.includes("completo") || text.includes("dia")) return "ok";
  if (text.includes("pend") || text.includes("aten") || text.includes("aguard") || text.includes("parcial")) return "wait";
  if (text.includes("erro") || text.includes("inconsist")) return "bad";
  return "info";
}

function icon(name) {
  return `<i data-lucide="${name}"></i>`;
}

function createIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function navigate(view) {
  const item = navItems.find((nav) => nav.id === view);
  if (item?.adminOnly && state.role !== "admin") {
    toast("Acesso restrito ao perfil Admin.");
    return;
  }
  if (view === "simulados" && state.role === "professor") {
    toast("Simulados não estão disponíveis para o perfil Professor.");
    return;
  }
  state.view = view;
  state.mobileOpen = false;
  render();
}

function toast(message) {
  const el = document.querySelector(".toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
  window.clearTimeout(window.__toastTimer);
  window.__toastTimer = window.setTimeout(() => el.classList.remove("show"), 4000);
}

function render() {
  app.innerHTML = state.loggedIn ? shellTemplate() : loginTemplate();
  bindEvents();
  createIcons();
}

/* ── Login ──────────────────────────────────────── */

function loginTemplate() {
  return `
    <main class="login-shell">
      <section class="login-panel" aria-label="Acesso ao Sistema Canhoto">
        <div class="login-header">
          <div class="app-logo"><img src="./logo-dbosco-roxo.png" alt="Dom Bosco" /></div>
          <h1>Sistema Canhoto</h1>
          <p>Centralização de simulados, avaliações e acompanhamento de notas por turma.</p>
        </div>
        <p class="login-role-label">Selecione seu perfil de acesso</p>
        <div class="role-grid">
          ${Object.entries(roles).map(([key, role]) => `
            <button class="role-card ${state.role === key ? "active" : ""}" data-login-role="${key}">
              <span class="role-icon">${icon(role.icon)}</span>
              <span>
                <h3>${role.name}</h3>
                <p>${role.pitch}</p>
              </span>
              <span class="check-icon">${icon("check")}</span>
            </button>
          `).join("")}
        </div>
        <button class="primary-button" style="width:100%;justify-content:center;" data-enter>
          ${icon("log-in")} Entrar no sistema
        </button>
      </section>
    </main>
  `;
}

/* ── Shell ──────────────────────────────────────── */

function shellTemplate() {
  const role = roles[state.role];
  const classes = [
    "app-shell",
    state.sidebarCollapsed ? "sidebar-collapsed" : "",
    state.mobileOpen ? "mobile-open" : ""
  ].filter(Boolean).join(" ");

  return `
    <div class="${classes}">
      <aside class="sidebar" aria-label="Menu principal">
        <div class="sidebar-head">
          <div class="app-logo"><img src="./logo-dbosco-roxo.png" alt="Dom Bosco" /></div>
          <div class="logo-text">
            <strong>Canhoto</strong>
            <span>Notas e simulados</span>
          </div>
        </div>
        <nav class="nav">
          ${navItems.filter(item => !(state.role === "professor" && item.id === "simulados")).map((item) => {
            const locked = item.adminOnly && state.role !== "admin";
            return `
              <button class="nav-button ${state.view === item.id ? "active" : ""} ${locked ? "locked" : ""}"
                data-view="${item.id}"
                title="${locked ? "Acesso restrito ao Admin" : item.label}">
                ${icon(item.icon)}
                <span>${item.label}</span>
                ${locked ? `<span style="margin-left:auto;opacity:0.45;">${icon("lock")}</span>` : ""}
              </button>
            `;
          }).join("")}
        </nav>
        <div class="sidebar-foot">
          <button class="ghost-button" data-logout>
            ${icon("log-out")} <span>Sair</span>
          </button>
        </div>
      </aside>

      <main class="main-area">
        <header class="topbar">
          <button class="icon-button mobile-only" data-mobile-menu aria-label="Abrir menu">${icon("menu")}</button>
          <button class="icon-button desktop-only" data-toggle-sidebar aria-label="Recolher menu">${icon("panel-left-close")}</button>
          <div class="topbar-spacer"></div>
          <div class="custom-dropdown desktop-only" data-dropdown>
            <button class="dropdown-trigger" data-dropdown-toggle aria-haspopup="listbox" aria-expanded="false">
              <span class="dropdown-trigger-icon">${icon(role.icon)}</span>
              <span class="dropdown-trigger-label">${role.name}</span>
              <span class="dropdown-chevron">${icon("chevron-down")}</span>
            </button>
            <div class="dropdown-panel" data-dropdown-panel hidden>
              ${Object.entries(roles).map(([key, opt]) => `
                <button class="dropdown-item ${key === state.role ? "active" : ""}" data-dropdown-role="${key}">
                  <span class="dropdown-item-icon">${icon(opt.icon)}</span>
                  <span class="dropdown-item-label">${opt.name}</span>
                  <span class="dropdown-check ${key === state.role ? "visible" : ""}">${icon("check")}</span>
                </button>
              `).join("")}
            </div>
          </div>
          <button class="icon-button" data-toggle-theme aria-label="Alternar tema">
            ${icon(isDark() ? "sun" : "moon")}
          </button>
          <div class="user-chip">
            <span class="avatar">${role.initials}</span>
            <span>
              <strong>${role.user}</strong>
              <span>${role.name} · ${role.segment}</span>
            </span>
          </div>
          <button class="icon-button" data-logout aria-label="Sair">${icon("log-out")}</button>
        </header>

        <section class="content">
          ${viewTemplate()}
        </section>
      </main>

      <div class="toast" role="status"></div>
    </div>
  `;
}

function pageHead(title, subtitle, actions = "") {
  return `
    <div class="page-head">
      <div class="page-title">
        <h1>${title}</h1>
        <p>${subtitle}</p>
      </div>
      <div class="action-row">${actions}</div>
    </div>
  `;
}

function viewTemplate() {
  const map = {
    painel:           dashboardView,
    segmentos:        segmentsView,
    turmas:           turmasView,
    turmaDetalhe:     turmaDetailView,
    alunoDetalhe:     studentDetailView,
    simulados:        simuladosView,
    simuladoDetalhe:  simuladoDetailView,
    simuladoResultado:simuladoResultView,
    avaliacoes:       avaliacoesView,
    lancamento:       lancamentoView,
    gestao:           gestaoView
  };
  return (map[state.view] || dashboardView)();
}

/* ── Dashboard ──────────────────────────────────── */

function dashboardView() {
  const role = roles[state.role];
  const dataByRole = {
    professor: (() => {
      const av = avaliacoes.find(a => a.createdAt);
      const dias = av ? daysUntilDeadline(av.createdAt) : null;
      const prazoStr = dias === null ? "—" : dias > 0 ? `${dias}d` : "Vencido";
      return [
        [prazoStr, "prazo de lançamento", "clock"],
        ["8",      "notas pendentes",     "notebook-pen"],
        ["86%",    "preenchimento atual", "chart-no-axes-column-increasing"],
        ["3",      "turmas vinculadas",   "users-round"]
      ];
    })(),
    coordenacao: [
      ["9",   "turmas do segmento",       "layers-3"],
      ["21",  "pendências abertas",       "alert-circle"],
      ["4",   "simulados no período",     "file-spreadsheet"],
      ["78%", "lançamentos concluídos",   "chart-no-axes-column-increasing"]
    ],
    auxiliar: [
      ["9",   "turmas acompanhadas",      "users-round"],
      ["2",   "simulados para conferir",  "file-search"],
      ["3",   "inconsistências",          "triangle-alert"],
      ["152", "alunos processados",       "user-check"]
    ],
    admin: [
      ["36",  "usuários ativos",          "users-round"],
      ["3",   "segmentos",                "layers-3"],
      ["7",   "simulados cadastrados",    "file-spreadsheet"],
      ["14",  "avaliações abertas",       "notebook-pen"]
    ]
  };

  const principalAction = state.role === "professor"
    ? `<button class="primary-button" data-view="lancamento">${icon("notebook-pen")} Lançar notas</button>`
    : `<button class="primary-button" data-view="simulados">${icon("file-spreadsheet")} Ver simulados</button>`;

  const greetingByRole = {
    professor: [
      `Olá, ${role.user}`,
      `Acompanhe suas turmas, prazos e lançamentos de ${role.discipline}.`
    ],
    coordenacao: [
      `Olá, ${role.name}`,
      `Veja o andamento do segmento ${role.segment} e as pendências por turma.`
    ],
    auxiliar: [
      `Olá, ${role.user}`,
      `Confira simulados, notas disponíveis e inconsistências operacionais.`
    ],
    admin: [
      `Olá, ${role.user}`,
      `Gerencie a visão geral do sistema, usuários e estruturas cadastradas.`
    ]
  };
  const [dashboardTitle, dashboardSubtitle] = greetingByRole[state.role];

  return `
    ${pageHead(dashboardTitle, dashboardSubtitle, `
      <button class="secondary-button" data-view="turmas">${icon("users-round")} Turmas</button>
      ${principalAction}
    `)}
    <div class="grid kpi-grid">
      ${dataByRole[state.role].map(([value, label, iconName]) => `
        <div class="kpi">
          <span class="mini-icon">${icon(iconName)}</span>
          <strong>${value}</strong>
          <span>${label}</span>
        </div>
      `).join("")}
    </div>
    <div class="grid two-col section">
      <div class="panel">
        <div class="panel-body">
          <div class="section-title">
            <h2>Status por turma</h2>
            <button class="ghost-button" data-view="turmas">${icon("external-link")} Ver turmas</button>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr><th>Turma</th><th>Segmento</th><th>Preenchimento</th><th>Situação</th></tr>
              </thead>
              <tbody>
                ${(state.role === "coordenacao" ? turmas.filter(t => t.segment === "Ensino Médio") : turmas).slice(0, 5).map((turma) => `
                  <tr>
                    <td>${turma.serie} ${turma.turma.replace("Turma ", "")}</td>
                    <td>${turma.segment}</td>
                    <td>
                      <div class="progress-group">
                        <div class="progress-meta">
                          <span></span>
                          <strong>${turma.progress}%</strong>
                        </div>
                        <div class="progress"><span style="width:${turma.progress}%"></span></div>
                      </div>
                    </td>
                    <td>
                      <span class="status ${turma.pending ? "wait" : "ok"}">
                        ${turma.pending ? turma.pending + " abertas" : "Em dia"}
                      </span>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-body">
          <div class="section-title"><h2>Andamento de avaliações</h2></div>
          <div class="grid" style="gap:8px;">
            ${avaliacoes.slice(0, 3).map((av) => `
              <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--line);">
                <div style="flex:1;">
                  <div style="font-size:0.9rem;font-weight:600;">${av.name}</div>
                  <div style="font-size:0.78rem;color:var(--muted);margin-top:2px;">${av.discipline} · ${av.turma}</div>
                </div>
                <span class="status ${statusClass(av.status)}">${av.done}/${av.total}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ── Segments ───────────────────────────────────── */

function segmentsView() {
  const visibleSegments = state.role === "coordenacao"
    ? segments.filter(s => s.name === "Ensino Médio")
    : segments;
  return `
    ${pageHead("Segmentos", "Navegação por etapa de ensino com status de preenchimento e acesso às turmas.")}
    <div class="grid three-col">
      ${visibleSegments.map((segment) => `
        <article class="segment-card" data-view="turmas">
          <span class="mini-icon" style="width:36px;height:36px;margin-bottom:14px;">${icon("layers-3")}</span>
          <h3>${segment.name}</h3>
          <p>${segment.turmas} turmas vinculadas</p>
          <div style="margin-top:16px;">
            <div class="progress-group">
              <div class="progress-meta">
                <span>Lançamento</span>
                <strong>${segment.progress}%</strong>
              </div>
              <div class="progress"><span style="width:${segment.progress}%"></span></div>
            </div>
          </div>
          <div class="card-foot" style="margin-top:14px;">
            <span class="status ${statusClass(segment.status)}">${segment.status}</span>
            <span style="color:var(--muted);opacity:0.6;">${icon("chevron-right")}</span>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

/* ── Turmas ─────────────────────────────────────── */

function turmasView() {
  const visibleTurmas = state.role === "coordenacao"
    ? turmas.filter(t => t.segment === "Ensino Médio")
    : turmas;
  return `
    ${pageHead("Turmas", "Consulta por série e turma, com visão de preenchimento e lista de alunos.", `
      <button class="secondary-button" data-view="segmentos">${icon("layers-3")} Segmentos</button>
    `)}
    <div class="grid three-col">
      ${visibleTurmas.map((turma) => `
        <article class="turma-card" data-open-turma="${turma.id}">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
            <span class="mini-icon" style="width:32px;height:32px;">${icon("users-round")}</span>
            <h3 style="margin:0;">${turma.serie} · ${turma.turma}</h3>
          </div>
          <p>${turma.students} alunos · ${turma.segment}</p>
          <div style="margin-top:16px;">
            <div class="progress-group">
              <div class="progress-meta">
                <span>Lançamento</span>
                <strong>${turma.progress}%</strong>
              </div>
              <div class="progress"><span style="width:${turma.progress}%"></span></div>
            </div>
          </div>
          <div class="card-foot" style="margin-top:12px;">
            <span class="status ${turma.pending ? "wait" : "ok"}">
              ${turma.pending ? turma.pending + " pendências" : "Em dia"}
            </span>
            <span style="color:var(--muted);opacity:0.6;">${icon("chevron-right")}</span>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

/* ── Turma detail ───────────────────────────────── */

function turmaDetailView() {
  const turma = state.selectedTurma;
  const bim = state.selectedBimestre;
  const gradeData = buildGradesData();
  const visibleDiscs = state.role === "professor"
    ? disciplines.filter(d => d.id === "mat")
    : disciplines;
  return `
    ${pageHead(
      `${turma.serie} · ${turma.turma}`,
      `Turmas / ${turma.segment} · ${turma.students} alunos`, `
      <button class="secondary-button" data-view="turmas">${icon("arrow-left")} Turmas</button>
      <button class="primary-button" data-view="lancamento">${icon("notebook-pen")} Lançar notas</button>
    `)}
    <div class="bim-tabs">
      ${bimLabels.map((label, i) => `
        <button class="bim-tab ${bim === i ? "active" : ""}" data-bim="${i}">${label}</button>
      `).join("")}
    </div>
    <div class="panel" style="overflow:hidden;">
      <div class="grade-table-wrap">
        <table class="grade-table">
          <thead>
            <tr>
              <th class="col-aluno" rowspan="2">Aluno</th>
              ${visibleDiscs.map(disc => `
                <th class="col-disc-header" colspan="3">${disc.abbr}</th>
              `).join("")}
            </tr>
            <tr>
              ${visibleDiscs.map(() => `
                <th class="col-note-label">N1</th>
                <th class="col-note-label">N2</th>
                <th class="col-note-label col-media-header">Méd</th>
              `).join("")}
            </tr>
          </thead>
          <tbody>
            ${students.map(student => {
              const sData = gradeData[student.id];
              return `
                <tr class="grade-row" data-open-student="${student.id}">
                  <td class="col-aluno-cell">${student.name}</td>
                  ${visibleDiscs.map(disc => {
                    const cell = sData[disc.id][bim];
                    const mediaClass = cell.media !== null ? scoreClass(cell.media) : "";
                    return `
                      <td class="cell-note">${formatNote(cell.n1)}</td>
                      <td class="cell-note ${cell.isSimulado ? "cell-sim" : ""}">${formatNote(cell.n2)}</td>
                      <td class="cell-media">${cell.media !== null ? `<b class="score-pill-sm ${mediaClass}">${cell.media.toFixed(1)}</b>` : `<span class="muted">—</span>`}</td>
                    `;
                  }).join("")}
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>
    <div class="legend-row">
      <span class="sim-legend">${icon("zap")} N2 alimentada por simulado vinculado</span>
    </div>
  `;
}

/* ── Student detail ─────────────────────────────── */

function studentDetailView() {
  if (state.role === "professor") return professorStudentEditView();
  const student = state.selectedStudent;
  const bim = state.selectedBimestre;
  const gradeData = buildGradesData()[student.id];
  return `
    ${pageHead(
      student.name,
      `${student.turma} · Matrícula ${student.matricula}`, `
      <button class="secondary-button" data-view="turmaDetalhe">${icon("arrow-left")} Voltar</button>
    `)}
    <div class="bim-tabs">
      ${bimLabels.map((label, i) => `
        <button class="bim-tab ${bim === i ? "active" : ""}" data-bim="${i}">${label}</button>
      `).join("")}
    </div>
    <div class="panel">
      <div class="panel-body">
        <div class="section-title"><h2>Boletim individual</h2></div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th style="min-width:150px;">Disciplina</th>
                <th>N1</th>
                <th>N2</th>
                <th>Média</th>
              </tr>
            </thead>
            <tbody>
              ${disciplines.map(disc => {
                const cell = gradeData[disc.id][bim];
                const mediaClass = cell.media !== null ? scoreClass(cell.media) : "";
                return `
                  <tr>
                    <td><strong>${disc.name}</strong></td>
                    <td>${formatNote(cell.n1)}</td>
                    <td class="${cell.isSimulado ? "cell-sim" : ""}">${formatNote(cell.n2)}</td>
                    <td>${cell.media !== null ? `<b class="score-pill ${mediaClass}">${cell.media.toFixed(1)}</b>` : `<span class="muted">—</span>`}</td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="legend-row">
      <span class="sim-legend">${icon("zap")} N2 alimentada por simulado vinculado</span>
    </div>
  `;
}

/* ── Professor student edit ─────────────────────── */

function professorStudentEditView() {
  const student = state.selectedStudent;
  const bim = state.selectedBimestre;
  const gradeData = buildGradesData()[student.id];
  const disc = disciplines.find(d => d.id === "mat");
  const cell = gradeData[disc.id][bim];
  return `
    ${pageHead(
      student.name,
      `${student.turma} · Matrícula ${student.matricula}`, `
      <button class="secondary-button" data-view="turmaDetalhe">${icon("arrow-left")} Voltar</button>
    `)}
    <div class="bim-tabs">
      ${bimLabels.map((label, i) => `
        <button class="bim-tab ${bim === i ? "active" : ""}" data-bim="${i}">${label}</button>
      `).join("")}
    </div>
    <div class="panel">
      <div class="panel-body">
        <div class="section-title">
          <h2>Editar notas — ${disc.name}</h2>
          <span class="muted" style="font-size:0.84rem;">${bimLabels[bim]}</span>
        </div>
        <div class="grade-edit-wrap">
          <div class="grade-edit-row">
            <span class="grade-edit-label">N1 — Nota avaliativa</span>
            <div class="grade-point-ctrl">
              <button class="icon-button" data-adjust="mat-n1" data-delta="-0.5" aria-label="Retirar 0,5">${icon("minus")}</button>
              <input class="grade-input" type="number" min="0" max="10" step="0.5" value="${cell.n1 ?? 0}" data-grade-field="mat-n1" aria-label="N1 de ${student.name}" />
              <button class="icon-button" data-adjust="mat-n1" data-delta="0.5" aria-label="Adicionar 0,5">${icon("plus")}</button>
            </div>
          </div>
          <div class="grade-edit-row">
            <span class="grade-edit-label">N2 — ${cell.isSimulado ? "Alimentada por simulado" : "Nota avaliativa"}</span>
            <div class="grade-point-ctrl">
              <button class="icon-button" data-adjust="mat-n2" data-delta="-0.5" ${cell.isSimulado ? "disabled" : ""} aria-label="Retirar 0,5">${icon("minus")}</button>
              <input class="grade-input" type="number" min="0" max="10" step="0.5" value="${cell.n2 ?? 0}" data-grade-field="mat-n2" ${cell.isSimulado ? "disabled" : ""} aria-label="N2 de ${student.name}" />
              <button class="icon-button" data-adjust="mat-n2" data-delta="0.5" ${cell.isSimulado ? "disabled" : ""} aria-label="Adicionar 0,5">${icon("plus")}</button>
            </div>
          </div>
          ${cell.media !== null ? `
            <div class="grade-edit-row">
              <span class="grade-edit-label">Média calculada</span>
              <b class="score-pill ${scoreClass(cell.media)}">${cell.media.toFixed(1)}</b>
            </div>
          ` : ""}
        </div>
        <div class="grade-edit-actions">
          <button class="primary-button" data-save-grades>${icon("save")} Salvar nota</button>
        </div>
      </div>
    </div>
  `;
}

/* ── Simulados ──────────────────────────────────── */

function simuladosView() {
  return `
    ${pageHead("Simulados", "Importação e processamento automático das planilhas de simulado.", `
      <button class="primary-button" data-open-simulado="sim2">${icon("upload")} Importar planilha</button>
    `)}
    <div class="grid">
      ${simulados.map((sim) => `
        <article class="sim-card" data-open-simulado="${sim.id}">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;">
            <div>
              <h3>${sim.name}</h3>
              <p style="margin-top:4px;">${sim.period} · ${sim.segment} · ${sim.serie}</p>
            </div>
            <span class="status ${statusClass(sim.status)}" style="flex-shrink:0;">${sim.status}</span>
          </div>
          <div class="card-foot" style="margin-top:14px;">
            <span class="muted" style="font-size:0.83rem;">
              ${sim.students ? sim.students + " alunos processados" : "Nenhuma planilha importada"}
            </span>
            <span style="color:var(--muted);opacity:0.5;">${icon("chevron-right")}</span>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

/* ── Simulado detail ────────────────────────────── */

function simuladoDetailView() {
  const sim = state.selectedSimulado;
  const canEdit = ["admin", "auxiliar"].includes(state.role);
  return `
    ${pageHead(sim.name, `${sim.period} · ${sim.segment} · ${sim.serie}`, `
      <button class="secondary-button" data-view="simulados">${icon("arrow-left")} Simulados</button>
      ${sim.status === "processado"
        ? `<button class="primary-button" data-view="simuladoResultado">${icon("chart-no-axes-combined")} Ver resultado</button>`
        : ""}
    `)}
    <div class="grid two-col">
      <div class="panel">
        <div class="panel-body">
          <div class="section-title"><h2>Modelo esperado</h2></div>
          <p class="muted" style="font-size:0.87rem;margin-bottom:14px;">
            Arquivo tabular com as colunas abaixo. O sistema consolida os acertos por aluno e converte a nota final automaticamente.
          </p>
          <div class="sheet-sample">
            <div class="sheet-row header">
              <span>aluno</span><span>matrícula</span><span>disciplina</span><span>acertos</span>
            </div>
            <div class="sheet-row">
              <span>Aluno 01</span><span>2026014</span><span>Matemática</span><span>24</span>
            </div>
            <div class="sheet-row">
              <span>Aluno 01</span><span>2026014</span><span>Mat. Básica</span><span>3</span>
            </div>
            <div class="sheet-row">
              <span>Aluno 02</span><span>2026027</span><span>Física</span><span>18</span>
            </div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-body">
          <div class="section-title"><h2>Importação da planilha</h2></div>
          <div class="upload-zone">
            ${icon("file-up")}
            <p>${canEdit
              ? "Selecione uma planilha para processar as notas do simulado."
              : "Seu perfil acompanha o resultado. A importação é feita pelo Auxiliar ou Admin."}</p>
            <button class="primary-button" data-process-simulado ${canEdit ? "" : "disabled"}>
              ${icon("upload")} Importar e processar
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ── Simulado result ────────────────────────────── */

function simuladoResultView() {
  return `
    ${pageHead("Resultado do processamento", "Consolidação por área · Simulado Diagnóstico 1 · 1º bimestre", `
      <button class="secondary-button" data-view="simuladoDetalhe">${icon("arrow-left")} Voltar</button>
    `)}
    <div class="grid kpi-grid">
      <div class="kpi"><span class="mini-icon">${icon("user-check")}</span><strong>152</strong><span>alunos processados</span></div>
      <div class="kpi"><span class="mini-icon">${icon("triangle-alert")}</span><strong>3</strong><span>inconsistências</span></div>
      <div class="kpi"><span class="mini-icon">${icon("sigma")}</span><strong>4</strong><span>áreas consolidadas</span></div>
      <div class="kpi"><span class="mini-icon">${icon("link")}</span><strong>100%</strong><span>vínculo por matrícula</span></div>
    </div>
    <div class="panel section">
      <div class="panel-body">
        <div class="section-title"><h2>Notas consolidadas por área</h2></div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Aluno</th><th>Área</th><th>Total de acertos</th><th>Nota final</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Aluno 01</td>
                <td>${areaNames.MT}</td>
                <td>27</td>
                <td><b class="score-pill ${scoreClass(9)}">9,0</b></td>
                <td><span class="status ok">Vinculado</span></td>
              </tr>
              <tr>
                <td>Aluno 02</td>
                <td>${areaNames.CN}</td>
                <td>21</td>
                <td><b class="score-pill ${scoreClass(7)}">7,0</b></td>
                <td><span class="status ok">Vinculado</span></td>
              </tr>
              <tr>
                <td>Aluno 03</td>
                <td>${areaNames.LC}</td>
                <td>30</td>
                <td><b class="score-pill ${scoreClass(10)}">10,0</b></td>
                <td><span class="status ok">Vinculado</span></td>
              </tr>
              <tr>
                <td>Aluno 04</td>
                <td>${areaNames.CH}</td>
                <td>18</td>
                <td><b class="score-pill ${scoreClass(6)}">6,0</b></td>
                <td><span class="status wait">Conferir</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

/* ── Avaliações ─────────────────────────────────── */

function avaliacoesView() {
  const professorOnly = state.role === "professor";
  const list = professorOnly ? avaliacoes.filter((av) => av.discipline === "Matemática") : avaliacoes;
  return `
    ${pageHead("Avaliações", "Acompanhamento das notas avaliativas por disciplina e turma.", `
      <button class="primary-button" data-view="lancamento">${icon("notebook-pen")} Lançar notas</button>
    `)}
    <div class="panel">
      <div class="panel-body">
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Avaliação</th><th>Disciplina</th><th>Turma</th><th>Período</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              ${list.map((av) => `
                <tr>
                  <td>${av.name}</td>
                  <td>${av.discipline}</td>
                  <td>${av.turma}</td>
                  <td>${av.period}</td>
                  <td><span class="status ${statusClass(av.status)}">${av.status}</span></td>
                  <td>
                    <button class="secondary-button" data-view="lancamento" style="min-height:32px;font-size:0.8rem;" ${state.role === "auxiliar" ? "disabled" : ""}>
                      ${icon("arrow-right")} Abrir
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

/* ── Lançamento ─────────────────────────────────── */

function lancamentoView() {
  const noteValues = [8.5, 7.0, 9.5, "", 8];
  const readOnly = state.role === "auxiliar";
  return `
    ${pageHead("Lançamento de notas", "Avaliação Parcial · Matemática · 1ª série A", `
      <button class="secondary-button" data-view="avaliacoes">${icon("arrow-left")} Voltar</button>
      ${!readOnly ? `<button class="primary-button" data-save-grades>${icon("save")} Salvar</button>` : ""}
    `)}
    <div class="panel">
      <div class="panel-body">
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Aluno</th><th>Matrícula</th><th>Nota avaliativa</th><th>Ref. Simulado</th><th>Situação</th></tr>
            </thead>
            <tbody>
              ${students.map((student, index) => `
                <tr>
                  <td>${student.name}</td>
                  <td>${student.matricula}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.5"
                      value="${noteValues[index]}"
                      aria-label="Nota de ${student.name}"
                      style="width:80px;border:1.5px solid var(--line);border-radius:7px;padding:6px 10px;background:var(--surface);color:var(--text);outline:none;"
                      ${readOnly ? "disabled" : ""}
                    />
                  </td>
                  <td>
                    <b class="score-pill ${scoreClass(student.scores.MT)}">${student.scores.MT.toFixed(1)}</b>
                  </td>
                  <td>
                    <span class="status ${index === 3 ? "wait" : "ok"}">${index === 3 ? "Pendente" : "Preenchido"}</span>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

/* ── Gestão ─────────────────────────────────────── */

function gestaoView() {
  if (state.role !== "admin") {
    return `
      ${pageHead("Gestão", "Área restrita ao perfil Admin.")}
      <div class="panel">
        <div class="panel-body" style="text-align:center;padding:40px;">
          <span class="mini-icon" style="width:48px;height:48px;margin:0 auto 16px;">${icon("lock")}</span>
          <p class="muted">Esta área está disponível apenas para o perfil Admin.</p>
        </div>
      </div>
    `;
  }

  const tabs = [
    ["usuarios",    "Usuários"],
    ["avaliacoes",  "Avaliações"],
    ["simulados",   "Simulados"],
    ["disciplinas", "Disciplinas"],
    ["vinculos",    "Vínculos"]
  ];

  return `
    ${pageHead("Gestão", "Cadastros estruturais, usuários e vínculos do sistema.", `
      <button class="primary-button" data-toast="Cadastro criado no protótipo.">${icon("plus")} Novo cadastro</button>
    `)}
    <div class="tabs">
      ${tabs.map(([id, label]) => `
        <button class="tab-button ${state.managementTab === id ? "active" : ""}" data-tab="${id}">${label}</button>
      `).join("")}
    </div>
    <div class="panel">
      <div class="panel-body">
        ${managementContent()}
      </div>
    </div>
  `;
}

function managementContent() {
  if (state.managementTab === "usuarios") {
    return `
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Nome</th><th>Perfil</th><th>Segmento</th><th>Vínculo</th><th>Status</th></tr>
          </thead>
          <tbody>
            ${users.map((user) => `
              <tr>
                <td>${user.name}</td>
                <td>${user.profile}</td>
                <td>${user.segment}</td>
                <td>${user.vinculo}</td>
                <td><span class="status ok">Ativo</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  if (state.managementTab === "avaliacoes") {
    return `
      <div class="form-grid">
        <label class="field">
          <span>Nome da avaliação</span>
          <input value="Avaliação Parcial" />
        </label>
        <label class="field">
          <span>Disciplina</span>
          <select>
            <option>Matemática</option>
            <option>Linguagens</option>
            <option>Ciências da Natureza</option>
            <option>Ciências Humanas</option>
          </select>
        </label>
        <label class="field">
          <span>Segmento</span>
          <select>
            <option>Ensino Médio</option>
            <option>Fundamental II</option>
            <option>Fundamental I</option>
          </select>
        </label>
        <label class="field">
          <span>Série / Turma</span>
          <select>
            <option>1ª série A</option>
            <option>2ª série A</option>
            <option>3ª série A</option>
          </select>
        </label>
      </div>
    `;
  }

  if (state.managementTab === "simulados") {
    return `
      <div class="form-grid">
        <label class="field">
          <span>Nome do simulado</span>
          <input value="Simulado Natureza e Matemática" />
        </label>
        <label class="field">
          <span>Período</span>
          <input value="2º bimestre" />
        </label>
        <label class="field">
          <span>Segmento</span>
          <select>
            <option>Ensino Médio</option>
            <option>Fundamental II</option>
          </select>
        </label>
        <label class="field">
          <span>Modelo esperado</span>
          <select>
            <option>Aluno + Matrícula + Disciplina + Acertos</option>
          </select>
        </label>
      </div>
    `;
  }

  if (state.managementTab === "disciplinas") {
    return `
      <div class="grid three-col">
        ${["Linguagens", "Literatura", "Ciências Humanas", "História", "Matemática", "Biologia", "Física", "Química"].map((name) => `
          <div class="management-card">
            <div class="mini-icon" style="width:32px;height:32px;margin-bottom:10px;">${icon("book-open")}</div>
            <h3>${name}</h3>
            <p>Disciplina ativa para vínculo e lançamento.</p>
          </div>
        `).join("")}
      </div>
    `;
  }

  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Área do simulado</th>
            <th>Disciplina</th>
            <th>Bimestre</th>
            <th>Campo alimentado</th>
          </tr>
        </thead>
        <tbody>
          ${vinculos.map(v => {
            const disc = disciplines.find(d => d.id === v.discId);
            return `
              <tr>
                <td>
                  <span class="area-chip">${v.area}</span>
                  <span style="margin-left:8px;color:var(--muted);font-size:0.84rem;">${areaNames[v.area]}</span>
                </td>
                <td>${disc?.name || v.discId}</td>
                <td>${bimLabels[v.bim]}</td>
                <td><span class="tag info">${v.campo.toUpperCase()}</span></td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
      <p class="muted" style="font-size:0.82rem;margin:14px 0 0;padding-top:12px;border-top:1px solid var(--line);">
        ${icon("info")} Novos vínculos podem ser configurados para alimentar automaticamente os campos de nota na aba Turmas.
      </p>
    </div>
  `;
}

/* ── Events ─────────────────────────────────────── */

function bindEvents() {
  document.querySelectorAll("[data-login-role]").forEach((button) => {
    button.addEventListener("click", () => {
      state.role = button.dataset.loginRole;
      render();
    });
  });

  document.querySelector("[data-enter]")?.addEventListener("click", () => {
    state.loggedIn = true;
    state.view = "painel";
    render();
  });

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => navigate(button.dataset.view));
  });

  document.querySelector("[data-toggle-theme]")?.addEventListener("click", toggleTheme);

  document.querySelector("[data-toggle-sidebar]")?.addEventListener("click", () => {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    render();
  });

  document.querySelector("[data-mobile-menu]")?.addEventListener("click", () => {
    state.mobileOpen = !state.mobileOpen;
    render();
  });

  document.querySelectorAll("[data-logout]").forEach((button) => {
    button.addEventListener("click", () => {
      state.loggedIn = false;
      state.view = "painel";
      render();
    });
  });

  const ddToggle = document.querySelector("[data-dropdown-toggle]");
  const ddPanel  = document.querySelector("[data-dropdown-panel]");

  ddToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = !ddPanel.hasAttribute("hidden");
    if (isOpen) {
      ddPanel.setAttribute("hidden", "");
      ddToggle.setAttribute("aria-expanded", "false");
    } else {
      ddPanel.removeAttribute("hidden");
      ddToggle.setAttribute("aria-expanded", "true");
      setTimeout(() => {
        document.addEventListener("click", () => {
          ddPanel?.setAttribute("hidden", "");
          ddToggle?.setAttribute("aria-expanded", "false");
        }, { once: true });
      }, 0);
    }
  });

  document.querySelectorAll("[data-dropdown-role]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.role = btn.dataset.dropdownRole;
      if (state.role !== "admin" && state.view === "gestao") state.view = "painel";
      if (state.role === "professor" && state.view === "simulados") state.view = "painel";
      render();
    });
  });

  document.querySelectorAll("[data-open-turma]").forEach((el) => {
    el.addEventListener("click", () => {
      state.selectedTurma = turmas.find((t) => t.id === el.dataset.openTurma) || turmas[0];
      state.view = "turmaDetalhe";
      render();
    });
  });

  document.querySelectorAll("[data-open-student]").forEach((row) => {
    row.addEventListener("click", () => {
      state.selectedStudent = students.find((s) => s.id === row.dataset.openStudent) || students[0];
      state.view = "alunoDetalhe";
      render();
    });
  });

  document.querySelectorAll("[data-open-simulado]").forEach((el) => {
    el.addEventListener("click", () => {
      state.selectedSimulado = simulados.find((s) => s.id === el.dataset.openSimulado) || simulados[0];
      state.view = "simuladoDetalhe";
      render();
    });
  });

  document.querySelector("[data-process-simulado]")?.addEventListener("click", () => {
    state.processingDone = true;
    state.view = "simuladoResultado";
    render();
    setTimeout(() => toast("Planilha processada. Notas vinculadas aos alunos com sucesso."), 60);
  });

  document.querySelector("[data-save-grades]")?.addEventListener("click", () => {
    toast("Notas avaliativas salvas no protótipo.");
  });

  document.querySelectorAll("[data-bim]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedBimestre = parseInt(button.dataset.bim, 10);
      render();
    });
  });

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.managementTab = button.dataset.tab;
      render();
    });
  });

  document.querySelectorAll("[data-toast]").forEach((button) => {
    button.addEventListener("click", () => toast(button.dataset.toast));
  });

  document.querySelectorAll("[data-adjust]").forEach(btn => {
    btn.addEventListener("click", () => {
      const field = btn.dataset.adjust;
      const delta = parseFloat(btn.dataset.delta);
      const input = document.querySelector(`[data-grade-field="${field}"]`);
      if (!input) return;
      let val = parseFloat(input.value) || 0;
      val = Math.round((val + delta) * 2) / 2;
      val = Math.min(10, Math.max(0, val));
      input.value = val.toFixed(1);
    });
  });
}

render();
