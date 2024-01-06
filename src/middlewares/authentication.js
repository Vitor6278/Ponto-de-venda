const jwt = require('jsonwebtoken');
const knex = require('../connections/database.js');
require('dotenv').config()

const authenticator = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: "Você precisa estar logado para acessar este recurso." })
    }

    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, process.env.JWT_HASH)

        const user = await knex('usuarios').where({ id }).first()

        if (!user) {
            return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." })
        }

        req.usuario = user

        next()
    } catch (error) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." })
    }
}


module.exports = authenticator
