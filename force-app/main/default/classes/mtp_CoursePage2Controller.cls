public with sharing class mtp_CoursePage2Controller {

    /* Developer          : Sakina
       Created Date       : 6th September 2022
       Last Modified Date : 6th September 2022
       Description        : Used to Bring Module object data */
    @AuraEnabled(cacheable=true)
    public static List<mtp_Module__c> getModuleData(){
        return[SELECT Id, Name , Description__c  FROM mtp_Module__c];
    }
   
}