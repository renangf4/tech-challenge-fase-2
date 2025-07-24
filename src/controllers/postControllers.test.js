import { describe, it, vi, afterEach, expect } from 'vitest';
import { postPost, updatePost, deletePost } from './postControllers.js';
import Post from '../models/postModel.js';

vi.mock('../models/postModel.js');

const mockResponse = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('postControllers', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('postPost', () => {
    it('deve cadastrar um post com sucesso', async () => {
      const req = { body: { title: 't', content: 'c', author: 'a' } };
      const res = mockResponse();
      Post.mockImplementation(() => ({ save: vi.fn().mockResolvedValue({}) }));
      await postPost(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ response: expect.stringContaining('sucesso') });
    });
    it('deve retornar erro ao falhar no cadastro', async () => {
      const req = { body: { title: 't', content: 'c', author: 'a' } };
      const res = mockResponse();
      Post.mockImplementation(() => ({ save: vi.fn().mockRejectedValue(new Error('fail')) }));
      await postPost(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ response: expect.stringContaining('Não foi possível cadastrar') });
    });
  });

  describe('updatePost', () => {
    it('deve atualizar um post existente', async () => {
      const req = { params: { id: '1' }, body: { title: 't', content: 'c', author: 'a' } };
      const res = mockResponse();
      Post.findByIdAndUpdate.mockResolvedValue({ _id: '1', title: 't', content: 'c', author: 'a' });
      await updatePost(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ response: expect.stringContaining('atualizado'), post: expect.any(Object) });
    });
    it('deve retornar erro se post não encontrado', async () => {
      const req = { params: { id: '1' }, body: { title: 't', content: 'c', author: 'a' } };
      const res = mockResponse();
      Post.findByIdAndUpdate.mockResolvedValue(null);
      await updatePost(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ response: expect.stringContaining('não encontrado') });
    });
    it('deve retornar erro ao falhar na atualização', async () => {
      const req = { params: { id: '1' }, body: { title: 't', content: 'c', author: 'a' } };
      const res = mockResponse();
      Post.findByIdAndUpdate.mockRejectedValue(new Error('fail'));
      await updatePost(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ response: expect.stringContaining('Erro ao atualizar') });
    });
  });

  describe('deletePost', () => {
    it('deve excluir um post com sucesso', async () => {
      const req = { params: { id: '1' } };
      const res = mockResponse();
      Post.findByIdAndDelete.mockResolvedValue({});
      await deletePost(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ response: expect.stringContaining('excluído com sucesso') });
    });
    it('deve retornar erro ao falhar na exclusão', async () => {
      const req = { params: { id: '1' } };
      const res = mockResponse();
      Post.findByIdAndDelete.mockRejectedValue(new Error('fail'));
      await deletePost(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ response: expect.stringContaining('Erro ao excluir') });
    });
  });
}); 