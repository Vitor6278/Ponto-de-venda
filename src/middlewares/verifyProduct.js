const knex = require('../connections/database');

const localeProductByID = async (req, res, next) => {
    const { id } = req.params
    try {
        const findProduct = await knex('produtos').where({ id })

        if (!findProduct[0]) return res.status(404).json({ mensagem: "Produto não encontrado." })

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do sistema." })
    }
}

const localeProducOnCart = async (req, res, next) => {
    const {id: produto_id} = req.params
    try {
        const findProductOnCart = await knex('pedidos_produtos').where({produto_id})

        if (findProductOnCart.length != 0) return res.status(400).json({mensagem: "Esse produto já está vinculado a uma compra."})

        next()
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do sistema."})
    }
}

module.exports = { localeProductByID, localeProducOnCart }
