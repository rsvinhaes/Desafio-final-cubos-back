const { realizarLogin } = require('./controladores/login')
const { cadastrarUsuario, editarUsuario, deletarUsuario } = require('./controladores/usuarios')
const { upload } = require('./config/upload')
const { esquemaLogin } = require('./esquemas/login')
const { esquemaUsuario } = require('./esquemas/usuario')
const { validarCorpo } = require('./intermediarios/validarCorpo')
const { validarLogin } = require('./intermediarios/validarLogin')
const { cadastrarProduto, listarProduto, editarProduto, deletarProduto, listarProdutos } = require('./controladores/produtos')
const { esquemaProduto } = require('./esquemas/produto')

const rotas = require('express').Router()

rotas.post('/usuarios', validarCorpo(esquemaUsuario), cadastrarUsuario)
rotas.post('/login', validarCorpo(esquemaLogin), realizarLogin)
rotas.put('/usuarios/:id', validarCorpo(esquemaUsuario), editarUsuario)
rotas.delete('/usuarios/:id', deletarUsuario)
rotas.get('/produtos', listarProdutos)

rotas.use(validarLogin)

rotas.post('/produtos', upload.single('foto'), validarCorpo(esquemaProduto), cadastrarProduto)
rotas.get('/produto', listarProduto)
rotas.put('/produtos/:id', upload.single('foto'), validarCorpo(esquemaProduto), editarProduto)
rotas.delete('/produtos/:id', deletarProduto)

module.exports = {
  rotas
}
