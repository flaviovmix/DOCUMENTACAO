// =======================================================================
// FOOTER
// Editar SOMENTE este arquivo para mudar links do rodapé
// de todas as páginas.
//
// Cada HTML precisa:
//   1. <div id="footer"><div id="footer-inner"></div></div>
//   2. <script src="[path]/js/footer.js"></script>
// =======================================================================

var FOOTER = {
    episodios: [
        {
            grupo: "NOVO MÓDULO",
            items: [
                { label: "DepartamentoHome",       arquivo: "1-DepartamentoHome.html" },
                { label: "DepartamentoManager",     arquivo: "2-DepartamentoManager.html" },
                { label: "DepartamentoMdFactory",   arquivo: "3-DepartamentoMdFactory.html" },
                { label: "AppsRootModelFactory",    arquivo: "4-AppsRootModelFactory.html" },
                { label: "PnlCfg",                  arquivo: "5-PnlCfg.html" },
                { label: "RootManager",              arquivo: "6-RootManager.html" },
                { label: "HomeDesk",                 arquivo: "7-HomeDesk.html" }
            ],
            pasta: "1-novo-modulo"
        },
        {
            grupo: "CRUD",
            items: [
                { label: "ModuloProdutoBean",     arquivo: "ModuloProdutoBean.html" },
                { label: "ModuloProdutoWBean",    arquivo: "ModuloProdutoWBean.html" },
                { label: "ModuloProdutoDAO",      arquivo: "ModuloProdutoDAO.html" },
                { label: "ModuloProdutoModel",    arquivo: "ModuloProdutoModel.html" },
                { label: "ModuloProdutoAction",   arquivo: "ModuloProdutoAction.html" },
                { label: "ModuloProdutoList",     arquivo: "ModuloProdutoList.html" },
                { label: "ModuloProdutoForm",     arquivo: "ModuloProdutoForm.html" }
            ],
            pasta: "2-crud"
        }
    ],
    extras: [
        {
            grupo: "Conceitos",
            items: [
                { label: "O que é uma Action",        href: "#" },
                { label: "O que é um Manager",         href: "#" },
                { label: "O que é um DAO",             href: "#" },
                { label: "O que é um Bean",            href: "#" },
                { label: "Fluxo de uma requisição",    href: "#" }
            ]
        },
        {
            grupo: "Padrões",
            items: [
                { label: "Nomenclatura de arquivos",   href: "#" },
                { label: "Constante ROOT",             href: "#" },
                { label: "Campo qs_xxx",               href: "#" },
                { label: "LinkBox e FK",               href: "#" },
                { label: "Detail e N-N",               href: "#" }
            ]
        },
        {
            grupo: "Referências",
            items: [
                { label: "CLAUDE.md",              href: "#" },
                { label: "Jasap — código-fonte",   href: "#" },
                { label: "app — modelo",           href: "#" },
                { label: "Banco PRD_TREINAMENTO",  href: "#" }
            ]
        }
    ]
};

function buildFooter() {
    var inner = document.getElementById('footer-inner');
    if (!inner) return;

    var path = location.pathname.replace(/\\/g, '/');

    // Detectar em qual pasta a página está
    var currentFolder = '';
    for (var i = 0; i < FOOTER.episodios.length; i++) {
        if (path.indexOf('/' + FOOTER.episodios[i].pasta + '/') > -1) {
            currentFolder = FOOTER.episodios[i].pasta;
            break;
        }
    }

    var html = '';

    // Episódios
    for (var i = 0; i < FOOTER.episodios.length; i++) {
        var ep = FOOTER.episodios[i];
        var prefix;

        if (currentFolder === ep.pasta) {
            prefix = '';
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

    // Extras (links fixos)
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

document.addEventListener('DOMContentLoaded', buildFooter);
