# Nota de saúde do projeto (0 a 10)

Ferramenta de diagnóstico. Não é etapa, não tem "pronto quando", e roda quando alguém quiser saber como o projeto está: antes de retomar depois de meses, antes de abrir pro primeiro usuário, ou quando bateu a sensação de que a casa desarrumou.

**Funciona em qualquer projeto**, tenha ele nascido deste molde ou não. Projeto que nunca viu o molde só vai tirar nota baixa em algumas dimensões, e é exatamente essa a informação.

---

## As três regras de quem aplica

1. **Não corrigir durante a análise.** Vale a mesma regra da Etapa 13: cada achado ganha destino decidido junto com o dono (corrigir já, pegar carona numa etapa, ou entrar na fila de erros). Quem corrige calado no meio da varredura perde a medida e não termina nenhuma das duas coisas.
2. **Nota sem evidência não vale.** Toda nota abaixo de 8 aponta arquivo e linha, ou o comando que provou. "Parece frágil" não é achado.
3. **Medir o que está lá, não o que se lembra.** Ler o código, rodar o que der pra rodar. Impressão de sessão antiga é a principal fonte de nota errada.

---

## As 8 dimensões

Cada uma vale de 0 a 10. O que cada nota significa está na régua do fim.

### 1. Segurança
Segredo versionado (senha, token, chave em arquivo do repo ou em migration). Autorização conferida rota a rota, com o padrão sendo negar. Senha com hash forte. Freio de força bruta no login. Upload validado por assinatura do arquivo, não pelo tipo declarado. Dependência com vulnerabilidade aberta.
**Prova rápida:** buscar por senha e chave no histórico do git; bater três papéis (anônimo, comum, admin) contra uma rota administrativa; conferir o alerta de dependência do repo.

### 2. Teste
Existe arnês rodando por um comando. Ele cobre o caminho crítico: autenticação, salvar com validação recusando, excluir. Roda contra banco de verdade. Bug já corrigido deixou teste que o reproduz.
**Prova rápida:** rodar a suíte. Se não roda por um comando, a nota já começa baixa, porque teste que ninguém consegue rodar não protege ninguém.

### 3. Legibilidade
Função com uma responsabilidade e tamanho que cabe na tela. Nome que dispensa comentário. HTML semântico. CSS e JS em arquivo por componente, não dentro do template. Pasta que um humano entende sem buscar.
**Prova rápida:** contar as funções maiores que ~60 linhas e as linhas de estilo e script inline dentro de template.

### 4. Duplicação
Clone do mesmo padrão (controller, modal, store, formulário, mapeador). Decisão repetida em N lugares: mudar o texto de um aviso comum exige lembrar de quantos arquivos?
**Prova rápida:** escolher um aviso ou uma regra que aparece em vários lugares e contar em quantos arquivos ela mora.

### 5. Banco e dados
Migrations versionadas e nunca editadas depois de aplicadas. Banco novo sobe do zero sem passo manual. Índice nas chaves estrangeiras e nas colunas de busca. Regra de exclusão pensada. Enum do código batendo com a restrição do banco.
**Prova rápida:** recriar o banco do zero. Se precisar de passo manual, a dimensão não passa de 5.

### 6. Deploy e operação
Procedimento de subir escrito e testado. Caminho de volta (rollback) que alguém já usou. Backup rodando, guardado fora da máquina, restaurado ao menos uma vez, com alerta quando falha. Monitoramento que avisa antes do usuário avisar.
**Prova rápida:** perguntar quando foi a última restauração de backup testada. "Nunca" é nota 3 ou menos, porque backup nunca testado não é backup.

### 7. Interface
Sem estouro horizontal nos 4 tamanhos. Acessibilidade: rótulo ligado ao campo, foco visível, alcançável por teclado. Estado vazio tratado. Imagem com dimensão declarada. Política de conteúdo (CSP) ligada.
**Prova rápida:** medir uma página pública e uma de painel num medidor de acessibilidade, e abrir as duas no tamanho de celular.

### 8. Registro
O plano (ou o README) reflete o que existe hoje. Decisões escritas com o porquê. Fila de erros viva. README ensina alguém de fora a subir o projeto do zero.
**Prova rápida:** seguir o README numa máquina limpa, ou ao menos ler se ele menciona os passos que a versão atual precisa.

---

## Como fecha a nota final

Média simples das oito, **com um freio**: se qualquer dimensão ficar em 3 ou menos, a nota final não passa de 5, por mais alto que esteja o resto. Projeto com segredo exposto em produção não é um "8 com uma ressalva", e média sozinha esconde exatamente esse tipo de buraco.

