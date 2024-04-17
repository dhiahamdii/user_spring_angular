package com.supportportal.service;

import com.supportportal.domain.Loi;
import com.supportportal.repository.DocumentationRepository;
import com.supportportal.repository.RegleRepository;

import com.supportportal.repository.loiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class LoiService implements ILoiService{

    @Autowired
    DocumentationRepository documentationRepository;

    @Autowired
    loiRepository loiRepository;
    @Autowired
    RegleRepository regleRepository;


    @Override
    public List<Loi> getLastAddedDocumentation() {
        return  loiRepository.findFirstByOrderByCreatedAtDesc().getLois();
    }

    @Override
    public Loi getLoi(Long id) {
        return loiRepository.findById(id).orElse(null);
    }

    @Override
    public List<Loi> getLoidoc(Long id) {
return        documentationRepository.findById(id).get().getLois();
    }

    @Override
    public List<Loi> getAllLois() {
        return loiRepository.findAll();
    }

    @Override
    public void deleteLoi(Long id) {
        loiRepository.deleteById(id);
    }

    @Override
    public void updateLoi(Loi Loi, Long id) {
        Loi existingLoi = loiRepository.findById(id).get();

        existingLoi.setName(Loi.getName());

        existingLoi.setName(Loi.getName());
        existingLoi.setNumero(Loi.getNumero());
        loiRepository.save(existingLoi);
    }
}
