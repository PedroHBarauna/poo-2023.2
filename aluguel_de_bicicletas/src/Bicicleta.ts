export class Bicicleta{
    constructor(
        public modelo: string,
        public preco: number,
        public alugada: boolean = false
    ){}

    consultarDisponibilidade(){
        return this.alugada
    }
}