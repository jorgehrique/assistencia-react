let ordemDeServicos = [
    { id: 1, cliente: "Samuel Santos", aparelho: "Redmi Note 6", tipo: "ORCAMENTO", data: "05/07/2019" },
    { id: 2, cliente: "Jorge Henrique", aparelho: "J7 Neo", tipo: "GARANTIA", data: "25/05/2019" },
    { id: 3, cliente: "Gabriel Leal Park", aparelho: "J5 Pro", tipo: "CONSERTO", data: "14/06/2019" },
    { id: 4, cliente: "Jose Fiel Feitosa", aparelho: "G530", tipo: "CONSERTO", data: "05/07/2019" },
    { id: 6, cliente: "Samuel Santos", aparelho: "Redmi Note 6", tipo: "ORCAMENTO", data: "05/07/2019" },
    { id: 7, cliente: "Samuel Santos", aparelho: "Redmi Note 6", tipo: "ORCAMENTO", data: "05/07/2019" },
];

const cabecalho = ["#", "Cliente", "Aparelho", "Ordem", "Data"];
const tipoOrdens = ["Conserto", "Orçamento", "Garantia", "Avaliação"];

const urlBase = 'http://localhost:8080';

const buscarOrdens = () => {
    return new Promise((resolve, reject) => {
        fetch(urlBase + '/ordens')
        .then(res => resolve(res.json()))
        .catch(err => reject(err));
    });
};

const buscarCabecalho = () => {
    return new Promise((resolve, reject) => {
        resolve(cabecalho);
    });
};
const buscarTipoOrdens = () => {
    return new Promise((resolve, reject) => {
        resolve(tipoOrdens);
    });
};

const salvarOrdem = ordem => {
    return new Promise((resolve, reject) => {
        // envia para api e retorna inserido
        ordem.id = 8;
        ordem.data = '09/07/2019';
        ordemDeServicos.push(ordem);
        resolve(ordem);
        //se der errado: reject
    })
};

const editarOrdem = ordem => {
    return new Promise((resolve, reject) => {
        const ordens = ordemDeServicos.filter(item => item.id != ordem.id);
        ordens.push(ordem);
        ordemDeServicos = ordens;

        resolve(ordem);
    });
};

const excluirOrdem = ordem => {
    return new Promise((resolve, reject) => {
        const ordens = ordemDeServicos.filter(item => item.id != ordem.id);
        ordemDeServicos = ordens;

        resolve(ordem);
    });
};

export {
    buscarOrdens,
    buscarCabecalho,
    buscarTipoOrdens,
    salvarOrdem,
    editarOrdem,
    excluirOrdem,
}