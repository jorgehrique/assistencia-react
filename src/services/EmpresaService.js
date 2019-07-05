const empresa = {
    nome: 'Smart Bros',
    endereco: 'Rua Praça Tiradentes Número 33 A - Centro',
    cidade: 'Teofilo Otoni',
    uf: 'MG',
    estado: 'Minas Gerais',
    telefones: ['(33) 98705-8102', '(33) 98705-8102'],
    emails: ['smartbrosto@gmail.com'],
};

const buscarEmpresa = empresaId => Object.assign(empresa, {id: empresaId});

export {
    buscarEmpresa
}