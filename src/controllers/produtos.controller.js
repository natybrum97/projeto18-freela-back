import { InsereDadosDeCadastrodeProduto, VeSeUsuarioExiste, deletaResultadoDaPesquisa, procuraOqueVaiDeletar, selecionaTodasAsInformacoesAtreladasAoProduto } from "../repository/produtos.repository.js";
import { stripHtml } from "string-strip-html";
import { db } from "../database/database.connection.js";
import { PegarTodososProdutos, PorCategorias, PorUser } from "../repository/produtos.repository.js";


export async function postInserirProduto (req, res) {

    const { nomeproduto, descricao, valor, url,selectedCategory, userid } = req.body;

    const sanitizedNomeProduto = stripHtml(nomeproduto).result.trim();
    const sanitizedDescricao = stripHtml(descricao).result.trim();
    const sanitizedUrl = stripHtml(url).result.trim();
    const sanitizedCategoria = stripHtml(selectedCategory).result.trim();
    const sanitizedUserId = stripHtml(userid).result.trim();

    try {

      const usuario = await VeSeUsuarioExiste (sanitizedUserId);
      
        if (usuario.rows.length = 0) return res.status(409).send("Esse usuário não está cadastrado!");

        await InsereDadosDeCadastrodeProduto (sanitizedNomeProduto, sanitizedDescricao, valor, sanitizedUrl, sanitizedCategoria, sanitizedUserId);

        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function pegarProdutos (req, res) {

    try {

        const listaProdutos = await PegarTodososProdutos();
        
        res.send(listaProdutos.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function pegarProdutosPorCategoria (req, res) {

    const { categoria } = req.params;

    try {

        const listaProdutosPorCategoria = await PorCategorias (categoria);

        res.send(listaProdutosPorCategoria.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function pegarProdutosPorId (req, res) {

    const { sessao } = res.locals;

    try {

        const produtosporuser = sessao.rows[0].idUser;

        const listaProdutos = await PorUser (produtosporuser);
        
        res.send(listaProdutos.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function PegarProdutosPeloSeuIdDeRegistro (req, res) {

    const { id } = req.params;

    console.log(id);

    try {

        const getProduto = await selecionaTodasAsInformacoesAtreladasAoProduto(id);

        console.log(getProduto);

        if (getProduto.rows.length === 0) return res.status(404).send({ message: "Produto não encontrado pelo id", id });


        return res.status(200).send(getProduto.rows);

    } catch (err) {

        return res.status(500).send(err.message);

    }
}

export async function postRegistraCarrinho (req, res) {

    const { categoria, description, nome, url, valor } = req.body;

    const { sessao } = res.locals;
    
    try {

        const carrinho = await db.query('INSERT INTO carrinho (categoria, description, nome, url, valor, "idUsuario") VALUES ($1, $2, $3, $4, $5, $6)',[categoria, description, nome, url, valor, sessao.rows[0].idUser]);
    
        console.log(carrinho.rows);

        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function pegarCarrinho (req, res) {

    const { sessao } = res.locals;

    try {

        const listaCarrinho = await db.query('SELECT * FROM carrinho WHERE "idUsuario" = $1;',[sessao.rows[0].idUser]);

        console.log(listaCarrinho.rows);

        if(listaCarrinho.rows === undefined){
            res.send([]);
        } else {
            res.send(listaCarrinho.rows);
        }

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deletaProdutoPorId(req, res) {

    const { id } = req.params;

    const { sessao } = res.locals;

    try {

        const result = await procuraOqueVaiDeletar (id);

        if (result.rowCount === 0) return res.status(404).send("Este item não consta no carrinho!");

        if (result.rows[0].idUsuario != sessao.rows[0].idUser) {

            res.status(401).send("Não foi possível deletar o componente do carrinho");

        } else {

            await deletaResultadoDaPesquisa (id);

        }

        res.status(204).send("URL deletada com sucesso!");

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deletaTudoDoCarrinho(req, res) {
    try {
      
    const deletatudo = await db.query('DELETE FROM carrinho;');

  
      res.status(204).send("Todos os produtos foram removidos do carrinho!");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
      