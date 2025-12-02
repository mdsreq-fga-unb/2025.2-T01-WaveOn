import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('E-commerce API (e2e)', () => {
  let app: INestApplication<App>;
  let createdUserId: number;
  let createdLojaId: number;
  let createdProdutoId: number;
  let createdCommentId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // ============================================
  // Root & Health Check Tests
  // ============================================

  describe('Root & Health', () => {
    it('/ (GET) - should return test page HTML', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Content-Type', /html/);
    });

    it('/health (GET) - should return health status', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('status');
          expect(res.body.status).toBe('ok');
        });
    });

    it('/health/db (GET) - should return database health', () => {
      return request(app.getHttpServer())
        .get('/health/db')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('database');
        });
    });
  });

  // ============================================
  // Users Tests
  // ============================================

  describe('Users', () => {
    const testUser = {
      fullName: 'Test User E2E',
      username: `testuser_${Date.now()}`,
      email: `test_${Date.now()}@example.com`,
      password: 'senha123456',
    };

    it('/users (POST) - should create a new user', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send(testUser)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.fullName).toBe(testUser.fullName);
          expect(res.body.username).toBe(testUser.username);
          expect(res.body.email).toBe(testUser.email);
          expect(res.body).not.toHaveProperty('password'); // Password should not be returned
          createdUserId = res.body.id;
        });
    });

    it('/users (POST) - should fail with duplicate username', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send(testUser)
        .expect(409); // Conflict
    });

    it('/users (POST) - should fail with invalid email', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          fullName: 'Invalid User',
          username: 'invaliduser',
          email: 'not-an-email',
          password: 'senha123',
        })
        .expect(400);
    });

    it('/users (GET) - should return all users', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it('/users/:id (GET) - should return a specific user', () => {
      return request(app.getHttpServer())
        .get(`/users/${createdUserId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(createdUserId);
          expect(res.body.username).toBe(testUser.username);
          expect(res.body).toHaveProperty('lojas');
          expect(res.body).toHaveProperty('comments');
        });
    });

    it('/users/:id (PATCH) - should update a user', () => {
      return request(app.getHttpServer())
        .patch(`/users/${createdUserId}`)
        .send({ fullName: 'Updated Name' })
        .expect(200)
        .expect((res) => {
          expect(res.body.fullName).toBe('Updated Name');
        });
    });

    it('/users/999999 (GET) - should return 404 for non-existent user', () => {
      return request(app.getHttpServer()).get('/users/999999').expect(404);
    });
  });

  // ============================================
  // Lojas Tests
  // ============================================

  describe('Lojas', () => {
    const testLoja = {
      nome: 'Loja E2E Test',
      descricao: 'Loja criada durante testes E2E',
    };

    it('/lojas (POST) - should create a new loja', () => {
      return request(app.getHttpServer())
        .post('/lojas')
        .send({ ...testLoja, donoId: createdUserId })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.nome).toBe(testLoja.nome);
          expect(res.body.descricao).toBe(testLoja.descricao);
          expect(res.body.donoId).toBe(createdUserId);
          expect(res.body).toHaveProperty('dono');
          createdLojaId = res.body.id;
        });
    });

    it('/lojas (POST) - should fail with non-existent user', () => {
      return request(app.getHttpServer())
        .post('/lojas')
        .send({ ...testLoja, donoId: 999999 })
        .expect(404);
    });

    it('/lojas (GET) - should return all lojas', () => {
      return request(app.getHttpServer())
        .get('/lojas')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it('/lojas?donoId=:id (GET) - should filter lojas by owner', () => {
      return request(app.getHttpServer())
        .get(`/lojas?donoId=${createdUserId}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          res.body.forEach((loja) => {
            expect(loja.donoId).toBe(createdUserId);
          });
        });
    });

    it('/lojas/:id (GET) - should return a specific loja', () => {
      return request(app.getHttpServer())
        .get(`/lojas/${createdLojaId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(createdLojaId);
          expect(res.body).toHaveProperty('dono');
          expect(res.body).toHaveProperty('produtos');
        });
    });

    it('/lojas/:id (PATCH) - should update a loja', () => {
      return request(app.getHttpServer())
        .patch(`/lojas/${createdLojaId}`)
        .send({ descricao: 'Descrição atualizada' })
        .expect(200)
        .expect((res) => {
          expect(res.body.descricao).toBe('Descrição atualizada');
        });
    });
  });

  // ============================================
  // Produtos Tests
  // ============================================

  describe('Produtos', () => {
    const testProduto = {
      nome: 'Produto E2E Test',
      preco: 99.99,
      descricao: 'Produto criado durante testes E2E',
      estoque: 50,
    };

    it('/produtos (POST) - should create a new produto', () => {
      return request(app.getHttpServer())
        .post('/produtos')
        .send({ ...testProduto, lojaId: createdLojaId })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.nome).toBe(testProduto.nome);
          expect(res.body.preco).toBe(testProduto.preco);
          expect(res.body.estoque).toBe(testProduto.estoque);
          expect(res.body.lojaId).toBe(createdLojaId);
          expect(res.body).toHaveProperty('loja');
          createdProdutoId = res.body.id;
        });
    });

    it('/produtos (POST) - should fail with invalid price', () => {
      return request(app.getHttpServer())
        .post('/produtos')
        .send({ ...testProduto, preco: -10, lojaId: createdLojaId })
        .expect(400);
    });

    it('/produtos (GET) - should return all produtos', () => {
      return request(app.getHttpServer())
        .get('/produtos')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it('/produtos?lojaId=:id (GET) - should filter produtos by loja', () => {
      return request(app.getHttpServer())
        .get(`/produtos?lojaId=${createdLojaId}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          res.body.forEach((produto) => {
            expect(produto.lojaId).toBe(createdLojaId);
          });
        });
    });

    it('/produtos/:id (GET) - should return a specific produto', () => {
      return request(app.getHttpServer())
        .get(`/produtos/${createdProdutoId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(createdProdutoId);
          expect(res.body).toHaveProperty('loja');
        });
    });

    it('/produtos/:id (PATCH) - should update a produto', () => {
      return request(app.getHttpServer())
        .patch(`/produtos/${createdProdutoId}`)
        .send({ preco: 149.99, estoque: 100 })
        .expect(200)
        .expect((res) => {
          expect(res.body.preco).toBe(149.99);
          expect(res.body.estoque).toBe(100);
        });
    });
  });

  // ============================================
  // Comments Tests
  // ============================================

  describe('Comments', () => {
    const testComment = {
      title: 'Comentário E2E Test',
      content: 'Este é um comentário criado durante testes E2E',
      published: true,
    };

    it('/comments (POST) - should create a new comment', () => {
      return request(app.getHttpServer())
        .post('/comments')
        .send({ ...testComment, authorId: createdUserId })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.title).toBe(testComment.title);
          expect(res.body.content).toBe(testComment.content);
          expect(res.body.published).toBe(testComment.published);
          expect(res.body.authorId).toBe(createdUserId);
          expect(res.body).toHaveProperty('author');
          createdCommentId = res.body.id;
        });
    });

    it('/comments (GET) - should return all comments', () => {
      return request(app.getHttpServer())
        .get('/comments')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it('/comments?authorId=:id (GET) - should filter comments by author', () => {
      return request(app.getHttpServer())
        .get(`/comments?authorId=${createdUserId}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          res.body.forEach((comment) => {
            expect(comment.authorId).toBe(createdUserId);
          });
        });
    });

    it('/comments/:id (GET) - should return a specific comment', () => {
      return request(app.getHttpServer())
        .get(`/comments/${createdCommentId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(createdCommentId);
          expect(res.body).toHaveProperty('author');
        });
    });

    it('/comments/:id (PATCH) - should update a comment', () => {
      return request(app.getHttpServer())
        .patch(`/comments/${createdCommentId}`)
        .send({ title: 'Título atualizado', published: false })
        .expect(200)
        .expect((res) => {
          expect(res.body.title).toBe('Título atualizado');
          expect(res.body.published).toBe(false);
        });
    });

    it('/comments/:id (DELETE) - should delete a comment', () => {
      return request(app.getHttpServer())
        .delete(`/comments/${createdCommentId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toContain('deleted successfully');
        });
    });
  });

  // ============================================
  // Cleanup Tests (Delete in reverse order)
  // ============================================

  describe('Cleanup', () => {
    it('/produtos/:id (DELETE) - should delete a produto', () => {
      return request(app.getHttpServer())
        .delete(`/produtos/${createdProdutoId}`)
        .expect(200);
    });

    it('/lojas/:id (DELETE) - should delete a loja', () => {
      return request(app.getHttpServer())
        .delete(`/lojas/${createdLojaId}`)
        .expect(200);
    });

    it('/users/:id (DELETE) - should delete a user', () => {
      return request(app.getHttpServer())
        .delete(`/users/${createdUserId}`)
        .expect(200);
    });
  });
});
