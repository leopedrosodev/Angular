export interface Carro {
  placa: string;
  marca: string;
  modelo: string;
  ano: number;
  cor: string;
  municipio: string;
  uf: string;
  restricoes: string[];
}

export interface ConsultaResultado {
  carro: Carro;
  consultadoEm: Date;
  origem: 'base-local' | 'cache';
}

export interface HistoricoConsulta {
  placa: string;
  consultadoEm: Date;
  sucesso: boolean;
  mensagem?: string;
  carro?: Carro;
}
