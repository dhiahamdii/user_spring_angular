package com.supportportal.service.impl ;

import java.util.Date ;
import java.util.List ;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.supportportal.domain.PlanAction;
import com.supportportal.exception.domain.PlanActionNotFoundException;
import com.supportportal.repository.PlanActionRepository;
import com.supportportal.service.PlanActionService;

@Service
public class PlanActionServiceImlp implements PlanActionService{
	
	private final PlanActionRepository planActionRepository; 
	
	@Autowired
    public PlanActionServiceImlp(PlanActionRepository planActionRepository) {
        this.planActionRepository = planActionRepository;
    }

	@Override
	public List<PlanAction> getPlanActions() {
        return planActionRepository.findAll();
    }
	
	@Override
	public long getTotalPlanActions() {
        return planActionRepository.count();
    }
	
	@Override
    public PlanAction addPlanAction(String theme, String cause, String action, String responsable, String delai, Date dateRealise
    								, String efficacite, String commentaire) {
        PlanAction planAction = new PlanAction();
        planAction.setTheme(theme);
        
        // Obtenir la date actuelle
        Date currentDate = new Date();
        planAction.setDate(currentDate);
        
        planAction.setCause(cause);
        planAction.setAction(action);
        planAction.setResponsable(responsable);
        planAction.setDelai(delai);
        planAction.setDateRealise(dateRealise);
        planAction.setEfficacite(efficacite);
        planAction.setCommentaire(commentaire);

        return planActionRepository.save(planAction);
    }
    
	@Override
    public PlanAction updatePlanAction(Long planActionId, String responsable, String delai, Date dateRealise, String efficacite, String commentaire) throws PlanActionNotFoundException {
        PlanAction planAction = planActionRepository.findById(planActionId)
                .orElseThrow(() -> new PlanActionNotFoundException("Plan D'action not found with ID: " + planActionId));

        planAction.setResponsable(responsable);
        planAction.setDelai(delai);
        planAction.setDateRealise(dateRealise);
        planAction.setEfficacite(efficacite);
        planAction.setCommentaire(commentaire);

        return planActionRepository.save(planAction);
    }
    
	@Override
    public void deletePlanAction(Long planActionId) throws PlanActionNotFoundException {
        PlanAction planAction = planActionRepository.findById(planActionId)
                .orElseThrow(() -> new PlanActionNotFoundException("PlanAction not found with ID: " + planActionId));

        planActionRepository.delete(planAction);
    }

}
