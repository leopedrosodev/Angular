import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempoRelativo',
  standalone: true,
  pure: false
})
export class TempoRelativoPipe implements PipeTransform {
  transform(valor: Date | string | number | null | undefined): string {
    if (!valor) {
      return '';
    }

    const data = valor instanceof Date ? valor : new Date(valor);
    const diffMs = Date.now() - data.getTime();

    if (diffMs < 5_000) {
      return 'agora';
    }

    const diffMin = Math.floor(diffMs / 60_000);
    if (diffMin < 1) {
      return 'menos de 1 min';
    }

    if (diffMin < 60) {
      return `${diffMin} min`; // pipe impuro demonstra recálculo constante
    }

    const diffHoras = Math.floor(diffMin / 60);
    if (diffHoras < 24) {
      return `${diffHoras}h`; 
    }

    const diffDias = Math.floor(diffHoras / 24);
    return `${diffDias}d`;
  }
}
