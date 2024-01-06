const bcrypt = require("bcrypt");
const knex = require("../connections/database");


const userRegister = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const existingUser = await knex('usuarios').where({ email }).first();

        if (existingUser) {
            return res.status(403).json({ mensagem: "Já existe usuário cadastrado com o e-mail informado." });
        }

        const encryptedPassword = await bcrypt.hash(senha, 10);
        let user = await knex('usuarios').insert({ nome, email, senha: encryptedPassword }).returning('*');

        const { senha: _, ...createdUser } = user[0];
        return res.status(201).json(createdUser);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro interno do sistema.' });
    }
}

const userDetails = (req, res) => {
    try {
        const { senha: _, ...loggedInUser } = req.usuario;
        return res.status(200).json(loggedInUser);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do sistema.' });
    }
}

const userEdit = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {

        if (email !== req.usuario.email) {
            const existingEmailUser = await knex('usuarios').where({ email }).first();

            if (existingEmailUser) {
                return res.status(404).json('O Email já existe.');
            }
        }

        const encryptedPassword = await bcrypt.hash(senha, 10);

        const updatedUser = await knex('usuarios').update({ nome, email, senha: encryptedPassword }).where({ id: req.usuario.id });

        if (!updatedUser) {
            return res.status(404).json("O usuario não foi atualizado");
        }

        return res.status(204).json();

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do sistema.' });
    }
}



module.exports = {
    userRegister,
    userDetails,
    userEdit
}
