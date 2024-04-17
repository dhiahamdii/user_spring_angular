package com.supportportal.service.impl;

import com.supportportal.domain.Poste;
import com.supportportal.domain.Reclamation;
import com.supportportal.domain.User;
import com.supportportal.exception.domain.PosteExisteException;
import com.supportportal.exception.domain.PosteNotFoundException;
import com.supportportal.exception.domain.ReclamationNotFoundException;
import com.supportportal.repository.ReclamationRepository;
import com.supportportal.service.ReclamationService;

import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class ReclamationServiceImpl implements ReclamationService {
    private final ReclamationRepository reclamationRepository;

    @Autowired
    public ReclamationServiceImpl(ReclamationRepository reclamationRepository) {
        this.reclamationRepository = reclamationRepository;
    }

    private static final Logger logger = LoggerFactory.getLogger(ReclamationServiceImpl.class);

    @Override
    public Reclamation addReclamation (String email , String descrRec) throws ReclamationNotFoundException {
        Reclamation reclamation = new Reclamation() ;
        reclamation.setEmail(email);
        reclamation.setDescrRec(descrRec);
        reclamationRepository.save(reclamation);
        return reclamation ;
}

    @Override
    public long getTotalReclamation() {

        return reclamationRepository.count();
    }





    @Override
    public Reclamation findRecByEmail(String email) {
        return reclamationRepository.findRecByEmail(email);
    }
}
