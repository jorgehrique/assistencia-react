const debug = true;

const logError = (method_name, error) => {
    if (debug) {
        console.log(`Method : ${method_name} -> "${error}".`);
    }
}

const logObject = (method_name, object) => {
    if (debug) {
        console.log(`Method : ${method_name}`);
        console.log(object);
    }
}

export {
    logError,
    logObject,
}