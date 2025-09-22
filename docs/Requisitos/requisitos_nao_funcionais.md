# Requisitos Não-Funcionais (RNF)

Os requisitos não-funcionais definem a **qualidade** e as **restrições do sistema**.

| Categoria          | ID       | Descrição                                                                 |
|--------------------|----------|---------------------------------------------------------------------------|
| Usabilidade        | RNF-U01  | A interface do usuário deve ser intuitiva, seguindo um design moderno com as cores temáticas preto e vermelho. O processo de agendamento deve ser concluído em no máximo 3 cliques. |
| Usabilidade (Admin)| RNF-U02  | A interface administrativa deve ser simples e direta, adequada para usuários sem grande experiência técnica. |
| Desempenho         | RNF-D01  | O tempo de resposta do sistema para qualquer ação do usuário (como carregar uma página ou confirmar um agendamento) deve ser inferior a 3 segundos em condições normais. |
| Confiabilidade     | RNF-C01  | O sistema deve garantir uma disponibilidade (uptime) superior a 99.5%, permitindo agendamentos 24 horas por dia, 7 dias por semana. |
| Portabilidade      | RNF-P01  | O sistema deve ser uma aplicação web responsiva, funcionando de maneira otimizada e consistente em dispositivos desktop (computadores) e móveis (smartphones e tablets). |
| Compatibilidade    | RNF-C02  | A aplicação deve ser compatível com as últimas três versões dos navegadores Google Chrome, Mozilla Firefox, Microsoft Edge e Opera. |
| Segurança          | RNF-S01  | O sistema deve ser imune a vulnerabilidades comuns como SQL Injection e XSS (Cross-Site Scripting). |
| Segurança (Dados)  | RNF-S02  | Todos os dados sensíveis dos clientes (pessoais e de pagamento) devem ser criptografados. O sistema deve estar em conformidade com a LGPD (Lei Geral de Proteção de Dados). |
| Manutenibilidade   | RNF-M01  | O código-fonte deve ser bem documentado e modular, permitindo que correções e novas funcionalidades sejam implementadas com facilidade. |
| Suporte            | RNF-SU01 | Deve existir um sistema de logging (registro de eventos) para facilitar a identificação e correção de erros. A equipe deve ser notificada em caso de falhas críticas no sistema. |
