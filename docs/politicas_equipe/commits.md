# Convenção de Commits

Este documento define a convenção para criação de **commits** neste repositório, com o objetivo de manter a organização, rastreabilidade e facilitar o entendimento da evolução do projeto.

---

## Tipos de Commits

| Tipo de Commit       | Prefixo           | Descrição                                                                 |
|----------------------|-------------------|---------------------------------------------------------------------------|
| **Funcionalidade**   | `feat:`           | Inclusão de uma nova funcionalidade ou recurso.                           |
| **Correção de Bug**  | `fix:`            | Correção de erros ou comportamentos inesperados.                          |
| **Documentação**     | `docs:`           | Alterações na documentação (ex.: MkDocs, README, Wiki).                   |
| **Estilo**           | `style:`          | Alterações que não afetam a lógica (espaços, indentação, formatação).     |
| **Refatoração**      | `refactor:`       | Alteração de código sem mudar comportamento (melhoria de legibilidade).   |
| **Testes**           | `test:`           | Adição ou modificação de testes.                                          |
| **Chore**            | `chore:`          | Tarefas gerais (configs, dependências, build).                            |
| **Hotfix**           | `hotfix:`         | Correção crítica aplicada diretamente em produção.                        |

---

## Regras de Escrita

- A mensagem deve estar no **modo imperativo** (ex.: “adiciona”, “corrige”), nunca no gerúndio ou passado.  
- Usar sempre **minúsculas** no prefixo.  
- O título deve ser **curto e objetivo** (até 72 caracteres).  
- Detalhes adicionais podem ser colocados no corpo do commit.  
- Commits devem estar relacionados a **uma única mudança coesa**.

---

## Exemplos de Commits

- `feat(login): adiciona fluxo de autenticação com Google`  
- `fix(api): corrige erro 500 ao listar usuários`  
- `docs(mkdocs): cria página de requisitos não funcionais`  
- `style(css): ajusta espaçamento do header`  
- `refactor(agendamento): melhora função de validação de datas`  

---

## Fluxo de Commits

1. Antes de commitar, executar `git pull origin <branch>` para garantir que está atualizado.  
2. Adicionar apenas os arquivos relacionados à mudança (`git add arquivo.ext` ou `git add .`).  
3. Criar o commit seguindo a convenção:  
   ```bash
   git commit -m "prefixo(escopo): mensagem curta"
