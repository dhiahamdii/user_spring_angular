package com.supportportal.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties("ligneProduction")
@Entity
public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private String reference;
    private String operation;
    private int qtStarted;
    private int qtCompleted;
    private int qtFailed;
    private int objectif;
    
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date journee;
    
    private String shift;
    

    @ManyToOne
    @JoinColumn(name = "ligne_production_id")
    private LigneProduction ligneProduction;


    
	public Produit() {
		super();
	}


	public Produit(Long id, String description, String reference, String operation, int qtStarted, int qtCompleted,
			int qtFailed, int objectif, Date journee, String shift, LigneProduction ligneProduction) {
		super();
		this.id = id;
		this.description = description;
		this.reference = reference;
		this.operation = operation;
		this.qtStarted = qtStarted;
		this.qtCompleted = qtCompleted;
		this.qtFailed = qtFailed;
		this.objectif = objectif;
		this.journee = journee;
		this.shift = shift;
		this.ligneProduction = ligneProduction;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getReference() {
		return reference;
	}


	public void setReference(String reference) {
		this.reference = reference;
	}


	public String getOperation() {
		return operation;
	}


	public void setOperation(String operation) {
		this.operation = operation;
	}


	public int getQtStarted() {
		return qtStarted;
	}


	public void setQtStarted(int qtStarted) {
		this.qtStarted = qtStarted;
	}


	public int getQtCompleted() {
		return qtCompleted;
	}


	public void setQtCompleted(int qtCompleted) {
		this.qtCompleted = qtCompleted;
	}


	public int getQtFailed() {
		return qtFailed;
	}


	public void setQtFailed(int qtFailed) {
		this.qtFailed = qtFailed;
	}


	public int getObjectif() {
		return objectif;
	}


	public void setObjectif(int objectif) {
		this.objectif = objectif;
	}


	public Date getJournee() {
		return journee;
	}


	public void setJournee(Date journee) {
		this.journee = journee;
	}


	public String getShift() {
		return shift;
	}


	public void setShift(String shift) {
		this.shift = shift;
	}


	public LigneProduction getLigneProduction() {
		return ligneProduction;
	}


	public void setLigneProduction(LigneProduction ligneProduction) {
		this.ligneProduction = ligneProduction;
	}
    
    
}

