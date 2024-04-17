package com.supportportal.service.impl;

import static com.supportportal.constant.LigneProdConstant.LIGNE_NOT_FOUND;

import java.text.DecimalFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.supportportal.domain.LigneProduction;
import com.supportportal.domain.Produit;
import com.supportportal.exception.domain.CodeLigneProdExistException;
import com.supportportal.exception.domain.ProduitNotFoundException;
import com.supportportal.repository.LigneProductionRepository;
import com.supportportal.repository.ProduitRepository;
import com.supportportal.service.ProduitService;

@Service
public class ProduitServiceImpl implements ProduitService {

	 private final ProduitRepository produitRepository;
	 private final LigneProductionRepository ligneProductionRepository;
	 
	  @Autowired
	  public ProduitServiceImpl(ProduitRepository produitRepository, LigneProductionRepository ligneProductionRepository) {
	     this.produitRepository = produitRepository;
	     this.ligneProductionRepository = ligneProductionRepository;
    }

	
	@Override
	public List<Produit> getProduits() {
	   return produitRepository.findAll();
	}

	
	@Override    
	public long getTotalProduits() {
	   return produitRepository.count();
	}
	
	
	@Override
    public Produit addProduit(String description, String reference, String operation, int qtStarted, int qtCompleted, int qtFailed, int objectif,
    							Date journee, String shift, String codeLp) throws CodeLigneProdExistException {
    	
    	LigneProduction ligneProduction = ligneProductionRepository.findLigneProductionByCodeLp(codeLp);
        Produit produit = new Produit();
        produit.setDescription(description);
        produit.setReference(reference);
        produit.setOperation(operation);
        produit.setQtStarted(qtStarted);
        produit.setQtCompleted(qtCompleted);
        produit.setQtFailed(qtFailed);
        produit.setObjectif(objectif);
        produit.setJournee(journee);
        produit.setShift(shift);
        
        if( ligneProduction == null ) {
			throw new CodeLigneProdExistException(LIGNE_NOT_FOUND + codeLp);
		}else {
			produit.setLigneProduction(ligneProduction);
	        produitRepository.save(produit);
	        return produit;
		}
        
    }
    
	@Override
    public Produit updateProduit(Long produitId, String description, String reference, String operation, int qtStarted, int qtCompleted, int qtFailed,
    							 int objectif, Date journee, String shift) throws ProduitNotFoundException {
        Produit produit = produitRepository.findById(produitId)
                .orElseThrow(() -> new ProduitNotFoundException("Produit not found with ID: " + produitId));
        
        produit.setDescription(description);
        produit.setReference(reference);
        produit.setOperation(operation);
        produit.setQtStarted(qtStarted);
        produit.setQtCompleted(qtCompleted);
        produit.setQtFailed(qtFailed);
        produit.setObjectif(objectif);
        produit.setJournee(journee);
        produit.setShift(shift);
        
        produitRepository.save(produit);
        
        return produit;
    }
    
	@Override
    public void deleteProduit(Long produitId) throws ProduitNotFoundException {
        Produit produit = produitRepository.findById(produitId)
                .orElseThrow(() -> new ProduitNotFoundException("Produit not found with ID: " + produitId));
        
        produitRepository.delete(produit);
    }

	
	// ///// //// /  Partie du calcule TRG,FPY ...  /// /// /// /// 
	
	
	@Override
	  public double getGlobalTRG() {
	      List<LigneProduction> lignes = ligneProductionRepository.findAll();
	      return calculateGlobalTRG(lignes);
	  }
		
	public double calculateGlobalTRG(List<LigneProduction> lignes) {
	    double totalQtCompletedAndFailed = 0.0;
	    double totalObjectif = 0.0;

	    for (LigneProduction ligne : lignes) {
	        for (Produit produit : ligne.getProduits()) {
	            totalQtCompletedAndFailed += (produit.getQtCompleted() + produit.getQtFailed());
	            totalObjectif += produit.getObjectif();
	        }
	    }
	    if (totalObjectif == 0.0) {
	        return 0.0; // Pour éviter une division par zéro
	    }

	    // Calcul du TRG global en pourcentage
	    double globalTRG = (totalQtCompletedAndFailed / totalObjectif) * 100.0;

	    // Formattez le nombre en chaîne avec deux chiffres après la virgule
	    DecimalFormat df = new DecimalFormat("#.00");
	    
	    // Remplacez la virgule par un point dans la chaîne formatée
	    String formattedGlobalTRG = df.format(globalTRG).replace(',', '.');

	    // Convertir la chaîne en double avec deux chiffres après la virgule
	    globalTRG = Double.parseDouble(formattedGlobalTRG);

	    return globalTRG;
	}
	
	

