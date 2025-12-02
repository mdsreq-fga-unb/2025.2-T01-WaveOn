import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return HTML test page', () => {
      const result = appController.getTestPage();
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result).toContain('<!DOCTYPE html>');
      expect(result).toContain('<html');
    });

    it('should include Users section', () => {
      const result = appController.getTestPage();
      expect(result).toContain('Users');
      expect(result).toContain('createUser');
      expect(result).toContain('listUsers');
    });

    it('should include Lojas section', () => {
      const result = appController.getTestPage();
      expect(result).toContain('Lojas');
      expect(result).toContain('createLoja');
      expect(result).toContain('listLojas');
    });

    it('should include Produtos section', () => {
      const result = appController.getTestPage();
      expect(result).toContain('Produtos');
      expect(result).toContain('createProduto');
      expect(result).toContain('listProdutos');
    });

    it('should include Comentários section', () => {
      const result = appController.getTestPage();
      expect(result).toContain('Comentários');
      expect(result).toContain('createComment');
      expect(result).toContain('listComments');
    });

    it('should include API endpoint buttons', () => {
      const result = appController.getTestPage();
      expect(result).toContain('POST /users');
      expect(result).toContain('POST /lojas');
      expect(result).toContain('POST /produtos');
      expect(result).toContain('POST /comments');
    });

    it('should include JavaScript functions for API calls', () => {
      const result = appController.getTestPage();
      expect(result).toContain('function createUser()');
      expect(result).toContain('function createLoja()');
      expect(result).toContain('function createProduto()');
      expect(result).toContain('function createComment()');
      expect(result).toContain('fetch(');
    });

    it('should use AppService.getTestPage()', () => {
      const spy = jest.spyOn(appService, 'getTestPage');
      appController.getTestPage();
      expect(spy).toHaveBeenCalled();
    });
  });
});
