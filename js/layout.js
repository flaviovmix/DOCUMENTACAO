// =====================================================================
// LAYOUT.JS — Estrutura completa da documentação XT - Treinamento
//
// Único script necessário em cada HTML. Faz tudo:
//   1. Injeta CSS (docs.css, highlight.js themes, font-awesome)
//   2. Monta a estrutura (topbar, drawer, content-inner, footer)
//   3. Gera breadcrumb automaticamente a partir do path
//   4. Monta menu lateral e rodapé
//   5. Inicializa componentes (áudio, carrossel, syntax highlight, etc.)
//   6. Restaura estado (drawer, tema, zoom) do localStorage
//
// Cada HTML precisa apenas:
//   <script src="[basePath]js/layout.js"></script>
//
// Incorpora: menu.js + footer.js + docs.js
// =====================================================================

(function() {
'use strict';

// ─── Dados do Menu ─────────────────────────────────────────────────

var MENU = [
    {
        grupo: 'NOVO MÓDULO',
        pagina: 'novo-modulo.html',
        items: [
            { label: '1 - DepartamentoHome',     arquivo: '1-DepartamentoHome/1-DepartamentoHome.html',   tipo: 'novo' },
            { label: '2 - DepartamentoManager',   arquivo: '2-DepartamentoManager/2-DepartamentoManager.html', tipo: 'novo' },
            { label: '3 - DepartamentoMdFactory', arquivo: '3-DepartamentoMdFactory/3-DepartamentoMdFactory.html', tipo: 'novo' },
            { label: '4 - AppsRootModelFactory',  arquivo: '4-AppsRootModelFactory/4-AppsRootModelFactory.html', tipo: 'editar' },
            { label: '5 - PnlCfg',               arquivo: '5-PnlCfg/5-PnlCfg.html',                     tipo: 'editar' },
            { label: '6 - RootManager',           arquivo: '6-RootManager/6-RootManager.html',             tipo: 'editar' },
            { label: '7 - HomeDesk',              arquivo: '7-HomeDesk/7-HomeDesk.html',                   tipo: 'editar' }
        ],
        pasta: '1-novo-modulo'
    },
    {
        grupo: 'CRUD',
        pagina: 'crud.html',
        subgrupos: [
            {
                label: 'READ',
                items: [
                    { label: '1 - DepartamentoProdutoBean',   arquivo: '1-DepartamentoProdutoBean/1-DepartamentoProdutoBean.html',   tipo: 'novo' },
                    { label: '2 - DepartamentoProdutoWBean',  arquivo: '2-DepartamentoProdutoWBean/2-DepartamentoProdutoWBean.html',  tipo: 'novo' },
                    { label: '3 - DepartamentoProdutoDAO',    arquivo: '3-DepartamentoProdutoDAO/3-DepartamentoProdutoDAO.html',    tipo: 'novo' },
                    { label: '4 - DepartamentoProdutoModel',  arquivo: '4-DepartamentoProdutoModel/4-DepartamentoProdutoModel.html',  tipo: 'novo' },
                    { label: '5 - DepartamentoProdutoAction', arquivo: '5-DepartamentoProdutoAction/5-DepartamentoProdutoAction.html', tipo: 'novo' },
                    { label: '6 - getManager',                arquivo: '6-getManager/6-getManager.html',                tipo: 'editar' },
                    { label: '7 - DepartamentoMdFactory',     arquivo: '7-DepartamentoMdFactory/7-DepartamentoMdFactory.html',     tipo: 'editar' },
                    { label: '8 - DepartamentoProdutoList',   arquivo: '8-DepartamentoProdutoList/8-DepartamentoProdutoList.html',   tipo: 'novo' },
                    { label: '9 - DepartamentoHome',          arquivo: '9-DepartamentoHome/9-DepartamentoHome.html',          tipo: 'editar' }
                ]
            },
            {
                label: 'DELETE',
                items: [
                    { label: '1 - DepartamentoProdutoBean',   arquivo: '1-DepartamentoProdutoBean/1-DepartamentoProdutoBean.html',   tipo: 'editar' },
                    { label: '2 - DepartamentoProdutoWBean',  arquivo: '2-DepartamentoProdutoWBean/2-DepartamentoProdutoWBean.html',  tipo: 'check' },
                    { label: '3 - DepartamentoProdutoDAO',    arquivo: '3-DepartamentoProdutoDAO/3-DepartamentoProdutoDAO.html',    tipo: 'editar' },
                    { label: '4 - DepartamentoProdutoModel',  arquivo: '4-DepartamentoProdutoModel/4-DepartamentoProdutoModel.html',  tipo: 'novo' },
                    { label: '5 - DepartamentoProdutoAction', arquivo: '5-DepartamentoProdutoAction/5-DepartamentoProdutoAction.html', tipo: 'check' },
                    { label: '6 - getManager',                arquivo: '6-getManager/6-getManager.html',                tipo: 'novo' },
                    { label: '7 - DepartamentoMdFactory',     arquivo: '7-DepartamentoMdFactory/7-DepartamentoMdFactory.html',     tipo: 'check' },
                    { label: '8 - DepartamentoProdutoList',   arquivo: '8-DepartamentoProdutoList/8-DepartamentoProdutoList.html',   tipo: 'editar' },
                    { label: '9 - DepartamentoHome',          arquivo: '9-DepartamentoHome/9-DepartamentoHome.html',          tipo: 'novo' }
                ]
            },
            { label: 'CREATE', items: [] },
            { label: 'UPDATE', items: [] }
        ],
        pasta: '2-crud'
    }
];

var FOOTER = {
    episodios: [
        {
            grupo: 'NOVO MÓDULO',
            items: [
                { label: 'DepartamentoHome',     arquivo: '1-DepartamentoHome/1-DepartamentoHome.html' },
                { label: 'DepartamentoManager',   arquivo: '2-DepartamentoManager/2-DepartamentoManager.html' },
                { label: 'DepartamentoMdFactory', arquivo: '3-DepartamentoMdFactory/3-DepartamentoMdFactory.html' },
                { label: 'AppsRootModelFactory',  arquivo: '4-AppsRootModelFactory/4-AppsRootModelFactory.html' },
                { label: 'PnlCfg',               arquivo: '5-PnlCfg/5-PnlCfg.html' },
                { label: 'RootManager',           arquivo: '6-RootManager/6-RootManager.html' },
                { label: 'HomeDesk',              arquivo: '7-HomeDesk/7-HomeDesk.html' }
            ],
            pasta: '1-novo-modulo'
        },
        {
            grupo: 'CRUD',
            items: [
                { label: 'DepartamentoProdutoBean',   arquivo: '1-DepartamentoProdutoBean/1-DepartamentoProdutoBean.html' },
                { label: 'DepartamentoProdutoWBean',  arquivo: '2-DepartamentoProdutoWBean/2-DepartamentoProdutoWBean.html' },
                { label: 'DepartamentoProdutoDAO',    arquivo: '3-DepartamentoProdutoDAO/3-DepartamentoProdutoDAO.html' },
                { label: 'DepartamentoProdutoModel',  arquivo: '4-DepartamentoProdutoModel/4-DepartamentoProdutoModel.html' },
                { label: 'DepartamentoProdutoAction', arquivo: '5-DepartamentoProdutoAction/5-DepartamentoProdutoAction.html' },
                { label: 'getManager',                arquivo: '6-getManager/6-getManager.html' },
                { label: 'DepartamentoMdFactory',     arquivo: '7-DepartamentoMdFactory/7-DepartamentoMdFactory.html' },
                { label: 'DepartamentoProdutoList',   arquivo: '8-DepartamentoProdutoList/8-DepartamentoProdutoList.html' },
                { label: 'DepartamentoHome',          arquivo: '9-DepartamentoHome/9-DepartamentoHome.html' }
            ],
            pasta: '2-crud'
        }
    ],
    extras: [
        {
            grupo: 'Conceitos',
            items: [
                { label: 'O que é uma Action',     href: '#' },
                { label: 'O que é um Manager',      href: '#' },
                { label: 'O que é um DAO',          href: '#' },
                { label: 'O que é um Bean',         href: '#' },
                { label: 'Fluxo de uma requisição', href: '#' }
            ]
        },
        {
            grupo: 'Padrões',
            items: [
                { label: 'Nomenclatura de arquivos', href: '#' },
                { label: 'Constante ROOT',           href: '#' },
                { label: 'Campo qs_xxx',             href: '#' },
                { label: 'LinkBox e FK',             href: '#' },
                { label: 'Detail e N-N',             href: '#' }
            ]
        },
        {
            grupo: 'Referências',
            items: [
                { label: 'CLAUDE.md',            href: '#' },
                { label: 'Jasap — código-fonte', href: '#' },
                { label: 'app — modelo',         href: '#' },
                { label: 'Banco PRD_TREINAMENTO', href: '#' }
            ]
        }
    ]
};

// ─── Base path (derivado do src do próprio script) ─────────────────

var BASE = document.currentScript.getAttribute('src').replace('js/layout.js', '');

// ─── Injetar CSS imediatamente (antes do DOM estar pronto) ─────────

(function injectCSS() {
    var head = document.head;

    // Esconder body até layout estar pronto (evita FOUC)
    var hide = document.createElement('style');
    hide.id = 'layout-hide';
    hide.textContent = 'body{visibility:hidden}';
    head.appendChild(hide);

    // docs.css
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = BASE + 'css/docs.css';
    head.appendChild(css);

    // highlight.js — tema claro
    var hljsLight = document.createElement('link');
    hljsLight.id = 'hljs-light';
    hljsLight.rel = 'stylesheet';
    hljsLight.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/intellij-light.min.css';
    head.appendChild(hljsLight);

    // highlight.js — tema escuro (desabilitado por padrão)
    var hljsDark = document.createElement('link');
    hljsDark.id = 'hljs-dark';
    hljsDark.rel = 'stylesheet';
    hljsDark.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css';
    hljsDark.disabled = true;
    head.appendChild(hljsDark);

    // font-awesome
    var fa = document.createElement('link');
    fa.rel = 'stylesheet';
    fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
    head.appendChild(fa);

    // Se tema escuro salvo, trocar hljs imediatamente
    if (localStorage.getItem('theme') === 'dark') {
        hljsLight.disabled = true;
        hljsDark.disabled = false;
    }
})();

// ─── Helpers ───────────────────────────────────────────────────────

function detectFolder(path) {
    for (var i = 0; i < MENU.length; i++) {
        if (path.indexOf('/' + MENU[i].pasta + '/') > -1) return MENU[i].pasta;
    }
    return '';
}

function findSection(folder) {
    for (var i = 0; i < MENU.length; i++) {
        if (MENU[i].pasta === folder) return MENU[i];
    }
    return null;
}

function loadScript(src) {
    return new Promise(function(resolve) {
        var s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = resolve;
        document.head.appendChild(s);
    });
}

// ─── Montar layout no DOMContentLoaded ─────────────────────────────

document.addEventListener('DOMContentLoaded', async function() {
    var path = location.pathname.replace(/\\/g, '/');
    var currentFile = path.split('/').pop();
    var currentFolder = detectFolder(path);
    var isRoot = (BASE === '' || BASE === './');
    var section = findSection(currentFolder);
    var isSectionIndex = section && currentFile === section.pagina;
    // Detecta se o HTML está numa subpasta dentro do grupo (ex: 1-DepartamentoHome/1-DepartamentoHome.html)
    var isSubFolder = false;
    if (currentFolder) {
        var afterGroup = path.split('/' + currentFolder + '/')[1] || '';
        isSubFolder = afterGroup.indexOf('/') !== -1;
    }

    // Extrair título da tag <title> (remove sufixo " — XT - Treinamento")
    var pageTitle = document.title.replace(/\s*[—–-]\s*XT\s*-\s*Treinamento\s*$/, '').trim();

    // Salvar conteúdo original do body
    var content = document.body.innerHTML;

    // Aplicar tema escuro antes de mostrar (evita flash branco)
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }

    // ── Breadcrumb ──
    var breadcrumbHTML = '';
    if (!isRoot && section) {
        breadcrumbHTML = '<nav class="breadcrumb-nav">';
        if (isSectionIndex) {
            breadcrumbHTML += '<span class="breadcrumb-sep">\u203a</span>';
            breadcrumbHTML += '<span class="breadcrumb-current">' + section.grupo + '</span>';
        } else {
            breadcrumbHTML += '<span class="breadcrumb-sep">\u203a</span>';
            breadcrumbHTML += '<a href="' + (isSubFolder ? '../' : '') + section.pagina + '">' + section.grupo + '</a>';
            breadcrumbHTML += '<span class="breadcrumb-sep">\u203a</span>';
            breadcrumbHTML += '<span class="breadcrumb-current">' + pageTitle + '</span>';
        }
        breadcrumbHTML += '</nav>';
    } else if (!isRoot && !section) {
        breadcrumbHTML = '<nav class="breadcrumb-nav">';
        breadcrumbHTML += '<span class="breadcrumb-sep">\u203a</span>';
        breadcrumbHTML += '<span class="breadcrumb-current">' + pageTitle + '</span>';
        breadcrumbHTML += '</nav>';
    }

    // ── Zoom controls ──
    var zoomHTML =
        '<div style="margin-left:auto;display:flex;align-items:center;gap:4px;">' +
            '<button onclick="changeZoom(-0.1)" title="Diminuir zoom" style="background:none;border:none;cursor:pointer;color:#555;font-size:1.1em;padding:4px 8px;line-height:1;" onmouseover="this.style.color=\'#2563eb\'" onmouseout="this.style.color=\'#555\'">\u2212</button>' +
            '<span id="zoom-label" onclick="toggleZoomMenu()" style="cursor:pointer;font-size:0.82em;color:#555;min-width:40px;text-align:center;position:relative;">100%' +
                '<div id="zoom-menu" style="display:none;position:absolute;top:100%;left:50%;transform:translateX(-50%);background:#fff;border:1px solid #dde1e7;border-radius:6px;box-shadow:0 4px 12px rgba(0,0,0,0.1);margin-top:8px;z-index:300;padding:4px 0;white-space:nowrap;">' +
                    '<a onclick="setZoom(0.75)" style="display:block;padding:6px 16px;color:#333;text-decoration:none;font-size:13px;cursor:pointer;">75%</a>' +
                    '<a onclick="setZoom(1)" style="display:block;padding:6px 16px;color:#333;text-decoration:none;font-size:13px;cursor:pointer;">100%</a>' +
                    '<a onclick="setZoom(1.25)" style="display:block;padding:6px 16px;color:#333;text-decoration:none;font-size:13px;cursor:pointer;">125%</a>' +
                    '<a onclick="setZoom(1.5)" style="display:block;padding:6px 16px;color:#333;text-decoration:none;font-size:13px;cursor:pointer;">150%</a>' +
                '</div>' +
            '</span>' +
            '<button onclick="changeZoom(0.1)" title="Aumentar zoom" style="background:none;border:none;cursor:pointer;color:#555;font-size:1.1em;padding:4px 8px;line-height:1;" onmouseover="this.style.color=\'#2563eb\'" onmouseout="this.style.color=\'#555\'">+</button>' +
            '<button id="theme-toggle" onclick="toggleTheme()" title="Alternar tema" style="background:none;border:none;cursor:pointer;color:#555;font-size:1.1em;padding:4px 10px;border-radius:4px;line-height:1;margin-left:8px;" onmouseover="this.style.color=\'#2563eb\'" onmouseout="this.style.color=\'#555\'">&#9788;</button>' +
        '</div>';

    // ── Montar HTML completo ──
    document.body.innerHTML =
        '<div id="topbar">' +
            '<button id="hamburger" onclick="toggleDrawer()"><span></span><span></span><span></span></button>' +
            '<a id="topbar-title" href="' + BASE + 'index.html">XT - Treinamento</a>' +
            breadcrumbHTML +
            zoomHTML +
        '</div>' +
        '<div id="layout">' +
            '<div id="drawer"><div id="drawer-inner"></div></div>' +
            '<div id="content">' +
                '<div id="topnav"></div>' +
                '<div id="content-inner">' + content + '</div>' +
                '<div id="footer"><div id="footer-inner"></div></div>' +
            '</div>' +
        '</div>';

    // ── Menu lateral ──
    buildMenu(currentFile, currentFolder, isSubFolder);

    // ── Footer ──
    buildFooter(currentFolder, isSubFolder);

    // ── Home cards — menu info toggle ──
    document.querySelectorAll('.home-card').forEach(function(card) {
        var btn = card.querySelector('.btnMenuCard');
        var info = card.querySelector('.home-card-info');

        if (btn && info) {
            btn.addEventListener('click', function(e) {
                info.classList.toggle('aberto');
                btn.classList.toggle('aberto');
            });
        }
    });

    // ── Inicializar componentes ──
    var inner = document.getElementById('content-inner');
    var hasCode = inner.querySelector('pre code');

    if (hasCode) {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js');
        highlightAll(inner);
        initRangeHighlights(inner);
        initLineHighlights(inner);
    }

    initCopyButtons(inner);
    initAudioPlayers(inner);
    await initCarousel(inner);
    initSideNav(inner);
    initTopnav(inner);

    // ── Restaurar estado do drawer ──
    if (localStorage.getItem('drawerOpen') === 'true') {
        document.getElementById('drawer').classList.add('open');
        document.getElementById('hamburger').classList.add('open');
        if (window.innerWidth <= 768) {
            createDrawerOverlay(true);
        }
    }

    // ── Tema — ícone (body.dark já aplicado acima) ──
    if (localStorage.getItem('theme') === 'dark') {
        document.getElementById('theme-toggle').innerHTML = '&#9790;';
    }

    // ── Mostrar body ──
    var hideStyle = document.getElementById('layout-hide');
    if (hideStyle) hideStyle.remove();
    document.body.style.visibility = 'visible';
});

// ═══════════════════════════════════════════════════════════════════
// MENU LATERAL (DRAWER)
// ═══════════════════════════════════════════════════════════════════

function buildMenu(currentPage, currentFolder, isSubFolder) {
    var inner = document.getElementById('drawer-inner');
    if (!inner) return;

    var html = '';
    for (var i = 0; i < MENU.length; i++) {
        var g = MENU[i];
        var prefix;

        if (currentFolder === g.pasta && isSubFolder) {
            prefix = '../';
        } else if (currentFolder === g.pasta) {
            prefix = '';
        } else if (currentFolder !== '' && isSubFolder) {
            prefix = '../../' + g.pasta + '/';
        } else if (currentFolder !== '') {
            prefix = '../' + g.pasta + '/';
        } else {
            prefix = 'pages/' + g.pasta + '/';
        }

        var isActiveGroup = (currentFolder === g.pasta);
        html += '<div class="menu-group' + (isActiveGroup ? '' : ' collapsed') + '">';
        html += '<div class="menu-group-header" onclick="toggleGroup(this)">';
        html += g.grupo;
        html += ' <span class="menu-group-arrow">&#9660;</span>';
        html += '</div>';
        html += '<div class="menu-group-items">';

        function renderItems(items) {
            var out = '';
            for (var j = 0; j < items.length; j++) {
                var item = items[j];
                var active = (currentPage === item.arquivo || item.arquivo.indexOf(currentPage) !== -1) ? ' active' : '';
                var badgeHtml = '';
                if (item.tipo === 'novo') {
                    badgeHtml = ' <i class="fa-solid fa-file-circle-plus" style="margin-left:6px;font-size:0.8em;color:#16a34a;" title="novo arquivo"></i>';
                } else if (item.tipo === 'editar') {
                    badgeHtml = ' <i class="fa-solid fa-pen-to-square" style="margin-left:6px;font-size:0.8em;color:#d97706;" title="editar arquivo"></i>';
                } else if (item.tipo === 'check') {
                    badgeHtml = ' <svg style="margin-left:6px;width:1em;height:1em;vertical-align:-0.1em;" viewBox="0 0 640 640" fill="#999" title="não precisa alterar"><path d="M160 128C107 128 64 171 64 224L64 480C64 533 107 576 160 576L416 576C469 576 512 533 512 480L512 384C512 366.3 497.7 352 480 352C462.3 352 448 366.3 448 384L448 480C448 497.7 433.7 512 416 512L160 512C142.3 512 128 497.7 128 480L128 224C128 206.3 142.3 192 160 192L256 192C273.7 192 288 177.7 288 160C288 142.3 273.7 128 256 128L160 128z"/><path d="M168 340L208 300L290 390L510 80L550 120L290 440Z"/></svg>';
                } else if (item.icon) {
                    badgeHtml = ' <i class="' + item.icon + '" style="opacity:0.4;margin-left:6px;font-size:0.85em;"></i>';
                }
                out += '<a class="menu-item' + active + '" href="' + prefix + item.arquivo + '">' + item.label + badgeHtml + '</a>';
            }
            return out;
        }

        if (g.subgrupos) {
            for (var s = 0; s < g.subgrupos.length; s++) {
                var sub = g.subgrupos[s];
                var hasItems = sub.items && sub.items.length > 0;
                var hasActive = false;
                if (hasItems) {
                    for (var k = 0; k < sub.items.length; k++) {
                        if (currentPage === sub.items[k].arquivo || sub.items[k].arquivo.indexOf(currentPage) !== -1) { hasActive = true; break; }
                    }
                }
                var subCollapsed = hasActive ? '' : ' collapsed';
                html += '<div class="menu-subgroup' + subCollapsed + '">';
                html += '<div class="menu-subgroup-label' + (hasItems ? '' : ' disabled') + '" onclick="toggleSubgroup(this)">';
                html += sub.label;
                html += ' <span class="menu-subgroup-arrow">&#9660;</span>';
                html += '</div>';
                html += '<div class="menu-subgroup-items">';
                if (hasItems) html += renderItems(sub.items);
                html += '</div></div>';
            }
        } else if (g.items) {
            html += renderItems(g.items);
        }

        html += '</div></div>';
    }

    inner.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════

function buildFooter(currentFolder, isSubFolder) {
    var inner = document.getElementById('footer-inner');
    if (!inner) return;

    var html = '';

    for (var i = 0; i < FOOTER.episodios.length; i++) {
        var ep = FOOTER.episodios[i];
        var prefix;

        if (currentFolder === ep.pasta && isSubFolder) {
            prefix = '../';
        } else if (currentFolder === ep.pasta) {
            prefix = '';
        } else if (currentFolder !== '' && isSubFolder) {
            prefix = '../../' + ep.pasta + '/';
        } else if (currentFolder !== '') {
            prefix = '../' + ep.pasta + '/';
        } else {
            prefix = 'pages/' + ep.pasta + '/';
        }

        html += '<div><h3>' + ep.grupo + '</h3>';
        for (var j = 0; j < ep.items.length; j++) {
            html += '<a href="' + prefix + ep.items[j].arquivo + '">' + ep.items[j].label + '</a>';
        }
        html += '</div>';
    }

    for (var k = 0; k < FOOTER.extras.length; k++) {
        var ex = FOOTER.extras[k];
        html += '<div><h3>' + ex.grupo + '</h3>';
        for (var l = 0; l < ex.items.length; l++) {
            html += '<a href="' + ex.items[l].href + '">' + ex.items[l].label + '</a>';
        }
        html += '</div>';
    }

    inner.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════════════
// UI CONTROLS — Drawer, Tema, Zoom
// ═══════════════════════════════════════════════════════════════════

// ── Drawer ──

function createDrawerOverlay(show) {
    var overlay = document.getElementById('drawer-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'drawer-overlay';
        overlay.style.cssText = 'position:fixed;inset:0;z-index:149;';
        overlay.addEventListener('click', function() { toggleDrawer(); });
        document.body.appendChild(overlay);
    }
    overlay.style.display = show ? 'block' : 'none';
}

function toggleDrawer() {
    var drawer = document.getElementById('drawer');
    var isOpen = drawer.classList.toggle('open');
    document.getElementById('hamburger').classList.toggle('open');
    localStorage.setItem('drawerOpen', isOpen);

    if (window.innerWidth <= 768) {
        createDrawerOverlay(isOpen);
    }
}

// ── Tema ──

function toggleTheme() {
    var dark = document.body.classList.toggle('dark');
    document.getElementById('theme-toggle').innerHTML = dark ? '&#9790;' : '&#9788;';
    var hljsLight = document.getElementById('hljs-light');
    var hljsDark  = document.getElementById('hljs-dark');
    if (hljsLight) hljsLight.disabled = dark;
    if (hljsDark)  hljsDark.disabled  = !dark;
    localStorage.setItem('theme', dark ? 'dark' : 'light');
}

// ── Zoom ──

var zoom = 1;

function changeZoom(delta) { setZoom(zoom + delta); }

function setZoom(value) {
    zoom = Math.min(2, Math.max(0.5, value));
    document.getElementById('content').style.fontSize = zoom + 'em';
    document.getElementById('zoom-label').childNodes[0].textContent = Math.round(zoom * 100) + '%';
    document.getElementById('zoom-menu').style.display = 'none';
}

function toggleZoomMenu() {
    var menu = document.getElementById('zoom-menu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

document.addEventListener('click', function(e) {
    var label = document.getElementById('zoom-label');
    if (label && !label.contains(e.target)) {
        var menu = document.getElementById('zoom-menu');
        if (menu) menu.style.display = 'none';
    }
});

// ── Toggle helpers (usados via onclick no HTML) ──

function toggleGroup(header) {
    header.closest('.menu-group').classList.toggle('collapsed');
}

function toggleSubgroup(label) {
    label.closest('.menu-subgroup').classList.toggle('collapsed');
}

function toggleInfoRow(btn) {
    var row = btn.closest('.info-row');
    row.classList.toggle('open');
}

function toggleChapter(header) {
    var clicked = header.closest('.chapter');
    var isCollapsed = clicked.classList.contains('collapsed');
    document.querySelectorAll('.chapter').forEach(function(c) { c.classList.add('collapsed'); });
    if (isCollapsed) {
        clicked.classList.remove('collapsed');
        setTimeout(function() {
            var top = clicked.getBoundingClientRect().top + window.scrollY - 52 - 24;
            window.scrollTo({ top: top, behavior: 'smooth' });
        }, 10);
    }
}

// ── Expor funções globais (necessárias para onclick no HTML) ──

window.toggleDrawer   = toggleDrawer;
window.toggleTheme    = toggleTheme;
window.changeZoom     = changeZoom;
window.setZoom        = setZoom;
window.toggleZoomMenu = toggleZoomMenu;
window.toggleGroup    = toggleGroup;
window.toggleSubgroup = toggleSubgroup;
window.toggleInfoRow  = toggleInfoRow;
window.toggleChapter  = toggleChapter;

// ═══════════════════════════════════════════════════════════════════
// INIT FUNCTIONS — Audio, Copy, Highlight, Carousel, SideNav, TopNav
// ═══════════════════════════════════════════════════════════════════

// ── Audio Players ──

function initAudioPlayers(container) {
    container.querySelectorAll('.audio-player').forEach(function(player) {
        var audio = player.querySelector('audio');
        var btn   = player.querySelector('.audio-btn');
        var seek  = player.querySelector('.audio-seek');
        var fill  = player.querySelector('.audio-progress-fill');
        var time  = player.querySelector('.audio-time');

        audio.src = player.dataset.src;

        function fmt(s) {
            var m = Math.floor(s / 60);
            return m + ':' + String(Math.floor(s % 60)).padStart(2, '0');
        }

        audio.addEventListener('loadedmetadata', function() {
            time.textContent = '0:00 / ' + fmt(audio.duration);
        });

        audio.addEventListener('timeupdate', function() {
            var pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
            fill.style.width = pct + '%';
            seek.value = pct;
            time.textContent = fmt(audio.currentTime) + ' / ' + fmt(audio.duration);
        });

        var iconPlay  = '<svg viewBox="0 0 24 24" width="14" height="14" fill="white"><polygon points="5,3 19,12 5,21"/></svg>';
        var iconPause = '<svg viewBox="0 0 24 24" width="14" height="14" fill="white"><rect x="5" y="3" width="4" height="18" rx="1"/><rect x="15" y="3" width="4" height="18" rx="1"/></svg>';

        btn.innerHTML = iconPlay;

        // botão -10s
        var btnBack = document.createElement('button');
        btnBack.className = 'audio-skip audio-back';
        btnBack.title = 'Voltar 10s';
        btnBack.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>';
        btnBack.addEventListener('click', function() { audio.currentTime = Math.max(0, audio.currentTime - 10); });

        // botão +10s
        var btnFwd = document.createElement('button');
        btnFwd.className = 'audio-skip audio-fwd';
        btnFwd.title = 'Avançar 10s';
        btnFwd.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12.01 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/></svg>';
        btnFwd.addEventListener('click', function() { audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10); });

        btn.before(btnBack);
        btn.after(btnFwd);

        audio.addEventListener('ended', function() { btn.innerHTML = iconPlay; });

        btn.addEventListener('click', function() {
            if (audio.paused) { audio.play(); btn.innerHTML = iconPause; }
            else              { audio.pause(); btn.innerHTML = iconPlay; }
        });

        seek.addEventListener('input', function() {
            if (audio.duration) audio.currentTime = (seek.value / 100) * audio.duration;
        });

        // velocidade
        var speeds = [0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];
        var speedLabels = {0.75: '0.7', 1.25: '1.2'};
        function speedLabel(s) { return (speedLabels[s] || s) + 'x'; }
        var speedWrap = document.createElement('div');
        speedWrap.className = 'audio-speed-wrap';
        var btnSpeed = document.createElement('button');
        btnSpeed.className = 'audio-skip audio-speed';
        btnSpeed.title = 'Velocidade';
        btnSpeed.textContent = '1x';
        var speedMenu = document.createElement('div');
        speedMenu.className = 'audio-speed-menu';
        speeds.forEach(function(s) {
            var opt = document.createElement('button');
            opt.textContent = speedLabel(s);
            opt.className = 'audio-speed-opt' + (s === 1 ? ' active' : '');
            opt.addEventListener('click', function(e) {
                e.stopPropagation();
                audio.playbackRate = s;
                btnSpeed.textContent = speedLabel(s);
                speedMenu.querySelectorAll('.audio-speed-opt').forEach(function(o) { o.classList.remove('active'); });
                opt.classList.add('active');
                speedMenu.classList.remove('show');
            });
            speedMenu.append(opt);
        });
        btnSpeed.addEventListener('click', function(e) { e.stopPropagation(); speedMenu.classList.toggle('show'); });
        document.addEventListener('click', function() { speedMenu.classList.remove('show'); });
        speedWrap.append(btnSpeed, speedMenu);
        time.after(speedWrap);

        // volume
        var iconVolOn  = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8.5v7a4.47 4.47 0 0 0 2.5-3.5zM14 3.23v2.06a6.51 6.51 0 0 1 0 13.42v2.06A8.5 8.5 0 0 0 14 3.23z"/></svg>';
        var iconVolOff = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M16.5 12A4.5 4.5 0 0 0 14 8.5v2.09l2.41 2.41c.06-.31.09-.65.09-1zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.46 8.46 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.46 8.46 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4l-1.88 1.88L12 7.76V4z"/></svg>';
        var volWrap = document.createElement('div');
        volWrap.className = 'audio-vol-wrap';
        var volBtn = document.createElement('button');
        volBtn.className = 'audio-skip audio-vol-btn';
        volBtn.title = 'Volume';
        volBtn.innerHTML = iconVolOn;
        function updateVolIcon() {
            volBtn.innerHTML = (audio.muted || audio.volume === 0) ? iconVolOff : iconVolOn;
        }
        var volSlider = document.createElement('input');
        volSlider.type = 'range';
        volSlider.className = 'audio-vol-slider';
        volSlider.min = '0';
        volSlider.max = '100';
        volSlider.value = '100';
        volSlider.addEventListener('input', function() {
            audio.volume = volSlider.value / 100;
            audio.muted = volSlider.value == 0;
            updateVolIcon();
        });
        volBtn.addEventListener('click', function() {
            audio.muted = !audio.muted;
            volSlider.value = audio.muted ? 0 : audio.volume * 100;
            updateVolIcon();
        });
        volWrap.append(volBtn, volSlider);
        speedWrap.after(volWrap);

        // download
        var btnDl = document.createElement('a');
        btnDl.className = 'audio-skip audio-download';
        btnDl.title = 'Download';
        btnDl.href = player.dataset.src;
        btnDl.download = '';
        btnDl.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>';
        volWrap.after(btnDl);

        // sentinel: div invisível para detectar quando o player grudou no topo
        var sentinel = document.createElement('div');
        sentinel.style.cssText = 'height:1px;margin-bottom:-1px;';
        player.parentNode.insertBefore(sentinel, player);

        // spacer: substitui o espaço do player no mobile quando vira fixed
        var spacer = document.createElement('div');
        spacer.style.display = 'none';
        player.parentNode.insertBefore(spacer, player.nextSibling);

        new IntersectionObserver(function(entries) {
            var stuck = !entries[0].isIntersecting;
            player.classList.toggle('audio-player--stuck', stuck);
            if (window.innerWidth <= 768) {
                spacer.style.display = stuck ? 'block' : 'none';
                spacer.style.height  = stuck ? player.offsetHeight + 'px' : '0';
            }
        }, { rootMargin: '-53px 0px 0px 0px', threshold: 0 }).observe(sentinel);
    });
}

// ── Copy Buttons ──

function initCopyButtons(container) {
    var iconCopy = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"/></svg>';
    var iconOk   = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>';

    container.querySelectorAll('pre').forEach(function(pre) {
        var btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.title = 'Copiar';
        btn.innerHTML = iconCopy;
        pre.appendChild(btn);

        btn.addEventListener('click', function() {
            var code = pre.querySelector('code');
            var text = code ? code.innerText : pre.innerText;
            navigator.clipboard.writeText(text).then(function() {
                btn.innerHTML = iconOk;
                btn.classList.add('copied');
                setTimeout(function() {
                    btn.innerHTML = iconCopy;
                    btn.classList.remove('copied');
                }, 1500);
            });
        });
    });
}

// ── Range Highlights (// ADICIONAR ... // FIM) ──

function initRangeHighlights(container) {
    container.querySelectorAll('pre code').forEach(function(code) {
        var lines = code.innerHTML.split('\n');
        var result = [];
        var i = 0;

        while (i < lines.length) {
            var plain = lines[i].replace(/<[^>]+>/g, '');

            if (plain.includes('// ADICIONAR')) {
                var fimIdx = -1;
                for (var k = i + 1; k < lines.length; k++) {
                    var kPlain = lines[k].replace(/<[^>]+>/g, '');
                    if (kPlain.includes('// ADICIONAR')) break;
                    if (kPlain.includes('// FIM')) { fimIdx = k; break; }
                }

                var group = [lines[i]];
                i++;

                if (fimIdx !== -1) {
                    while (i <= fimIdx) { group.push(lines[i]); i++; }
                } else {
                    while (i < lines.length) {
                        if (lines[i].replace(/<[^>]+>/g, '').trim() === '') break;
                        group.push(lines[i]);
                        i++;
                    }
                }

                result.push('<span class="line-add">' + group.join('\n') + '</span>');
            } else {
                result.push(lines[i]);
                i++;
            }
        }

        code.innerHTML = result.join('\n');
    });
}

// ── Line Highlights (data-add) ──

function initLineHighlights(container) {
    container.querySelectorAll('pre[data-add]').forEach(function(pre) {
        var code = pre.querySelector('code');
        if (!code) return;

        var targets = pre.dataset.add.split('|').map(function(s) {
            var m = s.trim().match(/^(.*?)(\+\d+)?$/);
            return { text: m[1], extra: m[2] ? parseInt(m[2].slice(1)) : -1 };
        });

        var lines = code.innerHTML.split('\n');
        var result = [];
        var i = 0;
        while (i < lines.length) {
            var plain = lines[i].replace(/<[^>]+>/g, '');
            var matchedTarget = targets.find(function(t) { return plain.includes(t.text); });
            if (matchedTarget) {
                var group = [lines[i]];
                var j = i + 1;
                if (matchedTarget.extra >= 0) {
                    for (var n = 0; n < matchedTarget.extra && j < lines.length; n++, j++) {
                        group.push(lines[j]);
                    }
                } else {
                    while (j < lines.length) {
                        var nextPlain = lines[j].replace(/<[^>]+>/g, '');
                        if (targets.some(function(t) { return nextPlain.includes(t.text); })) {
                            group.push(lines[j]);
                            j++;
                        } else {
                            break;
                        }
                    }
                }
                result.push('<span class="line-add">' + group.join('\n') + '</span>');
                i = j;
            } else {
                result.push(lines[i]);
                i++;
            }
        }
        // Junta sem \n extra após line-add (display:block já quebra a linha)
        var html = '';
        for (var k = 0; k < result.length; k++) {
            if (k > 0 && !result[k - 1].startsWith('<span class="line-add">')) {
                html += '\n';
            }
            html += result[k];
        }
        code.innerHTML = html;
    });
}

// ── Syntax Highlight (highlight.js + tokens customizados) ──

function highlightAll(container) {
    var java = hljs.getLanguage('java');
    java.keywords.built_in = (java.keywords.built_in || '') +
        ' regAction regFun preAjax eval update link ok isAjaxCall getInput getOutput ' +
        'getManager getFactory getUser getSession ui isAdmin isAdminXT isUpdate setInsert ' +
        'setUpdate render config row col setContent setStyle setHtmlData ajax modalMax ' +
        'putInteger putString childWindow toHtml btTitle btTitleActive add write';

    container.querySelectorAll('pre code').forEach(function(block) {
        hljs.highlightElement(block);
    });

    var classNames = [
        'ModuloManager','ModuloHome','ModuloMdFactory','PnlManager','AppsRootAction',
        'AppManager','XtPage','SideMenu','Table','TableRow','JasapPage','Response',
        'Effect','Js','LaboratorioManager','LaboratorioHome','LaboratorioMdFactory',
        'LabPessoaList','LabPessoaForm','LabPessoaSelect','LabProdutoList','LabProdutoForm',
        'LabProdutoSelect','LabPerfilList','LabPerfilForm','LabPerfilSelect',
        'Title','MenuItem','MenuInicial',
        'Check','JasapList','DomainValue','PcfgModel','PnlCfg','PainelMdFactory',
        'AppsRootModelFactory','ContatosMdFactory','GedMdFactory','TransactionFilter',
        'JasapRootManager','DataBase','DataBaseFilter','PerfFilter','EffectFilter',
        'AAFilter','ErrorFilter','PermissaoFilter','HomeManager','GedManager',
        'AppsUpdateProgress','RootManager'
    ];

    var methods = [
        'regAction','regFun','preAjax','eval','update','link','getManager','getInput',
        'getOutput','getFactory','isAjaxCall','toHtml','ajax','modalMax','putInteger',
        'putString','childWindow','btTitle','btTitleActive','render','config','add',
        'write','row','col','setContent','setStyle','ok','getUser','getSession','ui',
        'setLabel','setValue','setSelected','getValue','getSetting','insert','cfgModel',
        'painel','modulo','laboratorio','ged','contatos','setManager','getList',
        'hasModulo','isAdminXT','getString','getGlobalFilters','sessionConfig',
        'configGlobalFilters','line','concat'
    ];

    container.querySelectorAll('pre code').forEach(function(block) {
        var html = block.innerHTML;

        // Protege strings literais para não serem recoloridas
        var saved = [];
        html = html.replace(/<span class="hljs-string">[\s\S]*?<\/span>/g, function(match) {
            saved.push(match);
            return '\x00S' + (saved.length - 1) + '\x00';
        });

        html = html.replace(
            /\b(br\.xt[a-zA-Z0-9._]*)/g,
            '<span class="xt-package">$1</span>'
        );

        html = html.replace(
            /(\.)class\b/g,
            '.<span class="xt-constant">class</span>'
        );

        html = html.replace(
            /(?<!\x00)\b([A-Z][A-Z0-9_]{2,})\b(?=[^>]*<|[^<>]*$)/g,
            '<span class="xt-constant">$1</span>'
        );

        classNames.forEach(function(name) {
            html = html.replace(
                new RegExp('\\b(' + name + ')\\b(?=[^>]*<|[^<>]*$)', 'g'),
                '<span class="xt-class">$1</span>'
            );
        });

        methods.forEach(function(name) {
            html = html.replace(
                new RegExp('\\b(' + name + ')\\b(?=[^>]*<|[^<>]*$)', 'g'),
                '<span class="xt-method">$1</span>'
            );
        });

        // Restaura strings literais intactas
        saved.forEach(function(s, i) { html = html.replace('\x00S' + i + '\x00', s); });

        block.innerHTML = html;
    });
}

// ── Carousel ──

async function initCarousel(container) {
    for (var carousel of container.querySelectorAll('.carousel')) {
        var path = carousel.dataset.path;
        if (!path) continue;

        var srcs = await new Promise(function(resolve) {
            var found = [];
            function tryNext(i) {
                var img = new Image();
                img.onload  = function() { found.push(path + i + '.png'); tryNext(i + 1); };
                img.onerror = function() { resolve(found); };
                img.src = path + i + '.png';
            }
            tryNext(1);
        });

        if (srcs.length === 0) continue;
        var count = srcs.length;

        var track = document.createElement('div');
        track.className = 'carousel-track';

        var slides = [];
        for (var i = 0; i < count; i++) {
            var slide = document.createElement('div');
            slide.className = 'carousel-slide';
            var img = document.createElement('img');
            img.src = srcs[i];
            img.alt = 'Imagem ' + (i + 1) + ' de ' + count;
            slide.appendChild(img);
            track.appendChild(slide);
            slides.push(slide);
        }

        var svgL = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';
        var svgR = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';

        var btnPrev = document.createElement('button');
        btnPrev.className = 'carousel-btn carousel-btn--prev';
        btnPrev.title     = 'Anterior';
        btnPrev.innerHTML = svgL;

        var btnNext = document.createElement('button');
        btnNext.className = 'carousel-btn carousel-btn--next';
        btnNext.title     = 'Próxima';
        btnNext.innerHTML = svgR;

        var dotsWrap = document.createElement('div');
        dotsWrap.className = 'carousel-dots';
        var dots = [];
        for (var d = 0; d < count; d++) {
            var dot = document.createElement('button');
            dot.className = 'carousel-dot' + (d === 0 ? ' active' : '');
            dot.title     = 'Imagem ' + (d + 1);
            dotsWrap.appendChild(dot);
            dots.push(dot);
        }

        carousel.appendChild(track);
        carousel.appendChild(btnPrev);
        carousel.appendChild(btnNext);
        carousel.appendChild(dotsWrap);

        var current = 0;

        var goTo = (function(track, dots, count) {
            var cur = 0;
            return function(idx) {
                cur = (idx + count) % count;
                track.style.transform = 'translateX(-' + (cur * 100) + '%)';
                dots.forEach(function(d, i) { d.classList.toggle('active', i === cur); });
                return cur;
            };
        })(track, dots, count);

        current = goTo(0);

        (function(btnPrev, btnNext, dots, goTo, slides, srcs, count) {
            var current = 0;

            btnPrev.addEventListener('click', function() { current = goTo(current - 1); });
            btnNext.addEventListener('click', function() { current = goTo(current + 1); });
            dots.forEach(function(dot, i) { dot.addEventListener('click', function() { current = goTo(i); }); });

            // Lightbox
            function openLightbox(idx) {
                var lbIdx = idx;
                var lb = document.createElement('div');
                lb.className = 'carousel-lightbox';

                var img = document.createElement('img');
                img.src = srcs[lbIdx];
                img.alt = 'Imagem ' + (lbIdx + 1);

                var lbPrev = document.createElement('button');
                lbPrev.className = 'carousel-lb-btn carousel-lb-btn--prev';
                lbPrev.title     = 'Anterior';
                lbPrev.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';

                var lbNext = document.createElement('button');
                lbNext.className = 'carousel-lb-btn carousel-lb-btn--next';
                lbNext.title     = 'Próxima';
                lbNext.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';

                function lbGoTo(newIdx) {
                    lbIdx   = (newIdx + count) % count;
                    img.src = srcs[lbIdx];
                    current = goTo(lbIdx);
                }

                lbPrev.addEventListener('click', function(e) { e.stopPropagation(); lbGoTo(lbIdx - 1); });
                lbNext.addEventListener('click', function(e) { e.stopPropagation(); lbGoTo(lbIdx + 1); });

                lb.appendChild(lbPrev);
                lb.appendChild(img);
                lb.appendChild(lbNext);
                lb.addEventListener('click', function() { lb.remove(); });

                document.addEventListener('keydown', function lbKey(e) {
                    if (e.key === 'Escape')     { lb.remove(); document.removeEventListener('keydown', lbKey); }
                    if (e.key === 'ArrowLeft')  lbGoTo(lbIdx - 1);
                    if (e.key === 'ArrowRight') lbGoTo(lbIdx + 1);
                });

                document.body.appendChild(lb);
            }

            slides.forEach(function(slide, i) { slide.addEventListener('click', function() { openLightbox(i); }); });

            // Teclado: ← →
            var carouselEl = slides[0].closest('.carousel');
            carouselEl.setAttribute('tabindex', '0');
            carouselEl.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowLeft')  current = goTo(current - 1);
                if (e.key === 'ArrowRight') current = goTo(current + 1);
            });
        })(btnPrev, btnNext, dots, goTo, slides, srcs, count);
    }
}

// ── TopNav (navegação por h2) ──

function initTopnav(inner) {
    var topnav = document.getElementById('topnav');
    if (!topnav) return;
    topnav.classList.remove('visible');
    topnav.innerHTML = '';

    var topoLink = document.createElement('a');
    topoLink.href = '#';
    topoLink.textContent = '\u2191 início';
    topoLink.addEventListener('click', function(e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    topnav.appendChild(topoLink);

    var headings = inner.querySelectorAll('h2');
    headings.forEach(function(h, i) {
        if (!h.id) h.id = 'nav-' + i;
        var a = document.createElement('a');
        a.href = '#' + h.id;
        var text = h.textContent.trim();
        a.textContent = h.dataset.nav || (text.length > 24 ? text.slice(0, 24) + '\u2026' : text);
        a.title = text;
        topnav.appendChild(a);
    });

    if (headings.length > 0) {
        setTimeout(function() {
            topnav.classList.add('visible');
            if (window.innerWidth <= 768) document.body.classList.add('has-topnav');
        }, 50);

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var isH1 = entry.target.tagName === 'H1';
                    topnav.querySelectorAll('a').forEach(function(a) {
                        a.classList.toggle('active', !isH1 && a.getAttribute('href') === '#' + entry.target.id);
                    });
                }
            });
        }, { rootMargin: '-52px 0px -70% 0px', threshold: 0 });

        var h1 = inner.querySelector('h1');
        if (h1) { h1.id = h1.id || 'page-top'; observer.observe(h1); }
        headings.forEach(function(h) { observer.observe(h); });
    }
}

