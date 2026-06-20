# Critério IA — Landing Page

Landing estática do Critério IA. Não há etapa de build, backend, variáveis de ambiente ou dependências de Node.

## Estrutura publicada

- `index.html`: ponto de entrada da landing.
- `styles.css`: estilos da página.
- `prompts.js`: biblioteca demonstrável de prompts.
- `app.js`: filtros, busca e cópia de prompts.
- `assets/`: imagem da autora.
- `vercel.json`: configuração de URLs limpas para Vercel.

## Publicação no Vercel

Ao importar o repositório `advdeborahpxmachado-byte/criterio-ia`, configure o **Root Directory** como:

```text
projects/criterio-ia/00_documento_principal/carloslimadv-biblioteca-prompts-juridicos-https-github
```

Selecione o preset **Other**. Não configure Build Command, Output Directory ou variáveis de ambiente.

### Preview local pela CLI

No diretório desta landing:

```bash
npx vercel
```

O comando solicita autenticação quando necessário e cria um deployment de preview.

### Produção

Após validar o preview e receber autorização explícita para produção:

```bash
npx vercel --prod
```

## Checklist antes de produção

- Confirmar que `index.html` abre sem erros e carrega os recursos estáticos.
- Conferir desktop e mobile.
- Confirmar preço, CTAs e URL da Hotmart.
- Confirmar URL de produção e HTTPS.
- Registrar a URL de rollback fornecida pelo deployment anterior.
- Configurar domínio próprio somente depois do preview aprovado.

## Segurança

Não incluir tokens, chaves, IDs de analytics, credenciais, domínio definitivo ou dados de clientes neste repositório.

O vínculo da conta Vercel, o deploy de produção e alterações de DNS são ações externas e exigem autorização explícita.
