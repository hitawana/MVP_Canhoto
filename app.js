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

// Mapeamento: área do simulado → disciplina + bimestre + campo bimestral (B)
const vinculos = [
  { area: "LC", discId: "port", bim: 0, campo: "b" },
  { area: "MT", discId: "mat",  bim: 0, campo: "b" },
  { area: "CN", discId: "bio",  bim: 0, campo: "b" },
  { area: "CH", discId: "hist", bim: 0, campo: "b" }
];

// Notas M (mensais): [M1, M2, M3, M4] → índices [0, 1, 2, 3]
// 4º bimestre (índice 3) = null em todos (ainda não iniciado)
const rawMensal = {
  aluno01: { port:[7.5,8.0,7.0,null], mat:[8.0,7.5,8.5,null], bio:[7.0,8.0,6.5,null], fis:[6.5,7.0,7.0,null], qui:[7.5,8.0,7.5,null], hist:[6.0,7.0,8.0,null], geo:[8.0,8.5,7.5,null], ing:[7.0,7.5,7.0,null] },
  aluno02: { port:[6.5,7.0,6.0,null], mat:[5.5,6.0,5.5,null], bio:[6.0,6.5,5.5,null], fis:[5.0,5.5,5.0,null], qui:[6.0,6.5,6.0,null], hist:[7.0,6.5,6.5,null], geo:[7.0,7.5,6.5,null], ing:[6.5,6.0,6.0,null] },
  aluno03: { port:[9.0,8.5,9.0,null], mat:[8.5,9.0,9.5,null], bio:[8.0,9.0,8.5,null], fis:[7.5,8.0,8.0,null], qui:[8.5,9.0,8.5,null], hist:[8.0,9.0,8.5,null], geo:[9.0,9.5,9.0,null], ing:[8.0,8.5,8.0,null] },
  aluno04: { port:[5.0,6.0,5.5,null], mat:[6.0,5.5,5.0,null], bio:[5.5,6.0,5.0,null], fis:[4.5,5.0,4.5,null], qui:[5.0,5.5,5.0,null], hist:[6.0,5.5,5.5,null], geo:[6.5,6.0,6.0,null], ing:[5.5,5.5,5.0,null] },
  aluno05: { port:[7.0,7.5,7.5,null], mat:[7.5,8.0,7.0,null], bio:[7.5,8.0,7.5,null], fis:[6.0,6.5,6.5,null], qui:[7.0,7.5,7.0,null], hist:[7.0,7.5,7.5,null], geo:[7.5,8.0,8.0,null], ing:[7.0,7.5,7.0,null] }
};

// Notas B (bimestrais): [B1, B2, B3, B4]
// B1 de port/mat/bio/hist vem do simulado (rawBimestral = null); fis/qui/geo/ing são manuais
// B2 e B3: todos manuais (sem vínculo de simulado nesses bimestres)
// B4: null em todos (ainda não iniciado)
const rawBimestral = {
  aluno01: { port:[null,7.5,8.0,null], mat:[null,8.0,8.0,null], bio:[null,7.0,7.5,null], fis:[6.0,7.0,7.0,null], qui:[7.5,7.5,8.0,null], hist:[null,7.0,7.5,null], geo:[7.5,8.5,8.0,null], ing:[6.5,7.0,7.5,null] },
  aluno02: { port:[null,6.5,6.5,null], mat:[null,6.0,5.5,null], bio:[null,6.0,5.5,null], fis:[5.0,5.5,5.0,null], qui:[6.0,6.0,5.5,null], hist:[null,6.5,6.0,null], geo:[7.0,7.0,6.5,null], ing:[6.0,6.0,5.5,null] },
  aluno03: { port:[null,8.5,9.0,null], mat:[null,9.0,9.5,null], bio:[null,8.0,9.0,null], fis:[7.5,8.0,8.0,null], qui:[8.5,9.0,8.5,null], hist:[null,8.5,9.0,null], geo:[9.0,9.0,9.5,null], ing:[8.0,8.5,8.5,null] },
  aluno04: { port:[null,5.5,5.0,null], mat:[null,5.5,4.5,null], bio:[null,5.0,5.0,null], fis:[4.5,5.0,4.5,null], qui:[5.0,5.0,4.5,null], hist:[null,5.5,5.0,null], geo:[6.0,6.0,5.5,null], ing:[5.5,5.0,4.5,null] },
  aluno05: { port:[null,7.0,7.5,null], mat:[null,8.0,7.5,null], bio:[null,7.5,8.0,null], fis:[6.0,6.5,7.0,null], qui:[7.0,7.5,7.0,null], hist:[null,7.5,7.5,null], geo:[7.5,8.0,8.5,null], ing:[7.0,7.0,7.5,null] }
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
    name: "Supervisão",
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
  { id: "avaliacoes",   label: "Avaliações",  icon: "notebook-pen" },
  { id: "substitutiva", label: "Substitutiva", icon: "clipboard-list" },
  { id: "gestao",       label: "Gestão",      icon: "settings-2", adminOnly: true }
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
  { id: "sim1", name: "Simulado Diagnóstico 1",           period: "1º bimestre", serie: "1ª série", segment: "Ensino Médio",    status: "Processado",         students: 152, inconsistencies: 3 },
  { id: "sim2", name: "Simulado Linguagens e Humanas",    period: "2º bimestre", serie: "2ª série", segment: "Ensino Médio",    status: "Aguardando planilha", students: 0,   inconsistencies: 0 },
  { id: "sim3", name: "Simulado Natureza e Matemática",   period: "2º bimestre", serie: "3ª série", segment: "Ensino Médio",    status: "Cadastrado",          students: 0,   inconsistencies: 0 },
  { id: "sim4", name: "Simulado Diagnóstico — Fund. II",  period: "1º bimestre", serie: "6ª série", segment: "Fundamental II", status: "Processado",          students: 124, inconsistencies: 1 },
  { id: "sim5", name: "Simulado Geral — 2º bimestre",     period: "2º bimestre", serie: "2ª série", segment: "Ensino Médio",    status: "Cadastrado",          students: 0,   inconsistencies: 0 },
  { id: "sim6", name: "Simulado Linguagens — 3ª série",   period: "3º bimestre", serie: "3ª série", segment: "Ensino Médio",    status: "Aguardando planilha", students: 0,   inconsistencies: 0 }
];

