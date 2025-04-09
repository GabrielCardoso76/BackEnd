package com.example.integracaoFront.Controller;

import com.example.integracaoFront.DTO.ProdutoDTO;
import com.example.integracaoFront.Entity.Produto;
import com.example.integracaoFront.Service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    // busca apenas um produto
    // função vai receber um Id que será utilizado para realizar a busca
    // função retorna ResponseEntity contendo o objeto DTO.
    @GetMapping("/{id}")
    public ResponseEntity<ProdutoDTO> getById(@PathVariable Long id){
        Optional<ProdutoDTO> produtoDTOOptional = produtoService.getById(id);
        if(produtoDTOOptional.isPresent()){
            return ResponseEntity.ok(produtoDTOOptional.get());
        }else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping
    public ResponseEntity<List<Produto>> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(produtoService.getAll());
    }

    // função de atualizar os dados de um produto.
    // Recebe um id por parametro da url e o objeto DTO no body da requisição.
    // Retorna o objeto DTO atualizado para o usuário.
    // Retorna 404 se de erro ao encontrar o objeto para ser atualizado.
    @PutMapping("/{id}")
    public ResponseEntity<ProdutoDTO> update(@PathVariable Long id, @RequestBody ProdutoDTO produtoDTO){
        Optional<ProdutoDTO> produtoDTOOptional = produtoService.updateProduto(id, produtoDTO);
        if(produtoDTOOptional.isPresent()){
            return ResponseEntity.ok(produtoDTOOptional.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<ProdutoDTO> created(@RequestBody ProdutoDTO produtoDTO){
        ProdutoDTO produto = produtoService.save(produtoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(produto);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        if(produtoService.delete(id)){
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }
}
