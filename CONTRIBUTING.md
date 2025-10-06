# Contribuindo para o Blog Cloudinary

Obrigado por considerar contribuir para este projeto! 🎉

## Como Contribuir

### Reportando Bugs

Se você encontrou um bug, por favor:

1. Verifique se o bug já foi reportado nas [Issues](https://github.com/seu-usuario/blog-cloudinary/issues)
2. Se não, crie uma nova issue com:
   - Título descritivo
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots (se aplicável)
   - Ambiente (OS, Node version, etc)

### Sugerindo Melhorias

Para sugerir melhorias:

1. Crie uma issue com a tag `enhancement`
2. Descreva claramente a melhoria proposta
3. Explique por que seria útil para o projeto

### Pull Requests

1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Crie uma branch** para sua feature/fix:
   ```bash
   git checkout -b feature/minha-feature
   # ou
   git checkout -b fix/meu-fix
   ```
4. **Faça suas alterações** seguindo o guia de estilo
5. **Commit** suas mudanças usando [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: adiciona nova funcionalidade"
   git commit -m "fix: corrige bug na autenticação"
   git commit -m "docs: atualiza README"
   ```
6. **Push** para sua branch:
   ```bash
   git push origin feature/minha-feature
   ```
7. **Abra um Pull Request** no GitHub

## Guia de Estilo

### TypeScript

- Use TypeScript strict mode
- Sempre defina tipos explícitos
- Use `interface` para objetos, `type` para unions/intersections
- Prefira `const` assertions quando aplicável

### Código

- Use ESLint e Prettier (já configurados)
- Execute `pnpm lint` antes de commitar
- Execute `pnpm type-check` para verificar tipos

### Commits

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` mudanças na documentação
- `style:` formatação, ponto-e-vírgula, etc
- `refactor:` refatoração de código
- `test:` adição de testes
- `chore:` tarefas de manutenção

### Testes

- Adicione testes para novas funcionalidades
- Garanta que todos os testes passem antes de abrir um PR
- Execute `pnpm test` localmente

## Processo de Review

1. Mantenedores irão revisar seu PR
2. Podem solicitar mudanças ou melhorias
3. Uma vez aprovado, será feito merge

## Código de Conduta

- Seja respeitoso e inclusivo
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade

## Dúvidas?

Se tiver dúvidas, abra uma issue ou entre em contato!

Obrigado por contribuir! 🚀
