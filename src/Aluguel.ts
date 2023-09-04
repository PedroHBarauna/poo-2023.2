import { Bicicleta } from "./Bicicleta";
import { Cliente } from "./Cliente";

export class Aluguel{
    constructor(
        public cliente: Cliente,
        public bicicleta: Bicicleta,
        public dataInicioAluguel: Date,
        public dataFinalAluguel: Date,
    ){}
}