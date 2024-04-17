package com.supportportal.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.supportportal.domain.Produit;
import com.supportportal.exception.domain.CodeLigneProdExistException;
import com.supportportal.exception.domain.ProduitNotFoundException;

public interface ProduitService {
	
	long getTotalProduits();

	List<Produit> getProduits();

	Produit addProduit(String description, String reference, String operation, int qtStarted, int qtCompleted,
			int qtFailed, int objectif, Date journee, String shift, String codeLp) throws CodeLigneProdExistException;


	void deleteProduit(Long produitId) throws ProduitNotFoundException;

	Produit updateProduit(Long produitId, String description, String reference, String operation, int qtStarted,
			int qtCompleted, int qtFailed, int objectif, Date journee, String shift) throws ProduitNotFoundException;

	double getGlobalTRG();

	Map<String, Double> calculateTRGByShifts();

	Map<String, Double> calculateTRGByLigneProduction();

	Map<String, Double> calculateTRGByProduit();

}
