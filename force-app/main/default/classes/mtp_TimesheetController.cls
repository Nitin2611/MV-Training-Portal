/* ****************************************************************************************************************************
Class Name       : mtp_TimesheetController
Author           : Nitin
Created Date     : 06/09/2022
Description      : This Class Used In mtp_Timesheet (LWC component ).
TestClass        : 
Code Coverage    : 
================================================================================
Change No.          Developer Name              Date                Description     
1.                  
******************************************************************************************************************************/


public without sharing class mtp_TimesheetController {

    /***************************************************
    * Author             : Nitin
    * Created Date       : 06/09/2022
    * Last Modified Date : 
    * UsedBy             : mtp_Timesheet Component
    * Description        : get timesheet data for display timesheet records in mtp_Timesheet Component.
    ***************************************************/
    @AuraEnabled
    public static List<mtp_Timesheet__c> getTimesheetData(){
        User loggedInUser = [SELECT Name, ContactId FROM User WHERE Id =: UserInfo.getUserId()];
        System.debug('loggedInUser ====>' + loggedInUser);
        List<mtp_Timesheet__c> timesheetDataList = new List<mtp_Timesheet__c>();

        try {
            timesheetDataList = [SELECT Id, CreatedDate, Name, Start_Time__c, End_Time__c, Status__c, Comments__c, mtp_Task__c, mtp_Task__r.Name, Course__c, User__c FROM mtp_Timesheet__c WHERE User__c =: UserInfo.getUserId()];
            // timesheetDataList = [SELECT Id, Name, Start_Time__c, End_Time__c, Status__c, Comments__c, mtp_Task__c, Course__c, User__c FROM mtp_Timesheet__c];

            return timesheetDataList;
        } catch (Exception e) {
            System.debug(e);
            System.debug('Line Number ==>'+ e.getLineNumber());
            System.debug('Message ===>'+ e.getMessage() + ' <==>'+ e.getStackTraceString());
            return null;
        }
    }
}