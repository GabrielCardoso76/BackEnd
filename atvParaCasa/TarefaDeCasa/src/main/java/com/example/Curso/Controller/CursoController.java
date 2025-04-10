package com.example.Curso.Controller;

import com.example.Curso.banco.CursoDb;
import com.example.Curso.model.Aluno;
import com.example.Curso.model.Curso;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class CursoController {

    CursoDb repository = new CursoDb();

    public ResponseEntity<List<Curso>> getAll(){
        List<Curso> cursos = repository.findAll();
        if (cursos.isEmpty()){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.ok(cursos);
        }
    }

    public ResponseEntity<List<Curso>> getByProfessor(String nomeProfessor){
        List<Curso> cursos = repository.findByProfessor(nomeProfessor);
        if (cursos.isEmpty()){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.ok(cursos);
        }
    }

    public ResponseEntity<List<Curso>> getBySala(int sala){
        List<Curso> cursos = repository.findBySala(sala);
        if (cursos.isEmpty()){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.ok(cursos);
        }
    }

    public ResponseEntity<Curso> getById(int id){
        Curso curso = repository.getById(id);
        if(curso != null){
            return ResponseEntity.ok(curso);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<String> insertBanco(Curso curso){
        boolean inserido = repository.insert(curso);
        if(inserido) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Curso inserido com sucesso!");
        }else {
            return ResponseEntity.badRequest().body("Falha ao inserir curso!");
        }
    }

    public ResponseEntity<Curso> insertAluno(int idCurso, Aluno aluno){
        Curso curso = repository.insertAluno(idCurso, aluno);
        if(curso != null){
            return ResponseEntity.status(HttpStatus.CREATED).body(curso);
        }else{
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity<Curso> update(int id, Curso curso){
        boolean result = repository.update(id, curso);
        if(result){
            return ResponseEntity.ok(curso);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    public ResponseEntity<Void> updateAluno(int idCurso, int idAluno, Aluno aluno){
        boolean atualizado = repository.updateAluno(idCurso, idAluno, aluno);
        if(atualizado){
            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Void> delete(int id){
        boolean deletado = repository.delete(id);
        if(deletado){
            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.badRequest().build();
        }
    }

}
