// =======================================================================
// MENU LATERAL (DRAWER)
// Editar SOMENTE este arquivo para mudar a ordem, renomear ou
// adicionar itens no painel lateral de todas as páginas.
//
// Cada HTML precisa:
//   1. <div id="drawer"><div id="drawer-inner"></div></div>
//   2. <script src="[path]/js/menu.js"></script>
//
// O script detecta automaticamente o nível da página pela URL
// e calcula os paths relativos corretos.
// =======================================================================

var MENU = [
    {
        grupo: "NOVO MÓDULO",
        pagina: "novo-modulo.html",
        items: [
            { label: "1 — DepartamentoHome",       arquivo: "1-DepartamentoHome.html" },
            { label: "2 — DepartamentoManager",     arquivo: "2-DepartamentoManager.html" },
            { label: "3 — DepartamentoMdFactory",   arquivo: "3-DepartamentoMdFactory.html" },
            { label: "4 — AppsRootModelFactory",    arquivo: "4-AppsRootModelFactory.html" },
            { label: "5 — PnlCfg",                  arquivo: "5-PnlCfg.html" },
            { label: "6 — RootManager",              arquivo: "6-RootManager.html" },
            { label: "7 — HomeDesk",                 arquivo: "7-HomeDesk.html" }
        ],
        pasta: "1-novo-modulo"
    },
    {
        grupo: "CRUD",
        pagina: "crud.html",
        items: [
            { label: "1º — ModuloProdutoBean",     arquivo: "ModuloProdutoBean.html" },
            { label: "2º — ModuloProdutoWBean",    arquivo: "ModuloProdutoWBean.html" },
            { label: "3º — ModuloProdutoDAO",      arquivo: "ModuloProdutoDAO.html" },
            { label: "4º — ModuloProdutoModel",    arquivo: "ModuloProdutoModel.html" },
            { label: "5º — ModuloProdutoAction",   arquivo: "ModuloProdutoAction.html" },
            { label: "6º — ModuloProdutoList",     arquivo: "ModuloProdutoList.html" },
            { label: "7º — ModuloProdutoForm",     arquivo: "ModuloProdutoForm.html" }
        ],
        pasta: "2-crud"
    }
];

function buildMenu() {
    var inner = document.getElementById('drawer-inner');
    if (!inner) return;

    var path = location.pathname.replace(/\\/g, '/');
    var currentPage = path.split('/').pop();

    // Detectar em qual pasta a página está
    var currentFolder = '';
    for (var i = 0; i < MENU.length; i++) {
        if (path.indexOf('/' + MENU[i].pasta + '/') > -1) {
            currentFolder = MENU[i].pasta;
            break;
        }
    }

    var html = '';
    for (var i = 0; i < MENU.length; i++) {
        var g = MENU[i];
        var prefix;

        if (currentFolder === g.pasta) {
            // Mesma pasta — path direto
            prefix = '';
        } else if (currentFolder !== '') {
            // Outra pasta de pages — sobe um nível
            prefix = '../' + g.pasta + '/';
        } else {
            // Raiz (index.html) — desce até pages
            prefix = 'pages/' + g.pasta + '/';
        }

        html += '<div class="menu-group">';
        html += '<div class="menu-group-header" onclick="toggleGroup(this)">';
        html += g.grupo;
        html += ' <span class="menu-group-arrow">&#9660;</span>';
        html += '</div>';
        html += '<div class="menu-group-items">';
        for (var j = 0; j < g.items.length; j++) {
            var item = g.items[j];
            var active = (currentPage === item.arquivo) ? ' active' : '';
            html += '<a class="menu-item' + active + '" href="' + prefix + item.arquivo + '">' + item.label + '</a>';
        }

        html += '</div></div>';
    }

    inner.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', buildMenu);