const avaliacoes = [
  { id: "av1", name: "Avaliação Parcial",        discipline: "Matemática",          turma: "1ª série A", period: "1º bimestre", status: "pendente",      done: 24, total: 32, type: "Somativa", professor: "Marina A.", createdAt: "2026-05-07" },
  { id: "av2", name: "Produção Textual",         discipline: "Linguagens",          turma: "1ª série B", period: "1º bimestre", status: "em lançamento", done: 18, total: 31, type: "Somativa", professor: "Carlos M." },
  { id: "av3", name: "Atividade Investigativa",  discipline: "Ciências da Natureza",turma: "2ª série A", period: "1º bimestre", status: "concluída",     done: 29, total: 29, type: "Somativa", professor: "Ana B." },
  { id: "av4", name: "Simulado Diagnóstico 1",   discipline: "Todas",               turma: "1ª série A", period: "1º bimestre", status: "concluída",     done: 32, total: 32, type: "Simulado", professor: null }
];

const substitutivaData = [
  { id:"sub1", nome:"Aluno 02",    turma:"1ª série A", serie:"1ª série", disciplina:"Física",     mediaAtual:5.3, tipo:"Substitutiva", adaptacaoTipo:null,               situacao:"Pendente",   nota:null, dataRealizacao:null,         observacoes:"" },
  { id:"sub2", nome:"Aluno 04",    turma:"1ª série A", serie:"1ª série", disciplina:"Física",     mediaAtual:4.8, tipo:"Adaptada",      adaptacaoTipo:"Adaptada tipo 1",  situacao:"Pendente",   nota:null, dataRealizacao:null,         observacoes:"" },
  { id:"sub3", nome:"Aluno 04",    turma:"1ª série A", serie:"1ª série", disciplina:"Química",    mediaAtual:5.1, tipo:"Substitutiva",  adaptacaoTipo:null,               situacao:"Registrado", nota:6.5,  dataRealizacao:"2026-05-10", observacoes:"Prova realizada sem intercorrências." },
  { id:"sub4", nome:"Ana Costa",   turma:"2ª série A", serie:"2ª série", disciplina:"Matemática", mediaAtual:5.7, tipo:"Substitutiva",  adaptacaoTipo:null,               situacao:"Pendente",   nota:null, dataRealizacao:null,         observacoes:"" },
  { id:"sub5", nome:"Bruno Lima",  turma:"2ª série B", serie:"2ª série", disciplina:"Biologia",   mediaAtual:4.5, tipo:"Adaptada",      adaptacaoTipo:"Adaptada tipo 2",  situacao:"Registrado", nota:7.0,  dataRealizacao:"2026-05-12", observacoes:"Prova adaptada com tempo estendido." },
  { id:"sub6", nome:"Carla Dias",  turma:"3ª série A", serie:"3ª série", disciplina:"História",   mediaAtual:5.9, tipo:"Substitutiva",  adaptacaoTipo:null,               situacao:"Pendente",   nota:null, dataRealizacao:null,         observacoes:"" },
  { id:"sub7", nome:"Diego Rocha", turma:"3ª série B", serie:"3ª série", disciplina:"Química",    mediaAtual:4.2, tipo:"Adaptada",      adaptacaoTipo:"Adaptada tipo 1",  situacao:"Pendente",   nota:null, dataRealizacao:null,         observacoes:"" }
];
const substitutivaSerieOptions = ["Todas as séries", "1ª série", "2ª série", "3ª série"];
const substitutivaTipoOptions  = ["Todas", "Substitutiva", "Adaptada"];
const substitutivaCut = 6.0;