// ── SideNav (índice lateral para páginas com info-row) ──

function initSideNav(inner) {
    var rows = inner.querySelectorAll('.info-row');
    if (rows.length === 0) return;

    var nav = document.createElement('nav');
    nav.id = 'sidenav';

    var navInner = document.createElement('div');
    navInner.id = 'sidenav-inner';

    rows.forEach(function(row, i) {
        var titleEl = row.querySelector('.info-row-title');
        if (!titleEl) return;

        if (!row.id) row.id = 'section-' + i;

        var a = document.createElement('a');
        a.href = '#' + row.id;
        a.textContent = titleEl.textContent;

        a.addEventListener('click', function(e) {
            e.preventDefault();
            if (!row.classList.contains('open')) {
                row.classList.add('open');
            }
            setTimeout(function() {
                var top = row.getBoundingClientRect().top + window.scrollY - 60;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }, 50);
        });
        navInner.appendChild(a);
    });

    nav.appendChild(navInner);

    var layout = document.getElementById('layout');
    layout.appendChild(nav);

    // Hamburger toggle
    var arrow = document.createElement('div');
    arrow.id = 'sidenav-toggle-arrow';
    arrow.innerHTML = '<span></span><span></span><span></span>';
    arrow.title = 'Mostrar/ocultar índice';

    arrow.addEventListener('click', function() {
        var isOpen = nav.classList.toggle('open');
        arrow.classList.toggle('open', isOpen);
        localStorage.setItem('sidenavOpen', isOpen);
    });
    document.body.appendChild(arrow);

    // Restaurar estado salvo (aberto por padrão)
    if (localStorage.getItem('sidenavOpen') !== 'false') {
        nav.classList.add('open');
        arrow.classList.add('open');
    }

    // Scroll spy
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            var a = navInner.querySelector('a[href="#' + entry.target.id + '"]');
            if (a) a.classList.toggle('active', entry.isIntersecting);
        });
    }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });

    rows.forEach(function(row) { observer.observe(row); });
}

})();
