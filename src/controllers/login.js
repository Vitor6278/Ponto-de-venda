const bcrypt = require("bcrypt");
const knex = require("../connections/database");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userLogin = async (req, res) => {
    const { email, senha } = req.body;
    try {

        const user = await knex('usuarios').where({ email }).first();

        if (!user) {
            return res.status(401).json({ mensagem: "Usuário e/ou senha inválido(s)." });
        }

        const validPassword = await bcrypt.compare(senha, user.senha);

        if (!validPassword) {
            return res.status(401).json({ mensagem: "Usuário e/ou senha inválido(s)." });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_HASH, { expiresIn: "8h" });

        const { senha: _, ...loggedInUser } = user;

        return res.status(201).json({ user: loggedInUser, token });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do sistema.' });
    }
}

module.exports = { userLogin };
