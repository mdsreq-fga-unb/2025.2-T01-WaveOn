# **9. Backlog do Produto**

## 9.1 **Backlog Geral 📋**
No projeto WaveON, desenvolvido para a empresa VB, utilizamos o **User Story Mapping** como técnica inicial de organização e entendimento das necessidades tanto dos clientes quanto do dono da empresa. Através do mapeamento, conseguimos identificar as atividades principais do usuário e decompô-las em histórias de usuário, o que nos deu uma visão clara do fluxo de valor do sistema e das funcionalidades que precisariam ser implementadas.

Para apoiar a execução do processo iterativo e incremental do RAD (Rapid Application Development), estruturamos essas histórias em um backlog de requisitos. Embora o RAD, em sua forma clássica, não preveja formalmente um backlog, sua utilização traz benefícios relevantes:

- **Organização dinâmica dos requisitos:** O backlog funciona como um repositório vivo de todas as histórias de usuário levantadas, permitindo ajustes a cada ciclo de RAD conforme surgem novos feedbacks.

- **Priorização incremental:** A partir do mapeamento, as histórias foram priorizadas com técnicas como MoSCoW e ICE, garantindo que as funcionalidades críticas fossem entregues primeiro, alinhadas ao conceito de MVP.

- **Conexão entre ciclos RAD:** Como cada ciclo do RAD envolve planejamento, design, construção e transição, o backlog serviu como instrumento de continuidade entre os ciclos, evitando a perda de requisitos e mantendo rastreabilidade.

- **Justificativa metodológica:** Em projetos acadêmicos e práticos, a combinação de RAD + backlog proporciona o melhor dos dois mundos: a velocidade da prototipagem típica do RAD com a organização e priorização dos métodos ágeis.

Assim, o backlog do WaveON não foi apenas uma lista de funcionalidades, mas um artefato de apoio estratégico, capaz de alinhar as entregas incrementais às expectativas da empresa VB e dos usuários finais.

### **9.1.1 — Features**

| Nome | Título | Descrição |
|------|--------|-----------|
| F01  | Catálogo de Serviços e Preços | Permite ao cliente visualizar os serviços de lavagem disponíveis, suas características e valores, possibilitando a comparação e escolha da melhor opção. |
| F02  | Agendamento Digital | Funcionalidade para marcar, cancelar e gerenciar agendamentos por meio de calendário integrado e login simples, garantindo praticidade e organização. |
| F03  | Pagamentos Integrados | Possibilita ao cliente realizar pagamento por PIX de forma antecipada e ao dono verificar o status do pagamento antes da lavagem. |
| F04  | Comunicação e Suporte | Disponibiliza ao cliente acesso direto a telefones e redes sociais da empresa, facilitando a comunicação rápida e direta. |
| F05  | Monitoramento da Lavagem | Permite ao cliente acompanhar informações sobre duração, produtos utilizados e processo de lavagem, além de possibilitar ao dono o registro de dados adicionais para melhor gestão. |
| F06  | Painel do Dono | Oferece ao dono uma visão geral dos agendamentos diários, semanais e mensais, com dados de clientes, histórico de lavagens e relatórios de faturamento. |
| F07  | Controle de Qualidade e Intervalos | Permite ao dono definir intervalos mínimos entre lavagens, evitar sobrecarga de agendamentos e prevenir imprevistos relacionados ao uso de produtos. |

### **9.1.2 — Histórias de Usuário**

#### **Ator: Cliente**

