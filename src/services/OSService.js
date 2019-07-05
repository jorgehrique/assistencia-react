const ordemDeServicos = [
    { id: 1, cliente: "Samuel Santos", aparelho: "Redmi Note 6", tipo:"ORCAMENTO", data: "05/07/2019"},
    { id: 2, cliente: "Jorge Henrique", aparelho: "J7 Neo", tipo:"GARANTIA", data: "25/05/2019"},
    { id: 1, cliente: "Gabriel Leal Park", aparelho: "J5 Pro", tipo:"CONSERTO", data: "14/06/2019"},
    { id: 1, cliente: "Jose Fiel Feitosa", aparelho: "G530", tipo:"CONSERTO", data: "05/07/2019"},
    { id: 1, cliente: "Samuel Santos", aparelho: "Redmi Note 6", tipo:"ORCAMENTO", data: "05/07/2019"},
    { id: 1, cliente: "Samuel Santos", aparelho: "Redmi Note 6", tipo:"ORCAMENTO", data: "05/07/2019"},
    { id: 1, cliente: "Samuel Santos", aparelho: "Redmi Note 6", tipo:"ORCAMENTO", data: "05/07/2019"},
];

const buscarOrdens = () => ordemDeServicos.map(o => Object.values(o));

export {
    buscarOrdens
}