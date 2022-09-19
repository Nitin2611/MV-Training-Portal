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

    @AuraEnabled
    public static Map<String,timesheetwrap> getTimesheet(){
        List<mtp_Timesheet__c> timesheetList = [SELECT Id,Date__c,Start_Time__c,End_Time__c,Comments__c FROM mtp_Timesheet__c WHERE User__c =: UserInfo.getUserId() ORDER BY Date__c DESC];
        Map<String,timesheetwrap> returnData = new Map<String,timesheetwrap>();
        for(mtp_Timesheet__c mt: timesheetList){
            timesheetwrap tw;

            if(returnData.containsKey(mt.Date__c.format())){
                tw = returnData.get(mt.Date__c.format());
                tw.startTime = (tw.startTime < mt.Start_Time__c) ? tw.startTime : mt.Start_Time__c;
                tw.endTime = (tw.endTime > mt.End_Time__c) ? tw.endTime : mt.End_Time__c;
                Long refLong = tw.totalTimeLong;
                tw.totalTimeLong = (datetime.newinstance(mt.Date__c, mt.End_Time__c).getTime() - datetime.newinstance(mt.Date__c, mt.Start_Time__c).getTime());
                tw.totalTimeLong /= 60000;
                tw.totalTimeLong += refLong;
                tw.totalTimeString = (tw.totalTimeLong/60) +' H '+math.mod(tw.totalTimeLong,60)+' M';
                tw.totalTask++;

                tw.startTimeString = tw.startTime.hour()+' H '+tw.startTime.minute()+' M';
                tw.endTimeString = tw.endTime.hour()+' H '+tw.endTime.minute()+' M';
            }else{
                tw = new timesheetwrap();
                tw.startTime  = mt.Start_Time__c;
                tw.endTime = mt.End_Time__c;
                tw.totalTimeLong = datetime.newinstance(mt.Date__c, mt.End_Time__c).getTime() - datetime.newinstance(mt.Date__c, mt.Start_Time__c).getTime();
                tw.totalTimeLong /= 60000;
                system.debug(tw.totalTimeLong);
                tw.totalTimeString = (tw.totalTimeLong/60) +' H '+math.mod(tw.totalTimeLong,60)+' M';
                tw.totalTask = 1;
                tw.startTimeString = mt.Start_Time__c.hour()+' H '+mt.Start_Time__c.minute()+' M';
                tw.endTimeString = mt.End_Time__c.hour()+' H '+mt.End_Time__c.minute()+' M';
            }
            returnData.put(mt.Date__c.format(),tw);
        }

        if(!returnData.containsKey(system.today().format())){
            timesheetwrap tw = new timesheetwrap();
            tw.totalTimeString = '0 H 0 M';
            tw.startTimeString = '0 H 0 M';
            tw.endTimeString = '0 H 0 M';
            returnData.put(system.today().format(),tw);
        }

        return returnData;
    }

    public class timesheetwrap{
        @AuraEnabled
        public Long totalTimeLong {get;set;}
        @AuraEnabled
        public String totalTimeString {get;set;}
        @AuraEnabled
        public time startTime {get;set;}
        @AuraEnabled
        public time endTime {get;set;}
        @AuraEnabled
        public String startTimeString {get;set;}
        @AuraEnabled
        public String endTimeString {get;set;}
        @AuraEnabled
        public Integer totalTask {get;set;}
    }


    /***************************************************
    * Author             : Nitin
    * Created Date       : 07/09/2022
    * Last Modified Date : 
    * UsedBy             : mtp_Timesheet Component
    * Description        : get task records for picklist option value for popup modal.
    ***************************************************/
    @AuraEnabled
    public static List<String> getTaskList(){
        List<String> taskDetails = new List<String>();
        List<mtp_Task__c> tasks = new List<mtp_Task__c>();
        
        try {
            tasks = [SELECT Id, Name FROM mtp_Task__c];
            if (tasks.size() >0) {
                for (mtp_Task__c tsk : tasks) {
                    taskDetails.add(tsk.Name + ':::'+ tsk.Id);
                }
            }
            return taskDetails;
        } catch (Exception e) {
            System.debug(e);
            System.debug('Line Number ==>'+ e.getLineNumber());
            System.debug('Message ===>'+ e.getMessage() + ' <==>'+ e.getStackTraceString());
            return null;
        }
    }

    /***************************************************
    * Author             : Nitin
    * Created Date       : 07/09/2022
    * Last Modified Date : 
    * UsedBy             : mtp_Timesheet Component
    * Description        : Creating timesheet record.
    ***************************************************/
    @AuraEnabled
    public static String createTimesheetRecord(String taskId, Datetime startTime, Datetime endTime, String comments){
        try {
            mtp_Timesheet__c tsr = new mtp_Timesheet__c();
            System.debug('taskId:    ==>'+ taskId);
            System.debug('comments:  ==>'+ comments);
            
            System.debug('startTime : ==>'+ startTime);
            System.debug('endTime   :   ==>'+ endTime);

            if (taskId == null || startTime == null || endTime == null) {
                return 'required field missing';
            } else {
                tsr.mtp_Task__c = taskId;
                // tsr.Start_Time__c = startTime;
                // tsr.End_Time__c = endTime;
                tsr.Comments__c = comments;
                tsr.User__c = UserInfo.getUserId();
                insert tsr;
            }
            return 'success';
        } catch (Exception e) {
            System.debug(e);
            System.debug('Line Number ==>'+ e.getLineNumber());
            System.debug('Message ===>'+ e.getMessage() + ' <==>'+ e.getStackTraceString());
            return null;
        }
    }
}