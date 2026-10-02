import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Produto } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  produtos: Produto[] = [];
  searchName = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.productService.listar().subscribe(produtos => {
      this.produtos = produtos;
    });
  }

  get produtosFiltrados(): Produto[] {
    const busca = this.searchName.toLowerCase().trim();

    if (!busca) {
      return this.produtos;
    }

    return this.produtos.filter(produto =>
      produto.nome.toLowerCase().includes(busca)
    );
  }

  confirmarExclusao(id: number): void {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este produto?'
    );

    if (!confirmar) {
      return;
    }

    this.productService.excluir(id).subscribe(() => {
      this.carregarProdutos();
    });
  }
}