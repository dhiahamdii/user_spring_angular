package com.supportportal.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supportportal.domain.HttpResponse;
import com.supportportal.domain.PlanAction;
import com.supportportal.exception.domain.PlanActionNotFoundException;
import com.supportportal.service.PlanActionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException ;
import java.util.Date ;
import java.util.List ;
 
@RestController
@RequestMapping(path = { "/", "/planAction"})
public class PlanActionController {
	
	
	private final PlanActionService planActionService; 

    @Autowired
    public PlanActionController(PlanActionService planActionService) {
        this.planActionService = planActionService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<PlanAction>> getAllPlanActions() {
        List<PlanAction> planActions = planActionService.getPlanActions();
        return new ResponseEntity<>(planActions, HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getTotalPlanActions() {
        long count = planActionService.getTotalPlanActions();
        return ResponseEntity.ok(count);
    }

    @PostMapping("/add")
    public ResponseEntity<PlanAction> addNewPlanAction(
            @RequestParam("theme") String theme,
            @RequestParam("cause") String cause,
            @RequestParam("action") String action,
            @RequestParam("responsable") String responsable,
            @RequestParam("delai") String delai,
            @RequestParam("dateRealise") @DateTimeFormat(pattern = "dd-MM-yyyy") Date dateRealise,
            @RequestParam("efficacite") String efficacite,
            @RequestParam("commentaire") String commentaire
    ) {
        PlanAction newPlanAction = planActionService.addPlanAction(theme, cause, action, responsable, delai, dateRealise, efficacite, commentaire);
        return new ResponseEntity<>(newPlanAction, HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<PlanAction> updatePlanAction(
            @RequestParam("planActionId") Long planActionId,
            @RequestParam("responsable") String responsable,
            @RequestParam("delai") String delai,
            @RequestParam("dateRealise") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dateRealise,
            @RequestParam("efficacite") String efficacite,
            @RequestParam("commentaire") String commentaire
    ) throws PlanActionNotFoundException {
        PlanAction updatedPlanAction = planActionService.updatePlanAction(planActionId, responsable, delai, dateRealise, efficacite, commentaire);
        return new ResponseEntity<>(updatedPlanAction, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{planActionId}")
    public ResponseEntity<HttpResponse> deletePlanAction(@PathVariable("planActionId") Long planActionId) throws IOException, PlanActionNotFoundException {
        planActionService.deletePlanAction(planActionId);
        return response(HttpStatus.OK, "PlanAction deleted Successfully");
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        HttpResponse body = new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message.toUpperCase());
        return new ResponseEntity<>(body, httpStatus);
    }


}
