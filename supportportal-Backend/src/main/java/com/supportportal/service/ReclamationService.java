package com.supportportal.service;

import com.supportportal.domain.Reclamation;


public interface ReclamationService {

    Reclamation addReclamation(String email, String descrRec);

    long getTotalReclamation();




    Reclamation findRecByEmail(String email);


}
