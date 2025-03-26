package com.example.senai.Service;

import com.example.senai.DTO.ProfessorDTO;
import com.example.senai.Entity.Professor;
import com.example.senai.Repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    public Professor fromDTO(ProfessorDTO professorDTO){
        Professor professor = new Professor();
        professor.setNome(professorDTO.getNome());
        professor.setCpf(professorDTO.getCpf());

        return professor;
    }

    public Professor save(ProfessorDTO professorDTO){
        Professor professor = this.fromDTO(professorDTO);
        Professor professorBd = professorRepository.save(professor);
        return professorBd;
    }

}
