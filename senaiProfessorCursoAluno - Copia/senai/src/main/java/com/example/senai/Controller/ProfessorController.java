package com.example.senai.Controller;

import com.example.senai.Entity.Professor;
import com.example.senai.Repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/professor")
public class ProfessorController {

    @Autowired
    private ProfessorRepository professorRepository;

    @GetMapping
    public ResponseEntity<List<Professor>> getAll(){
        return ResponseEntity.ok(professorRepository.findAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Professor> getById(@PathVariable Long id){
        Optional<Professor> professorOptional = professorRepository.findById(id);
        if(professorOptional.isPresent()){
            Professor professor = professorOptional.get();
            return ResponseEntity.ok(professor);
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @PostMapping
    public ResponseEntity<Professor> created(@RequestBody Professor professor){
        Professor professorBd = professorRepository.save(professor);
        return ResponseEntity.status(HttpStatus.CREATED).body(professorBd);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable Long id, @RequestBody Professor updateProfessor){
        Optional<Professor> optionalProfessor = professorRepository.findById(id);

        if (optionalProfessor.isPresent()){
            Professor professor = optionalProfessor.get();
            professor.setNome(updateProfessor.getNome());
            professor.setCpf(updateProfessor.getCpf());

            return ResponseEntity.ok(professorRepository.save(professor));
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Professor nâo encotrado");
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        Optional<Professor> professorOptional = professorRepository.findById(id);

        if ((professorOptional.isPresent())){
            Professor professor = professorOptional.get();
            professorRepository.delete(professor);
            return ResponseEntity.ok("Professor deletado com sucesso");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Professor não encotrado");
        }
    }
}
