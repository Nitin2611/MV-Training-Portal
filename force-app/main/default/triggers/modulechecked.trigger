trigger modulechecked on mtp_Module__c (after update) {

      Set<Id> csid = new Set<Id>();  
      String course_id = [SELECT Id,Completed__c,Course__c FROM mtp_Module__c WHERE Id IN : Trigger.New LIMIT 1].Course__c;
      
      system.debug(course_id);
      csid.add(course_id);
      List <mtp_Module__c> module_lst = new List<mtp_Module__c>();
      // List<mtp_Module__c> module_lst = [SELECT Id,Completed__c,Course__c FROM mtp_Module__c WHERE Course__c = course_id];
      // module_lst = [SELECT Id,Completed__c,Course__c FROM mtp_Module__c WHERE Course__c = course_id];

      List <mtp_Module__c> mm = [SELECT Id,Completed__c,Course__c FROM mtp_Module__c WHERE Course__c IN : csid];
      boolean module_completed = false;

      for(mtp_Module__c mdl : mm){
            system.debug(mdl.Completed__c);
            if(mdl.Completed__c){
                  module_completed = true;
            }
            else{
                  module_completed = false;
                  break;
            }
      }

      System.debug(module_completed);

      List <Course__c> cc = [SELECT Id,Completed__c FROM Course__c WHERE Id IN : csid LIMIT 1];

      cc[0].Completed__c = module_completed;

      update cc;

      system.debug(module_lst);



      // system.debug()

}