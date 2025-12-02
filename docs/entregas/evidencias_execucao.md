# **Evidências de Execução**

Este documento consolida as evidências de execução do cronograma, do processo (ESW e ER) e das entregas parciais do produto até o momento.

## **1. Cronograma e Marcos**

| Unidade/Ciclo | Período (planejado) | Evidências | Links |
| :-- | :-- | :-- | :-- |
| Unidade 1 | 26/08–06/09 (fase inicial) | Definição de escopo, políticas e visão do produto | [Cenário Atual](../visao_produto/cenario_atual.md) • [Solução Proposta](../visao_produto/solucao_proposta.md) • [Política de Commits](../politicas_equipe/commits.md) • [Política de Branches](../politicas_equipe/branches.md) • [Política de Issues](../politicas_equipe/issues.md) • [Política de PR](../politicas_equipe/pull_request.md) |
| Ciclo 1 – Planejamento/Design | 09/09–23/10 | USM inicial (Miro) e organização de requisitos | [Requisitos de Software (USM + Miro)](../visao_produto/requisitos_software.md) • [Backlog de Produto](../backlog/backlog.md) |
| Ciclo 1 – Construção/Implantação | 24/10–15/11 | Consolidação de backlog e priorização | [Priorização (MoSCoW + ICE)](../backlog/backlog.md#92-priorizacao) • [Cronograma de Entregas](../visao_produto/cronograma_entregas.md) |
| Unidade 2 | 18/11–29/11 | RNFs, revisão de cronograma e priorização | [Requisitos de Software (RNFs)](../visao_produto/requisitos_software.md) • [Cronograma de Entregas](../visao_produto/cronograma_entregas.md) |

> Referência do planejamento completo: [Cronograma de Entregas](../visao_produto/cronograma_entregas.md).

## **2. Processo (ESW e ER)**

- **Engenharia de Requisitos (ER):**
  - USM descrito e referenciado (transversal ao processo) em [Engenharia de Requisitos](../visao_produto/engenharia_requisitos.md).
  - Backlog derivado do USM com features, US e priorização em [Backlog de Produto](../backlog/backlog.md).
  - RNFs documentados e validados em [Requisitos de Software](../visao_produto/requisitos_software.md).
- **Engenharia de Software (ESW):**
  - Políticas de equipe ([Commits](../politicas_equipe/commits.md), [Branches](../politicas_equipe/branches.md), [Issues](../politicas_equipe/issues.md), [Pull Request](../politicas_equipe/pull_request.md)), estratégia ([Estratégias](../visao_produto/estrategias.md)), e organização das entregas ([Cronograma](../visao_produto/cronograma_entregas.md)).

## **3. Entregas Parciais do Produto**

| Tipo | Evidência | Link |
| :-- | :-- | :-- |
| Mapa USM (visual) | Miro com jornadas e histórias | [Requisitos de Software](../visao_produto/requisitos_software.md) |
| Backlog estruturado | Features, US e priorização | [Backlog de Produto](../backlog/backlog.md) |
| RNFs do sistema | Tabela completa com categorias | [Requisitos de Software](../visao_produto/requisitos_software.md) |

### **Protótipos e Mockups**

#### Baixa fidelidade (cliente/admin)

![Protótipo de baixa fidelidade](../img/waveon_baixa_fidelidade.png){ width=100% }

#### Alta fidelidade (Figma)

<iframe style="border:1px solid rgba(0,0,0,0.1);" width="100%" height="800" src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/G5HVjXRLeve1BeBBazx2S8/WaveOn---UI-UX-Design?type=design&node-id=0-1&mode=design" allowfullscreen></iframe>


### **Aplicação inicial do código**

As imagens abaixo evidenciam a primeira aplicação do código e como ficaram algumas telas do protótipo inicial:

![Tela inicial do protótipo](../img/TelaInicialWaveOnPrototipo.png)

![Cadastro no protótipo](../img/CadastroWaveOnPrototipo.png)

![Lavagem simples no protótipo](../img/LavagemSimplesWaveOnPrototipo.png)

![Lavagem completa no protótipo](../img/LavagemCompletaWaveOnPrototipo.png)


### Versão Final (capturas atualizadas)

As imagens abaixo registram a versão final do protótipo/aplicação com telas-chave. Formato visual igual às demais evidências do documento.

#### Evidências do MVP — funções cobertas por cada tela

| Tela | Função evidenciada | RF(s) relacionado(s) |
| :-- | :-- | :-- |
| Home | Visualização inicial dos serviços e navegação básica | <a href="../../visao_produto/requisitos_software/#rf-c01">RF-C01</a> |
| Sobre | Página informativa (apoio) | — |
| Serviços | Catálogo de serviços e preços | <a href="../../visao_produto/requisitos_software/#rf-c01">RF-C01</a> |
| Cadastro | Criação de conta de cliente | <a href="../../visao_produto/requisitos_software/#rf-c03">RF-C03</a> |
| Login | Autenticação de cliente e acesso administrativo | <a href="../../visao_produto/requisitos_software/#rf-c04">RF-C04</a>, <a href="../../visao_produto/requisitos_software/#rf-a01">RF-A01</a> |
| Agendamento simples | Seleção de data/horário para lavagem | <a href="../../visao_produto/requisitos_software/#rf-c02">RF-C02</a> |
| Agendamento completo | Confirmação e gerenciamento do agendamento | <a href="../../visao_produto/requisitos_software/#rf-c02">RF-C02</a> |
| Pagamento (PIX) | Geração/execução de pagamento | <a href="../../visao_produto/requisitos_software/#rf-c06">RF-C06</a> |
| Admin – Serviços | Cadastrar/editar/inativar serviços | <a href="../../visao_produto/requisitos_software/#rf-a05">RF-A05</a> |
| Admin – Agendamentos | Visualizar/editar/cancelar + regras | <a href="../../visao_produto/requisitos_software/#rf-a02">RF-A02</a> |
| Admin – Agenda | Visão diária/semanal de agendamentos | <a href="../../visao_produto/requisitos_software/#rf-a03">RF-A03</a> |

![Home – versão final](../img/HomeFinalWaveOn.png)

!!! tip "Link de requisito: [RF-C01](../../visao_produto/requisitos_software/#rf-c01)"
    Implementação: catálogo visível na Home, com navegação para serviços e preços.

![Sobre – versão final](../img/SobreFinalWaveOn.png)

!!! tip "Página informativa (sem RF funcional)"
    Implementação: explica proposta e apoio à navegação.

![Serviços – versão final](../img/ServiçosFinalWaveOn.png)

!!! tip "Link de requisito: [RF-C01](../../visao_produto/requisitos_software/#rf-c01)"
    Implementação: listagem de serviços com descrição e preço.

![Cadastro – versão final](../img/CadastroFinalWaveOn.png)

!!! tip "Link de requisito: [RF-C03](../../visao_produto/requisitos_software/#rf-c03)"
    Implementação: formulário simples com e-mail e senha.

![Login – versão final](../img/LoginFinalWaveOn.png)

!!! tip "Links de requisito: [RF-C04](../../visao_produto/requisitos_software/#rf-c04) • [RF-A01](../../visao_produto/requisitos_software/#rf-a01)"
    Implementação: autenticação de cliente e acesso ao painel admin(conta de admin).

![Agendamento simples – versão final](../img/AgendamentoSimplesFinalWaveOn.png)

!!! tip "Links de requisito: [RF-C02](../../visao_produto/requisitos_software/#rf-c02) • [RF-C05](../../visao_produto/requisitos_software/#rf-c05)"
    Implementação: calendário com seleção de data e horário disponível e fluxo de efetivar agendamento.

![Agendamento completo – versão final](../img/AgendamentoCompletoFinalWaveOn.png)

!!! tip "Links de requisito: [RF-C02](../../visao_produto/requisitos_software/#rf-c02) • [RF-C05](../../visao_produto/requisitos_software/#rf-c05)"
    Implementação: confirmação do agendamento com resumo do serviço escolhido e efetivação.

![Pagamento (PIX) – versão final](../img/PagamentoFinalWaveOn.png)

!!! tip "Link de requisito: [RF-C06](../../visao_produto/requisitos_software/#rf-c06)"
    Implementação: geração de QR Code/código PIX.

![Admin – Serviços (versão final)](../img/GestãoServiçosFinalWaveOn.png)

!!! tip "Link de requisito: [RF-A05](../../visao_produto/requisitos_software/#rf-a05)"
    Implementação: criação/edição/inativação de serviços com preço e duração.

![Admin – Agendamentos (versão final)](../img/GerenciarAgendamentosFinalWaveOn.png)

!!! tip "Links de requisito: [RF-A02](../../visao_produto/requisitos_software/#rf-a02) • [RF-C07](../../visao_produto/requisitos_software/#rf-c07) • [RF-C08](../../visao_produto/requisitos_software/#rf-c08)"
    Implementação: visualizar/editar/cancelar agendamentos, aplicar regra de intervalo mínimo e listar históricos do cliente.

![Admin – Agenda (versão final)](../img/PainelAdministradorFinalWaveOn.png)

!!! tip "Link de requisito: [RF-A03](../../visao_produto/requisitos_software/#rf-a03)"
    Implementação: visão diária/semanal consolidada de agendamentos para planejamento.


## **4. Mídias das Unidades**

| Unidade | Evidência | Link |
| :-- | :-- | :-- |
| Unidade 1 | Vídeo de apresentação | [Entregas das Unidades](./video_unidades.md) |
| Unidade 2 | Vídeo de apresentação | [Entregas das Unidades](./video_unidades.md) |

## **5. Próximos Registros (como evidenciar)**

- Adicionar links para PRs e commits relevantes (rastreabilidade temporal).
- Anexar imagens de protótipos/mockups em `docs/img/` e referenciar aqui.
- Incluir tabela de status por ciclo (Concluído/Em andamento/Planejado) alinhada ao `cronograma_entregas.md`.