| Código | Feature Associada | Requisito Funcional Relacionado | Declaração |
|--------|-------------------|---------------------------------|------------|
| <a id="us-c01"></a>US-C01 | F01 | RF-C01 | Como cliente, quero visualizar os serviços de lavagem, suas características para poder escolher a melhor opção e ver os preços das lavagens disponíveis para escolher o melhor preço. |
| <a id="us-c02"></a>US-C02 | F04 | RF-C02 | Como cliente, quero acesso a telefones e Instagram da empresa para uma comunicação mais direta. |
| <a id="us-c03"></a>US-C03 | F02 | RF-C03 | Como cliente, quero um calendário em que eu possa selecionar os dias para marcar uma lavagem. |
| <a id="us-c04"></a>US-C04 | F02 | RF-C04 | Como cliente, quero poder entrar nos meus agendamentos com um cadastro simples e rápido de usuário e senha. |
| <a id="us-c05"></a>US-C05 | F02 | RF-C05 | Como cliente, quero poder visualizar e gerenciar meus agendamentos. |
| <a id="us-c06"></a>US-C06 | F03 | RF-C06 | Como cliente, quero pagar por PIX adiantado o serviço. |
| <a id="us-c07"></a>US-C07 | F02 | RF-C07 | Como cliente, quero cancelar meu agendamento caso eu não precise mais da lavagem. |
| <a id="us-c08"></a>US-C08 | F05 | RF-C08 | Como cliente, quero ver informações de quanto tempo demora a lavagem e quais produtos são usados. |

---

#### **Ator: Administrador (Dono)**

| Código | Feature Associada | Requisito Funcional Relacionado | Declaração |
|--------|-------------------|---------------------------------|------------|
| <a id="us-a01"></a>US-A01 | F06 | RF-A01 | Como dono, quero acessar o sistema administrativo de forma segura para gerenciar o negócio. |
| <a id="us-a02"></a>US-A02 | F06 | RF-A02 | Como dono, quero visualizar, editar, cancelar agendamentos para manter a organização, que a duração mínima entre lavagens seja respeitada (4h) e que não haja agendamentos acima de 7 dias. |
| <a id="us-a03"></a>US-A03 | F06 | RF-A03 | Como dono, quero ter uma visão da agenda diária e semanal para organizar os serviços. |
| <a id="us-a04"></a>US-A04 | F06 | RF-A04 | Como dono, quero ver os dados dos clientes como número de celular e endereço para contato e logística. |
| <a id="us-a05"></a>US-A05 | F01 | RF-A05 | Como dono, quero gerenciar os serviços (cadastrar, editar e inativar), preços e duração. |
| <a id="us-a06"></a>US-A06 | F05 | RF-A06 | Como dono, quero poder adicionar observações e informações adicionais aos clientes e agendamentos. |
| <a id="us-a07"></a>US-A07 | F06 | RF-A08 | Como dono, quero gerar relatórios de lavagens feitas por período e valores recebidos. |

### **9.1.3 — Lista de requisitos não-funcionais**
  - **RNF-U01**: A interface do usuário deve ser intuitiva, seguindo um design moderno com as cores temáticas preto e vermelho. O processo de agendamento deve ser concluído em no máximo 3 cliques.  
  - **RNF-U02**: A interface administrativa deve ser simples e direta, adequada para usuários sem grande experiência técnica.  
  - **RNF-D01**: O tempo de resposta do sistema para qualquer ação do usuário (como carregar uma página ou confirmar um agendamento) deve ser inferior a 3 segundos em condições normais.  
  - **RNF-C01**: O sistema deve garantir uma disponibilidade (uptime) superior a 99.5%, permitindo agendamentos 24 horas por dia, 7 dias por semana.  
  - **RNF-P01**: O sistema deve ser uma aplicação web responsiva, funcionando de maneira otimizada e consistente em dispositivos desktop (computadores) e móveis (smartphones e tablets).  
  - **RNF-C02**: A aplicação deve ser compatível com as últimas três versões dos navegadores Google Chrome, Mozilla Firefox, Microsoft Edge e Opera.  
  - **RNF-S01**: O sistema deve ser imune a vulnerabilidades comuns como SQL Injection e XSS (Cross-Site Scripting).  
  - **RNF-S02**: Todos os dados sensíveis dos clientes (pessoais e de pagamento) devem ser criptografados. O sistema deve estar em conformidade com a LGPD (Lei Geral de Proteção de Dados).  
  - **RNF-M01**: O código-fonte deve ser bem documentado e modular, permitindo que correções e novas funcionalidades sejam implementadas com facilidade.  
  - **RNF-SU01**: Deve existir um sistema de logging (registro de eventos) para facilitar a identificação e correção de erros. A equipe deve ser notificada em caso de falhas críticas no sistema.  


