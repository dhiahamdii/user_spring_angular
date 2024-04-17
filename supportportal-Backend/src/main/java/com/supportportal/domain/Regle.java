package com.supportportal.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;


@Entity
public class Regle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String Contenu ;

    private String Nom ;

    private String DocName ;
    @JsonIgnore
    @ManyToOne
    private  Loi  loi;

    public Regle() {
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setContenu(String contenu) {
        Contenu = contenu;
    }

    public void setNom(String nom) {
        Nom = nom;
    }

    public void setDocName(String docName) {
        DocName = docName;
    }

    public void setLoi(Loi loi) {
        this.loi = loi;
    }

    public Long getId() {
        return id;
    }

    public String getContenu() {
        return Contenu;
    }

    public String getNom() {
        return Nom;
    }

    public String getDocName() {
        return DocName;
    }

    public Loi getLoi() {
        return loi;
    }
}
