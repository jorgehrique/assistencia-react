const cabecalho = ['#', 'Cliente', 'Aparelho', 'Tipo', 'Data', 'Imprimir', 'Editar', 'Excluir'];

const urlBase = 'http://localhost:8080';

const buscarOrdens = () => {
    return new Promise((resolve, reject) => {
        fetch(urlBase + '/ordens')
            .then(res => resolve(res.json()))
            .catch(err => reject(err));
    });
};

const buscarOrdemPorId = id => {
    return new Promise((resolve, reject) => {
        fetch(`${urlBase}/ordens/${id}`)
            .then(res => resolve(res.json()))
            .catch(err => reject(err));
    });
}

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

const excluirOrdem = id => {
    return new Promise((resolve, reject) => {
        fetch(`${urlBase}/ordens/${id}`, {
            method: 'delete',
        })
            .then(res => resolve(res))
            .catch(error => reject(error));
    });
};

const buscarPdfPorId = id => {
    return new Promise((resolve, reject) => {
        fetch(`${urlBase}/ordens/pdf/${id}`)
            .then(res => resolve(res))
            .catch(error => reject(error));
    });
}

export {
    buscarOrdens,
    buscarOrdemPorId,
    buscarCabecalho,
    buscarTipoOrdens,
    buscarPdfPorId,
    salvarOrdem,
    editarOrdem,
    excluirOrdem,
}