const country_data = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
];

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
        fetch(`${urlBase}/clientes/search?nome=${nome}&size=${size}`)
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
            method: 'delete'
        })
            .then(cliente => resolve(cliente.json()))
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