## **9.2 Priorização**
As técnicas de priorização que serão utilizadas pela equipe para priorizar os itens do backlog são **MoSCoW**, para análise qualitativa, e ICE, para análise quantitativa, uma vez que ambos se complementam ao suprir as limitações um do outro e assegurar maior objetividade e alinhamento na priorização. Sob esse viés, seguem as explicações detalhadas de cada modelo:

O modelo MoSCoW realiza uma segmentação qualitativa de prioridade ao dividir os requisitos em quatro categorias, conforme o grau de importância da presença de cada um no produto:

- **Must have (Precisa ter):** requisitos essenciais para o funcionamento do produto e que devem ser implementados obrigatoriamente.
- **Should have (Deve ter):** requisitos importantes, mas que podem ser inseridos após os essenciais.
- **Could have (Poderia ter):** requisitos desejáveis que agregam valor ao produto, porém não são prioritários no escopo inicial.
- **Won’t have (Não terá por agora):** requisitos que não serão incluídos no momento, sendo considerados para versões futuras.
Como modelo quantitativo, o modelo ICE é aplicado por meio da atribuição de pontos em uma escala de 1 a 10, em que 1 representa a menor e 10 a maior pontuação possível. Além disso, essa avaliação será realizada coletivamente pela equipe, o que permite alinhar as percepções de priorização e promover a coerência nas decisões.

Nesse processo, cada item do backlog é avaliado com base em três critérios, representados pelo acrônimo ICE: **Impact** (Impacto), **Confidence** (Confiança) e **Ease** (Facilidade). Após essa avaliação, a pontuação final é obtida por meio da multiplicação dos três valores:

<p align="center">
ICE Score = Impacto × Confiança × Facilidade
</p>


Com isso, o item que alcançar o maior ICE Score deve ser considerado como o mais prioritário para implementação, já que ele indica a melhor combinação entre valor gerado, viabilidade e nível de certeza.

A seguir, detalham-se os três critérios utilizados:

- **Impacto:** refere-se ao potencial do requisito em gerar valor para o negócio.
- **Confiança:** expressa o grau de certeza da equipe em relação à ocorrência do impacto estimado.
- **Facilidade:** avalia o nível de simplicidade, velocidade e baixo custo envolvidos na implementação do requisito.

### **Critérios Objetivos de Pontuação (ICE)**

Para garantir a objetividade na aplicação da pontuação (1 a 10) do modelo ICE, a equipe do WaveON definiu critérios claros baseados no valor de negócio (Impacto), no esforço técnico (Facilidade) e na certeza da estimativa (Confiança), conforme detalhado abaixo:

<details markdown="1">
<summary>Clique para visualizar os critérios de Pontuação (Impacto, Facilidade e Confiança)</summary>

