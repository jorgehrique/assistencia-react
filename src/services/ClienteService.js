const urlBase = 'http://localhost:8080';

const buscarClientes = () => {
    return new Promise((resolve, reject) => {
        fetch(`${urlBase}/clientes`)
            .then(res => resolve(res.json()))
            .catch(reject);
    });
};

const buscarClientePorId = id => {
    return new Promise((resolve, reject) => {
        fetch(`${urlBase}/clientes/${id}`)
            .then(res => resolve(res.json()))
            .catch(reject);
    });
}

const buscarClientesPorNome = (nome, size) => {
    return new Promise((resolve, reject) => {
        fetch(`${urlBase}/clientes?nome=${nome}&size=${size}`)
            .then(res => resolve(res.json()))
            .catch(reject);
    });
}

const salvarCliente = cliente => {
    return new Promise((resolve, reject) => {
        fetch(`${urlBase}/clientes`, {
            method: 'post',
            body: JSON.stringify(cliente),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => resolve(res.json()))
            .catch(reject);
    })
}

const editarCliente = (id, cliente) => {
    return new Promise((resolve, reject) => {
        fetch(`${urlBase}/clientes/${id}`, {
            method: 'put',
            body: JSON.stringify(cliente),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => resolve(res.json()))
            .catch(reject);
    });
}

const excluirCliente = id => {
    return new Promise((resolve, reject) => {
        fetch(`${urlBase}/clientes/${id}`, {
            method: 'delete',
        })
            .then(res => resolve())
            .catch(reject);
    });
}

export {
    buscarClientes,
    buscarClientePorId,
    buscarClientesPorNome,
    salvarCliente,
    editarCliente,
    excluirCliente,
}