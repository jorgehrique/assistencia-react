const cabecalho = ['#', 'Cliente', 'Aparelho', 'Tipo', 'Data', 'Imprimir', 'Editar', 'Excluir'];

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
        fetch(`${urlBase}/ordens/tipos`)
            .then(res => resolve(res.json()))
            .catch(err => reject(err));
    });
};

const salvarOrdem = ordem => {
    return new Promise((resolve, reject) => {
        fetch(`${urlBase}/ordens`, {
            method: 'post',
            body: JSON.stringify(ordem),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => resolve(res.json()))
            .catch(error => reject(error));
    })
};

const editarOrdem = ordem => {
    // return new Promise((resolve, reject) => {
    //     const ordens = ordemDeServicos.filter(item => item.id != ordem.id);
    //     ordens.push(ordem);
    //     ordemDeServicos = ordens;

    //     resolve(ordem);
    // });
};

const excluirOrdem = ordem => {
    // return new Promise((resolve, reject) => {
    //     const ordens = ordemDeServicos.filter(item => item.id != ordem.id);
    //     ordemDeServicos = ordens;

    //     resolve(ordem);
    // });
};

const dateConverter = date => {
    const arr = date.split('T');
    const data = arr[0].split('-');
    const hora = arr[1].substring(0, 5);
    return `${data[2]}/${data[1]}/${data[0]} ${hora}`;
}

export {
    buscarOrdens,
    buscarCabecalho,
    buscarTipoOrdens,
    salvarOrdem,
    editarOrdem,
    excluirOrdem,
    dateConverter,
}