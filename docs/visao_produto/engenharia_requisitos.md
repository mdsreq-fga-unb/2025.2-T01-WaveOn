# 4. **Engenharia de Requisitos**

## **4.1 Atividades e Técnicas de ER** 📌

### **4.1.1 — Elicitação e Descoberta** {#elicitacao-e-descoberta}
- **Entrevista com Stakeholders:** serão conduzidas entrevistas com o cliente da VB e seus colaboradores, a fim de compreender suas necessidades, expectativas e principais dificuldades relacionadas à prestação do serviço de lavagem automotiva. As informações obtidas servirão de base para a definição dos requisitos do sistema WaveON.

- **Brainstorming:** será aplicado em reuniões internas da equipe de desenvolvimento, com o objetivo de estimular a geração de ideias de funcionalidades e soluções. Essa técnica permitirá explorar alternativas diversas e selecionar as mais adequadas às demandas da VB.

---

### **4.1.2 — Análise e consenso** {#analise-e-consenso}
- **User Story Mapping(USM):** será utilizado para organizar as funcionalidades do sistema em torno da jornada do usuário, como agendamento, pagamento e acompanhamento do serviço. Essa técnica possibilitará a definição do MVP e o planejamento das entregas incrementais do projeto WaveON.

- **Priorização MoSCoW:** será empregada para classificar os requisitos em *Must, Should, Could e Won’t*, auxiliando na definição das funcionalidades que deverão ser implementadas nos primeiros protótipos e das que poderão ser postergadas.

- **Priorização ICE:** também será utilizada para apoiar a priorização, atribuindo valores de impacto, confiança e facilidade de implementação a cada requisito. Esse método fornecerá objetividade e facilitará o consenso entre equipe e stakeholders. 

---

### **4.1.3 — Declaração de Requisitos** {#declaracao-de-requisitos}
- **User Story:** os requisitos serão descritos no formato de histórias do usuário, por exemplo: “Eu, como cliente, quero poder pagar por pix adiantado o serviço.” Essa forma de documentação tornará a comunicação mais clara e centrada no valor para o usuário.

---

### **4.1.4 — Representação de Requisitos:** {#representacao-de-requisitos}
- **Mapa Mental:** será elaborado para representar visualmente os requisitos identificados, agrupando funcionalidades e relacionando-as aos objetivos do negócio. Essa técnica ajudará a manter uma visão global do sistema.

- **Mockups:** serão desenvolvidos para simular as principais telas do aplicativo WaveON, permitindo a discussão inicial de usabilidade e design junto aos stakeholders antes da implementação.

- **Protótipos de Alta Fidelidade:** serão produzidos em etapas posteriores para aproximar a experiência do usuário da versão final do sistema, possibilitando testes realistas e validação mais precisa junto ao cliente da VB.

---

### **4.1.5 — Verificação e Validação de Requisitos** {#verificacao-e-validacao-de-requisitos}
- **Checklist de Validação e Verificação:** será utilizado para revisar os requisitos documentados, garantindo consistência, completude e alinhamento com os objetivos do projeto..

- **Definition of Ready(DoR):** será aplicada para garantir que um requisito tenha clareza e detalhamento suficientes antes de ser incluído em uma iteração de desenvolvimento.

- **Definition of Done(DoD):** será estabelecida para definir critérios de aceitação de cada requisito, assegurando que cada incremento esteja implementado, testado e integrado antes de ser considerado concluído.

- **Revisão Informal ou Formal:** revisões informais ocorrerão a cada ciclo de prototipação junto ao cliente, enquanto revisões formais serão realizadas em marcos de entrega, consolidando o alinhamento com a VB.

- **Feedback do Cliente:** será coletado continuamente durante as validações dos protótipos e incrementos entregues, permitindo ajustes rápidos e validação constante dos requisitos.

---

### **4.1.6 — Organização e Atualização de Requisitos** {#organizacao-e-atualizacao-de-requisitos}
- **Backlog de Requisitos:** embora não seja um artefato nativo do RAD, será adotado no WaveON como ferramenta de organização dinâmica dos requisitos. Esse backlog possibilitará atualizar e repriorizar itens ao longo das iterações, mantendo rastreabilidade e transparência no processo.

---

## **4.2 Engenharia de Requisitos e o RAD** 🏗️

Cada ciclo do RAD será composto pelas quatro fases principais: **Planejamento de Requisitos**, **Design do Usuário**, **Construção** e **Transição/Implementação**.  
O processo se repetirá até que o sistema esteja completo, com entregas incrementais a cada ciclo.  O [Cronograma de Entregas](https://mdsreq-fga-unb.github.io/2025.2-T01-WaveOn/visao_produto/cronograma_entregas/) estutura a organização e quantidade de ciclos necessários para garantir a entrega do MVP.

Fases do Processo RAD    | Atividades ER | Prática | Técnica | Resultado Esperado
-------- | ------ | --------- | ----- | ---------
**Planejamento de Requisitos** | [Elicitação e Descoberta](#elicitacao-e-descoberta) | Levantamento de requisitos | Entrevistas com Stakeholders, Brainstorming| Entedimento de problemas, identificação de funcionalidades e lista de necessidades |
 | [Análise e Consenso](#analise-e-consenso) | Priorização dos Requisitos | User Story Mapping(USM), Priorização MoSCoW, Priorização ICE | Escopo e funcionalidades essenciais definidas e priorizadas em comum acordo. | 
| [Verificação e Validação](#verificacao-e-validacao-de-requisitos) | Validação de Requisitos | Checklist de Verificação e Validação, DoR | Confirmação de que requisito entrega valor |
 | [Declaração](#declaracao-de-requisitos) | Registro dos requisitos | User Story | Histórias de usuário que detalham as funcionalidades do projeto. |
  | [Organização e Atualização](#organizacao-e-atualizacao-de-requisitos) | Organização dos requisitos implementados ou atrasados | Backlog de requisitos | Backlog atualizado |
**Design de Usuário** | [Representação de Requisitos](#representacao-de-requisitos) | Prototipagem | Mapa Mental, Mockups, Protótipos de Alta Fidelidade | Ciclo iterativo de prototipagem, teste e refinamento.|
 | [Verificação e Validação](#verificacao-e-validacao-de-requisitos) | Validação de Requisitos | Revisão Informal ou Formal, Feedback do Cliente | Ravisão formal do Designer com os Desenvolvedores e validação de prototipagem com o cliente. |
**Construção** | [Verificação e Validação](#verificacao-e-validacao-de-requisitos) | Verificação de implementação | Critérios de aceitação, Revisão informal ou formal, DoD | Confirmação de que entrega atende requisito | 
**Transição/Implementação** | [Verificação e Validação](#verificacao-e-validacao-de-requisitos) | Apresentação ao cliente dos incrementos desenvolvidos ao longo do Ciclo. | Feedback do Cliente. | Funcionalidades avaliadas com base no retorno dos clientes. |
 | [Organização e Atualização](#organizacao-e-atualizacao-de-requisitos) | Organização dos requisitos implementados ou atrasados | Backlog de requisitos | Backlog atualizado |

---

## **Hisórico de Versão** 🔄

| Data       | Versão | Descrição                                         | Autor(es)        | Revisor(es)     |
|------------|--------|---------------------------------------------------|------------------|-----------------|
|            |        |                                                   |                  |                 |
|            |        |                                                   |                  |                 |
|            |        |                                                   |                  |                 |
|            |        |                                                   |                  |                 |
|            |        |                                                   |                  |                 |

