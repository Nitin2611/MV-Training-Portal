trigger TaskStatus on mtp_Task__c (after update) {
      Set<Id> moduleid = new Set<Id>();  
      String module_id = [SELECT Id,Completed__c,mtp_Module__c FROM mtp_Task__c WHERE Id IN : Trigger.New LIMIT 1].mtp_Module__c;
      moduleid.add(module_id);
      List <mtp_Task__c> module_lst = new List<mtp_Task__c>();
      List <mtp_Task__c> tt = [SELECT Id,Completed__c,mtp_Module__c FROM mtp_Task__c WHERE mtp_Module__c IN : moduleid];
      boolean task_completed = false;
      for(mtp_Task__c mdl : tt){
            system.debug(mdl.Completed__c);
            if(mdl.Completed__c){
                  task_completed = true;
            }
            else{
                  task_completed = false;
                  break;
            }
      }
      System.debug(task_completed);
      List <mtp_Module__c> mm = [SELECT Id,Completed__c FROM mtp_Module__c WHERE Id IN : moduleid LIMIT 1];
      mm[0].Completed__c = task_completed;
      update mm;
}