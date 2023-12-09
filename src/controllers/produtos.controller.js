import { stripHtml } from 'string-strip-html'
import pgPromise from 'pg-promise'
import {
  InsereDadosDeCadastrodeProduto,
  InsereDadosDeCadastrodeProdutoCopia,
  PegarInformacoesParaPost,
  VeSeUsuarioExiste,
  deletaResultadoDaPesquisa,
  deletaResultadoDaPesquisaNosProdutos,
  procuraOqueVaiDeletar,
  procuraOqueVaiDeletarNosProdutos,
  selecionaTodasAsInformacoesAtreladasAoProduto,
  PegarTodososProdutos,
  PorCategorias,
  PorUser,
} from '../repository/produtos.repository.js'
import { db } from '../database/database.connection.js'

// export async function postInserirProduto(req, res) {

//     const { nomeproduto, descricao, valor, url, selectedCategory, userid } = req.body;

//     const sanitizedNomeProduto = stripHtml(nomeproduto).result.trim();
//     const sanitizedDescricao = stripHtml(descricao).result.trim();
//     const sanitizedUrl = stripHtml(url).result.trim();
//     const sanitizedCategoria = stripHtml(selectedCategory).result.trim();
//     const sanitizedUserId = stripHtml(userid).result.trim();

//     try {

//         const usuario = await VeSeUsuarioExiste(sanitizedUserId);

//         if (usuario.rows.length = 0) return res.status(409).send("Esse usuário não está cadastrado!");

//         await InsereDadosDeCadastrodeProduto(sanitizedNomeProduto, sanitizedDescricao, valor, sanitizedUrl, sanitizedCategoria, sanitizedUserId);

//         res.sendStatus(201);

//     } catch (err) {
//         res.status(500).send(err.message);
//     }

// }

