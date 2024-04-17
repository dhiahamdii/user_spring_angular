package com.supportportal.service;


import com.supportportal.domain.Documentation;
import com.supportportal.domain.Regle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;

import com.supportportal.repository.loiRepository;
import com.supportportal.domain.Loi;
import com.supportportal.repository.DocumentationRepository;
import com.supportportal.repository.RegleRepository;

@Service
public class DocumentationService implements IDocumentationService{

    @Autowired
    DocumentationRepository documentationRepository;

    @Autowired
    loiRepository loiRepository;
    @Autowired
    RegleRepository regleRepository;
    @Override
    public Documentation saveDocumentation(Documentation documentation) {
        documentation.setFichier(documentation.getFichier().substring(12));
        documentation.setStatus("wait");
        documentationRepository.save(documentation);

        try (InputStream inputStream = getClass().getResourceAsStream("/" + documentation.getFichier());
             BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {

            String loiName = null;
            String regleName = null;
            StringBuilder regleContenu = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                // Split the line into key and value
                String[] parts = line.split(": ");
                if (parts.length == 2) {
                    String key = parts[0].trim();
                    String value = parts[1].trim();

                    switch (key) {
                        case "loiName":
                            loiName = value;
                            break;
                        case "RegleName":
                            regleName = value;
                            break;
                        case "RegleContenu":
                            regleContenu.append(value);
                            break;
                    }
                }

                // Check if the end of the file is reached or a new rule entry starts
                if (line.trim().isEmpty() && loiName != null && regleName != null) {
                    // Check if the Loi already exists
                    Loi loi = loiRepository.findByName(loiName);
                    if (loi == null) {
                        // Loi doesn't exist, create a new one
                        loi = new Loi();
                        loi.setName(loiName);
                        loi.setDocumentation(documentation);
                        loiRepository.save(loi);
                    }

                    // Check if the Regle already exists for this Loi
                    List<Regle> existingRegles = loiRepository.findByNomAndLoi(regleName, loi);
                    if (existingRegles.isEmpty()) {
                        // Regle doesn't exist, create a new one
                        Regle regle = new Regle();
                        regle.setNom(regleName);
                        regle.setContenu(regleContenu.toString());
                        regle.setLoi(loi);
                        regle.setDocName(documentation.getLabel());
                        regleRepository.save(regle);
                    }

                    // Reset variables for the next entry
                    loiName = null;
                    regleName = null;
                    regleContenu.setLength(0);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception as needed
        }

        return documentation;
    }

    private Loi createLoi(String name) {
        Loi loi = new Loi();
        loi.setName(name);
        // Set other properties as needed
        return loi;
    }

    @Override
    public Documentation getDocumentation(Long id) {
        return documentationRepository.findById(id).orElse(null);
    }

    @Override
    public List<Documentation> getAllDocumentations() {
        return documentationRepository.findAll();
    }

    @Override
    public void deleteDocumentation(Long id) {
        documentationRepository.deleteById(id);
    }

    @Override
    public void updateDocumenation(Documentation documentation, Long id) {
        Documentation existingDocumentation = documentationRepository.findById(id).get();

        existingDocumentation.setLabel(documentation.getLabel());

        existingDocumentation.setType(documentation.getType());
        existingDocumentation.setFichier(documentation.getFichier());
        documentationRepository.save(existingDocumentation);
    }
}
