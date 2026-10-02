import {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  excluirProduto,
} from "../repositories/produtoRepository";

import { Produto } from "../types/produto";

export const listarTodos = async (): Promise<Produto[]> => {
  return await listarProdutos();
};

export const buscarPorId = async (
  id: number
): Promise<Produto | undefined> => {
  return await buscarProdutoPorId(id);
};

export const criar = async (
  produto: Produto
): Promise<Produto> => {
  return await criarProduto(produto);
};

export const atualizar = async (
  id: number,
  produto: Produto
): Promise<Produto | undefined> => {
  return await atualizarProduto(id, produto);
};

export const excluir = async (
  id: number
): Promise<boolean> => {
  return await excluirProduto(id);
};