export async function postInserirProdutoCopia(req, res) {
  const { nomeproduto, descricao, valor, url, selectedCategory, userid } = req.body

  const sanitizedNomeProduto = stripHtml(nomeproduto).result.trim()
  const sanitizedDescricao = stripHtml(descricao).result.trim()
  const sanitizedUrl = stripHtml(url).result.trim()
  const sanitizedCategoria = stripHtml(selectedCategory).result.trim()
  const sanitizedUserId = stripHtml(userid).result.trim()

  try {
    const usuario = await VeSeUsuarioExiste(sanitizedUserId)

    if ((usuario.rows.length = 0)) return res.status(409).send('Esse usuário não está cadastrado!')

    await InsereDadosDeCadastrodeProdutoCopia(
      sanitizedNomeProduto,
      sanitizedDescricao,
      valor,
      sanitizedUrl,
      sanitizedCategoria,
      sanitizedUserId,
    )

    res.sendStatus(201)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function pegarProdutos(req, res) {
  try {
    const listaProdutos = await PegarTodososProdutos()

    res.send(listaProdutos.rows)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function pegarProdutosPorCategoria(req, res) {
  const { categoria } = req.params

  try {
    const listaProdutosPorCategoria = await PorCategorias(categoria)

    res.send(listaProdutosPorCategoria.rows)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function pegarProdutosPorId(req, res) {
  const { sessao } = res.locals

  try {
    const produtosporuser = sessao.rows[0].idUser

    const listaProdutos = await PorUser(produtosporuser)

    res.send(listaProdutos.rows)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function PegarProdutosPeloSeuIdDeRegistro(req, res) {
  const { id } = req.params

  try {
    const getProduto = await selecionaTodasAsInformacoesAtreladasAoProduto(id)

    if (getProduto.rows.length === 0) return res.status(404).send({ message: 'Produto não encontrado pelo id', id })

    return res.status(200).send(getProduto.rows)
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

export async function PegarProdutosPeloSeuIdDeRegistroNaTabelaDeCopia(req, res) {
  const { id } = req.params

  try {
    const getProduto = await PegarInformacoesParaPost(id)

    if (getProduto.rows.length === 0) return res.status(404).send({ message: 'Produto não encontrado pelo id', id })

    return res.status(200).send(getProduto.rows)
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

export async function postRegistraCarrinho(req, res) {
  const { categoria, description, nome, url, valor, idProduto } = req.body

  const { sessao } = res.locals

  try {
    const carrinho = await db.query(
      'INSERT INTO carrinho (categoria, description, nome, url, valor, "idProduto", "idUsuario") VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [categoria, description, nome, url, valor, idProduto, sessao.rows[0].idUser],
    )

    res.sendStatus(201)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function pegarCarrinho(req, res) {
  const { sessao } = res.locals

  try {
    const listaCarrinho = await db.query('SELECT * FROM carrinho WHERE "idUsuario" = $1;', [sessao.rows[0].idUser])

    if (listaCarrinho.rows === undefined) {
      res.send([])
    } else {
      res.send(listaCarrinho.rows)
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function deletaProdutoPorId(req, res) {
  const { id } = req.params

  const { sessao } = res.locals

  try {
    const result = await procuraOqueVaiDeletar(id)

    if (result.rowCount === 0) return res.status(404).send('Este item não consta no carrinho!')

    if (result.rows[0].idUsuario != sessao.rows[0].idUser) {
      res.status(401).send('Não foi possível deletar o componente do carrinho')
    } else {
      await deletaResultadoDaPesquisa(id)
    }

    res.status(204).send('URL deletada com sucesso!')
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function deletaProdutoPorIdNaTabelaProdutos(req, res) {
  const { id } = req.params

  const { sessao } = res.locals

  try {
    const result = await procuraOqueVaiDeletarNosProdutos(id)

    if (result.rowCount === 0) return res.status(404).send('Este item não consta nos produtos!')

    if (result.rows[0].userid != sessao.rows[0].idUser) {
      res.status(401).send('Não foi possível deletar o componente nos produtos')
    } else {
      await deletaResultadoDaPesquisaNosProdutos(id)
    }

    res.status(204).send('URL deletada com sucesso!')
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function deletaTudoDoCarrinho(req, res) {
  try {
    const deletatudo = await db.query('DELETE FROM carrinho;')

    res.status(204).send('Todos os produtos foram removidos do carrinho!')
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function postManterCheck(req, res) {
  const { productId, isChecked } = req.body

  try {
    const query =
      'INSERT INTO checkbox_states (product_id, is_checked) VALUES ($1, $2) ON CONFLICT (product_id) DO UPDATE SET is_checked = $2'
    await db.query(query, [productId, isChecked])
    console.log(`Estado do checkbox para o produto com ID ${productId} foi salvo`)
    res.json({ success: true })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function getManterCheck(req, res) {
  try {
    const query = 'SELECT product_id, is_checked FROM checkbox_states'
    const result = await db.query(query)
    const checkboxStates = {}
    result.rows.forEach((row) => {
      checkboxStates[row.product_id] = row.is_checked
    })
    res.json(checkboxStates)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function deletaCompras(req, res) {
  const { ids } = req.body

  try {
    const idPlaceholders = ids.map((_, index) => `$${index + 1}`).join(',')

    const query = `DELETE FROM produtos WHERE id IN (${idPlaceholders});`

    const resultadoProdutos = await db.query(query, ids)

    const resultadoCarrinho = await db.query('DELETE FROM carrinho;')

    res.status(200).send(`Produtos com IDs ${ids.join(', ')} foram removidos e o carrinho foi esvaziado.`)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function atualizarCheckbox(req, res) {
  const { ids } = req.body
  const isChecked = true

  try {
    const query =
      'INSERT INTO checkbox_states (product_id, is_checked) VALUES ($1, $2) ON CONFLICT (product_id) DO UPDATE SET is_checked = $2'

    for (const productId of ids) {
      await db.query(query, [productId, isChecked])
      console.log(`Estado do checkbox para o produto com ID ${productId} foi atualizado para ${isChecked}`)
    }

    res.json({ success: true })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function registraCompra(req, res) {
  const { carrinho, userid, valor, parcelas, tipo } = req.body

  try {
    const result = db.query(
      'INSERT INTO compras (carrinho, userid, valor, parcelas, tipo) VALUES ($1, $2, $3, $4, $5)',
      [carrinho, userid, valor, parcelas, tipo],
    )

    res.sendStatus(201)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
