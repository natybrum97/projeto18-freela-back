import { db } from "../database/database.connection.js";

export function VeSeUsuarioExiste(sanitizedUserId) {

    const resultado = db.query('SELECT * FROM cadastro WHERE id = $1;', [sanitizedUserId]);

    return resultado;

}

export function InsereDadosDeCadastrodeProduto (sanitizedNomeProduto, sanitizedDescricao, valor, sanitizedUrl, sanitizedCategoria, sanitizedUserId) {

    const result = db.query('INSERT INTO produtos (nomeproduto, descricao, valor, url,"selectedCategory", userid) VALUES ($1, $2, $3, $4, $5, $6)',[sanitizedNomeProduto, sanitizedDescricao, valor, sanitizedUrl, sanitizedCategoria, sanitizedUserId]);

    return result;
    
}

export function PegarTodososProdutos() {

    const result = db.query('SELECT * FROM produtos;');

    return result;
    
}

export function PorCategorias (categoria) {

    const result = db.query('SELECT * FROM produtos WHERE "selectedCategory" = $1;',[categoria]);

    return result;
    
}

export function PorUser (produtosporuser) {

    const result = db.query('SELECT * FROM produtos WHERE userid = $1;',[produtosporuser]);

    return result;
    
}

export function selecionaTodasAsInformacoesAtreladasAoProduto (id) {
    const resultado = db.query(`
        SELECT
            cadastro.id AS id_do_user,
            produtos.userid AS verificacao_id_do_user,
            cadastro.name AS nome_do_vendedor,
            cadastro.email AS email_do_vendedor,
            cadastro.telefone AS telefone_do_vendedor,
            cadastro.cidade AS cidade_do_vendedor,
            cadastro.state AS estado_do_vendedor,
            produtos.id AS id_do_produto,
            produtos.nomeproduto AS nome_do_produto,
            produtos.descricao AS descricao_do_produto,
            produtos.valor AS valor_do_produto,
            produtos.url AS foto_do_produto,
            produtos."selectedCategory" AS categoria_do_produto
        FROM cadastro
        JOIN produtos ON cadastro.id = produtos.userid
        WHERE produtos.id = $1;`,
        [id]
    );

    return resultado;
}

export function procuraOqueVaiDeletar (id) {

    const resultado = db.query('SELECT * FROM carrinho WHERE id = $1;', [id]);

    return resultado;
    
}

export function deletaResultadoDaPesquisa (id) {

    const resultado = db.query('DELETE FROM carrinho WHERE id = $1;', [id]);

    return resultado;
    
}

