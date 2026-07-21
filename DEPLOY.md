# Deploy — VS Growth Site

Fluxo: **push no GitHub → Actions builda a imagem → Portainer baixa e sobe.**

```
push na main
     │
     ▼
GitHub Actions (.github/workflows/docker-publish.yml)
     │
     ▼
ghcr.io/ocarlosvieira/vs-site:latest
     │
     ▼
Portainer → Stack → Pull and redeploy
```

Repositório: <https://github.com/ocarlosvieira/vs-site>

---

## 1. Enviar o código

O remote já está configurado. Na pasta do projeto:

```bash
git push -u origin main
```

O push na `main` dispara o build automaticamente.

## 2. Acompanhar o build

Aba **Actions** do repositório. Ao terminar, a imagem aparece em **Packages**,
no perfil, como:

```
ghcr.io/ocarlosvieira/vs-site:latest
```

Cada build publica três tags: `latest`, o hash curto do commit (ex.: `sha-a1b2c3d`)
e, se for uma tag git, a própria versão.

## 3. Liberar o acesso à imagem

Por padrão a imagem nasce **privada**. Escolha um caminho:

**a) Deixar pública** (mais simples): Packages → `vs-site` → Package settings →
Change visibility → Public. O Portainer baixa sem autenticação.

**b) Manter privada**: crie um Personal Access Token no GitHub com o escopo
`read:packages` e cadastre em Portainer → **Registries** → Add registry →
Custom registry:

- URL: `ghcr.io`
- Username: `ocarlosvieira`
- Password: o token

## 4. Subir a stack no Portainer

**Stacks → Add stack**, e então uma das opções:

- **Repository**: aponte para `https://github.com/ocarlosvieira/vs-site`, com
  Compose path `docker-compose.prod.yml`
- **Web editor**: cole o conteúdo de [`docker-compose.prod.yml`](docker-compose.prod.yml)

Em **Environment variables** (todas opcionais):

| Variável | Padrão | Observação |
|---|---|---|
| `PORT_HOST` | `3200` | porta exposta no servidor |
| `IMAGE_TAG` | `latest` | use uma tag fixa para travar a versão |
| `N8N_WEBHOOK_URL` | webhook atual | destino do formulário |

Clique em **Deploy the stack**.

## 5. Atualizar depois de uma alteração

1. `git push` na `main`
2. Espere o Actions terminar
3. Portainer → a stack → **Pull and redeploy** (marque *Re-pull image*)

---

## Notas

**Porta.** O container escuta na `3000` internamente; o mapeamento é
`PORT_HOST:3000`. Confira se a porta escolhida está livre no servidor antes de
subir, para não conflitar com outra stack.

**Proxy reverso.** Para servir em domínio com HTTPS, aponte seu proxy (Nginx
Proxy Manager, Traefik, Caddy) para `vs-growth-site:3000` na mesma rede Docker,
em vez de publicar a porta direto.

**Versionar releases.** Uma tag `v*` no git gera uma imagem com a mesma tag:

```bash
git tag v1.0.0 && git push --tags
```

Aí é só apontar `IMAGE_TAG=v1.0.0` no Portainer para fixar a versão e poder
voltar atrás com segurança.

**Segredos.** Nenhum secret precisa ser criado no GitHub: o Actions usa o
`GITHUB_TOKEN` que ele mesmo gera para publicar no GHCR.

**O formulário.** O endpoint `/api/lead` roda no servidor e repassa para o n8n.
Se o webhook mudar, basta alterar `N8N_WEBHOOK_URL` no Portainer e recriar a
stack — não precisa rebuildar a imagem.
