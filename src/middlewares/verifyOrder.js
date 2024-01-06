const knex = require('../connections/database');


const verifyClientExisting = async (req, res, next) => {
    const order = req.body
    try {
        const existingClient = await knex('clientes').where({ id: order.cliente_id }).first()
        if (!existingClient) {
            return res.status(404).json({ mensagem: 'O Cliente fornecido não foi encontrado.' })
        }
        req.clientInfo = existingClient;
        next()
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do sistema.' })
    }
}

const verifyProductList = async (req, res, next) => {
    const { pedido_produtos: productList } = req.body
    let sumOfValues = 0;
    try {
        for (let item of productList) {
            const checkProductExisting = await knex('produtos').where({ id: item.produto_id }).first()
            if (!checkProductExisting) {
                return res.status(404).json({ mensagem: `O Produto ${item.produto_id} não foi encontrado no sistema.` })
            }
            if (checkProductExisting.quantidade_estoque < item.quantidade_produto) {
                return res.status(400).json({ mensagem: `O produto ${item.produto_id} não possui estoque o suficiente.` })
            }
            sumOfValues += checkProductExisting.valor * item.quantidade_produto

        }
        req.sumOfValues = sumOfValues
        next()
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do sistema.' })
    }
}

module.exports = {
    verifyClientExisting,
    verifyProductList
}
