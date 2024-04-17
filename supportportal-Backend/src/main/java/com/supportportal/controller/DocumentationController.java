package com.supportportal.controller;

import com.supportportal.domain.Documentation;
import com.supportportal.service.IDocumentationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/Doc")
public class DocumentationController {
    @Autowired
    IDocumentationService iDocumentationService;

    @PostMapping
    public void addDoc(@RequestBody Documentation doc) {
        iDocumentationService.saveDocumentation(doc);
    }

    @GetMapping("/{id}")
    public Documentation getDocumentation(@PathVariable Long id) {
        return iDocumentationService.getDocumentation(id);

    }

    @GetMapping
    public List<Documentation> getAllDocumentations() {

        return iDocumentationService.getAllDocumentations();
    }

    @PutMapping("/{id}")
    public Void updateDocumentation(@RequestBody Documentation documentation, @PathVariable Long id) {
        iDocumentationService.updateDocumenation(documentation, id);

        return null;
    }

    @DeleteMapping("/{id}")
    public Void deleteDocumentation(@PathVariable Long id) {
        iDocumentationService.deleteDocumentation(id);
        return null;

    }
}
