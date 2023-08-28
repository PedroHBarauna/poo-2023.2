import { Bicicleta } from './src/Bicicleta'
import { Cliente } from './src/Cliente'
import {  alugar }from './src/functions'

const cliente = new Cliente("Pedro", "11912345678")

const bicicleta1 = new Bicicleta("condor", 59.90)
const bicicleta2 = new Bicicleta("caloy", 69.90)

const aluguel1 = alugar(cliente, bicicleta1, new Date("08-23-2023"), new Date("08-25-2023"))
const aluguel2 = alugar(cliente, bicicleta2, new Date("08-22-2023"), new Date("08-26-2023"))

console.log(aluguel1)
console.log(aluguel2)