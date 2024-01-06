const express = require('express');
const routes = express();
const upload = require('./multer');

const { userLogin } = require('./controllers/login');
const { listCategories } = require('./controllers/category');
const { userRegister, userDetails, userEdit } = require('./controllers/user');
const { clientDetail, clientUpdate, clientList, clientRegister } = require('./controllers/client')
const { productRegister, productEdit, productList, productDetailById, productDelete } = require('./controllers/product');
const { createCart, getCartList } = require('./controllers/cart');

const authenticator = require('./middlewares/authentication')
const validateReq = require('./middlewares/verifyRequisition');
const { checkExistenceCategory } = require('./middlewares/verifyCategory');
const { localeProductByID, localeProducOnCart } = require('./middlewares/verifyProduct');
const { verifyClientExisting, verifyProductList } = require('./middlewares/verifyOrder');

const { userSchema, loginSchema } = require('./schemas/userSchemas');
const { productSchema } = require('./schemas/productSchemas')
const { clientSchema } = require('./schemas/clientSchemas');
const { orderSchema } = require('./schemas/orderSchemas');


routes.get('/categoria', listCategories);

routes.post('/usuario', validateReq(userSchema), userRegister);
routes.post('/login', validateReq(loginSchema), userLogin);

routes.use(authenticator);
routes.get('/usuario', userDetails);
routes.put('/usuario', validateReq(userSchema), userEdit);

routes.post('/produto', upload.single('produto_imagem'), validateReq(productSchema), checkExistenceCategory, productRegister);
routes.put('/produto/:id', upload.single('produto_imagem'),validateReq(productSchema), checkExistenceCategory, localeProductByID, productEdit);
routes.get('/produto', checkExistenceCategory, productList);
routes.get('/produto/:id', localeProductByID, productDetailById);
routes.delete('/produto/:id', localeProducOnCart, localeProductByID, productDelete);

routes.post('/cliente', validateReq(clientSchema), clientRegister);
routes.put('/cliente/:id', validateReq(clientSchema), clientUpdate);
routes.get('/cliente', clientList);
routes.get('/cliente/:id', clientDetail);

routes.post('/pedido', validateReq(orderSchema), verifyClientExisting, verifyProductList, createCart)
routes.get('/pedido', getCartList)

module.exports = routes;
