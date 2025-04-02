package com.example.integracaoFront.Repository;

import com.example.integracaoFront.Entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
