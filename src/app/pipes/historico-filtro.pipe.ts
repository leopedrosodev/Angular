import { Pipe, PipeTransform } from '@angular/core';
import { HistoricoConsulta } from '../models/carro.model';
import { normalizarPlaca } from '../utils/placa';

@Pipe({
  name: 'historicoFiltro',
  standalone: true,
  pure: true
})
export class HistoricoFiltroPipe implements PipeTransform {
  transform(historico: HistoricoConsulta[] | null, termo: string): HistoricoConsulta[] {
    if (!historico?.length) {
      return [];
    }

    const filtro = normalizarPlaca(termo || '');
    if (!filtro) {
      return historico;
    }

    return historico.filter((item) => normalizarPlaca(item.placa).includes(filtro));
  }
}
