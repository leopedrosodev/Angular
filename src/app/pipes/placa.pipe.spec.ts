import { PlacaPipe } from './placa.pipe';

describe('PlacaPipe', () => {
  it('deve formatar placa com hífen', () => {
    const pipe = new PlacaPipe();
    expect(pipe.transform('abc1234')).toBe('ABC-1234');
  });
});
