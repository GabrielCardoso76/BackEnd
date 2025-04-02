package com.example.integracaoFront.Service;

import com.example.integracaoFront.DTO.ProdutoDTO;
import com.example.integracaoFront.Entity.Produto;
import com.example.integracaoFront.Repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public Produto fromDTO(ProdutoDTO produtoDTO){
        Produto produto = new Produto();
        produto.setNome(produtoDTO.getNome());
        produto.setSaldo(produtoDTO.getSaldo());
        produto.setValor(produtoDTO.getValor());
        produto.setSaldoMinimo(produtoDTO.getSaldoMinimo());


        return produto;
    }

    // converte Professor para ProfessorDTO
    public ProdutoDTO toDTO(Produto produto){
        ProdutoDTO produtoDTO = new ProdutoDTO();
        produtoDTO.setId(produto.getIdProduto());
        produtoDTO.setNome(produto.getNome());
        produtoDTO.setSaldo(produto.getSaldo());
        produtoDTO.setValor(produto.getValor());
        produtoDTO.setSaldoMinimo(produto.getSaldoMinimo());

        return produtoDTO;
    }

    public List<Produto> getAll(){
        return produtoRepository.findAll();
    }

    public ProdutoDTO save(ProdutoDTO produtoDTO){
        // converte de DTO para Entidade
        Produto produto = this.fromDTO(produtoDTO);
        // salva no banco de dados a entidade
        Produto produtoBd = produtoRepository.save(produto);
        // da return transformando novamente para DTO
        return this.toDTO(produtoBd);
    }




}
