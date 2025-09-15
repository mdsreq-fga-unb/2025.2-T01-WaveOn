Claro, aqui está a tradução técnica das instruções.

-----

# Instruções do Agente de IA WaveON

## Visão Geral do Projeto

O **WaveON** é um sistema de gerenciamento de serviços de lava a jato projetado para otimizar os serviços móveis de lavagem de carros. O projeto foca na documentação utilizando o **MkDocs** com o tema **Material**.

-----

## Estrutura do Repositório

```
2025.2-T01-WaveOn/
├── mkdocs.yml       # Configuração do MkDocs
├── README.md        # Visão geral do projeto
└── docs/            # Arquivos-fonte da documentação
    ├── index.md     # Página inicial
    ├── intro.md     # Introdução
    ├── instalacao.md# Guia de instalação
    └── guia/        # Seções do guia do projeto
        └── estrutura.md # Guia da estrutura do projeto
```

-----

## Padrões de Documentação

  - Toda a documentação é escrita em **português do Brasil**.
  - Os arquivos de documentação utilizam o formato **Markdown** com as extensões do tema Material.
  - Cada página de documentação deve incluir um título usando **frontmatter** (exemplo em `index.md`).
  - A estrutura de navegação é definida no arquivo `mkdocs.yml`.

-----

## Principais Funcionalidades do MkDocs Utilizadas

  - Tema **Material** com esquema de cores Índigo.
  - Alternância entre modo claro e escuro.
  - Sumário (índice) com links permanentes.
  - Funcionalidade para copiar blocos de código.
  - Funcionalidade de busca.
  - Navegação instantânea.
  - Navegação por seção.
  - *Admonitions* (blocos de aviso) e conteúdo em abas.

-----

## Fluxo de Trabalho de Desenvolvimento

1.  As alterações na documentação devem ser feitas no diretório `docs/`.
2.  Teste as alterações localmente usando o comando `mkdocs serve`.
3.  Compile a documentação com o comando `mkdocs build`.
4.  Faça o deploy para o GitHub Pages usando o comando `mkdocs gh-deploy`.

-----

## Convenções Específicas do Projeto

  - Os recursos de imagem devem ser colocados no diretório raiz `docs/`.
  - Cada seção principal deve ter seu próprio diretório dentro de `docs/`.
  - As URLs devem utilizar o formato **kebab-case** (ex: `minha-pagina`).
  - Os exemplos de código devem usar realce de sintaxe por meio do `pymdownx.superfences`.

-----

## Áreas para Melhorias Futuras

  - Considerar a adição de documentação da **API**, caso serviços de backend sejam desenvolvidos.
  - Planejar uma estrutura para suporte a **múltiplos idiomas**.
  - Preparar a documentação para a **autenticação de usuários**.
  - Considerar a adição de um rastreamento de alterações (**changelog**).