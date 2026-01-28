import { Pipe, PipeTransform } from '@angular/core';
import { formatarPlaca } from '../utils/placa';

@Pipe({
  name: 'placa',
  standalone: true,
  pure: true
})
export class PlacaPipe implements PipeTransform {
  transform(valor: string | null | undefined): string {
    if (!valor) {
      return '';
    }

    return formatarPlaca(valor);
  }
}
