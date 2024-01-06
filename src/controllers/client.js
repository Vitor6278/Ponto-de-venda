const knex = require('../connections/database')
const { verifyClientCpf, verifyClientEmail } = require('../middlewares/verifyClient')


const clientRegister = async (req, res) => {
    const clientData = { ...req.body };
    try {

        if (await verifyClientCpf(clientData.cpf)) {
            return res.status(400).json({ mensagem: "O cpf informado já está cadastrado." });
        }

        if (await verifyClientEmail(clientData.email)) {
            return res.status(400).json({ mensagem: "O email informado já está cadastrado." });
        }
        
        const insertClient = await knex('clientes').insert(clientData).returning('*');

        return res.status(201).send(insertClient[0]);

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: "Erro interno do sistema." });
    }
};

const clientUpdate = async (req, res) => {
    const { id } = req.params;
    const updatedClientData = { ...req.body };

    try {

        if (await verifyClientCpf(updatedClientData.cpf)) {
            return res.status(400).json({ mensagem: "O cpf informado já está cadastrado." });
        }

        if (await verifyClientEmail(updatedClientData.email)) {
            return res.status(400).json({ mensagem: "O email informado já está cadastrado." });
        }

        const existingClient = await knex('clientes').where({ id }).first();

        if (!existingClient) {
            return res.status(404).json({ mensagem: "Cliente não encontrado para o ID informado." });
        }

        const updatedClient = await knex('clientes').where({ id }).update(updatedClientData);

        return res.status(204).json();

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do sistema." });
    }
};

const clientList = async (req, res) => {
    try {
        const clients = await knex('clientes').select('*');

        if (clients.length === 0) {
            return res.status(404).json({ mensagem: "Nenhum cliente encontrado." });
        }

        return res.status(200).json(clients);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro interno do sistema." });
    }
};

const clientDetail = async (req, res) => {
    const { id } = req.params;

    try {
        const client = await knex('clientes').where({ id }).first();

        if (!client) {
            return res.status(404).json({ mensagem: "Cliente não encontrado para o ID informado." });
        }

        return res.status(200).json(client);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do sistema." });
    }
};

module.exports = {
    clientDetail,
    clientUpdate,
    clientList,
    clientRegister
}
