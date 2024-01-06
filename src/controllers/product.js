const knex = require('../connections/database');
require('dotenv').config();
const { uploadFile, deleteFile } = require('../storage')

const productRegister = async (req, res) => {
  const product = { ...req.body };
  const {file} = req;

  try {
    if (file) {
      const uploadedImage = await uploadFile(
        file.originalname,
        file.buffer,
        file.mimetype
      );
      product.produto_imagem = uploadedImage.url;
    }

    const existingProduct = await knex('produtos').where({descricao: product.descricao}).first();
    if (existingProduct) {

      const updateProduct = await knex('produtos')
      .where({descricao: product.descricao})
      .update(product)
      .returning(['descricao','quantidade_estoque', 'valor', 'categoria_id', 'produto_imagem']);
      return res.status(200).json(updateProduct[0]);

    } else {

      const insertProduct = await knex('produtos').insert(product)
      .returning(['descricao','quantidade_estoque', 'valor', 'categoria_id', 'produto_imagem']);
      return res.status(201).json(insertProduct[0]);
    }
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do sistema.' });
  }
};

const productEdit = async (req, res) => {
  const product = { ...req.body };
  const { id } = req.params;
  const { file } = req

  try {
    if (file) {
      const uploadedImage = await uploadFile(
        file.originalname,
        file.buffer,
        file.mimetype
      );
      product.produto_imagem = uploadedImage.url;
    }

    const editProduct = await knex('produtos').where({ id }).update({ ...product });

    const updatedProduct = await knex('produtos')
    .select('descricao','quantidade_estoque', 'valor', 'categoria_id', 'produto_imagem')
    .where({ id }).first();

    console.log(updatedProduct)
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do sistema.' });
  }
};

const productList = async (req, res) => {
    const { categoria_id } = req.query
    try {
        const findProducts = await knex('produtos').where(categoria_id ? { categoria_id } : {});

        return res.status(200).json(findProducts)

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do sistema.' })
    }
}

const productDetailById = async (req, res) => {
    const { id } = req.params;
    try {
        const findProduct = await knex('produtos').where({ id }).first()

        return res.status(200).json(findProduct)

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do sistema.' })
    }
}

const productDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await knex('produtos').where({ id }).first();

        if (product && product.produto_imagem) {
            await deleteFile(product.produto_imagem);
        }

        const deleteProduct = await knex('produtos').where({ id }).del();

        return res.status(204).json();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro interno do sistema.' });
    }
};

module.exports = {
    productRegister,
    productDelete,
    productEdit,
    productList,
    productDetailById,
};
