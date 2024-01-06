const knex = require('../connections/database');

const verifyClientCpf = async (cpf) => {
    try {
        const existentCpf = await knex('clientes').where({ cpf }).first();
        return existentCpf; 

    } catch (error) {
        console.error(error);
        throw new Error("Erro interno do sistema.");
    }
};

const verifyClientEmail = async (email) => {
    try {
        const existentEmail = await knex('clientes').where({ email }).first();
        return existentEmail; 

    } catch (error) {
        console.error(error);
        throw new Error("Erro interno do sistema.");
    }
};
module.exports = { verifyClientCpf, verifyClientEmail }
