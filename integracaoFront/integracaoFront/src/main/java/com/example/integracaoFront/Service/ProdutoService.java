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
import java.util.Optional;

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

    // buscar com base no Id
    // retorna sempre um objeto Optional, para que depois se possa fazer a validação do retorno.
    public Optional<ProdutoDTO> getById(Long id){
        Optional<Produto> produtoOptional = produtoRepository.findById(id);
        if(produtoOptional.isPresent()){
            ProdutoDTO produtoDTO = new ProdutoDTO();
            return Optional.of(produtoDTO.fromProduto(produtoOptional.get()));
        }else {
            return Optional.empty();
        }
    }
    // atualiza os dados com base no id e o objeto DTO recebido.
    // busca o objeto que será atualizado
    // atualiza os dados, caso encontrar, com base no DTO recebido.
    public Optional<ProdutoDTO> updateProduto(Long id, ProdutoDTO produtoDTO){
        Optional<Produto> produtoOptional = produtoRepository.findById(id);
        if(produtoOptional.isPresent()){
            Produto produto = produtoOptional.get();
            produto.setNome(produtoDTO.getNome());
            produto.setValor(produtoDTO.getValor());
            produto.setSaldo(produtoDTO.getSaldo());
            produto.setSaldoMinimo(produtoDTO.getSaldoMinimo());

            produto = produtoRepository.save(produto);

            return Optional.of(produtoDTO.fromProduto(produto));
        }else{
            return Optional.empty();
        }
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
    public boolean delete(Long id){
        // funcao verifica se existe se esse id existe no banco de dados
        // se ele existir acontece o delete
        // assim não precisa trazer o objeto inteiro para ser deletado, melhorando o desempenho
        if(produtoRepository.existsById(id)){
            produtoRepository.deleteById(id);
            return true;
        }else {
            return false;
        }
    }




}
