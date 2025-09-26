# 📋 Requisitos do Sistema - WaveOn

## 📑 Sumário
- [Requisitos Funcionais (RF)](#-requisitos-funcionais-rf)
  - [Cliente](#ator-cliente)
  - [Administrador (Dono)](#ator-administrador-dono)
- [Requisitos Não-Funcionais (RNF)](#-requisitos-não-funcionais-rnf)

---

## 📌 Requisitos Funcionais (RF)

### Ator: Cliente

| ID     | Requisito Funcional                     | Descrição                                                                                                                                              |
|--------|------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| RF-C01 | Visualizar Serviços De Lavagem Na Tela Inicial | O sistema deve permitir que o cliente visualize todos os serviços de lavagem disponíveis, com suas respectivas descrições, características, produtos utilizados e tempo médio de duração. |
| RF-C02 | Visualizar Preços De Diferentes Lavagens | O sistema deve exibir claramente os preços de cada serviço de lavagem.                                                                                  |
| RF-C03 | Acesso a Redes Sociais Da Empresa        | O sistema deve disponibilizar em local de fácil acesso os telefones e o perfil do Instagram da empresa.                                                 |
| RF-C04 | Consultar Disponibilidade Da Lavagem     | O sistema deve disponibilizar um calendário onde o cliente possa visualizar os horários disponíveis para agendamento.                                   |
| RF-C05 | Cadastro de Usuário no Site              | O sistema deve permitir que o cliente realize um cadastro rápido utilizando e-mail e senha.                                                             |
| RF-C06 | Realizar Login no Site                   | O sistema deve permitir que o cliente faça login com e-mail e senha cadastrados.                                                                        |
| RF-C07 | Efetuar Agendamento da Lavagem           | O sistema deve permitir que um cliente logado selecione um serviço, uma data/hora disponível no calendário e efetue o agendamento.                       |
| RF-C08 | Pagamento via PIX                        | O sistema deve integrar-se com um gateway de pagamento para gerar um QR Code ou código PIX para pagamento antecipado do serviço agendado. O status do agendamento deve ser atualizado para "Pago" após a confirmação. |
| RF-C09 | Cancelar Agendamento                     | O sistema deve permitir que o cliente cancele um agendamento futuro, desde que respeitadas as políticas de cancelamento.                                 |
| RF-C10 | Visualizar Agendamentos Realizados       | O sistema deve fornecer uma área logada onde o cliente possa visualizar todos os seus agendamentos.                                                     |

---

### Ator: Administrador (Dono)

| ID     | Requisito Funcional                   | Descrição                                                                                                                        |
|--------|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| RF-A01 | Login Administrativo                  | O sistema deve fornecer um acesso administrativo seguro para os donos.                                                           |
| RF-A02 | Gerenciar Agendamentos Pelo Login Admin | O sistema deve permitir que o administrador visualize, edite e cancele agendamentos.                                             |
| RF-A03 | Visualizar Agenda dos Clientes        | O sistema deve fornecer uma visão da agenda, listando todos os agendamentos.                                                     |
| RF-A04 | Visualizar Informações Pessoais do Cliente | Ao visualizar um agendamento, o administrador deve ter acesso aos dados do cliente: nome, telefone, endereço completo.           |
| RF-A05 | Gerenciar Serviços Marcados           | O sistema deve permitir que o administrador cadastre, edite e inative os serviços de lavagem, seus preços, descrições e durações. |
| RF-A06 | Adicionar Tempo Mínimo Entre os Agendamentos | O sistema deve impedir agendamentos com intervalo menor que 4 horas entre um serviço e outro. O sistema deve impedir agendamentos para datas futuras superiores a 7 dias. |
| RF-A07 | Adicionar Observações no Cadastro do Cliente | O sistema deve permitir que o administrador adicione observações/informações adicionais a um agendamento ou cliente.              |
| RF-A08 | Gerar Relatórios com Informações Importantes | O sistema deve gerar relatórios que permitam visualizar: quantidade de lavagens realizadas por dia, semana e mês; valor total recebido no período; lista de serviços prestados. |

---

## 📌 Requisitos Não-Funcionais (RNF)

| Categoria       | ID       | Requisito Não-Funcional | Descrição                                                                                                         |
|-----------------|----------|--------------------------|-------------------------------------------------------------------------------------------------------------------|
| Usabilidade     | RNF-U01  | Interface intuitiva       | A interface do usuário deve ser intuitiva, seguindo um design moderno com as cores temáticas preto e vermelho. O processo de agendamento deve ser concluído em no máximo 3 cliques. |
| Usabilidade (Admin) | RNF-U02 | Interface administrativa | A interface administrativa deve ser simples e direta, adequada para usuários sem grande experiência técnica.       |
| Desempenho      | RNF-D01  | Tempo de resposta        | O tempo de resposta do sistema para qualquer ação do usuário (como carregar uma página ou confirmar um agendamento) deve ser inferior a 3 segundos em condições normais. |
| Confiabilidade  | RNF-C01  | Disponibilidade          | O sistema deve garantir uma disponibilidade (uptime) superior a 99.5%, permitindo agendamentos 24h/dia, 7 dias/semana. |
| Portabilidade   | RNF-P01  | Aplicação responsiva     | O sistema deve ser uma aplicação web responsiva, funcionando de maneira otimizada em desktop e dispositivos móveis. |
| Compatibilidade | RNF-C02  | Suporte a navegadores    | A aplicação deve ser compatível com as últimas versões dos navegadores: Chrome (138.0), Firefox (143.0), Edge (140.0) e Opera One. |
| Segurança       | RNF-S01  | Proteção contra ataques  | O sistema deve ser imune a vulnerabilidades comuns como SQL Injection.                                             |
| Segurança (Dados) | RNF-S02 | Criptografia e LGPD      | Todos os dados sensíveis dos clientes (pessoais e de pagamento) devem ser criptografados. O sistema deve estar em conformidade com a LGPD. |
| Manutenibilidade | RNF-M01 | Código bem estruturado   | O código-fonte deve ser bem documentado e modular, permitindo fácil evolução e manutenção.                          |
| Suporte         | RNF-SU01 | Logging e alertas        | Deve existir um sistema de logging (registro de eventos) e notificação à equipe em caso de falhas críticas.         |
