package com.supportportal.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;


import javax.persistence.*;
import java.util.List;

@Entity
public class Loi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String name ;
    private int numero ;
    @JsonIgnore
    @ManyToOne
    private Documentation documentation;
    @JsonIgnore
    @OneToMany(mappedBy = "loi")
    private List<Regle> regles;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getNumero() {
        return numero;
    }

    public Documentation getDocumentation() {
        return documentation;
    }

    public List<Regle> getRegles() {
        return regles;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public void setDocumentation(Documentation documentation) {
        this.documentation = documentation;
    }

    public void setRegles(List<Regle> regles) {
        this.regles = regles;
    }
}
