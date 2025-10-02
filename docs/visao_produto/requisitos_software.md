# 7. **Requisitos de Software**
A elicitação de requisitos do projeto foi realizada com base na técnica de **User Story Mapping (USM)**. Essa abordagem visual e colaborativa possibilita organizar a jornada do usuário em atividades, tarefas e histórias, garantindo uma visão clara de como cada funcionalidade contribui para a entrega de valor real ao cliente.

Diferente de metodologias que apenas listam funcionalidades de forma isolada, o **User Story Mapping** permite alinhar necessidades de clientes e administradores (donos do negócio) com os objetivos estratégicos do sistema. Dessa forma, foi possível priorizar as histórias de usuário mais relevantes, estruturando o MVP de forma a validar rapidamente a proposta de valor do produto.

*O resultado do User Story Mapping pode ser visualizado abaixo:*

<iframe
  width="100%"
  height="400"
  src="https://miro.com/app/board/uXjVJAVHV7c=/?share_link_id=514154185367"
  frameborder="0"
  allowfullscreen>
</iframe>

## 7.1 **Requisitos Funcionais(RF)** ⚙️
Os requisitos funcionais descrevem as **funcionalidades específicas do sistema** e são organizados por atores:
<br>

**Ator: Cliente**

| ID      | Requisito Funcional                  | Descrição                                                                 |
|---------|-----------------------------------------|---------------------------------------------------------------------------|
| RF-C01  | Visualizar Serviços De Diferentes Lavagens | O sistema deve permitir que o cliente visualize todos os serviços de lavagem disponíveis, com suas respectivas descrições, características, produtos utilizados e tempo médio de duração. |
| RF-C02  | Consultar Disponibilidade Da Lavagem    | O sistema deve disponibilizar um calendário onde o cliente possa visualizar os horários disponíveis para agendamento. |
| RF-C03  | Cadastrar Usuário no Site              | O sistema deve permitir que o cliente realize um cadastro rápido utilizando e-mail e senha. |
| RF-C04  | Realizar Login no Site                  | O sistema deve permitir que o cliente faça login com e-mail e senha cadastrados. |
| RF-C05  | Efetuar Agendamento da Lavagem          | O sistema deve permitir que um cliente logado selecione um serviço, uma data/hora disponível no calendário e efetue o agendamento. |
| RF-C06  | Pagar via PIX                        | O sistema deve integrar-se com um gateway de pagamento para gerar um QR Code ou código PIX para pagamento antecipado do serviço agendado. O status do agendamento deve ser atualizado para "Pago" após a confirmação. |
| RF-C07  | Cancelar Agendamento                  | O sistema deve permitir que o cliente cancele um agendamento futuro, desde que respeitadas as políticas de cancelamento. |
| RF-C08  | Visualizar Agendamentos Realizados      | O sistema deve fornecer uma área logada onde o cliente possa visualizar todos os seus agendamentos. |

<br>

**Ator: Administrador (Dono)**

| ID      | Requisito Funcional                   | Descrição                                                                 |
|---------|-----------------------------------------|---------------------------------------------------------------------------|
| RF-A01  | Realizar Login Administrativo           | O sistema deve fornecer um acesso administrativo seguro para os donos.    |
| RF-A02  | Gerenciar Agendamentos Pelo Login Admin | O sistema deve permitir que o administrador visualize, edite e cancele agendamentos. |
| RF-A03  | Visualizar Agenda dos Clientes          | O sistema deve fornecer uma visão da agenda, listando todos os agendamentos. |
| RF-A04  | Visualizar Perfil do Cliente            | Ao visualizar o perfil, o administrador deve ter acesso aos dados do cliente: nome, telefone, endereço completo. |
| RF-A05  | Gerenciar Serviços Marcados            | O sistema deve permitir que o administrador cadastre, edite e inative os serviços de lavagem, seus preços, descrições e durações. |
| RF-A07  | Adicionar Observações no Cadastro do Cliente | O sistema deve permitir que o administrador adicione observações/informações adicionais a um agendamento ou cliente. |
| RF-A08  | Gerar Relatório de Cliente              | O sistema deve gerar relatório que permita visualizar: quantidade de lavagens realizadas por dia, semana e mês; valor total recebido no período; lista de serviços prestados. |

---

## 7.2 **Requisitos Não-Funcionais(RNF)** 🛡️

Os requisitos não-funcionais definem a **qualidade** e as **restrições do sistema**.

| Categoria          | Requisito Não-Funcional | Descrição                                                                 |
|--------------------|-------------------------|---------------------------------------------------------------------------|
| Usabilidade        | RNF-U01                 | A interface do usuário deve ser intuitiva, seguindo um design moderno com as cores temáticas preto e vermelho. O processo de agendamento deve ser concluído em no máximo 3 cliques. |
| Usabilidade (Admin)| RNF-U02                 | A interface administrativa deve ser simples e direta, adequada para usuários sem grande experiência técnica. |
| Desempenho         | RNF-D01                 | O tempo de resposta do sistema para qualquer ação do usuário (como carregar uma página ou confirmar um agendamento) deve ser inferior a 3 segundos em condições normais. |
| Confiabilidade     | RNF-C01                 | O sistema deve garantir uma disponibilidade (uptime) superior a 99.5%, permitindo agendamentos 24 horas por dia, 7 dias por semana. |
| Portabilidade      | RNF-P01                 | O sistema deve ser uma aplicação web responsiva, funcionando de maneira otimizada e consistente em dispositivos desktop (computadores) e móveis (smartphones e tablets). |
| Compatibilidade    | RNF-C02                 | A aplicação deve ser compatível com as últimas versões dos navegadores Google Chrome(138.0), Mozilla Firefox(143.0), Microsoft Edge(140.0) e Opera(Opera One). |
| Segurança          | RNF-S01                 | O sistema deve ser imune a vulnerabilidades comuns como SQL Injection. |
| Segurança (Dados)  | RNF-S02                 | Todos os dados sensíveis dos clientes (pessoais e de pagamento) devem ser criptografados. O sistema deve estar em conformidade com a LGPD (Lei Geral de Proteção de Dados). |
| Manutenibilidade   | RNF-M01                 | O código-fonte deve ser bem documentado e modular, permitindo que correções e novas funcionalidades sejam implementadas com facilidade. |
| Suporte            | RNF-SU01                | Deve existir um sistema de logging (registro de eventos) para facilitar a identificação e correção de erros. A equipe deve ser notificada em caso de falhas críticas no sistema. |

---

## **Hisórico de Versão** 🔄

| Data       | Versão | Descrição                                         | Autor(es)        | Revisor(es)     |
|------------|--------|---------------------------------------------------|------------------|-----------------|
|            |        |                                                   |                  |                 |
|            |        |                                                   |                  |                 |
|            |        |                                                   |                  |                 |
|            |        |                                                   |                  |                 |
|            |        |                                                   |                  |                 |