| Critério | Faixa de Pontuação (1-10) | Qualificação | Descrição Objetiva e Métrica |
| :--- | :--- | :--- | :--- |
| **Impacto** | 8 - 10 | **Alto** | Funcionalidade essencial para o MVP. Adere diretamente à Proposta de Valor e garante a sobrevivência da VB no mercado (Must Have). |
| | 4 - 7 | **Médio** | Funcionalidade importante, mas não essencial. Gera valor significativo para a experiência do usuário ou eficiência interna (Should Have). |
| | 1 - 3 | **Baixo** | Funcionalidade que agrega valor mínimo ou atende a um nicho pequeno de usuários. Pode ser facilmente adiada (Could Have/Won't Have). |
| **Facilidade** | 8 - 10 | **Alto (Baixo Esforço)** | Implementação simples que utiliza tecnologias já dominadas e não exige pesquisa ou infraestrutura nova. **Métrica de Esforço: ≤ 2 semanas (Ciclo Curto)**. |
| | 4 - 7 | **Médio (Esforço Moderado)** | Implementação de dificuldade moderada. Envolve integração de APIs de terceiros ou desenvolvimento de lógica de negócio complexa. **Métrica de Esforço: entre 2 e 4 semanas**. |
| | 1 - 3 | **Baixo (Alto Esforço)** | Implementação de alta complexidade, exigindo prova de conceito (PoC), aprendizado de tecnologia nova ou impacto grande na arquitetura de software. **Métrica de Esforço: > 4 semanas**. |
| **Confiança** | 8 - 10 | **Alto** | Requisitos totalmente definidos, caminho técnico claro e sem bloqueadores conhecidos. Estimativa de esforço possui alta certeza. |
| | 4 - 7 | **Médio** | Há algumas incertezas técnicas (ex: dependência de serviços externos) ou os requisitos ainda podem sofrer pequenos ajustes. Risco gerenciável. |
| | 1 - 3 | **Baixo** | Requisito vago, alta dependência de PoC, ou a estimativa de esforço é baseada em pouca experiência da equipe. Alto risco de estouro de prazo. |

</details>

Portanto, a tabela a seguir apresenta os requisitos devidamente priorizados.

### **9.2.1 — Tabela MoSCoW + ICE**

| **Nome (US Sugerida)** | **Requisito Associado** | **MoSCoW** | **ICE Score** | **Quadrante** |
|:---|:---|:---|:---|:---|
| US-C03 – Selecionar dias de lavagem (calendário) | RF-C03 | Must | 720 | I |
| RNF-P01 – Aplicação web responsiva | RNF-P01 | Must | 648 | I |
| US-C05 – Gerenciar agendamentos | RF-C05 | Must | 630 | I |
| US-C01 – Visualizar serviços e preços | RF-C01 | Must | 576 | II |
| RNF-U01 – Interface intuitiva e moderna | RNF-U01 | Should | 576 | II |
| RNF-D01 – Tempo de resposta < 3 segundos | RNF-D01 | Must | 567 | II |
| US-A02 – Gerenciar agendamentos e restrições | RF-A02 | Must | 560 | II |
| RNF-S01 – Proteção contra SQL Injection e XSS | RNF-S01 | Must | 512 | II |
| US-A01 – Acesso administrativo seguro | RF-A01 | Must | 512 | II |
| US-A05 – Gerenciar serviços, preços e duração | RF-A05 | Must | 504 | II |
| US-C04 – Cadastro e login de cliente | RF-C04 | Must | 504 | II |
| RNF-U02 – Interface administrativa simples | RNF-U02 | Should | 504 | II |
| RNF-C02 – Compatibilidade com navegadores | RNF-C02 | Should | 504 | II |
| RNF-S02 – Criptografia e conformidade LGPD | RNF-S02 | Must | 504 | II |
| US-A03 – Visualizar agenda diária e semanal | RF-A03 | Should | 448 | III |
| US-A04 – Visualizar dados dos clientes | RF-A04 | Should | 448 | III |
| US-C07 – Cancelar agendamento | RF-C07 | Should | 448 | III |
| US-C02 – Acessar contatos e redes sociais | RF-C02 | Could | 405 | III |
| RNF-M01 – Código modular e documentado | RNF-M01 | Should | 392 | III |
| RNF-C01 – Disponibilidade 99.5% (24/7) | RNF-C01 | Should | 384 | III |
| US-C08 – Ver tempo e produtos usados | RF-C08 | Could | 384 | III |
| US-A07 – Gerar relatórios de lavagens e valores | RF-A08 | Should | 336 | IV |
| US-A06 – Adicionar observações aos agendamentos | RF-A07 | Could | 280 | IV |
| RNF-SU01 – Logging e notificação de falhas | RNF-SU01 | Could | 240 | IV |



<details markdown="1">
<summary>Clique para visualizar os critérios de avaliação (Impacto, Confiança e Facilidade) de cada User Story</summary>

| **US** | **Impacto** | **Confiança** | **Facilidade** | **ICE Score** |
|---------|--------------|----------------|----------------|----------------|
| **US-C03 – Selecionar dias de lavagem (calendário)** | 10 | 9 | 8 | 720 |
| **RNF-P01 – Aplicação web responsiva** | 9 | 9 | 8 | 648 |
| **US-C05 – Gerenciar agendamentos** | 10 | 9 | 7 | 630 |
| **US-C01 – Visualizar serviços e preços** | 9 | 8 | 8 | 576 |
| **RNF-U01 – Interface intuitiva e moderna** | 8 | 9 | 8 | 576 |
| **RNF-D01 – Tempo de resposta < 3 segundos** | 9 | 9 | 7 | 567 |
| **US-A02 – Gerenciar agendamentos e restrições** | 10 | 8 | 7 | 560 |
| **RNF-S01 – Proteção contra SQL Injection e XSS** | 8 | 8 | 8 | 512 |
| **US-A01 – Acesso administrativo seguro** | 8 | 8 | 8 | 512 |
| **US-A05 – Gerenciar serviços, preços e duração** | 9 | 8 | 7 | 504 |
| **US-C04 – Cadastro e login de cliente** | 8 | 9 | 7 | 504 |
| **RNF-U02 – Interface administrativa simples** | 7 | 9 | 8 | 504 |
| **RNF-C02 – Compatibilidade com navegadores** | 7 | 9 | 8 | 504 |
| **RNF-S02 – Criptografia e conformidade LGPD** | 9 | 8 | 7 | 504 |
| **US-A03 – Visualizar agenda diária e semanal** | 8 | 8 | 7 | 448 |
| **US-A04 – Visualizar dados dos clientes** | 8 | 8 | 7 | 448 |
| **US-C07 – Cancelar agendamento** | 7 | 8 | 8 | 448 |
| **US-C02 – Acessar contatos e redes sociais** | 5 | 9 | 9 | 405 |
| **RNF-M01 – Código modular e documentado** | 7 | 8 | 7 | 392 |
| **RNF-C01 – Disponibilidade 99.5% (24/7)** | 8 | 8 | 6 | 384 |
| **US-C08 – Ver tempo e produtos usados** | 6 | 8 | 8 | 384 |
| **US-A07 – Gerar relatórios de lavagens e valores** | 7 | 8 | 6 | 336 |
| **US-A06 – Adicionar observações aos agendamentos** | 5 | 8 | 7 | 280 |
| **RNF-SU01 – Logging e notificação de falhas** | 5 | 8 | 6 | 240 |

</details>

A matriz de esforço e impacto será utilizada como apoio na definição das prioridades das histórias de usuário que compõem o MVP. Para isso, essa ferramenta é estruturada em dois eixos: o eixo vertical representa o impacto, ou seja, o valor de negócio que cada funcionalidade pode gerar; enquanto o eixo horizontal representa o esforço, que corresponde à complexidade e aos recursos necessários para sua implementação.

### **9.2.1 — Gráfico de Quadrantes**
A combinação desses dois critérios(**MoSCoW** e **ICE**) permite visualizar com clareza quais funcionalidades devem ser priorizadas. A seguir, estão descritos os quatro quadrantes da matriz através de sua relação com o MVP:

| Faixa ICE | Quadrante | Interpretação                          | MoSCoW típico  |
| --------- | --------- | -------------------------------------- | -------------- |
| ≥ 600     | **I**     | Essencial ao MVP                       | Must           |
| 500–599   | **II**    | Alta prioridade, sustentação principal | Must / Should  |
| 400–499   | **III**   | Valor médio, suporte e experiência     | Should / Could |
| < 400     | **IV**    | Melhorias ou backlog futuro            | Could / Won’t  |


<iframe
  width="100%"
  height="400"
  src="https://miro.com/app/board/uXjVJ_0Toc4=/?share_link_id=784161617368"
  frameborder="0"
  allowfullscreen>
</iframe>

### **9.2.2 — Correlação entre Objetivos e MVP**

O MVP foi desenhado para endereçar os **três Objetivos Específicos mais críticos (OE1, OE3 e OE4)**, que representam o valor fundamental e a eficiência operacional imediata para a empresa VB. O escopo foi rigorosamente focado em construir a **jornada completa de contratação e serviço**, garantindo:

1.  A **aceleração e desburocratização do fluxo de agendamento e pagamento (OE3)** para o cliente.
2.  A **gestão eficiente da agenda e logística (OE1)**.
3.  A **melhoria na tomada de decisão gerencial (OE4)** através de dados operacionais básicos e em tempo real.

Este foco estratégico permite à VB validar a eficiência e usabilidade do produto antes de expandir para funcionalidades secundárias, como a comunicação de status em tempo real (OE2).

| Objetivo Específico | Feature (F) | Requisito Funcional (RF) | User Story (US) Inclusa no MVP |
| :--- | :--- | :--- | :--- |
| **OE1** - Otimizar a gestão e logística de agendamentos. | F06 | RF-A02 | **US-A02** (Visualizar agenda Admin) |
| | F06 | RF-A04 | **US-A04** (Visualizar dados e endereço do Cliente) |
| | F07 | RF-A02 | **US-A06** (Regras de intervalo e limite da agenda) |
| | F02 | RF-C03 | **US-C04** (Acessar calendário para agendar) |
| **OE2** - Simplificar a comunicação e status do serviço. | N/A | N/A | **Nenhuma US Funcional Direta** [O objetivo será endereçado em fases futuras, após o MVP, com a implementação de notificações de status (US Should Have/Could Have).] |
| **OE3** - Acelerar e desburocratizar a contratação. | F01 | RF-C01 | **US-C01** (Visualizar serviços) |
| | F01 | RF-C01 | **US-C02** (Visualizar preços) |
| | F03 | RF-C06 | **US-C07** (Realizar pagamento PIX) |
| | F02 | RF-C07 | **US-C08** (Cancelar agendamento) |
| **OE4** - Melhorar a tomada de decisão com dados em tempo real. | F06 | RF-A08 | **US-A08** (Visualizar relatórios básicos) |
| | F06 | RF-A02 | **US-A02** (Visualizar agenda Admin) |

## **9.3 MVP**

O MVP (Produto Mínimo Viável) do sistema WaveON foi definido com base nos requisitos funcionais considerados essenciais para validar a proposta de valor junto ao cliente VB e seus usuários finais. A seleção dos itens priorizou as funcionalidades Must Have, indispensáveis para o funcionamento básico do sistema.

O foco foi garantir que o cliente da VB tenha uma jornada simples e funcional para visualizar os serviços, realizar agendamentos e efetuar pagamentos, enquanto o dono da VB possa gerenciar os agendamentos, clientes e relatórios de maneira segura e organizada. Dessa forma, o MVP permitirá validar rapidamente se a solução atende às expectativas de eficiência e usabilidade, possibilitando iterações futuras para evolução do produto.

| Código Oficial (US/RNF) | Requisito Associado (RF/RNF) |
|:---|:---|
| US-C04 (Login Cliente) | RF-C04 |
| US-C01 (Visualizar Serviços/Preços) | RF-C01 |
| US-A01 (Login Admin) | RF-A01 |
| US-C03 (Selecionar Dias/Agendamento) | RF-C02 |
| US-C06 (Pagamento PIX) | RF-C06 |
| US-A03 (Gestão Agenda Admin) | RF-A03 |
| RNF-U01 (RNF Usabilidade) | RNF-U01 |
| RNF-P01 (RNF Responsividade) | RNF-P01 |
| RF-C03 (Cadastro Cliente) | RF-C03 |
| RNF-S02 (RNF Segurança/LGPD) | RNF-S02 |
| US-A05 (Gestão Serviços) | RF-A05 |
| US-A02 (Regra Intervalo Agend.) | RF-A02 |
| US-C07 (Cancelar Agendamento) | RF-C07 |
| RNF-D01 (RNF Desempenho) | RNF-D01 |
| RNF-S01 (RNF SQL/XSS) | RNF-S01 |