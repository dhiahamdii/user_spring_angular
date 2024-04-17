package com.supportportal.domain;


import javax.persistence.*;

@Entity
@Table(name = "reclamation")
public class Reclamation {

@Id
@GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    public Reclamation( String email, String descrRec) {
        this.email = email;
        this.descrRec = descrRec;
    }

    public Reclamation() {
    }

    private String email;
    private String descrRec;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDescrRec() {
        return descrRec;
    }

    public void setDescrRec(String descrRec) {
        this.descrRec = descrRec;
    }
}
