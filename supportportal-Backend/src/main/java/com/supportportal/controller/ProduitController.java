package com.supportportal.controller;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.supportportal.domain.HttpResponse;
import com.supportportal.domain.Produit;
import com.supportportal.exception.domain.CodeLigneProdExistException;
import com.supportportal.exception.domain.ProduitNotFoundException;
import com.supportportal.service.ProduitService;

@RestController
@RequestMapping(path = { "/", "/produit"})
public class ProduitController {

	private final ProduitService produitService;

    @Autowired
    public ProduitController(ProduitService produitService) {
        this.produitService = produitService;
    }
    
    @GetMapping("/trg-by-produit")
    public ResponseEntity<Map<String, Double>> getTRGByProduit() {
        Map<String, Double> trgByProduit = produitService.calculateTRGByProduit();
        return ResponseEntity.ok(trgByProduit);
    }

    
    @GetMapping("/trg-by-ligne")
    public Map<String, Double> getTRGByLigneProduction() {
        return produitService.calculateTRGByLigneProduction();
    }
    
    @GetMapping("/global-trg")
    public ResponseEntity<Double> getGlobalTRG() {
        double globalTRG = produitService.getGlobalTRG();
        return ResponseEntity.ok(globalTRG);
    }
    
    @GetMapping("/trg-by-shifts")
    public ResponseEntity<Map<String, Double>> getTRGByShifts() {
        Map<String, Double> trgByShifts = produitService.calculateTRGByShifts();
        return ResponseEntity.ok(trgByShifts);
    }
    
    @GetMapping("/list")
    public ResponseEntity<List<Produit>> getAllProduits() {
        List<Produit> produits = produitService.getProduits();
        return new ResponseEntity<>(produits, HttpStatus.OK);
    }
    
    
    @GetMapping("/count")
    public ResponseEntity<Long> getTotalProduits() {
        long count = produitService.getTotalProduits();
        return ResponseEntity.ok(count);
    }

    @PostMapping("/add")
    public ResponseEntity<Produit> addNewProduit(   @RequestParam("description") String description,
										            @RequestParam("reference") String reference,
										            @RequestParam("operation") String operation,
										            @RequestParam("qtStarted") int qtStarted,
										            @RequestParam("qtCompleted") int qtCompleted,
										            @RequestParam("qtFailed") int qtFailed,
										            @RequestParam("objectif") int objectif,
										            @RequestParam("journee") @DateTimeFormat(pattern = "dd-MM-yyyy") Date journee,
										            @RequestParam("shift") String shift,
										            @RequestParam("codeLp") String codeLp
										    ) throws CodeLigneProdExistException {
        Produit newProduit = produitService.addProduit(description, reference, operation, qtStarted, qtCompleted, qtFailed, objectif, journee, shift, codeLp);
        return new ResponseEntity<>(newProduit, HttpStatus.OK);
    }
    
    @PostMapping("/update")
    public ResponseEntity<Produit> updateProduit(   @RequestParam("produitId") Long produitId,
										            @RequestParam("description") String description,
										            @RequestParam("reference") String reference,
										            @RequestParam("operation") String operation,
										            @RequestParam("qtStarted") int qtStarted,
										            @RequestParam("qtCompleted") int qtCompleted,
										            @RequestParam("qtFailed") int qtFailed,
										            @RequestParam("objectif") int objectif,
										            @RequestParam("journee") @DateTimeFormat(pattern = "dd-MM-yyyy") Date journee,
										            @RequestParam("shift") String shift ) throws ProduitNotFoundException {
        Produit updatedProduit = produitService.updateProduit(produitId, description, reference, operation, qtStarted, qtCompleted, qtFailed, objectif, journee, shift);
        return new ResponseEntity<>(updatedProduit, HttpStatus.OK);
    }
    
    
    @DeleteMapping("/delete/{produitId}")
    public ResponseEntity<HttpResponse> deleteProduit(@PathVariable("produitId") Long produitId) throws IOException, ProduitNotFoundException {
        produitService.deleteProduit(produitId);
        return response (HttpStatus.OK, "Produit deleted Successfully");
    }
    
    private  ResponseEntity<HttpResponse> response (HttpStatus httpStatus , String message ){
		HttpResponse body = new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase()	,message.toUpperCase() )  ;
		return new  ResponseEntity<>( body , httpStatus ) ;
	}
    
    
    
}
