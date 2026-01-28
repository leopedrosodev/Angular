import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, defer, of, throwError, timer } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Carro, ConsultaResultado, HistoricoConsulta } from '../models/carro.model';
import { formatarPlaca, isPlacaValida, normalizarPlaca } from '../utils/placa';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  private readonly atrasoMs = 650;
  private readonly historicoSubject = new BehaviorSubject<HistoricoConsulta[]>([]);
  readonly historico$ = this.historicoSubject.asObservable();

  private readonly baseLocal: Carro[] = [
    {
      placa: 'ABC1234',
      marca: 'Volkswagen',
      modelo: 'Gol',
      ano: 2018,
      cor: 'Prata',
      municipio: 'Campinas',
      uf: 'SP',
      restricoes: []
    },
    {
      placa: 'BRA2E19',
      marca: 'Chevrolet',
      modelo: 'Onix',
      ano: 2021,
      cor: 'Azul',
      municipio: 'Curitiba',
      uf: 'PR',
      restricoes: ['Licenciamento pendente']
    },
    {
      placa: 'KLA0B12',
      marca: 'Fiat',
      modelo: 'Argo',
      ano: 2020,
      cor: 'Vermelho',
      municipio: 'Belo Horizonte',
      uf: 'MG',
      restricoes: []
    },
    {
      placa: 'QWE9J75',
      marca: 'Toyota',
      modelo: 'Corolla',
      ano: 2019,
      cor: 'Preto',
      municipio: 'São Paulo',
      uf: 'SP',
      restricoes: ['Alienação fiduciária']
    }
  ];

  buscarPorPlaca(placaEntrada: string): Observable<ConsultaResultado> {
    return defer(() => {
      if (!isPlacaValida(placaEntrada)) {
        return throwError(() => new Error('Placa inválida. Use o padrão ABC-1234 ou ABC1D23.'));
      }

      const placaNormalizada = normalizarPlaca(placaEntrada);
      const carro = this.baseLocal.find(
        (item) => normalizarPlaca(item.placa) === placaNormalizada
      );

      if (!carro) {
        return throwError(() => new Error('Placa não encontrada na base local.'));
      }

      const resultado: ConsultaResultado = {
        carro,
        consultadoEm: new Date(),
        origem: 'base-local'
      };

      return timer(this.atrasoMs).pipe(map(() => resultado));
    }).pipe(
      tap({
        next: (resultado) => this.adicionarHistoricoSucesso(resultado),
        error: (erro) => this.adicionarHistoricoErro(placaEntrada, erro)
      })
    );
  }

  limparHistorico(): void {
    this.historicoSubject.next([]);
  }

  private adicionarHistoricoSucesso(resultado: ConsultaResultado): void {
    const novoItem: HistoricoConsulta = {
      placa: resultado.carro.placa,
      consultadoEm: resultado.consultadoEm,
      sucesso: true,
      carro: resultado.carro
    };

    this.atualizarHistorico(novoItem);
  }

  private adicionarHistoricoErro(placaEntrada: string, erro: unknown): void {
    const mensagem = erro instanceof Error ? erro.message : 'Falha desconhecida';
    const novoItem: HistoricoConsulta = {
      placa: formatarPlaca(placaEntrada),
      consultadoEm: new Date(),
      sucesso: false,
      mensagem
    };

    this.atualizarHistorico(novoItem);
  }

  private atualizarHistorico(item: HistoricoConsulta): void {
    const atual = this.historicoSubject.getValue();
    this.historicoSubject.next([item, ...atual].slice(0, 12));
  }
}
