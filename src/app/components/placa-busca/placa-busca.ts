import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, Subject, from, of, interval } from 'rxjs';
import { catchError, map, startWith, switchMap, mergeMap, concatMap, exhaustMap, toArray } from 'rxjs/operators';
import { CarroService } from '../../services/carro.service';
import { ConsultaResultado, HistoricoConsulta } from '../../models/carro.model';
import { isPlacaValida } from '../../utils/placa';
import { PlacaPipe } from '../../pipes/placa.pipe';
import { TempoRelativoPipe } from '../../pipes/tempo-relativo.pipe';
import { HistoricoFiltroPipe } from '../../pipes/historico-filtro.pipe';
import { ResultadoCardComponent, EstadoConsulta } from '../resultado-card/resultado-card';

interface ConsultaViewModel {
  estado: EstadoConsulta;
  resultado: ConsultaResultado | null;
  erro: string;
}

type OperadorDemo = 'switchMap' | 'mergeMap' | 'concatMap' | 'exhaustMap';

interface DemoResultado {
  operador: OperadorDemo;
  placa: string;
  ok: boolean;
  mensagem: string;
}

@Component({
  selector: 'app-placa-busca',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PlacaPipe,
    TempoRelativoPipe,
    HistoricoFiltroPipe,
    ResultadoCardComponent
  ],
  templateUrl: './placa-busca.html',
  styleUrls: ['./placa-busca.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacaBuscaComponent implements OnInit {
  readonly placaControl: FormControl<string>;
  readonly buscaForm;

  filtroHistorico = '';
  readonly nota = {
    nome: '',
    comentario: ''
  };

  readonly consulta$: Observable<ConsultaViewModel>;
  readonly historico$: Observable<HistoricoConsulta[]>;
  readonly demoResultados$: Observable<DemoResultado[] | null>;
  readonly tick$ = interval(1000);

  private readonly buscarSubject = new Subject<string>();
  private readonly demoSubject = new Subject<OperadorDemo>();

  constructor(private readonly fb: FormBuilder, private readonly carroService: CarroService) {
    this.placaControl = new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, this.placaValidator]
    });
    this.buscaForm = this.fb.group({
      placa: this.placaControl
    });
    this.historico$ = this.carroService.historico$;
    this.consulta$ = this.criarFluxoConsulta();
    this.demoResultados$ = this.criarFluxoDemo();
  }

  ngOnInit(): void {
    this.placaControl.setValue('ABC-1234');
  }

  submeterConsulta(): void {
    if (this.buscaForm.invalid) {
      this.buscaForm.markAllAsTouched();
      return;
    }

    this.buscarSubject.next(this.placaControl.value);
  }

  limparHistorico(): void {
    this.carroService.limparHistorico();
  }

  atualizarFiltro(valor: string): void {
    this.filtroHistorico = valor;
  }

  registrarNota(): void {
    this.nota.nome = this.nota.nome.trim();
    this.nota.comentario = this.nota.comentario.trim();
  }

  rodarDemo(operador: OperadorDemo): void {
    this.demoSubject.next(operador);
  }

  private criarFluxoConsulta(): Observable<ConsultaViewModel> {
    return this.buscarSubject.pipe(
      map((placa) => placa.trim()),
      switchMap((placa) =>
        this.carroService.buscarPorPlaca(placa).pipe(
          map((resultado) => ({ estado: 'sucesso', resultado, erro: '' } as ConsultaViewModel)),
          startWith({ estado: 'carregando', resultado: null, erro: '' } as ConsultaViewModel),
          catchError((erro: Error) =>
            of({ estado: 'erro', resultado: null, erro: erro.message } as ConsultaViewModel)
          )
        )
      ),
      startWith({ estado: 'idle', resultado: null, erro: '' } as ConsultaViewModel)
    );
  }

  private criarFluxoDemo(): Observable<DemoResultado[] | null> {
    return this.demoSubject.pipe(
      switchMap((operador) => this.executarDemo(operador)),
      startWith(null)
    );
  }

  private executarDemo(operador: OperadorDemo): Observable<DemoResultado[]> {
    const placas = ['ABC1234', 'KLA0B12', 'QWE9J75'];

    const operacao = (placa: string) =>
      this.carroService.buscarPorPlaca(placa).pipe(
        map(() => ({
          operador,
          placa,
          ok: true,
          mensagem: 'Consulta concluída'
        })),
        catchError((erro: Error) =>
          of({
            operador,
            placa,
            ok: false,
            mensagem: erro.message
          })
        )
      );

    const pipeline =
      operador === 'mergeMap'
        ? mergeMap(operacao)
        : operador === 'concatMap'
          ? concatMap(operacao)
          : operador === 'exhaustMap'
            ? exhaustMap(operacao)
            : switchMap(operacao);

    return from(placas).pipe(pipeline, toArray());
  }

  private placaValidator(control: AbstractControl<string>): ValidationErrors | null {
    return isPlacaValida(control.value) ? null : { placaInvalida: true };
  }
}
