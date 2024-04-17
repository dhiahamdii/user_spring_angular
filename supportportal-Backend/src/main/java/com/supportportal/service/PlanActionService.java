package com.supportportal.service;

import java.util.Date;
import java.util.List;

import com.supportportal.domain.PlanAction;
import com.supportportal.exception.domain.PlanActionNotFoundException;


public interface PlanActionService {
	
	public List<PlanAction> getPlanActions();
	
	public long getTotalPlanActions();
	
	public PlanAction addPlanAction(String theme, String cause, String action, String responsable, String delai,
			Date dateRealise, String efficacite, String commentaire);

	public PlanAction updatePlanAction(Long planActionId, String responsable, String delai, Date dateRealise,
			String efficacite, String commentaire) throws PlanActionNotFoundException;

	public void deletePlanAction(Long planActionId) throws PlanActionNotFoundException;

}
