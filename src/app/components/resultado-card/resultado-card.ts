import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaResultado } from '../../models/carro.model';
import { PlacaPipe } from '../../pipes/placa.pipe';

export type EstadoConsulta = 'idle' | 'carregando' | 'sucesso' | 'erro';

@Component({
  selector: 'app-resultado-card',
  standalone: true,
  imports: [CommonModule, PlacaPipe],
  templateUrl: './resultado-card.html',
  styleUrls: ['./resultado-card.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultadoCardComponent implements OnInit, OnChanges {
  @Input() estado: EstadoConsulta = 'idle';
  @Input() resultado: ConsultaResultado | null = null;
  ultimaAtualizacao: string = '';

  ngOnInit(): void {
    this.ultimaAtualizacao = new Date().toISOString();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resultado'] && this.resultado) {
      this.ultimaAtualizacao = new Date().toISOString();
    }
  }
}
