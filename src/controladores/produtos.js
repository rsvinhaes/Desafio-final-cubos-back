const { knex } = require('../config/bd')
const { s3 } = require('../config/s3')

const cadastrarProduto = async (req, res) => {
  const { file, usuarioLogado } = req
  const { titulo, descricao, quantidade, valor } = req.body
  try {
    const produtoEncontrado = await knex('produtos').where('titulo', titulo).first().returning('*')
    if (produtoEncontrado) {
      return res.status(401).json({ mensagem: 'Não é permitido cadastrar produtos com o mesmo titulo' })
    }
    const foto = await s3.upload({
      Bucket: process.env.BACK_BLAZER_BUCKET,
      Key: `${req.usuarioLogado.id}-${req.usuarioLogado.nome}/${titulo}`,
      Body: file.buffer,
      ContentType: file.mimetype
    }).promise()
    const produtoCadastrado = await knex('produtos').insert({ id_usuario: usuarioLogado.id, titulo, descricao, quantidade, valor, foto_url: foto.Location, foto_path: foto.Key }).returning('*')
    return res.json(produtoCadastrado)
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro interno no servidor' })
  }
}

const listarProduto = async (req, res) => {
  const { usuarioLogado } = req
  try {
    const produtos = await knex('produtos').where('id_usuario', usuarioLogado.id).returning('*')
    return res.json(produtos)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno no servidor' })
  }
}

const editarProduto = async (req, res) => {
  const { file, usuarioLogado } = req
  const { titulo, descricao, quantidade, valor } = req.body
  const { id } = req.params
  try {
    const produtoEncontrado = await knex('produtos').where('titulo', titulo).first().returning('*')
    if (produtoEncontrado) {
      return res.status(401).json({ mensagem: 'Não é permitido cadastrar produtos com o mesmo titulo' })
    }
    const foto = await s3.upload({
      Bucket: process.env.BACK_BLAZER_BUCKET,
      Key: `${req.usuarioLogado.id}-${req.usuarioLogado.nome}/${titulo}`,
      Body: file.buffer,
      ContentType: file.mimetype
    }).promise()
    const produtoCadastrado = await knex('produtos').update({ id_usuario: usuarioLogado.id, titulo, descricao, quantidade, valor, foto_url: foto.Location, foto_path: foto.Key }).where('id', id).returning('*')
    return res.json(produtoCadastrado)
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro interno no servidor' })
  }
}

const deletarProduto = async (req, res) => {
  const { id } = req.params
  const { usuarioLogado } = req
  try {
    const produtoEncontrado = await knex('produtos').where({
      id_usuario: usuarioLogado.id,
      id
    }).first()
    if (!produtoEncontrado) {
      return res.status(401).json({ mensagem: 'produto não encontrado' })
    }
    await knex('produtos').where('id', id).del()
    await s3.deleteObject({
      Bucket: process.env.BACK_BLAZER_BUCKET,
      Key: produtoEncontrado.foto_path
    }).promise()
    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno no servidor' })
  }
}

const listarProdutos = async (req, res) => {
  try {
    const produtos = await knex('produtos').returning('*')
    return res.json(produtos)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno no servidor' })
  }
}

module.exports = {
  cadastrarProduto,
  listarProduto,
  deletarProduto,
  editarProduto,
  listarProdutos
}
