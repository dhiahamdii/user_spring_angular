package com.supportportal.domain;

import javax.persistence.*;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity
public class PlanAction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String theme;
    
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date date;
    
    private String cause;
    private String action;
    private String responsable;
    private String delai;
    
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date dateRealise;
    
    private String efficacite;
    private String commentaire;

    

    public PlanAction() {
        super();
    }

    public PlanAction(String theme, Date date, String cause, String action, String responsable, String delai, Date dateRealise, String efficacite, String commentaire) {
        this.theme = theme;
        this.date = date;
        this.cause = cause;
        this.action = action;
        this.responsable = responsable;
        this.delai = delai;
        this.dateRealise = dateRealise;
        this.efficacite = efficacite;
        this.commentaire = commentaire;
    }

    // Getters et setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getCause() {
        return cause;
    }

    public void setCause(String cause) {
        this.cause = cause;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public String getDelai() {
        return delai;
    }

    public void setDelai(String delai) {
        this.delai = delai;
    }

    public Date getDateRealise() {
        return dateRealise;
    }

    public void setDateRealise(Date dateRealise) {
        this.dateRealise = dateRealise;
    }

    public String getEfficacite() {
        return efficacite;
    }

    public void setEfficacite(String efficacite) {
        this.efficacite = efficacite;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }
}
