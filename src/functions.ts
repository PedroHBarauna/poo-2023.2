import { Aluguel } from "./Aluguel";
import { Bicicleta } from "./Bicicleta";
import { Cliente } from "./Cliente";

export function alugar(cliente: Cliente, bicicleta: Bicicleta, dataInicioAluguel: Date, dataFinalAluguel: Date) : Aluguel {
    bicicleta.alugada = true;
    
    return new Aluguel(cliente, bicicleta, dataInicioAluguel, dataFinalAluguel);
}