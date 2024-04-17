export class PlanAction {

    id: number;
    theme: string;
    date: Date;
    cause: string;
    action: string;
    responsable: string;
    delai: string;
    dateRealise: Date;
    efficacite: string;
    commentaire: string;
  
    constructor() {
      this.id = null; 
      this.theme = '';
      this.date = null;
      this.cause = '';
      this.action = '';
      this.responsable = '';
      this.delai = '';
      this.dateRealise = null;
      this.efficacite = '';
      this.commentaire = '';
    }
  }
  