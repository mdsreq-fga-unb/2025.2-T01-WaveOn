# Requisitos Funcionais(RF)
Os requisitos funcionais descrevem as **funcionalidades específicas do sistema** e são organizados por atores:
<br>

**Ator: Cliente**

| ID      | Requisito                 | Descrição                                                                 |
|---------|---------------------------|---------------------------------------------------------------------------|
| RF-C01  | Visualizar Serviços       | O sistema deve permitir que o cliente visualize todos os serviços de lavagem disponíveis, com suas descrições, características, produtos utilizados e tempo médio de duração. |
| RF-C02  | Visualizar Preços         | O sistema deve exibir claramente os preços de cada serviço de lavagem.     |
| RF-C03  | Acesso a Contatos         | O sistema deve disponibilizar em local de fácil acesso os telefones e o perfil do Instagram da empresa. |
| RF-C04  | Consultar Disponibilidade | O sistema deve disponibilizar um calendário onde o cliente possa visualizar os horários disponíveis para agendamento. |
| RF-C05  | Cadastro de Usuário       | O sistema deve permitir que o cliente realize um cadastro rápido utilizando e-mail e senha. |
| RF-C06  | Realizar Login            | O sistema deve permitir que o cliente faça login com e-mail e senha cadastrados. |
| RF-C07  | Efetuar Agendamento       | O sistema deve permitir que um cliente logado selecione um serviço, uma data/hora disponível no calendário e efetue o agendamento. |
| RF-C08  | Pagamento via PIX         | O sistema deve integrar-se com um gateway de pagamento para gerar um QR Code ou código PIX para pagamento antecipado do serviço agendado. O status do agendamento deve ser atualizado para "Pago" após a confirmação. |
| RF-C09  | Cancelar Agendamento      | O sistema deve permitir que o cliente cancele um agendamento futuro, desde que respeitadas as políticas de cancelamento. |
| RF-C10  | Visualizar Meus Agendamentos | O sistema deve fornecer uma área logada onde o cliente possa visualizar todos os seus agendamentos. |

<br>

**Ator: Administrador (Dono)**

| ID      | Requisito Funcional     | Descrição                                                                 |
|---------|-------------------------|---------------------------------------------------------------------------|
| RF-A01  | Login Administrativo    | O sistema deve fornecer um acesso administrativo seguro para os donos.    |
| RF-A02  | Gerenciar Agendamentos  | O sistema deve permitir que o administrador visualize, edite e cancele agendamentos. |
| RF-A03  | Visualizar Agenda       | O sistema deve fornecer uma visão da agenda, listando todos os agendamentos. |
| RF-A04  | Visualizar Dados do Cliente | Ao visualizar um agendamento, o administrador deve ter acesso aos dados do cliente: nome, telefone, endereço completo. |
| RF-A05  | Gerenciar Serviços      | O sistema deve permitir que o administrador cadastre, edite e inative os serviços de lavagem, seus preços, descrições e durações. |
| RF-A06  | Regras de Agenda        | O sistema deve impedir agendamentos com intervalo menor que 4 horas entre um serviço e outro. O sistema deve impedir agendamentos para datas futuras superiores a 7 dias. |
| RF-A07  | Adicionar Observações   | O sistema deve permitir que o administrador adicione observações/informações adicionais a um agendamento ou cliente. |
| RF-A08  | Relatórios Básicos      | O sistema deve gerar relatórios que permitam visualizar: quantidade de lavagens realizadas por dia, semana e mês; valor total recebido no período; lista de serviços prestados. |


