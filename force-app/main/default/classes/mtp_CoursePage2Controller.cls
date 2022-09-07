public with sharing class mtp_CoursePage2Controller {

  /***************************************************
        * Author             : sakina
        * Created Date       : 6/09/2022
        * Last Modified Date : 6/09/2022
        * Description        : Used to bring Module object Data
   ***************************************************/
    @AuraEnabled
    public static List<mtp_Module__c> getModuleData(){
        try{

          return[SELECT Id, Name , Description__c  FROM mtp_Module__c ORDER BY CreatedDate DESC];

        }catch(Exception e){

            System.debug(e);
            return null;
        }
    }
    
   
}