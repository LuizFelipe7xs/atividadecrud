import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Produto } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  categorias = [
    'Móveis',
    'Eletrônicos',
    'Informática',
    'Decorativos',
    'Eletrodomésticos'
  ];

  cores = [
    'Preto',
    'Branco',
    'Azul',
    'Vermelho',
    'Verde'
  ];

  produto: Produto = {
    nome: '',
    descricao: '',
    preco: 0,
    quantidade: 0,
    categoria: '',
    cor: ''
  };

  id?: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');

    if (paramId) {
      this.id = Number(paramId);

      this.productService.buscarPorId(this.id).subscribe(produto => {
        this.produto = produto;
      });
    }
  }

  salvar(): void {
    const request = this.id
      ? this.productService.atualizar(this.id, this.produto)
      : this.productService.criar(this.produto);

    request.subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}