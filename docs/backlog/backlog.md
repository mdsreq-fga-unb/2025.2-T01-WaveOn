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
| US-C01 | F01 | RF-C01 | Como cliente, quero visualizar os serviços de lavagem e suas características para poder escolher a melhor opção. |
| US-C02 | F01 | RF-C02 | Como cliente, quero ver os preços das lavagens disponíveis para escolher o melhor preço. |
| US-C03 | F04 | RF-C03 | Como cliente, quero acesso a telefones e Instagram da empresa para uma comunicação mais direta. |
| US-C04 | F02 | RF-C04 | Como cliente, quero um calendário em que eu possa selecionar os dias para marcar uma lavagem. |
| US-C05 | F02 | RF-C05 | Como cliente, quero poder entrar nos meus agendamentos com um cadastro simples e rápido de usuário e senha. |
| US-C06 | F02 | RF-C06 | Como cliente, quero poder visualizar e gerenciar meus agendamentos. |
| US-C07 | F03 | RF-C07 | Como cliente, quero pagar por PIX adiantado o serviço. |
| US-C08 | F02 | RF-C08 | Como cliente, quero cancelar meu agendamento caso eu não precise mais da lavagem. |
| US-C09 | F05 | RF-C09 | Como cliente, quero ver informações de quanto tempo demora a lavagem e quais produtos são usados. |

---

#### **Ator: Administrador (Dono)**

| Código | Feature Associada | Requisito Funcional Relacionado | Declaração |
|--------|-------------------|---------------------------------|------------|
| US-A01 | F06 | RF-A01 | Como dono, quero acessar o sistema administrativo de forma segura para gerenciar o negócio. |
| US-A02 | F06 | RF-A02 | Como dono, quero visualizar, editar e cancelar agendamentos para manter a organização. |
| US-A03 | F06 | RF-A03 | Como dono, quero ter uma visão da agenda diária e semanal para organizar os serviços. |
| US-A04 | F06 | RF-A04 | Como dono, quero ver os dados dos clientes como número de celular e endereço para contato e logística. |
| US-A05 | F01 | RF-A05 | Como dono, quero gerenciar os serviços (cadastrar, editar e inativar), preços e duração. |
| US-A06 | F07 | RF-A06 | Como dono, quero que a duração mínima entre lavagens seja respeitada (4h) e que não haja agendamentos acima de 7 dias. |
| US-A07 | F05 | RF-A07 | Como dono, quero poder adicionar observações e informações adicionais aos clientes e agendamentos. |
| US-A08 | F06 | RF-A08 | Como dono, quero gerar relatórios de lavagens feitas por período e valores recebidos. |

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
Portanto, a tabela a seguir apresenta os requisitos devidamente priorizados.

| **Nome (US Sugerida)**        | **Requisito Associado** | **MoSCoW**   | **Impacto** | **Confiança** | **Facilidade** | **ICE Score** | **Quadrante** |
|--------------------------------|-------------------------|--------------|-------------|---------------|----------------|---------------|---------------|
| US01 (Login Cliente)           | RF-C05                  | Must Have    | 10          | 9             | 9              | 810           | 1             |
| US02 (Visualizar Serviços)     | RF-C01                  | Must Have    | 10          | 9             | 8              | 720           | 1             |
| US03 (Login Admin)             | RF-A01                  | Must Have    | 9           | 9             | 8              | 648           | 1             |
| US04 (Agendamento Cliente)     | RF-C06                  | Must Have    | 9           | 8             | 9              | 648           | 1             |
| US05 (Pagamento PIX)           | RF-C07                  | Must Have    | 9           | 8             | 8              | 576           | 1             |
| US06 (Gestão Agenda Admin)     | RF-A03                  | Must Have    | 8           | 9             | 8              | 576           | 1             |
| US07 (RNF Usabilidade)         | RNF-U01                 | Must Have    | 10          | 9             | 6              | 540           | 2             |
| US08 (RNF Responsividade)      | RNF-P01                 | Must Have    | 9           | 9             | 6              | 486           | 2             |
| US09 (Cadastro Cliente)        | RF-C05                  | Must Have    | 7           | 8             | 8              | 448           | 2             |
| US10 (RNF Segurança/LGPD)      | RNF-S02                 | Must Have    | 10          | 8             | 5              | 400           | 2             |
| US11 (Gestão Serviços)         | RF-A05                  | Must Have    | 7           | 7             | 8              | 392           | 2             |
| US12 (Regra Intervalo Agend.)  | RF-A06                  | Must Have    | 8           | 7             | 7              | 392           | 2             |
| US13 (Visualizar Preços)       | RF-C02                  | Must Have    | 7           | 7             | 8              | 392           | 2             |
| US14 (Consultar Disponibilidade)| RF-C04                 | Must Have    | 6           | 8             | 8              | 384           | 2             |
| US15 (RNF Desempenho)          | RNF-D01                 | Must Have    | 8           | 6             | 7              | 336           | 2             |
| US16 (RNF Disponibilidade)     | RNF-C01                 | Must Have    | 8           | 6             | 7              | 336           | 2             |
| US17 (Visualizar Agendamentos) | RF-C09                  | Should Have  | 8           | 8             | 5              | 320           | 2             |
| US18 (Gerenciar Agendamentos)  | RF-A02                  | Should Have  | 8           | 7             | 5              | 280           | 2             |
| US19 (RNF Logging/Notificação) | RNF-SU01                | Should Have  | 7           | 7             | 5              | 245           | 2             |
| US20 (Cancelar Agendamento)    | RF-C08                  | Should Have  | 7           | 6             | 5              | 210           | 2             |
| US21 (Visualizar Dados Cliente)| RF-A04                  | Should Have  | 6           | 7             | 4              | 168           | 2             |
| US22 (RNF Interface Admin)     | RNF-U02                 | Should Have  | 6           | 6             | 4              | 144           | 2             |
| US23 (Acesso Redes Sociais)    | RF-C03                  | Could Have   | 5           | 8             | 8              | 320           | 4             |
| US24 (RNF Código Modular)      | RNF-M01                 | Could Have   | 5           | 7             | 6              | 210           | 4             |
| US25 (Gerar Relatórios)        | RF-A08                  | Could Have   | 6           | 6             | 5              | 180           | 4             |
| US26 (Adicionar Observações)   | RF-A07                  | Could Have   | 5           | 5             | 6              | 150           | 4             |

