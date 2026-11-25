<div align="center">
  <img src="_assets/banners/banner-final.webp" alt="G.W.E.N.: comece pelo próximo projeto. Baixe grátis para Windows" width="100%">
</div>

<div align="center">

### O site da G.W.E.N. Seu trabalho em um clique. Sua pausa, a sério.

![Tipo](https://img.shields.io/badge/tipo-site-121214?style=for-the-badge)
![Status](https://img.shields.io/badge/status-beta-171717?style=for-the-badge)
![Escopo](https://img.shields.io/badge/escopo-produto-171717?style=for-the-badge)
![Deploy](https://img.shields.io/badge/deploy-vercel-171717?style=for-the-badge)
![Licença](https://img.shields.io/badge/licença-proprietária-171717?style=for-the-badge)

![React](https://img.shields.io/badge/React%2019-171717?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-171717?style=flat-square&logo=vite&logoColor=A78BFA)
![Tailwind](https://img.shields.io/badge/Tailwind%204-171717?style=flat-square&logo=tailwindcss&logoColor=06B6D4)
![GitHub API](https://img.shields.io/badge/GitHub%20Releases-171717?style=flat-square&logo=github&logoColor=E8E4DE)

[Sobre](#-sobre-o-projeto) · [O que a landing traz](#-o-que-a-landing-traz) · [Ligação com o app](#-ligação-com-o-app) · [Como rodar](#-como-rodar) · [Publicar](#-publicar) · [Estrutura](#-estrutura) · [Licença](#-licença)

</div>

---

### $ sobre o projeto

Este é o site da **G.W.E.N.** (*Gestão de Wellness, Eficiência e Navegação*), o assistente desktop que abre o ambiente de cada projeto com um clique, conta o tempo de cada um e trata a pausa como parte do trabalho.

O código do app fica no repositório privado `gwen-app`. As versões publicadas ficam no repositório público [**gwen**](https://github.com/gwen-org/gwen). Aqui fica só o site: a landing que apresenta a G.W.E.N. e a página de novidades. O site não guarda cópia da versão do app. Ele lê as releases do `gwen`, então cada versão nova aparece sozinha.

> Os prints do site usam dados fictícios e temas de usuário. A identidade do sistema é Noir; a cor entra só pelas telas do app.

### $ o que a landing traz

A landing conta uma história, do problema até o download:

| Seção | O que mostra |
|---|---|
| **Hero** | A promessa em duas linhas, o botão de baixar grátis e a tela do app, que se endireita com o scroll. Tem teste A/B/C: wallpaper, tudo preto e uma abertura animada com clique |
| **Identificação** | "Você já viveu esse dia": 09:00 abrindo tudo, 09:14 sem começar, 15:40 sem água, 19:30 sem saber em quê trabalhou |
| **Como usar** | Quatro passos, do download ao primeiro foco |
| **Recursos** | Começar agora, tempo, pausa e saúde, tarefas, cada um com o print num tema diferente |
| **Por dentro do Começar agora** | O que acontece ao clicar, com cada app da faixa explicado (VS Code, Git Bash, Terminal, GitHub, Figma, Discord...) |
| **E o resto** | A mesma tela em quatro temas, apps e jogos, a bolha, hábitos, atalhos e modo saúde |
| **Para você** | Os ambientes (TI, estudo, design, freelance, geral) e para quem ela serve |
| **Privacidade** | Dados locais, nada de título de janela, atualizações assinadas |
| **Origem e casos** | Como ela surgiu e o primeiro caso de uso, da própria criadora |
| **Contato, planos e dúvidas** | Formulário, os planos Gratuito, Freelance e Pro, e as perguntas frequentes |
| **Baixar** | Botão com o instalador da última versão e os requisitos |

<div align="center">
  <img src="_assets/prints/landing-identificacao.webp" alt="Seção de identificação: Você já viveu esse dia" width="49%">
  <img src="_assets/prints/landing-recursos.webp" alt="Seção de recursos com print do app num tema verde-água" width="49%">
</div>

<div align="center">
  <img src="_assets/prints/landing-planos.webp" alt="Planos Gratuito, Freelance e Pro" width="49%">
  <img src="_assets/prints/novidades.webp" alt="Página de novidades com as notas da v0.9.1" width="49%">
</div>

### $ ligação com o app

| Onde | O que acontece |
|---|---|
| **No build** | `scripts/fetch-release.mjs` roda antes do `vite build` e grava `src/generated/releases.json` com as releases publicadas do [gwen](https://github.com/gwen-org/gwen/releases): versão, data, notas, link e tamanho do instalador. Sem rede, o arquivo anterior continua valendo |
| **No navegador** | `src/lib/release.js` começa com esse arquivo e confere a API do GitHub ao abrir a página. Se saiu versão depois do último deploy, o site já mostra a nova |
| **Ao publicar uma release** | o workflow `notify-site.yml` do repositório gwen chama o Deploy Hook da Vercel, que refaz o build com as notas novas |

Atualiza sozinho: o selo da versão, os botões de baixar, o tamanho do instalador e a página **`/novidades`**, que lista cada versão com as notas da release.

### $ como rodar

```powershell
yarn
yarn dev
```

Abre em `http://localhost:5174`. Para puxar as releases na hora, `yarn releases`. Para gerar a versão final, `yarn build` (sai em `dist/`).

No dev, o seletor **hero A B C** aparece no canto. No site publicado ele some; para ver lá, use `?ab` no endereço (`/?hero=c&ab`).

### $ publicar

1. Na Vercel, importe este repositório. Framework: Vite. Build: `yarn build`. Output: `dist`.
2. Em **Settings > Git > Deploy Hooks**, crie um hook para a branch `main` e copie a URL.
3. No repositório gwen, cadastre a URL como secret: `gh secret set VERCEL_DEPLOY_HOOK -R gwen-org/gwen`. O comando pergunta o valor, não o escreva na linha.
4. Copie `extras/notify-site.yml` para `.github/workflows/` do gwen.

O passo a passo completo de uma versão (token, hook, conferências) está no `OPS-001`, na documentação do repositório do app.

### $ estrutura

```text
src/
  App.jsx            monta a landing e escolhe a página (/ ou /novidades)
  components/        Nav, Footer, Intro (abertura do hero C), Defs (símbolo do G)
  sections/          uma seção por arquivo, na ordem da história
  pages/             Novidades
  lib/release.js     versão e releases (build + API)
  lib/effects.js     scroll, revelar, luz nos cards e animações
  styles/index.css   Tailwind + tokens da marca + componentes
  generated/         releases.json, gerado no build
public/prints/       telas do app com dados fictícios, em vários temas
scripts/             fetch-release.mjs
extras/              notify-site.yml, para o repositório gwen
_assets/             prints e banners deste README
```

### $ licença

Este site é **proprietário**, como o app. Copyright (c) 2026 Samara Silvia Sabino. Todos os direitos reservados. Os termos estão em [`LICENSE`](LICENSE).

- **Pode:** ler o código aqui no GitHub.
- **Não pode sem autorização:** copiar, modificar, redistribuir ou usar o nome, o logo, os textos e a identidade visual da G.W.E.N.

Qualquer outro uso precisa ser combinado antes com a autora ([@devs_sam](https://instagram.com/devs_sam)).

<div align="center">

*Uma sessão de cada vez. Uma pausa de cada vez.*

Feito por [Samara Silvia](https://github.com/SamaraSilvia81) · [@devs_sam](https://instagram.com/devs_sam) · Versões em [gwen](https://github.com/gwen-org/gwen)

</div>

<picture>
  <source media="(prefers-color-scheme: light)" srcset="_assets/banners/banner-rodape-claro.webp">
  <img src="_assets/banners/banner-rodape.webp" alt="G.W.E.N. · rodapé" width="100%">
</picture>