	@Override
	public Map<String, Double> calculateTRGByShifts() {
	    List<LigneProduction> lignes = ligneProductionRepository.findAll();
	    Map<String, Double> trgByShifts = new HashMap<>();

	    DecimalFormat df = new DecimalFormat("#.00"); // modèle pour deux chiffres après la virgule

	    for (String shift : Arrays.asList("MATIN", "NUIT", "APRES_MIDI")) {
	        double totalQtCompletedAndFailed = 0.0;
	        double totalObjectif = 0.0;

	        for (LigneProduction ligne : lignes) {
	            for (Produit produit : ligne.getProduits()) {
	                if (produit.getShift().equalsIgnoreCase(shift)) {
	                    totalQtCompletedAndFailed += (produit.getQtCompleted() + produit.getQtFailed());
	                    totalObjectif += produit.getObjectif();
	                }
	            }
	        }

	        if (totalObjectif != 0.0) {
	            // Calcul du TRG par shift en pourcentage
	            double trg = (totalQtCompletedAndFailed / totalObjectif) * 100.0;
	            
	            // Utiliser DecimalFormat pour formater le nombre en une chaîne avec deux chiffres après la virgule
	           
	            // Remplacez la virgule par un point dans la chaîne formatée
	    	    String formattedTRG = df.format(trg).replace(',', '.');
	            trg = Double.parseDouble(formattedTRG); // Convertir la chaîne en double avec deux chiffres après la virgule

	            trgByShifts.put(shift, trg);
	        }
	    }

	    return trgByShifts;
	}
	
	
	
	@Override
	public Map<String, Double> calculateTRGByLigneProduction() {
	    List<LigneProduction> lignes = ligneProductionRepository.findAll();
	    Map<String, Double> trgByLigne = new HashMap<>();
	
	    DecimalFormat df = new DecimalFormat("#.00"); // Utiliser le modèle pour deux chiffres après la virgule
	
	    for (LigneProduction ligne : lignes) {
	        double totalQtCompletedAndFailed = 0.0;
	        double totalObjectif = 0.0;
	
	        for (Produit produit : ligne.getProduits()) {
	            totalQtCompletedAndFailed += (produit.getQtCompleted() + produit.getQtFailed());
	            totalObjectif += produit.getObjectif();
	        }
	
	        if (totalObjectif != 0.0) {
	            // Calcul du TRG par ligne en pourcentage
	            double trg = (totalQtCompletedAndFailed / totalObjectif) * 100.0;
	
	            // Utiliser DecimalFormat pour formater le nombre en une chaîne avec deux chiffres après la virgule
	            String formattedTRG = df.format(trg).replace(',', '.');
	            trg = Double.parseDouble(formattedTRG); // Convertir la chaîne en double avec deux chiffres après la virgule
	
	            trgByLigne.put(ligne.getCodeLp(), trg);
	        }
	    }
	
	    return trgByLigne;
	}
	
	
	@Override
	public Map<String, Double> calculateTRGByProduit() {
	    List<LigneProduction> lignes = ligneProductionRepository.findAll();
	    Map<String, Double> trgByProduit = new HashMap<>();

	    DecimalFormat df = new DecimalFormat("#.00"); // Modèle pour deux chiffres après la virgule

	    for (LigneProduction ligne : lignes) {
	        for (Produit produit : ligne.getProduits()) {
	            double totalQtCompletedAndFailed = produit.getQtCompleted() + produit.getQtFailed();
	            double totalObjectif = produit.getObjectif();

	            if (totalObjectif != 0.0) {
	                // Calcul du TRG par produit en pourcentage
	                double trg = (totalQtCompletedAndFailed / totalObjectif) * 100.0;

	                // Utiliser DecimalFormat pour formater le nombre en une chaîne avec deux chiffres après la virgule
	                String formattedTRG = df.format(trg).replace(',', '.');
	                trg = Double.parseDouble(formattedTRG);
	                trgByProduit.put(produit.getReference(),trg );
	            }
	        }
	    }
	    
	    return trgByProduit;
	}



	




}
