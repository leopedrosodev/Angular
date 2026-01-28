import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CarroService } from './carro.service';

describe('CarroService', () => {
  let service: CarroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarroService);
  });

  it('deve retornar dados para uma placa válida', fakeAsync(() => {
    let resultado = '';

    service.buscarPorPlaca('ABC-1234').subscribe((consulta) => {
      resultado = consulta.carro.modelo;
    });

    tick(650);
    expect(resultado).toBe('Gol');
  }));

  it('deve falhar para placa inválida', fakeAsync(() => {
    let erro = '';

    service.buscarPorPlaca('123').subscribe({
      error: (err) => {
        erro = err.message;
      }
    });

    tick(650);
    expect(erro).toContain('Placa inválida');
  }));
});
