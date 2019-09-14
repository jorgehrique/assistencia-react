const dateToString = date => {
    const arr = date.split('T');
    const data = arr[0].split('-');
    const hora = arr[1].substring(0, 5);
    return `${data[2]}/${data[1]}/${data[0]} ${hora}`;
}

const cpfToString = cpf => {
    const string = `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}`;
    return string + `.${cpf.substring(6, 9)}-${cpf.substring(9, 11)}`;
}

const telefoneToString = tel => {
    return `(${tel.substring(0, 2)}) ${tel.substring(2, 7)}-${tel.substring(7, 11)}`;
}

export {
    dateToString,
    cpfToString,
    telefoneToString,
}