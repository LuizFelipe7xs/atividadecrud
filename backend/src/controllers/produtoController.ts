import { Request, Response } from "express";

import {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  excluir,
} from "../services/produtoService";

export const listarProdutos = async (req: Request, res: Response) => {
  const produtos = await listarTodos();

  res.json(produtos);
};

export const buscarProduto = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const produto = await buscarPorId(id);

  if (!produto) {
    return res.status(404).json({
      mensagem: "Produto não encontrado",
    });
  }

  res.json(produto);
};

export const criarProduto = async (req: Request, res: Response) => {
  const produto = await criar(req.body);

  res.status(201).json(produto);
};

export const atualizarProduto = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const produto = await atualizar(id, req.body);

  if (!produto) {
    return res.status(404).json({
      mensagem: "Produto não encontrado",
    });
  }

  res.json(produto);
};

export const excluirProduto = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const sucesso = await excluir(id);

  if (!sucesso) {
    return res.status(404).json({
      mensagem: "Produto não encontrado",
    });
  }

  res.json({
    mensagem: "Produto excluído com sucesso",
  });
};