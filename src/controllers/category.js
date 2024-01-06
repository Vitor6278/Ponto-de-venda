const knex = require('../connections/database');

const listCategories = async (req, res) => {
    try {
        const categories = await knex('categorias');
        return res.status(200).json(categories)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do sistema." })
    }
}

module.exports = {
    listCategories
}
