package com.supportportal.controller;


import com.supportportal.domain.Reclamation;
import com.supportportal.exception.ExceptionHandling;
import com.supportportal.exception.domain.ReclamationNotFoundException;
import com.supportportal.repository.ReclamationRepository;
import com.supportportal.service.ReclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping(path = { "/reclamation"})
public class ReclamationController extends ExceptionHandling {
    private static final Logger logger = LoggerFactory.getLogger(ReclamationController.class);

    @Autowired
    private ReclamationRepository reclamationRepository;
    private ReclamationService reclamationService;




    //get all data
    @GetMapping("/list")
    public List<Reclamation> getAllReclamation(){
        return  reclamationRepository.findAll();
    }


    @GetMapping("/count")
    public long gettalReclamation() {
        return reclamationRepository.count();
    }


    //add reclamation

    @PostMapping("/addReclamationF")
    public Reclamation createReclamationn(@RequestBody Reclamation reclamation)
    {
        Reclamation newReclamation = reclamationRepository.save(reclamation);
        return new ResponseEntity<>(newReclamation, CREATED).getBody();
    }


    @PostMapping("/addReclamation")
    @PreAuthorize("permitAll()")
    public Reclamation createReclamation(@RequestParam("email") String email,
                                         @RequestParam("descrRec") String descrRec) {
        // Create a new Reclamation object and save it to the database
        Reclamation newReclamation = new Reclamation(email, descrRec);
        return reclamationRepository.save(newReclamation);
    }



    /*
    @PostMapping("/addReclamation")
    public ResponseEntity<Reclamation>  createReclamation(@RequestParam("email") String email,@RequestParam("descrRec") String descrRec)throws ReclamationNotFoundException
    {
        Reclamation newReclamation = reclamationService.addReclamation(email, descrRec) ;
        return new  ResponseEntity<>(newReclamation,OK);
    }*/



    // get data by id
    @GetMapping("/find/{id}")
    public ResponseEntity<Reclamation> getByID(@PathVariable Long id) {
        Reclamation reclamation = reclamationRepository.findById(id).
                orElseThrow(()-> new ReclamationNotFoundException("Reclamation with id "+id+"does not exists"));
        return ResponseEntity.ok(reclamation);
    }



    //update data
    @PutMapping ("/Update/{id}")
    public ResponseEntity<Reclamation> updateEmployeeByID(@PathVariable Long id, @RequestBody Reclamation reclamationDetails){
        Reclamation reclamation = reclamationRepository.findById(id).
                orElseThrow(()-> new ReclamationNotFoundException("Employee with id "+id+"does not exists"));
        reclamation.setEmail(reclamationDetails.getEmail());
        reclamation.setDescrRec(reclamationDetails.getDescrRec());
        Reclamation updatedReclamation=reclamationRepository.save(reclamation);
        return ResponseEntity.ok(updatedReclamation);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity <Map<String, Boolean> >deleteReclamation(@PathVariable Long id){


        Reclamation employee = reclamationRepository.findById(id).
                orElseThrow(()-> new ReclamationNotFoundException("Employee with id "+id+"does not exists"));

        reclamationRepository.delete(employee);

        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);

    }

}
