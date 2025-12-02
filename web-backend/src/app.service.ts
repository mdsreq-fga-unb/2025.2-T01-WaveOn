import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTestPage(): string {
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CRUD API - Teste Interativo</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      margin-bottom: 30px;
      text-align: center;
    }

    h1 {
      color: #667eea;
      margin-bottom: 10px;
      font-size: 2.5em;
    }

    .subtitle {
      color: #666;
      font-size: 1.1em;
    }

    .status {
      display: inline-block;
      background: #10b981;
      color: white;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.9em;
      margin-top: 10px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .card {
      background: white;
      border-radius: 15px;
      padding: 25px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }

    .card h2 {
      color: #667eea;
      margin-bottom: 15px;
      font-size: 1.5em;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .endpoint {
      background: #f3f4f6;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 10px;
      border-left: 4px solid #667eea;
    }

    .method {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 5px;
      font-weight: bold;
      font-size: 0.85em;
      margin-right: 10px;
    }

    .get { background: #10b981; color: white; }
    .post { background: #3b82f6; color: white; }
    .patch { background: #f59e0b; color: white; }
    .delete { background: #ef4444; color: white; }

    .endpoint-path {
      font-family: 'Courier New', monospace;
      color: #374151;
      font-weight: 600;
    }

    .test-section {
      background: white;
      border-radius: 15px;
      padding: 30px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }

    .test-section h2 {
      color: #667eea;
      margin-bottom: 20px;
    }

    .test-buttons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }

    button {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 1em;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      color: white;
    }

    button:hover {
      transform: scale(1.05);
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }

    .btn-primary { background: #667eea; }
    .btn-success { background: #10b981; }
    .btn-warning { background: #f59e0b; }
    .btn-danger { background: #ef4444; }

    #output {
      background: #1e293b;
      color: #10b981;
      padding: 20px;
      border-radius: 8px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
      max-height: 400px;
      overflow-y: auto;
      margin-top: 20px;
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    .footer {
      text-align: center;
      color: white;
      margin-top: 30px;
      font-size: 0.9em;
    }

    .icon {
      font-size: 1.3em;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 E-commerce API - Web Backend</h1>
      <p class="subtitle">API REST com NestJS + Prisma + PostgreSQL</p>
      <span class="status">✅ API Online</span>
    </div>

    <div class="grid">
      <div class="card">
        <h2><span class="icon">👤</span> Usuários</h2>
        <div class="endpoint">
          <span class="method post">POST</span>
          <span class="endpoint-path">/users</span>
        </div>
        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="endpoint-path">/users</span>
        </div>
        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="endpoint-path">/users/:id</span>
        </div>
        <div class="endpoint">
          <span class="method patch">PATCH</span>
          <span class="endpoint-path">/users/:id</span>
        </div>
        <div class="endpoint">
          <span class="method delete">DELETE</span>
          <span class="endpoint-path">/users/:id</span>
        </div>
      </div>

      <div class="card">
        <h2><span class="icon">🏪</span> Lojas</h2>
        <div class="endpoint">
          <span class="method post">POST</span>
          <span class="endpoint-path">/lojas</span>
        </div>
        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="endpoint-path">/lojas</span>
        </div>
        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="endpoint-path">/lojas?donoId=:id</span>
        </div>
        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="endpoint-path">/lojas/:id</span>
        </div>
        <div class="endpoint">
          <span class="method patch">PATCH</span>
          <span class="endpoint-path">/lojas/:id</span>
        </div>
        <div class="endpoint">
          <span class="method delete">DELETE</span>
          <span class="endpoint-path">/lojas/:id</span>
        </div>
      </div>

      <div class="card">
        <h2><span class="icon">�</span> Produtos</h2>
        <div class="endpoint">
          <span class="method post">POST</span>
          <span class="endpoint-path">/produtos</span>
        </div>
        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="endpoint-path">/produtos</span>
        </div>
        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="endpoint-path">/produtos?lojaId=:id</span>
        </div>
        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="endpoint-path">/produtos/:id</span>
        </div>
        <div class="endpoint">
          <span class="method patch">PATCH</span>
          <span class="endpoint-path">/produtos/:id</span>
        </div>
        <div class="endpoint">
          <span class="method delete">DELETE</span>
          <span class="endpoint-path">/produtos/:id</span>
        </div>
      </div>

      <div class="card">
        <h2><span class="icon">💬</span> Comentários</h2>
        <div class="endpoint">
          <span class="method post">POST</span>
          <span class="endpoint-path">/comments</span>
        </div>
        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="endpoint-path">/comments</span>
        </div>
        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="endpoint-path">/comments?authorId=:id</span>
        </div>
        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="endpoint-path">/comments/:id</span>
        </div>
        <div class="endpoint">
          <span class="method patch">PATCH</span>
          <span class="endpoint-path">/comments/:id</span>
        </div>
        <div class="endpoint">
          <span class="method delete">DELETE</span>
          <span class="endpoint-path">/comments/:id</span>
        </div>
      </div>

      <div class="card">
        <h2><span class="icon">🏥</span> Health Check</h2>
        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="endpoint-path">/health</span>
        </div>
        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="endpoint-path">/health/db</span>
        </div>
        <p style="margin-top: 15px; color: #666;">Verifica se a API e o banco de dados estão funcionando.</p>
      </div>
    </div>

    <div class="test-section">
      <h2>🧪 Testar API</h2>
      <div class="test-buttons">
        <button class="btn-success" onclick="testHealthCheck()">Health Check</button>
        
        <button class="btn-primary" onclick="createUser()">Criar Usuário</button>
        <button class="btn-primary" onclick="listUsers()">Listar Usuários</button>
        <button class="btn-danger" onclick="deleteUser()">🗑️ Deletar Usuário</button>
        
        <button class="btn-primary" onclick="createLoja()">Criar Loja</button>
        <button class="btn-primary" onclick="listLojas()">Listar Lojas</button>
        <button class="btn-danger" onclick="deleteLoja()">🗑️ Deletar Loja</button>
        
        <button class="btn-primary" onclick="createProduto()">Criar Produto</button>
        <button class="btn-primary" onclick="listProdutos()">Listar Produtos</button>
        <button class="btn-warning" onclick="updateProduto()">Atualizar Produto</button>
        <button class="btn-danger" onclick="deleteProduto()">🗑️ Deletar Produto</button>
        
        <button class="btn-primary" onclick="createComment()">Criar Comentário</button>
        <button class="btn-primary" onclick="listComments()">Listar Comentários</button>
        <button class="btn-danger" onclick="deleteComment()">🗑️ Deletar Comentário</button>
        
        <button class="btn-danger" onclick="clearOutput()">Limpar Console</button>
      </div>
      <div id="output">Console de saída:\n\nClique nos botões acima para testar a API...</div>
    </div>

    <div class="footer">
      <p>🔗 Backend rodando em <strong>http://localhost:3001</strong></p>
      <p>📚 Documentação completa: README_API.md | API_TESTS.md</p>
    </div>
  </div>

  <script>
    const API_URL = 'http://localhost:3001';
    const output = document.getElementById('output');

    function log(message, type = 'info') {
      const timestamp = new Date().toLocaleTimeString('pt-BR');
      const colors = {
        info: '#10b981',
        success: '#22c55e',
        error: '#ef4444',
        warning: '#f59e0b'
      };
      output.innerHTML += \`\\n[\${timestamp}] \${message}\`;
      output.scrollTop = output.scrollHeight;
    }

    function clearOutput() {
      output.innerHTML = 'Console de saída:\\n\\nClique nos botões acima para testar a API...';
    }

    async function testHealthCheck() {
      try {
        log('🏥 Testando Health Check...', 'info');
        const response = await fetch(\`\${API_URL}/health\`);
        const data = await response.json();
        log(\`✅ SUCESSO: \${JSON.stringify(data, null, 2)}\`, 'success');
      } catch (error) {
        log(\`❌ ERRO: \${error.message}\`, 'error');
      }
    }

    async function createUser() {
      try {
        const randomNum = Math.floor(Math.random() * 10000);
        const user = {
          fullName: \`Usuário Teste \${randomNum}\`,
          username: \`user\${randomNum}\`,
          email: \`user\${randomNum}@example.com\`,
          password: 'Senha@123'
        };
        
        log(\`👤 Criando usuário: \${user.username}...\`, 'info');
        const response = await fetch(\`\${API_URL}/users\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
        });
        
        const data = await response.json();
        if (response.ok) {
          log(\`✅ Usuário criado com sucesso!\\n\${JSON.stringify(data, null, 2)}\`, 'success');
        } else {
          log(\`❌ Erro ao criar usuário: \${JSON.stringify(data, null, 2)}\`, 'error');
        }
      } catch (error) {
        log(\`❌ ERRO: \${error.message}\`, 'error');
      }
    }

    async function listUsers() {
      try {
        log('👥 Listando todos os usuários...', 'info');
        const response = await fetch(\`\${API_URL}/users\`);
        const data = await response.json();
        log(\`✅ Encontrados \${data.length} usuários:\\n\${JSON.stringify(data, null, 2)}\`, 'success');
      } catch (error) {
        log(\`❌ ERRO: \${error.message}\`, 'error');
      }
    }

    async function createLoja() {
      try {
        log('🏪 Criando loja...', 'info');
        
        const usersResponse = await fetch(\`\${API_URL}/users\`);
        const users = await usersResponse.json();
        
        if (users.length === 0) {
          log('⚠️ Nenhum usuário encontrado. Crie um usuário primeiro!', 'warning');
          return;
        }
        
        const loja = {
          nome: \`Loja de Teste - \${Math.floor(Math.random() * 1000)}\`,
          descricao: 'Loja criada automaticamente pela interface web!',
          donoId: users[0].id
        };
        
        const response = await fetch(\`\${API_URL}/lojas\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loja)
        });
        
        const data = await response.json();
        if (response.ok) {
          log(\`✅ Loja criada com sucesso!\\n\${JSON.stringify(data, null, 2)}\`, 'success');
        } else {
          log(\`❌ Erro ao criar loja: \${JSON.stringify(data, null, 2)}\`, 'error');
        }
      } catch (error) {
        log(\`❌ ERRO: \${error.message}\`, 'error');
      }
    }

    async function listLojas() {
      try {
        log('🏪 Listando todas as lojas...', 'info');
        const response = await fetch(\`\${API_URL}/lojas\`);
        const data = await response.json();
        log(\`✅ Encontradas \${data.length} lojas:\\n\${JSON.stringify(data, null, 2)}\`, 'success');
      } catch (error) {
        log(\`❌ ERRO: \${error.message}\`, 'error');
      }
    }

    async function createProduto() {
      try {
        log('📦 Criando produto...', 'info');
        
        const lojasResponse = await fetch(\`\${API_URL}/lojas\`);
        const lojas = await lojasResponse.json();
        
        if (lojas.length === 0) {
          log('⚠️ Nenhuma loja encontrada. Crie uma loja primeiro!', 'warning');
          return;
        }
        
        const produto = {
          nome: \`Produto Teste - \${Math.floor(Math.random() * 1000)}\`,
          preco: parseFloat((Math.random() * 1000).toFixed(2)),
          descricao: 'Produto de teste criado automaticamente!',
          estoque: Math.floor(Math.random() * 100),
          lojaId: lojas[0].id
        };
        
        const response = await fetch(\`\${API_URL}/produtos\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(produto)
        });
        
        const data = await response.json();
        if (response.ok) {
          log(\`✅ Produto criado com sucesso!\\n\${JSON.stringify(data, null, 2)}\`, 'success');
        } else {
          log(\`❌ Erro ao criar produto: \${JSON.stringify(data, null, 2)}\`, 'error');
        }
      } catch (error) {
        log(\`❌ ERRO: \${error.message}\`, 'error');
      }
    }

    async function listProdutos() {
      try {
        log('📦 Listando todos os produtos...', 'info');
        const response = await fetch(\`\${API_URL}/produtos\`);
        const data = await response.json();
        log(\`✅ Encontrados \${data.length} produtos:\\n\${JSON.stringify(data, null, 2)}\`, 'success');
      } catch (error) {
        log(\`❌ ERRO: \${error.message}\`, 'error');
      }
    }

    async function createComment() {
      try {
        log('💬 Criando comentário...', 'info');
        
        const usersResponse = await fetch(\`\${API_URL}/users\`);
        const users = await usersResponse.json();
        
        if (users.length === 0) {
          log('⚠️ Nenhum usuário encontrado. Crie um usuário primeiro!', 'warning');
          return;
        }
        
        const comment = {
          title: \`Comentário - \${new Date().toLocaleString('pt-BR')}\`,
          content: 'Este é um comentário de teste criado pela interface web!',
          published: true,
          authorId: users[0].id
        };
        
        const response = await fetch(\`\${API_URL}/comments\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(comment)
        });
        
        const data = await response.json();
        if (response.ok) {
          log(\`✅ Comentário criado com sucesso!\\n\${JSON.stringify(data, null, 2)}\`, 'success');
        } else {
          log(\`❌ Erro ao criar comentário: \${JSON.stringify(data, null, 2)}\`, 'error');
        }
      } catch (error) {
        log(\`❌ ERRO: \${error.message}\`, 'error');
      }
    }

    async function listComments() {
      try {
        log('💬 Listando todos os comentários...', 'info');
        const response = await fetch(\`\${API_URL}/comments\`);
        const data = await response.json();
        log(\`✅ Encontrados \${data.length} comentários:\\n\${JSON.stringify(data, null, 2)}\`, 'success');
      } catch (error) {
        log(\`❌ ERRO: \${error.message}\`, 'error');
      }
    }

    async function updateProduto() {
      try {
        log('✏️ Atualizando produto...', 'info');
        
        const produtosResponse = await fetch(\`\${API_URL}/produtos\`);
        const produtos = await produtosResponse.json();
        
        if (produtos.length === 0) {
          log('⚠️ Nenhum produto encontrado. Crie um produto primeiro!', 'warning');
          return;
        }
        
        const produtoId = produtos[0].id;
        const update = {
          preco: parseFloat((Math.random() * 1000).toFixed(2)),
          estoque: Math.floor(Math.random() * 100)
        };
        
        const response = await fetch(\`\${API_URL}/produtos/\${produtoId}\`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(update)
        });
        
        const data = await response.json();
        if (response.ok) {
          log(\`✅ Produto atualizado com sucesso!\\n\${JSON.stringify(data, null, 2)}\`, 'success');
        } else {
          log(\`❌ Erro ao atualizar produto: \${JSON.stringify(data, null, 2)}\`, 'error');
        }
      } catch (error) {
        log(\`❌ ERRO: \${error.message}\`, 'error');
      }
    }

    async function deleteComment() {
      try {
        log('🗑️ Deletando comentário...', 'info');
        
        const commentsResponse = await fetch(\`\${API_URL}/comments\`);
        const comments = await commentsResponse.json();
        
        if (comments.length === 0) {
          log('⚠️ Nenhum comentário encontrado para deletar!', 'warning');
          return;
        }
        
        const commentId = comments[comments.length - 1].id;
        const commentTitle = comments[comments.length - 1].title;
        
        log(\`🗑️ Deletando comentário ID \${commentId} (\${commentTitle})...\`, 'info');
        
        const response = await fetch(\`\${API_URL}/comments/\${commentId}\`, {
          method: 'DELETE'
        });
        
        const data = await response.json();
        if (response.ok) {
          log(\`✅ Comentário deletado com sucesso!\\n\${JSON.stringify(data, null, 2)}\`, 'success');
        } else {
          log(\`❌ Erro ao deletar comentário: \${JSON.stringify(data, null, 2)}\`, 'error');
        }
      } catch (error) {
        log(\`❌ ERRO: \${error.message}\`, 'error');
      }
    }

    async function deleteUser() {
      try {
        log('🗑️ Deletando usuário...', 'info');
        
        const usersResponse = await fetch(\`\${API_URL}/users\`);
        const users = await usersResponse.json();
        
        if (users.length === 0) {
          log('⚠️ Nenhum usuário encontrado para deletar!', 'warning');
          return;
        }
        
        const userId = users[users.length - 1].id;
        const userName = users[users.length - 1].username;
        
        log(\`🗑️ Deletando usuário ID \${userId} (\${userName})...\`, 'info');
        
        const response = await fetch(\`\${API_URL}/users/\${userId}\`, {
          method: 'DELETE'
        });
        
        const data = await response.json();
        if (response.ok) {
          log(\`✅ Usuário deletado com sucesso!\\n\${JSON.stringify(data, null, 2)}\`, 'success');
        } else {
          log(\`❌ Erro ao deletar usuário: \${JSON.stringify(data, null, 2)}\`, 'error');
        }
      } catch (error) {
        log(\`❌ ERRO: \${error.message}\`, 'error');
      }
    }

    async function deleteLoja() {
      try {
        log('🗑️ Deletando loja...', 'info');
        
        const lojasResponse = await fetch(\`\${API_URL}/lojas\`);
        const lojas = await lojasResponse.json();
        
        if (lojas.length === 0) {
          log('⚠️ Nenhuma loja encontrada para deletar!', 'warning');
          return;
        }
        
        const lojaId = lojas[lojas.length - 1].id;
        const lojaNome = lojas[lojas.length - 1].nome;
        
        log(\`🗑️ Deletando loja ID \${lojaId} (\${lojaNome})...\`, 'info');
        
        const response = await fetch(\`\${API_URL}/lojas/\${lojaId}\`, {
          method: 'DELETE'
        });
        
        const data = await response.json();
        if (response.ok) {
          log(\`✅ Loja deletada com sucesso!\\n\${JSON.stringify(data, null, 2)}\`, 'success');
        } else {
          log(\`❌ Erro ao deletar loja: \${JSON.stringify(data, null, 2)}\`, 'error');
        }
      } catch (error) {
        log(\`❌ ERRO: \${error.message}\`, 'error');
      }
    }

    async function deleteProduto() {
      try {
        log('🗑️ Deletando produto...', 'info');
        
        const produtosResponse = await fetch(\`\${API_URL}/produtos\`);
        const produtos = await produtosResponse.json();
        
        if (produtos.length === 0) {
          log('⚠️ Nenhum produto encontrado para deletar!', 'warning');
          return;
        }
        
        const produtoId = produtos[produtos.length - 1].id;
        const produtoNome = produtos[produtos.length - 1].nome;
        
        log(\`🗑️ Deletando produto ID \${produtoId} (\${produtoNome})...\`, 'info');
        
        const response = await fetch(\`\${API_URL}/produtos/\${produtoId}\`, {
          method: 'DELETE'
        });
        
        const data = await response.json();
        if (response.ok) {
          log(\`✅ Produto deletado com sucesso!\\n\${JSON.stringify(data, null, 2)}\`, 'success');
        } else {
          log(\`❌ Erro ao deletar produto: \${JSON.stringify(data, null, 2)}\`, 'error');
        }
      } catch (error) {
        log(\`❌ ERRO: \${error.message}\`, 'error');
      }
    }

    // Testa a conexão ao carregar a página
    window.addEventListener('load', () => {
      log('🚀 Interface carregada com sucesso!', 'success');
      log('💡 Dica: Clique em "Health Check" para verificar se a API está funcionando.', 'info');
    });
  </script>
</body>
</html>
    `;
  }
}

