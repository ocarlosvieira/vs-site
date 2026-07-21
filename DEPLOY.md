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
  Compose path `docker-compose.yml` (o padrão)
- **Web editor**: cole o conteúdo de [`docker-compose.yml`](docker-compose.yml)

Em **Environment variables** (todas opcionais):

| Variável | Padrão | Observação |
|---|---|---|
| `IMAGE_TAG` | `latest` | use uma tag fixa para travar a versão |
| `N8N_WEBHOOK_URL` | webhook atual | destino do formulário |

Clique em **Deploy the stack**.

### Antes de subir: DNS

O certificado é emitido por TLS challenge, então os dois nomes precisam
**já estar apontando para o servidor** no momento do deploy. Caso contrário o
Let's Encrypt falha — e ele limita a 5 falhas por hora por domínio.

```
vsgrowth.com.br       A   <IP do servidor>
www.vsgrowth.com.br   A   <IP do servidor>
```

Confira com `dig +short vsgrowth.com.br` antes de dar deploy.

## 5. Atualizar depois de uma alteração

1. `git push` na `main`
2. Espere o Actions terminar
3. Portainer → a stack → **Pull and redeploy** (marque *Re-pull image*)

---

## Notas

**Rede e porta.** A stack **não publica porta no host**: quem atende 80/443 é o
Traefik, que fala com o container pela rede externa `proxy`. Por isso o serviço
precisa estar nessa rede e ter `traefik.enable=true` — o Traefik roda com
`exposedbydefault=false`, então nada é exposto sem o opt-in explícito.

**Domínios.** O router responde por `vsgrowth.com.br` e `www.vsgrowth.com.br`,
ambos no mesmo certificado. Para trocar, edite a linha `traefik.http.routers.
vsgrowth.rule` no compose.

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
