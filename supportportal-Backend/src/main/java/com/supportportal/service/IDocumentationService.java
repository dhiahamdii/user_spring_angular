package com.supportportal.service;


import com.supportportal.domain.Documentation;

import java.util.List;

public interface IDocumentationService {

        Documentation saveDocumentation(Documentation documentation);

        Documentation getDocumentation(Long id);

        List<Documentation> getAllDocumentations();

    void deleteDocumentation(Long id);

    void updateDocumenation(Documentation documentation,Long id);
    }

