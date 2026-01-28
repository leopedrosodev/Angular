import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarroService } from '../services/carro.service';

@Component({
  selector: 'app-legacy-historico',
  standalone: false,
  templateUrl: './legacy-historico.component.html',
  styleUrls: ['./legacy-historico.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegacyHistoricoComponent {
  readonly historico$;

  constructor(private readonly carroService: CarroService) {
    this.historico$ = this.carroService.historico$;
  }
}
