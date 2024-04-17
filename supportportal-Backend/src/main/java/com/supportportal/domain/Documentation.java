package com.supportportal.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Documentation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;


    private String Label;
    private String status;


    private String Fichier;

    private String Type;
    @JsonIgnore
    @OneToMany(mappedBy = "documentation", cascade = CascadeType.ALL)
    private List<Loi> lois = new ArrayList<>();

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getLabel() {
        return Label;
    }

    public String getStatus() {
        return status;
    }

    public String getFichier() {
        return Fichier;
    }

    public String getType() {
        return Type;
    }

    public List<Loi> getLois() {
        return lois;
    }

    public void setLabel(String label) {
        Label = label;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setFichier(String fichier) {
        Fichier = fichier;
    }

    public void setType(String type) {
        Type = type;
    }

    public void setLois(List<Loi> lois) {
        this.lois = lois;
    }
}
