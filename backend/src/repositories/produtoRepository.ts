import { supabase } from "../config/supabase";
import { Produto } from "../types/produto";

export const listarProdutos = async (): Promise<Produto[]> => {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export const buscarProdutoPorId = async (
  id: number
): Promise<Produto | undefined> => {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return undefined;
    }

    throw new Error(error.message);
  }

  return data;
};

export const criarProduto = async (
  produto: Produto
): Promise<Produto> => {
  const { id, ...produtoSemId } = produto;

  const { data, error } = await supabase
    .from("produtos")
    .insert(produtoSemId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const atualizarProduto = async (
  id: number,
  produtoAtualizado: Produto
): Promise<Produto | undefined> => {
  const { id: _, ...produtoSemId } = produtoAtualizado;

  const { data, error } = await supabase
    .from("produtos")
    .update(produtoSemId)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return undefined;
    }

    throw new Error(error.message);
  }

  return data;
};

export const excluirProduto = async (
  id: number
): Promise<boolean> => {
  const { data, error } = await supabase
    .from("produtos")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data.length > 0;
};