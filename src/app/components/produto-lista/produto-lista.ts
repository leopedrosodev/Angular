import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-produto-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produto-lista.html',
  styleUrls: ['./produto-lista.css']
})
export class ProdutoListaComponent implements OnInit {
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  termoBusca: string = '';
  carregando: boolean = false;
  erro: string = '';

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.carregando = true;
    this.erro = '';

    this.produtoService.listarTodos().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.produtosFiltrados = produtos;
        this.carregando = false;
      },
      error: (error) => {
        this.erro = 'Erro ao carregar produtos. Verifique se o backend está rodando.';
        this.carregando = false;
        console.error('Erro:', error);
      }
    });
  }

  buscarProdutos(): void {
    if (this.termoBusca.trim() === '') {
      this.produtosFiltrados = this.produtos;
    } else {
      this.produtoService.buscarPorNome(this.termoBusca).subscribe({
        next: (produtos) => {
          this.produtosFiltrados = produtos;
        },
        error: (error) => {
          this.erro = 'Erro ao buscar produtos';
          console.error('Erro:', error);
        }
      });
    }
  }

  editarProduto(id: number): void {
    this.router.navigate(['/produto-form', id]);
  }

  novoProduto(): void {
    this.router.navigate(['/produto-form']);
  }

  deletarProduto(id: number, nome: string): void {
    if (confirm(`Tem certeza que deseja deletar o produto "${nome}"?`)) {
      this.produtoService.deletar(id).subscribe({
        next: () => {
          this.carregarProdutos();
        },
        error: (error) => {
          this.erro = 'Erro ao deletar produto';
          console.error('Erro:', error);
        }
      });
    }
  }

  formatarPreco(preco: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  }
}