const users = [
  { name: "Marina A.",  profile: "Professor",   segment: "Ensino Médio", vinculo: "Matemática | 1ª A, 2ª A" },
  { name: "João F.",    profile: "Professor",   segment: "Ensino Médio", vinculo: "Física | 2ª A, 3ª B" },
  { name: "Renata S.",  profile: "Supervisão",  segment: "Ensino Médio", vinculo: "Todas as turmas" },
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
  selectedBimestre: 0,
  simuladoFilter: "Todos",
  substitutivaSerieFilter: "Todas as séries",
  substitutivaTipoFilter: "Todas",
  substitutivaSearch: "",
  substitutivaPanelOpen: false,
  substitutivaPanelStudent: null,
  substitutivaPanelTab: "visualizar",
  substitutivaSelected: []
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

// Retorna { m, b, media, isSimulado } por aluno × disciplina × bimestre
// m = avaliação mensal (M1-M4), b = avaliação bimestral (B1-B4, pode vir de simulado)
// Nota consolidada B = min(10, b + pontoExtra) — calculada na view
function buildGradesData() {
  const result = {};
  students.forEach(student => {
    result[student.id] = {};
    disciplines.forEach(disc => {
      result[student.id][disc.id] = bimLabels.map((_, bim) => {
        const m = rawMensal[student.id]?.[disc.id]?.[bim] ?? null;
        const vinculo = vinculos.find(v => v.discId === disc.id && v.bim === bim && v.campo === "b");
        const bFromSim = vinculo ? (student.scores[vinculo.area] ?? null) : null;
        const bManual  = rawBimestral[student.id]?.[disc.id]?.[bim] ?? null;
        const b = bFromSim !== null ? bFromSim : bManual;
        const isSimulado = !!vinculo && bFromSim !== null;
        const media = (m !== null && b !== null) ? (m + b) / 2 : null;
        return { m, b, media, isSimulado };
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
  if (view === "substitutiva" && state.role === "professor") {
    toast("Substitutiva não está disponível para o perfil Professor.");
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
          ${navItems.filter(item => !(state.role === "professor" && (item.id === "simulados" || item.id === "substitutiva"))).map((item) => {
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
    substitutiva:     substitutivaView,
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
        ["86%",    "Registro atual", "chart-no-axes-column-increasing"],
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
      [String(substitutivaData.length), "substitutivas previstas", "clipboard-list"],
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
          <div class="kpi-top">
            <span class="mini-icon">${icon(iconName)}</span>
            <strong>${value}</strong>
          </div>
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
                <tr>
                  <th style="width:30%">Turma</th>
                  <th style="width:35%">Segmento</th>
                  <th style="width:35%">Registro</th>
                </tr>
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
  const mLabel = `M${bim + 1}`;
  const bLabel = `B${bim + 1}`;
  const bimName = bimLabels[bim];
  const gradeData = buildGradesData();
  const visibleDiscs = state.role === "professor"
    ? disciplines.filter(d => d.id === "mat")
    : disciplines;

  // Verifica se alguma disciplina visível tem vínculo de simulado neste bimestre
  const hasSimVinculo = visibleDiscs.some(d =>
    vinculos.some(v => v.discId === d.id && v.bim === bim && v.campo === "b")
  );

  // Calcula progresso de preenchimento do bimestre selecionado
  const totalCells  = students.length * visibleDiscs.length * 2; // M + B por célula
  let filledCells = 0;
  students.forEach(s => {
    visibleDiscs.forEach(d => {
      const cell = gradeData[s.id][d.id][bim];
      if (cell.m !== null) filledCells++;
      if (cell.b !== null) filledCells++;
    });
  });
  const pct = totalCells > 0 ? Math.round((filledCells / totalCells) * 100) : 0;

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

    <div class="bim-context-bar">
      <span class="bim-context-meta">
        Preenchimento: <strong>${pct}%</strong>
        ${hasSimVinculo ? `· <span class="sim-badge">${icon("zap")} ${bLabel} via simulado</span>` : ""}
      </span>
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
                <th class="col-note-label">${mLabel}</th>
                <th class="col-note-label">${bLabel}</th>
                <th class="col-note-label col-media-header">Méd ${bim + 1}</th>
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
                      <td class="cell-note">${formatNote(cell.m)}</td>
                      <td class="cell-note ${cell.isSimulado ? "cell-sim" : ""}">${formatNote(cell.b)}</td>
                      <td class="cell-media">${cell.media !== null
                        ? `<b class="score-pill-sm ${mediaClass}">${cell.media.toFixed(1)}</b>`
                        : `<span class="muted">—</span>`
                      }</td>
                    `;
                  }).join("")}
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>

    ${hasSimVinculo ? `
      <div class="legend-row">
        <span class="sim-legend">${icon("zap")} ${bLabel} alimentada automaticamente pelo simulado vinculado a ${bimName}</span>
      </div>
    ` : ""}
  `;
}

/* ── Student detail ─────────────────────────────── */

function studentDetailView() {
  if (state.role === "professor") return professorStudentEditView();
  const student = state.selectedStudent;
  const bim = state.selectedBimestre;
  const mLabel = `M${bim + 1}`;
  const bLabel = `B${bim + 1}`;
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
                <th>${mLabel}</th>
                <th>${bLabel}</th>
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
                    <td>${formatNote(cell.m)}</td>
                    <td class="${cell.isSimulado ? "cell-sim" : ""}">${formatNote(cell.b)}</td>
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
      <span class="sim-legend">${icon("zap")} ${bLabel} alimentada por simulado vinculado</span>
    </div>
  `;
}

/* ── Professor student edit ─────────────────────── */

function professorStudentEditView() {
  const student = state.selectedStudent;
  const bim = state.selectedBimestre;
  const mLabel = `M${bim + 1}`;
  const bLabel = `B${bim + 1}`;
  const gradeData = buildGradesData()[student.id];
  const disc = disciplines.find(d => d.id === "mat");
  const cell = gradeData[disc.id][bim];
  // Ponto extra atual lido do DOM (ou 0 no primeiro render)
  const pontoExtra = parseFloat(document.querySelector("[data-grade-field='mat-extra']")?.value) || 0;
  const bConsolidada = cell.b !== null ? Math.min(10, cell.b + pontoExtra) : null;
  const mediaFinal = cell.m !== null && bConsolidada !== null ? (cell.m + bConsolidada) / 2 : null;
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
            <div>
              <span class="grade-edit-label">${mLabel} — Avaliação mensal</span>
              <p class="grade-edit-hint">Nota da avaliação mensal somativa</p>
            </div>
            <div class="grade-point-ctrl">
              <button class="icon-button" data-adjust="mat-m" data-delta="-0.5" aria-label="Retirar 0,5">${icon("minus")}</button>
              <input class="grade-input" type="number" min="0" max="10" step="0.5" value="${cell.m ?? 0}" data-grade-field="mat-m" aria-label="${mLabel} de ${student.name}" />
              <button class="icon-button" data-adjust="mat-m" data-delta="0.5" aria-label="Adicionar 0,5">${icon("plus")}</button>
            </div>
          </div>

          <div class="grade-edit-row">
            <div>
              <span class="grade-edit-label">${bLabel} — Nota base${cell.isSimulado ? " (simulado)" : ""}</span>
              <p class="grade-edit-hint">${cell.isSimulado ? "Gerada automaticamente pelo simulado vinculado" : "Avaliação bimestral somativa"}</p>
            </div>
            <div class="grade-point-ctrl">
              <button class="icon-button" disabled aria-label="Bloqueado">${icon("minus")}</button>
              <input class="grade-input" type="number" value="${cell.b ?? "—"}" disabled aria-label="${bLabel} base de ${student.name}" />
              <button class="icon-button" disabled aria-label="Bloqueado">${icon("plus")}</button>
            </div>
          </div>

          <div class="grade-edit-row">
            <div>
              <span class="grade-edit-label">Ponto extra</span>
              <p class="grade-edit-hint">Acréscimo aplicado à nota base ${bLabel} · máximo 2,0</p>
            </div>
            <div class="grade-point-ctrl">
              <button class="icon-button" data-adjust="mat-extra" data-delta="-0.5" aria-label="Retirar 0,5">${icon("minus")}</button>
              <input class="grade-input" type="number" min="0" max="2" step="0.5" value="${pontoExtra.toFixed(1)}" data-grade-field="mat-extra" aria-label="Ponto extra de ${student.name}" />
              <button class="icon-button" data-adjust="mat-extra" data-delta="0.5" aria-label="Adicionar 0,5">${icon("plus")}</button>
            </div>
          </div>

          <div class="grade-edit-row grade-edit-row--result">
            <div>
              <span class="grade-edit-label">${bLabel} consolidada</span>
              <p class="grade-edit-hint">min(10, ${bLabel} base + ponto extra)</p>
            </div>
            ${bConsolidada !== null
              ? `<b class="score-pill ${scoreClass(bConsolidada)}">${bConsolidada.toFixed(1)}</b>`
              : `<span class="muted">—</span>`}
          </div>

          ${mediaFinal !== null ? `
            <div class="grade-edit-row grade-edit-row--result">
              <div>
                <span class="grade-edit-label">Média</span>
                <p class="grade-edit-hint">(${mLabel} + ${bLabel} consolidada) ÷ 2</p>
              </div>
              <b class="score-pill ${scoreClass(mediaFinal)}">${mediaFinal.toFixed(1)}</b>
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

const simStatusMeta = {
  "Processado":         { icon: "check-circle",  label: "Processado" },
  "Aguardando planilha":{ icon: "clock",          label: "Aguardando planilha" },
  "Cadastrado":         { icon: "file-plus",      label: "Cadastrado" }
};

const simFilterOptions = ["Todos", "Cadastrado", "Aguardando planilha", "Processado"];

function simuladosView() {
  const activeFilter = state.simuladoFilter || "Todos";
  const filtered = activeFilter === "Todos"
    ? simulados
    : simulados.filter(s => s.status === activeFilter);

  const triggerMeta = activeFilter === "Todos"
    ? { icon: "filter", label: "Todos" }
    : (simStatusMeta[activeFilter] || { icon: "filter", label: activeFilter });

  return `
    ${pageHead("Simulados", "Importação e processamento automático das planilhas de simulado.", `
      <button class="primary-button" data-open-simulado="sim2">${icon("upload")} Importar planilha</button>
    `)}

    <div class="custom-dropdown dropdown-left" data-sim-dropdown style="margin-bottom:16px;">
      <button class="dropdown-trigger" data-sim-dropdown-toggle aria-haspopup="listbox" aria-expanded="false">
        <span class="dropdown-trigger-icon">${icon(triggerMeta.icon)}</span>
        <span class="dropdown-trigger-label">${triggerMeta.label}</span>
        <span class="dropdown-chevron">${icon("chevron-down")}</span>
      </button>
      <div class="dropdown-panel" data-sim-dropdown-panel hidden>
        ${simFilterOptions.map(opt => {
          const meta = opt === "Todos"
            ? { icon: "filter", label: "Todos" }
            : (simStatusMeta[opt] || { icon: "file", label: opt });
          const count = opt === "Todos"
            ? simulados.length
            : simulados.filter(s => s.status === opt).length;
          return `
            <button class="dropdown-item ${activeFilter === opt ? "active" : ""}" data-sim-filter="${opt}">
              <span class="dropdown-item-icon">${icon(meta.icon)}</span>
              <span class="dropdown-item-label">${meta.label}</span>
              ${opt !== "Todos" ? `<span class="sim-filter-count">${count}</span>` : ""}
              <span class="dropdown-check ${activeFilter === opt ? "visible" : ""}">${icon("check")}</span>
            </button>
          `;
        }).join("")}
      </div>
    </div>

    ${filtered.length === 0 ? `
      <div class="panel">
        <div class="panel-body" style="text-align:center;padding:40px;">
          <span class="mini-icon" style="width:44px;height:44px;margin:0 auto 14px;">${icon("search-x")}</span>
          <p class="muted">Nenhum simulado com status "${activeFilter}" encontrado.</p>
        </div>
      </div>
    ` : `
      <div class="grid sim-grid">
        ${filtered.map((sim) => {
          const meta = simStatusMeta[sim.status] || { icon: "file", label: sim.status };
          return `
            <article class="sim-card" data-open-simulado="${sim.id}">
              <div class="sim-card-head">
                <div>
                  <h3>${sim.name}</h3>
                  <p class="sim-card-meta">${sim.period} · ${sim.segment} · ${sim.serie}</p>
                </div>
                <span class="sim-status-label">${icon(meta.icon)}</span>
              </div>
              <div class="card-foot" style="margin-top:14px;">
                <span class="muted" style="font-size:0.82rem;">
                  ${sim.students ? sim.students + " alunos processados" : "Planilha não importada"}
                </span>
                <span style="color:var(--muted);opacity:0.45;">${icon("chevron-right")}</span>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `}
  `;
}

/* ── Simulado detail ────────────────────────────── */

function simuladoDetailView() {
  const sim = state.selectedSimulado;
  const canEdit = ["admin", "auxiliar"].includes(state.role);
  return `
    ${pageHead(sim.name, `${sim.period} · ${sim.segment} · ${sim.serie}`, `
      <button class="secondary-button" data-view="simulados">${icon("arrow-left")} Simulados</button>
      ${sim.status === "Processado"
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
      <div class="kpi"><span class="mini-icon">${icon("clipboard-list")}</span><strong>${substitutivaData.length}</strong><span>substitutivas previstas</span></div>
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
  const professorUser = roles[state.role]?.user;
  let list = avaliacoes;
  if (state.role === "professor") {
    list = avaliacoes.filter(av => av.professor === professorUser && av.type === "Somativa");
  }
  return `
    ${pageHead("Avaliações", "Acompanhamento das notas avaliativas por disciplina e turma.", `
      <button class="primary-button" data-view="lancamento">${icon("notebook-pen")} Lançar notas</button>
    `)}
    <div class="panel">
      <div class="panel-body">
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Avaliação</th><th>Tipo</th><th>Disciplina</th><th>Turma</th><th>Período</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              ${list.map((av) => `
                <tr>
                  <td>${av.name}</td>
                  <td><span class="tag ${av.type === "Simulado" ? "info" : "ok"}">${av.type}</span></td>
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
  const bim = state.selectedBimestre;
  const mLabel = `M${bim + 1}`;
  const bLabel = `B${bim + 1}`;
  const bimName = bimLabels[bim];
  const readOnly = state.role === "auxiliar";
  const gradeData = buildGradesData();

  // Verifica se existe vínculo de simulado para mat neste bimestre
  const matVinculo = vinculos.find(v => v.discId === "mat" && v.bim === bim && v.campo === "b");

  return `
    ${pageHead(
      "Lançamento de notas",
      `Avaliação Parcial · Matemática · 1ª série A · ${bimName}`, `
      <button class="secondary-button" data-view="avaliacoes">${icon("arrow-left")} Voltar</button>
      ${!readOnly ? `<button class="primary-button" data-save-grades>${icon("save")} Salvar</button>` : ""}
    `)}
    <div class="bim-tabs">
      ${bimLabels.map((label, i) => `
        <button class="bim-tab ${bim === i ? "active" : ""}" data-bim="${i}">${label}</button>
      `).join("")}
    </div>
    <div class="panel">
      <div class="panel-body">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Matrícula</th>
                <th>${mLabel} — Mensal</th>
                <th>${bLabel} — Bimestral${matVinculo ? ` ${icon("zap")}` : ""}</th>
                <th>Situação</th>
              </tr>
            </thead>
            <tbody>
              ${students.map((student) => {
                const cell = gradeData[student.id]["mat"][bim];
                const hasPendingM = cell.m === null;
                return `
                  <tr>
                    <td>${student.name}</td>
                    <td>${student.matricula}</td>
                    <td>
                      <input
                        type="number" min="0" max="10" step="0.5"
                        value="${cell.m ?? ""}"
                        placeholder="—"
                        aria-label="${mLabel} de ${student.name}"
                        style="width:80px;border:1.5px solid var(--line);border-radius:7px;padding:6px 10px;background:var(--surface);color:var(--text);outline:none;"
                        ${readOnly ? "disabled" : ""}
                      />
                    </td>
                    <td>
                      ${cell.isSimulado
                        ? `<b class="score-pill ${cell.b !== null ? scoreClass(cell.b) : ""}">${cell.b !== null ? cell.b.toFixed(1) : "—"}</b>`
                        : `<input type="number" min="0" max="10" step="0.5"
                            value="${cell.b ?? ""}"
                            placeholder="—"
                            aria-label="${bLabel} de ${student.name}"
                            style="width:80px;border:1.5px solid var(--line);border-radius:7px;padding:6px 10px;background:var(--surface);color:var(--text);outline:none;"
                            ${readOnly ? "disabled" : ""} />`
                      }
                    </td>
                    <td>
                      <span class="status ${hasPendingM ? "wait" : "ok"}">${hasPendingM ? "Pendente" : "Lançado"}</span>
                    </td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
        ${matVinculo ? `
          <p class="muted" style="font-size:0.82rem;margin:10px 0 0;display:flex;align-items:center;gap:6px;">
            ${icon("zap")} ${bLabel} preenchida automaticamente pelo simulado vinculado.
          </p>
        ` : ""}
      </div>
    </div>
  `;
}

/* ── Substitutiva ───────────────────────────────── */

function filteredSubstitutivaData() {
  let list = substitutivaData;
  if (state.substitutivaSerieFilter !== "Todas as séries") {
    list = list.filter(s => s.serie === state.substitutivaSerieFilter);
  }
  if (state.substitutivaTipoFilter !== "Todas") {
    list = list.filter(s => s.tipo === state.substitutivaTipoFilter);
  }
  if (state.substitutivaSearch.trim()) {
    const q = state.substitutivaSearch.trim().toLowerCase();
    list = list.filter(s =>
      s.nome.toLowerCase().includes(q) ||
      s.disciplina.toLowerCase().includes(q) ||
      s.turma.toLowerCase().includes(q)
    );
  }
  return list;
}

function subInitials(nome) {
  return nome.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

function subSerieColor(serie) {
  if (serie === "1ª série") return "#7252A1";
  if (serie === "2ª série") return "#C43A91";
  return "#A8C04A";
}

function substitutivaView() {
  const filtered    = filteredSubstitutivaData();
  const total       = substitutivaData.length;
  const pendentes   = substitutivaData.filter(s => s.situacao === "Pendente").length;
  const registrados = substitutivaData.filter(s => s.situacao === "Registrado").length;
  const adaptadas   = substitutivaData.filter(s => s.tipo === "Adaptada").length;

  return `
    ${pageHead("Substitutiva", "Registro de provas substitutivas e adaptadas para alunos abaixo do corte.", `
      <button class="secondary-button" data-view="avaliacoes">${icon("arrow-left")} Avaliações</button>
      ${state.role !== "professor" ? `<button class="primary-button" data-toast="Funcionalidade disponível na versão completa.">${icon("plus")} Nova substitutiva</button>` : ""}
    `)}

    <div class="grid kpi-grid">
      ${[
        [total,       "alunos elegíveis",    "users-round"],
        [pendentes,   "provas pendentes",    "clock"],
        [registrados, "registros concluídos","check-circle"],
        [adaptadas,   "provas adaptadas",    "clipboard-list"]
      ].map(([val, label, ic]) => `
        <div class="kpi">
          <div class="kpi-top">
            <span class="mini-icon">${icon(ic)}</span>
            <strong>${val}</strong>
          </div>
          <span>${label}</span>
        </div>
      `).join("")}
    </div>

    <div class="sub-serie-tabs">
      ${substitutivaSerieOptions.map(opt => `
        <button class="sub-serie-tab ${state.substitutivaSerieFilter === opt ? "active" : ""}" data-sub-serie="${opt}">${opt}</button>
      `).join("")}
    </div>

    <div class="sub-filter-bar">
      <div class="sub-tipo-pills">
        ${substitutivaTipoOptions.map(opt => `
          <button class="sub-tipo-pill ${state.substitutivaTipoFilter === opt ? "active" : ""}" data-sub-tipo="${opt}">${opt}</button>
        `).join("")}
      </div>
      <div class="sub-search-wrap">
        <span class="sub-search-icon">${icon("search")}</span>
        <input
          class="sub-search-input"
          type="search"
          placeholder="Buscar aluno ou disciplina…"
          value="${state.substitutivaSearch}"
          data-sub-search
        />
      </div>
    </div>

    ${filtered.length === 0 ? `
      <div class="panel">
        <div class="panel-body" style="text-align:center;padding:48px 20px;">
          <span class="mini-icon" style="width:44px;height:44px;margin:0 auto 14px;">${icon("search-x")}</span>
          <p style="font-weight:600;margin:0 0 4px;">Nenhum aluno encontrado</p>
          <p class="muted" style="font-size:0.85rem;margin:0;">Tente ajustar os filtros ou o termo de busca.</p>
        </div>
      </div>
    ` : `
      <div class="panel" style="overflow:hidden;">
        <div class="sub-table-wrap">
          <table class="sub-table">
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Turma</th>
                <th>Disciplina</th>
                <th>Média atual</th>
                <th>Tipo</th>
                <th>Situação</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map(s => `
                <tr class="sub-row ${state.substitutivaPanelOpen && state.substitutivaPanelStudent?.id === s.id ? "sub-row--active" : ""}" data-sub-open="${s.id}">
                  <td>
                    <div class="sub-avatar-row">
                      <span class="sub-avatar" style="background:${subSerieColor(s.serie)};">${subInitials(s.nome)}</span>
                      <span class="sub-nome">${s.nome}</span>
                    </div>
                  </td>
                  <td class="muted" style="font-size:0.84rem;">${s.turma}</td>
                  <td>${s.disciplina}</td>
                  <td><b class="score-pill ${scoreClass(s.mediaAtual)}">${s.mediaAtual.toFixed(1)}</b></td>
                  <td>${s.adaptacaoTipo
                    ? `<span class="sub-tipo-tag sub-tipo-tag--adaptada">${s.adaptacaoTipo}</span>`
                    : `<span class="muted" style="font-size:0.84rem;">Padrão</span>`
                  }</td>
                  <td><span class="sub-situacao sub-situacao--${s.situacao === "Registrado" ? "ok" : "wait"}">${s.situacao}</span></td>
                  <td>
                    <button class="ghost-button" style="min-height:30px;padding:4px 10px;font-size:0.8rem;" data-sub-open="${s.id}">
                      ${icon("panel-right-open")}
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}

    ${state.substitutivaPanelOpen && state.substitutivaPanelStudent ? substitutivaPanel() : ""}
  `;
}

function substitutivaPanel() {
  const s = state.substitutivaPanelStudent;
  const tab = state.substitutivaPanelTab;
  const tabs = [
    { id: "visualizar", label: "Visualizar" },
    { id: "editar",     label: "Editar" },
    { id: "incluir",    label: "Incluir nota" }
  ];
  const readOnly = state.role === "professor" || state.role === "coordenacao";

  return `
    <div class="sub-panel-backdrop" data-sub-close></div>
    <div class="sub-panel" role="dialog" aria-modal="true" aria-label="Detalhe da substitutiva">
      <div class="sub-panel-header">
        <div class="sub-avatar-row">
          <span class="sub-avatar sub-avatar--lg" style="background:${subSerieColor(s.serie)};">${subInitials(s.nome)}</span>
          <div>
            <strong style="font-size:0.96rem;">${s.nome}</strong>
            <div style="font-size:0.78rem;color:var(--muted);margin-top:2px;">${s.turma} · ${s.disciplina}</div>
          </div>
        </div>
        <button class="icon-button" data-sub-close aria-label="Fechar painel">${icon("x")}</button>
      </div>

      <div class="tabs" style="padding:0 20px;">
        ${tabs.map(t => `
          <button class="tab-button ${tab === t.id ? "active" : ""}" data-sub-tab="${t.id}">${t.label}</button>
        `).join("")}
      </div>

      <div class="sub-panel-body">
        ${tab === "visualizar" ? `
          <dl class="sub-detail-list">
            <dt>Tipo</dt>
            <dd><span class="sub-tipo-tag sub-tipo-tag--${s.tipo === "Adaptada" ? "adaptada" : "sub"}">${s.tipo}</span></dd>
            <dt>Série</dt>
            <dd>${s.serie}</dd>
            <dt>Turma</dt>
            <dd>${s.turma}</dd>
            <dt>Disciplina</dt>
            <dd>${s.disciplina}</dd>
            <dt>Média atual</dt>
            <dd><b class="score-pill ${scoreClass(s.mediaAtual)}">${s.mediaAtual.toFixed(1)}</b></dd>
            <dt>Corte</dt>
            <dd>${substitutivaCut.toFixed(1)}</dd>
            <dt>Situação</dt>
            <dd><span class="sub-situacao sub-situacao--${s.situacao === "Registrado" ? "ok" : "wait"}">${s.situacao}</span></dd>
            ${s.nota !== null ? `<dt>Nota substitutiva</dt><dd><b class="score-pill ${scoreClass(s.nota)}">${s.nota.toFixed(1)}</b></dd>` : ""}
            ${s.dataRealizacao ? `<dt>Data de realização</dt><dd>${s.dataRealizacao}</dd>` : ""}
            ${s.observacoes ? `<dt>Observações</dt><dd style="font-style:italic;color:var(--muted);">${s.observacoes}</dd>` : ""}
          </dl>
        ` : tab === "editar" ? `
          <div class="form-grid" style="padding:0;">
            <label class="field">
              <span>Tipo de prova</span>
              <select ${readOnly ? "disabled" : ""}>
                <option ${s.tipo === "Substitutiva" ? "selected" : ""}>Substitutiva</option>
                <option ${s.tipo === "Adaptada" ? "selected" : ""}>Adaptada</option>
              </select>
            </label>
            <label class="field">
              <span>Data de realização</span>
              <input type="date" value="${s.dataRealizacao || ""}" ${readOnly ? "disabled" : ""} />
            </label>
            <label class="field" style="grid-column:1/-1;">
              <span>Observações</span>
              <input value="${s.observacoes || ""}" placeholder="Anotações sobre a aplicação…" ${readOnly ? "disabled" : ""} />
            </label>
          </div>
          ${!readOnly ? `
            <div style="margin-top:16px;display:flex;justify-content:flex-end;">
              <button class="primary-button" data-toast="Dados atualizados no protótipo.">${icon("save")} Salvar</button>
            </div>
          ` : `<p class="muted" style="font-size:0.82rem;margin-top:12px;display:flex;align-items:center;gap:6px;">${icon("lock")} Seu perfil pode apenas visualizar.</p>`}
        ` : `
          <div class="form-grid" style="padding:0;">
            <label class="field">
              <span>Nota obtida (0–10)</span>
              <input type="number" min="0" max="10" step="0.5" placeholder="Ex.: 6.5" ${readOnly ? "disabled" : ""} />
            </label>
            <label class="field">
              <span>Data de realização</span>
              <input type="date" value="${s.dataRealizacao || ""}" ${readOnly ? "disabled" : ""} />
            </label>
            <label class="field" style="grid-column:1/-1;">
              <span>Observações</span>
              <input value="${s.observacoes || ""}" placeholder="Registro de intercorrências ou observações…" ${readOnly ? "disabled" : ""} />
            </label>
          </div>
          ${!readOnly ? `
            <div style="margin-top:16px;display:flex;justify-content:flex-end;">
              <button class="primary-button" data-toast="Nota registrada no protótipo.">${icon("check")} Registrar nota</button>
            </div>
          ` : `<p class="muted" style="font-size:0.82rem;margin-top:12px;display:flex;align-items:center;gap:6px;">${icon("lock")} Seu perfil pode apenas visualizar.</p>`}
        `}
      </div>

      <div class="sub-panel-footer">
        ${icon("triangle-alert")} Protótipo — os dados não são salvos. A versão completa integrará o lançamento ao boletim do aluno.
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
          <span>Tipo</span>
          <select data-av-type>
            <option value="Somativa" selected>Somativa</option>
            <option value="Simulado">Simulado</option>
          </select>
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
          <span>Bimestre</span>
          <select>
            <option>1º Bimestre</option>
            <option>2º Bimestre</option>
            <option>3º Bimestre</option>
            <option>4º Bimestre</option>
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
        <label class="field">
          <span>Professor responsável</span>
          <select>
            ${users.filter(u => u.profile === "Professor").map(u => `<option>${u.name}</option>`).join("")}
          </select>
        </label>
      </div>
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid var(--line);">
        <p style="margin:0 0 6px;font-size:0.84rem;font-weight:600;display:flex;align-items:center;gap:6px;">${icon("info")} Regra de nota consolidada</p>
        <p style="margin:0;font-size:0.82rem;color:var(--muted);line-height:1.6;">
          <strong>Somativa</strong> — lançada diretamente pelo professor na disciplina vinculada.<br>
          <strong>Simulado</strong> — nota gerada automaticamente após processamento da planilha de simulado.<br><br>
          Nota consolidada B = <strong>min(10, nota base B + ponto extra)</strong><br>
          Média = <strong>(M + B consolidada) ÷ 2</strong>
        </p>
      </div>
      <div style="display:flex;justify-content:flex-end;margin-top:16px;">
        <button class="primary-button" data-toast="Avaliação cadastrada no protótipo.">${icon("plus")} Cadastrar avaliação</button>
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
            <th>Nota bimestral (B)</th>
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

  const simDdToggle = document.querySelector("[data-sim-dropdown-toggle]");
  const simDdPanel  = document.querySelector("[data-sim-dropdown-panel]");

  simDdToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = !simDdPanel.hasAttribute("hidden");
    if (isOpen) {
      simDdPanel.setAttribute("hidden", "");
      simDdToggle.setAttribute("aria-expanded", "false");
    } else {
      simDdPanel.removeAttribute("hidden");
      simDdToggle.setAttribute("aria-expanded", "true");
      setTimeout(() => {
        document.addEventListener("click", () => {
          simDdPanel?.setAttribute("hidden", "");
          simDdToggle?.setAttribute("aria-expanded", "false");
        }, { once: true });
      }, 0);
    }
  });

  document.querySelectorAll("[data-dropdown-role]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.role = btn.dataset.dropdownRole;
      if (state.role !== "admin" && state.view === "gestao") state.view = "painel";
      if (state.role === "professor" && (state.view === "simulados" || state.view === "substitutiva")) state.view = "painel";
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

  document.querySelectorAll("[data-sim-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.simuladoFilter = btn.dataset.simFilter;
      render();
    });
  });

  document.querySelectorAll("[data-adjust]").forEach(btn => {
    btn.addEventListener("click", () => {
      const field = btn.dataset.adjust;
      const delta = parseFloat(btn.dataset.delta);
      const input = document.querySelector(`[data-grade-field="${field}"]`);
      if (!input) return;
      let val = parseFloat(input.value) || 0;
      val = Math.round((val + delta) * 2) / 2;
      const max = field === "mat-extra" ? 2 : 10;
      val = Math.min(max, Math.max(0, val));
      input.value = val.toFixed(1);
      // Recalcula consolidada e média em tempo real sem re-render
      if (field === "mat-extra") {
        const bBase = parseFloat(document.querySelector("[data-grade-field='mat-b']")?.value) || 0;
        const bCons = Math.min(10, bBase + val);
        const mVal  = parseFloat(document.querySelector("[data-grade-field='mat-m']")?.value) || 0;
        const med   = (mVal + bCons) / 2;
        document.querySelectorAll(".grade-edit-row--result .score-pill").forEach((pill, i) => {
          const v = i === 0 ? bCons : med;
          pill.textContent = v.toFixed(1);
          pill.className = `score-pill ${scoreClass(v)}`;
        });
      }
    });
  });

  // ── Substitutiva ──────────────────────────────────

  document.querySelectorAll("[data-sub-serie]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.substitutivaSerieFilter = btn.dataset.subSerie;
      render();
    });
  });

  document.querySelectorAll("[data-sub-tipo]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.substitutivaTipoFilter = btn.dataset.subTipo;
      render();
    });
  });

  document.querySelector("[data-sub-search]")?.addEventListener("input", e => {
    state.substitutivaSearch = e.target.value;
    const scrollY = window.scrollY;
    render();
    window.scrollTo(0, scrollY);
    const inp = document.querySelector("[data-sub-search]");
    if (inp) { inp.focus(); const len = inp.value.length; inp.setSelectionRange(len, len); }
  });

  document.querySelectorAll("[data-sub-open]").forEach(el => {
    el.addEventListener("click", e => {
      if (e.target.closest("[data-sub-check-cell]")) return;
      const id = el.dataset.subOpen;
      const student = substitutivaData.find(s => s.id === id);
      if (!student) return;
      state.substitutivaPanelOpen = true;
      state.substitutivaPanelStudent = student;
      state.substitutivaPanelTab = "visualizar";
      render();
    });
  });

  document.querySelectorAll("[data-sub-close]").forEach(el => {
    el.addEventListener("click", () => {
      state.substitutivaPanelOpen = false;
      state.substitutivaPanelStudent = null;
      render();
    });
  });

  document.querySelectorAll("[data-sub-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.substitutivaPanelTab = btn.dataset.subTab;
      render();
    });
  });

  document.querySelectorAll("[data-sub-check]").forEach(chk => {
    chk.addEventListener("change", () => {
      const id = chk.dataset.subCheck;
      if (chk.checked) {
        if (!state.substitutivaSelected.includes(id)) state.substitutivaSelected.push(id);
      } else {
        state.substitutivaSelected = state.substitutivaSelected.filter(x => x !== id);
      }
      render();
    });
  });

  document.querySelector("[data-sub-check-all]")?.addEventListener("change", e => {
    const filtered = filteredSubstitutivaData();
    state.substitutivaSelected = e.target.checked ? filtered.map(s => s.id) : [];
    render();
  });

  document.querySelectorAll("[data-sub-check-cell]").forEach(td => {
    td.addEventListener("click", e => e.stopPropagation());
  });

  document.querySelector("[data-sub-clear-sel]")?.addEventListener("click", () => {
    state.substitutivaSelected = [];
    render();
  });
}

render();