A matriz de esforço e impacto será utilizada como apoio na definição das prioridades das histórias de usuário que compõem o MVP. Para isso, essa ferramenta é estruturada em dois eixos: o eixo vertical representa o impacto, ou seja, o valor de negócio que cada funcionalidade pode gerar; enquanto o eixo horizontal representa o esforço, que corresponde à complexidade e aos recursos necessários para sua implementação.

Dessa forma, a combinação desses dois critérios permite visualizar com clareza quais funcionalidades devem ser priorizadas. A seguir, estão descritos os quatro quadrantes da matriz através de sua relação com o MVP:

- Quadrante 1 — Baixo esforço e alto impacto: deve compor o MVP. Alto impacto é considerado Must Have ou Should Have no Moscow pela equipe. Baixo esforço é a partir do 500 no ICE pela equipe.
- Quadrante 2 — Alto esforço e alto impacto: pode compor parcialmente o MVP, caso seja essencial. Alto impacto é considerado Must Have ou Should Have no Moscow pela equipe. Alto esforço é abaixo do 500 no ICE pela equipe.
- Quadrante 3 — Baixo esforço e baixo impacto: pode compor o MVP, se houver margem de tempo ou recursos disponíveis. Baixo impacto é considerado Could Have ou Won’t Have no Moscow pela equipe. Baixo esforço é a partir do 500 no ICE pela equipe.
- Quadrante 4 — Alto esforço e baixo impacto: não deve compor o MVP, pois apresenta baixo retorno em relação ao investimento. Baixo impacto é considerado Could Have ou Won’t Have no Moscow pela equipe. Alto esforço é abaixo do 500 no ICE pela equipe.

## **9.3 MVP**

O MVP (Produto Mínimo Viável) do sistema WaveON foi definido com base nos requisitos funcionais considerados essenciais para validar a proposta de valor junto ao cliente VB e seus usuários finais. A seleção dos itens priorizou as funcionalidades Must Have, indispensáveis para o funcionamento básico do sistema, além de algumas Should Have que complementam a experiência do usuário sem comprometer a viabilidade técnica inicial.

O foco foi garantir que o cliente da VB tenha uma jornada simples e funcional para visualizar os serviços, realizar agendamentos e efetuar pagamentos, enquanto o dono da VB possa gerenciar os agendamentos, clientes e relatórios de maneira segura e organizada. Dessa forma, o MVP permitirá validar rapidamente se a solução atende às expectativas de eficiência e usabilidade, possibilitando iterações futuras para evolução do produto.

| Código | Descrição |
|--------|-----------|
| US-C01 | Como cliente, quero visualizar os serviços de lavagem e suas características para que eu possa escolher a melhor opção. |
| US-C02 | Como cliente, quero visualizar os preços das lavagens disponíveis para escolher o melhor preço. |
| US-C04 | Como cliente, quero acessar um calendário em que eu possa selecionar os dias disponíveis para agendar uma lavagem. |
| US-C06 | Como cliente, quero poder visualizar meus agendamentos em uma área logada para acompanhar os serviços. |
| US-C07 | Como cliente, quero realizar o pagamento do serviço via PIX para garantir o agendamento. |
| US-C08 | Como cliente, quero cancelar meu agendamento caso não precise mais do serviço. |
| US-A02 | Como dono, quero visualizar todos os agendamentos do dia e da semana para ter melhor organização. |
| US-A04 | Como dono, quero visualizar os dados de contato e endereço dos clientes para planejar os atendimentos. |
| US-A06 | Como dono, quero que o sistema respeite as regras de agenda, impedindo intervalos menores que 4 horas entre lavagens e agendamentos além de 7 dias. |
| US-A08 | Como dono, quero visualizar relatórios básicos contendo quantidade de lavagens realizadas e valores recebidos por período. |
