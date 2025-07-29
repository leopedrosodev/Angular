import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produto-form.html',
  styleUrls: ['./produto-form.css']
})
export class ProdutoFormComponent implements OnInit {
  produto: Produto = {
    nome: '',
    descricao: '',
    preco: 0
  };

  isEdicao: boolean = false;
  carregando: boolean = false;
  erro: string = '';
  sucesso: string = '';

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdicao = true;
      this.carregarProduto(+id);
    }
  }

  carregarProduto(id: number): void {
    this.carregando = true;
    this.produtoService.buscarPorId(id).subscribe({
      next: (produto) => {
        this.produto = produto;
        this.carregando = false;
      },
      error: (error) => {
        this.erro = 'Erro ao carregar produto';
        this.carregando = false;
        console.error('Erro:', error);
      }
    });
  }

  salvar(): void {
    if (!this.validarFormulario()) {
      return;
    }

    this.carregando = true;
    this.erro = '';
    this.sucesso = '';

    const operacao = this.isEdicao
      ? this.produtoService.atualizar(this.produto.id!, this.produto)
      : this.produtoService.criar(this.produto);

    operacao.subscribe({
      next: (produto) => {
        this.sucesso = this.isEdicao
          ? 'Produto atualizado com sucesso!'
          : 'Produto criado com sucesso!';
        this.carregando = false;

        // Redirecionar após 2 segundos
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (error) => {
        this.erro = 'Erro ao salvar produto';
        this.carregando = false;
        console.error('Erro:', error);
      }
    });
  }

  validarFormulario(): boolean {
    if (!this.produto.nome.trim()) {
      this.erro = 'Nome é obrigatório';
      return false;
    }

    if (this.produto.nome.length > 100) {
      this.erro = 'Nome deve ter no máximo 100 caracteres';
      return false;
    }

    if (this.produto.descricao && this.produto.descricao.length > 500) {
      this.erro = 'Descrição deve ter no máximo 500 caracteres';
      return false;
    }

    if (!this.produto.preco || this.produto.preco <= 0) {
      this.erro = 'Preço deve ser maior que zero';
      return false;
    }

    if (this.produto.preco > 99999999.99) {
      this.erro = 'Preço muito alto';
      return false;
    }

    return true;
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }

  formatarPreco(): void {
    // Garantir que o preço seja um número válido
    if (this.produto.preco) {
      this.produto.preco = Math.round(this.produto.preco * 100) / 100;
    }
  }
}
