# Rua Bike Shop — Frontend

Loja virtual (storefront) + painel administrativo do Rua Bike Shop. HTML, CSS e JavaScript puro, sem framework — escolha deliberada pra fixar fundamentos de DOM, fetch e autenticação antes de migrar pra um stack com framework.

🔗 [Site em produção](https://rua-mvp-frontend.vercel.app) · [Repo do backend](https://github.com/GabaHenrique/backend-mvp-nodejs) · [API em produção](https://backend-mvp-nodejs.onrender.com)

## Stack

HTML5, CSS3, JavaScript (Fetch API, sem bibliotecas). Deploy: Vercel, com CI/CD automático a cada push.

## Estrutura

**Loja (público):** `index.html` (vitrine), `products.html` (catálogo com filtro por categoria), `produtoUnico.html` (página de produto), `carrinho.html` (carrinho e checkout), `sucesso.html` (confirmação de compra).

**Painel admin** (`/admin`, protegido por login): `login.html`, `dashboard.html` (métricas), `productsAdmin.html` (CRUD de produtos), `product-form.html` (criar/editar produto), `orders.html` (gestão de pedidos e status).

## Como a autenticação funciona no front

Login manda e-mail/senha pro backend, recebe um JWT e guarda em `localStorage`. Cada requisição a uma rota protegida do admin anexa esse token no header `Authorization: Bearer <token>`. Se o token expirar ou for inválido, a resposta `401` do backend redireciona a página de volta pro login automaticamente — sem travar numa tela quebrada.

## Configuração de ambiente sem build

Como não tem bundler nem processo de build, a URL da API fica centralizada numa única constante (`js/config.js`), carregada antes de qualquer outro script da página. Trocar de ambiente (local → produção) é uma linha só, em um lugar só — em vez de caçar a URL em cada arquivo `.js`.

## Rodando local

Precisa do backend rodando (veja o [repo do backend](https://github.com/GabaHenrique/backend-mvp-nodejs)) e de um servidor estático simples, tipo a extensão Live Server do VS Code.

```bash
git clone https://github.com/GabaHenrique/rua-mvp-frontend.git
cd rua-mvp-frontend
```

Abre `index.html` ou `admin/login.html` com o Live Server, e ajusta `API_URL` em `js/config.js` pra apontar pro backend local (`http://localhost:4001`) ou produção.

## Competências demonstradas

- Consumo de API REST com Fetch, incluindo autenticação via header `Authorization`
- Gerenciamento de sessão no client-side (`localStorage`) com expiração e redirecionamento automático
- Manipulação de DOM sem framework (render de listas, formulários, atualização de estado de tela)
- Organização de configuração de ambiente sem processo de build
- Deploy contínuo (Vercel) integrado a repositório Git

## Em aberto

Revisar cobertura de testes E2E do fluxo de checkout.
