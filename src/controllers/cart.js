const knex = require('../connections/database');
const { sendMail } = require('../connections/nodemailer');
const compilerHtml = require('../utils/compiler');



const createCart = async (req, res) => {
    const { pedido_produtos, ...order } = req.body;
    const { nome: userName, email: mail } = req.clientInfo;
    const total = req.sumOfValues

    try {
        const createOrder = await knex('pedidos').insert({
            cliente_id: order.cliente_id,
            observacao: order.observacao,
            valor_total: total
        }).returning('*');

        for (let product of pedido_produtos) {
            const productInfo = await knex('produtos').select('descricao', 'valor').where('id', product.produto_id).first();
            const orderItems = await knex('pedidos_produtos').insert({
                pedido_id: createOrder[0].id,
                produto_id: product.produto_id,
                quantidade_produto: product.quantidade_produto,
                valor_produto: productInfo.valor
            }).returning('*');
        }

        const html = await compilerHtml('./src/templates/email.html', {
            userName,
            produtos: [pedido_produtos[0]],
            totalCompra: total,
            nomeDaEmpresa: process.env.CO_NAME
        })
        sendMail(`${userName} <${mail}>`, 'Confirmação de Compra', html)

        return res.status(201).json(createOrder[0]);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do sistema.' })
    }

}
const getCartList = async (req, res) => {
    const { cliente_id } = req.query
    try {
        let query = knex('pedidos');
        if (cliente_id) {
            query = query.where({ cliente_id });
        }
        const orders = await query.select('*');
        for (let order of orders) {
            order.pedido_produtos = await knex('pedidos_produtos').where('pedido_id', order.id).select('*');
        }
        res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do sistema.' })
    }
}
module.exports = { createCart, getCartList }
