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

| Categoria          | Requisito Não-Funcional | Descrição                                                                 |
|--------------------|-------------------------|---------------------------------------------------------------------------|
| Usabilidade        | RNF-U01                 | A interface deve seguir o guia de estilo definido (cores predominantes azul #08A4BD, preto #000000 e branco #ffffffff). O processo de agendamento deve ser concluído em no máximo 3 cliques. Será considerado conforme se 95% das telas seguirem o guia de estilo. |
| Usabilidade (Admin)| RNF-U02                 | A interface administrativa deve permitir que um usuário sem experiência técnica realize as operações principais (cadastrar, listar e editar) em até 4 cliques. A conformidade será validada com teste de usabilidade envolvendo ao menos 3 usuários, atingindo 80% de sucesso. |
| Desempenho         | RNF-D01                 | O tempo de resposta do sistema para qualquer ação do usuário deve ser inferior a 3 segundos em condições normais de operação. |
| Confiabilidade     | RNF-C01                 | O sistema deve manter disponibilidade mínima de 99,5%, garantindo acesso ao agendamento 24/7. |
| Compatibilidade    | RNF-C02                 | A aplicação deve ser compatível com as versões mais recentes dos navegadores Google Chrome (138.0), Mozilla Firefox (143.0), Microsoft Edge (140.0) e Opera (Opera One). |
| Segurança          | RNF-S01                 | Todas as operações de banco de dados devem utilizar consultas parametrizadas, prevenindo SQL Injection. A verificação será feita mediante análise de código e testes automatizados. |
| Segurança (Dados)  | RNF-S02                 | Todos os dados sensíveis devem ser criptografados utilizando AES-256 em repouso e TLS 1.2+ em trânsito. O sistema deve possuir mecanismos de consentimento, revisão e exclusão de dados do usuário, atendendo aos requisitos da LGPD. |
| Manutenibilidade   | RNF-M01                 | O código-fonte deve seguir o padrão de estilo definido e possuir comentários em pelo menos 80% das funções públicas. Os módulos devem ter no máximo 300 linhas para garantir modularidade. |
| Suporte            | RNF-SU01                | O sistema deve registrar erros, acessos e operações críticas através de um serviço de logging centralizado. Falhas críticas devem gerar notificação automática à equipe técnica em até 1 minuto via e-mail ou webhook. |

---

## **Histórico de Versão** 🔄

| Data       | Versão | Descrição                                         | Autor(es)        | Revisor(es)     |
|------------|--------|---------------------------------------------------|------------------|-----------------|
| 17/11/2025 | 1.0    | Editando e corrigindo os RNFs                     | Anna Brandão     | Eduardo         |
|            |        |                                                   |                  |                 |
|            |        |                                                   |                  |                 |
|            |        |                                                   |                  |                 |
|            |        |                                                   |                  |                 |