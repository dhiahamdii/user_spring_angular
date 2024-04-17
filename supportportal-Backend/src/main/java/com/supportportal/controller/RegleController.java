package com.supportportal.controller;

import com.supportportal.domain.Regle;
import com.supportportal.service.IRegleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/Regle")
public class RegleController {
    @Autowired
    IRegleService iRegleService;

    @PostMapping
    public void addDoc(@RequestBody Regle doc) {
        iRegleService.saveRegle(doc);
    }

    @GetMapping("/{id}")
    public Regle getRegle(@PathVariable Long id) {
        return iRegleService.getRegle(id);

    }
    @GetMapping("/loi/{id}")
    public List<Regle> getRegleLoi(@PathVariable Long id) {
        return iRegleService.getRegleLoi(id);

    }

    @GetMapping
    public List<Regle> getAllRegles() {

        return iRegleService.getAllRegles();
    }

    @PutMapping("/{id}")
    public Void updateRegle(@RequestBody Regle Regle, @PathVariable Long id) {
        iRegleService.updateRegle(Regle, id);

        return null;
    }

    @DeleteMapping("/{id}")
    public Void deleteRegle(@PathVariable Long id) {
        iRegleService.deleteRegle(id);
        return null;

    }
}