| Nota | O que significa |
|---|---|
| 9-10 | saudável. Dá pra crescer sem medo |
| 7-8 | bom, com dívida conhecida e escrita |
| 5-6 | funciona, mas cada mudança custa mais que devia |
| 3-4 | a casa desarrumou. Precisa de etapa dedicada antes de feature nova |
| 0-2 | risco real de perder dado, vazar dado ou não conseguir mudar |

---

## O que entregar

Uma tabela e três linhas de texto. Nada mais:

```markdown
| # | Dimensão | Nota | O que puxou pra baixo (arquivo:linha) |
|---|---|---|---|
| 1 | Segurança | 4 | senha no repo em V3__seed.sql:12 |
...

**Nota final: X/10** (freio aplicado: sim/não, por qual dimensão)

**As três coisas que mais sobem a nota:** ...
**O que NÃO vale mexer agora:** ...
```

A linha do que não vale mexer agora é tão importante quanto as outras. Varredura sem prioridade vira lista de 40 itens que ninguém ataca, e a casa segue desarrumada com um relatório em cima.

---

## Resultado

**Auditado em:** 26/09/2026

| # | Dimensão | Nota | O que puxou pra baixo (arquivo:linha) |
|---|---|---|---|
| 1 | Segurança | 5 | o repo é público (API do GitHub: `"visibility": "public"`) e guarda o login de fábrica da controladora PTZ real do estúdio, junto com o IP interno dela, em `pages/14-esfera/1-config-ptz/1-config-ptz.html:128` e `:194` (no histórico desde o commit `6aada8c`, 15/07), contra a regra do próprio índice de repos (`.claude/repositorios-ativos.md:12`: "nada de credencial nem material de terceiro aqui"). Sobrou material do trabalho que a limpeza do JASAP não pegou: `referencia/index.html:972-974` chama `XTLib.js` e `jasapJquery.js`. Script de terceiro sem SRI, e um sem versão: `grafo.html:7` carrega o `vis-network` mais recente do unpkg; `grafo-3d.html:8-10` e `js/layout.js:838` vêm sem `integrity`. A favor: site estático sem login nem upload, nenhum token ou chave no histórico (`git log --all -G` pelos padrões de chave deu vazio), os `innerHTML` só recebem texto escrito à mão (nada vem da URL), e as senhas das páginas de Docker e do Nexus são de exemplo ou do container de dev |
| 2 | Teste | 1 | não existe arnês: nenhum `qa/`, `package.json` ou script no repo, e a única conferência prevista é "abriu no Live Server" (`.claude/commands/documentacao/criar-html.md:254`). O que um checador de links pegaria, medido hoje com o script desta auditoria: 163 caminhos locais quebrados em 1.134, sendo 118 players de áudio apontando pra `.m4a` que nunca entrou no git (ex.: `pages/1-fundamentos/3-modelo-rede/1-modelo-osi/3-rede/3-rede.html:35`), 6 itens do MENU mortos (`js/layout.js:426-431`) e 10 dos 56 nós do grafo. Bug corrigido não deixou prova: `f2e4a9d` (marcador de conflito no `index.html`) e `c0b8a55` (carrossel com imagem que não existia) |
| 3 | Legibilidade | 4 | `js/layout.js` é um arquivo só de 2.000 linhas que faz tudo (os dados do MENU nas linhas 23-463, CSS injetado, menu, player, carrossel, TOC), o oposto da regra 5; o handler de montagem tem 240 linhas (`js/layout.js:640`), `initAudioPlayers` 186 (`:1159`), `initCarousel` 139 (`:1578`), `initPageToc` 126 (`:1873`), e são 29 funções acima de 60 linhas no projeto (medido com acorn). Dentro de template: 4.070 linhas de script em 14 páginas e 3.140 de estilo em 24 (a maior é `lista-ligada-remover.html`, 626 + 298), mais 644 `style=` e 489 `on*=`. `css/docs.css` tem 2.057 linhas num arquivo, zero variável de cor e 71 hex diferentes colados 328 vezes. A casca injetada é `div#topbar`, `div#drawer`, `div#content` e `div#footer` (`js/layout.js:730-762`) no lugar de `header`, `nav`, `main` e `footer`. Acento quebrado em `js/layout.js:484` e `:877`, BOM duplo na linha 1. A favor: pastas `N-nome/` com o HTML do mesmo nome, que se acham sem busca |
| 4 | Duplicação | 3 | a árvore de páginas mora em quatro lugares mantidos à mão: o `MENU` (`js/layout.js:23`), a `STRUCTURE` do `grafo.html:121`, uma cópia idêntica dela no `grafo-3d.html:199` (as 54 URLs batem, `diff` vazio) e os cards dos hubs. O custo já aparece: os grafos têm 56 nós pra 205 páginas e 10 deles apontam pro endereço antigo do Modelo de Rede, o hub `pages/1-fundamentos/fundamentos.html:72-78` também, e `index.html:613-627` ainda linka a trilha stack-web removida. O widget de vetor (`.vetor-toolbar`, `.vetor-debug`, `.dbg-line`) está clonado em 5 páginas (`array.html:16`, `busca-linear.html:16`, `comparacao.html:16`, `lista-ligada.html:16`, `lista-ligada-remover.html:16`, todas em `pages/1-fundamentos/10-algoritmos/2-estruturas-controle/`) e o de lista ligada (`.ll-*`) em 3, passando da regra do terceiro clone. O accordion leva o comportamento colado em 477 cabeçalhos, de dois jeitos (348 `onclick="this.parentElement..."` e 129 `toggleInfoRow(...)`) |
| 5 | Banco e dados | - | não se aplica: site estático servido do disco, sem banco nem migration; a fonte dos dados é o `MENU` do `layout.js`, avaliado em Duplicação |
| 6 | Deploy e operação | 3 | não há produção (o site roda do disco pelo Live Server e o GitHub Pages está desligado, `"has_pages": false`), então o que conta é a cópia fora da máquina: o push pro GitHub está em dia (0 commits à frente em `dev` e `main`), mas não há registro de restauração, e o pacote tem 5,69 GiB (`git count-objects -vH`) com 11 arquivos acima de 50 MB fora do LFS, perto do limite do GitHub (que recusa arquivo acima de 100 MB). Nenhum procedimento escrito: o `README.md` tem uma linha |
| 7 | Interface | 4 | axe-core (WCAG A e AA) em 8 páginas, todas reprovam: botão do menu sem nome (`#hamburger`, `js/layout.js:731`, crítico), contraste (12 a 32 nós por página) e a barra do player sem rótulo (`.audio-seek`, crítico; vem do molde em `criar-html.md:92`, então sai nos 249 players). Os 477 cabeçalhos de accordion são `div` com `onclick`, fora do alcance do teclado. Estado vazio sem tratamento: 118 dos 249 players (47%) apontam pra áudio que não existe e o player não escuta `error` (`js/layout.js:1187`), fica mudo em "0:00 / 0:00". Nenhuma das 181 `<img>` declara `width` e `height`, e não há `<main>` nem CSP. A favor: sem estouro horizontal nas quatro larguras (só 4 px em 360 na `2-primeiras-frases.html`) e nenhum erro de JS nas 8 páginas |
| 8 | Registro | 2 | o `README.md:1` é só `# XT-DOCUMENTACAO` (nome de um ecossistema que já saiu) e não ensina a servir nem a criar página; não há plano, decisões nem fila de erros no repo. O manual de fato mora fora, nas skills, e aponta pra pasta que não existe: `PROJETOS/DOCUMENTACAO/PROJETO-GIT/` (`.claude/commands/documentacao/criar-html.md:185`, `.claude/skills/html-fundamentos/SKILL.md:8`), a `3-modelo-osi/` já renomeada (`SKILL.md:33`) e o pool `DOCUMENTACAO\img\` (`criar-html.md:231`; hoje é `assets-codex/img/`). A favor: o porquê do projeto existe, na memória `project_documentacao_lab_transicao.md`, só não está no repo |

**Nota final: 3,1/10** (freio aplicado: sim, por Teste (1), Registro (2), Duplicação (3) e Deploy (3); a média das sete dimensões que se aplicam, 22/7, já fica abaixo do teto de 5; Banco e dados não entra na conta)

**As três coisas que mais sobem a nota:** um checador de links por um comando em `qa/` (um script como o desta auditoria roda em segundos e já acusa os 163 quebrados, os 6 do MENU e os 10 do grafo), junto com o `error` no player dizendo "áudio ainda não gravado", que tira Teste do 1 e sobe Interface; tirar a senha da controladora PTZ e a pasta `referencia/` no repositório novo que ele já decidiu abrir começando de `git init`, que fecha a Segurança sem reescrever histórico; e uma fonte única da árvore (os dois grafos lendo o `MENU` em vez da `STRUCTURE` própria) com um README de dez linhas e o caminho `PROJETO-GIT` corrigido nas skills, que sobe Duplicação e Registro de uma vez.

**O que NÃO vale mexer agora:** reescrever o histórico público ou migrar pra LFS no repo atual (decisão de 25/09: o repo novo começa sem histórico, e é nele que a mídia pesada deve ser pensada); quebrar o `layout.js` em arquivos por componente e tirar os 477 `onclick` dos accordions, porque a doc é laboratório de padrões que depois viram componente no Nexus (`project_documentacao_lab_transicao.md`) e essa refatoração custa mais do que devolve agora; e contraste de cor e CSP, que pesam pouco num site que só roda do disco.
