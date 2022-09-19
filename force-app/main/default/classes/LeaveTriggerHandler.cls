public class LeaveTriggerHandler {

    List<Leave__c> recordNewList = new List<Leave__c>();
    List<Leave__c> recordOldList = new List<Leave__c>();
    Map<Id, Leave__c> recordNewMap = new Map<Id, Leave__c>();
    Map<Id, Leave__c> recordOldMap = new Map<Id, Leave__c>();
    Boolean isInsert, isUpdate, isDelete, isUndelete = false;
    
    public LeaveTriggerHandler(List<Leave__c> newList, List<Leave__c> oldList, Map<Id, Leave__c> newMap, Map<Id, Leave__c> oldMap, boolean isInsert, boolean isUpdate, Boolean isDelete, Boolean isUndelete) {
        this.recordNewList = newList;
        this.recordOldList = oldList;
        this.recordNewMap = newMap;
        this.recordOldMap = oldMap;
        this.isInsert = isInsert;
        this.isUpdate = isUpdate;
        this.isDelete = isDelete;
        this.isUndelete = isUndelete;
    }
    
    
     public void BeforeInsertEvent(){
    }
    
    public void BeforeUpdateEvent(){
    }
    
    public void BeforeDeleteEvent(){
    }
    
    public void AfterInsertEvent(){
    }
    
    public void AfterUpdateEvent(){
        sendemail();
    }
    
    public void AfterDeleteEvent(){
    }
    
    public void AfterUndeleteEvent(){
    }

    public void AfterInsertChatterPost(){
    }
    
    public void sendemail(){
        for(Leave__c l: this.recordOldList){
            if(l.Status__c == 'Approved' || l.Status__c == 'Rejected'){
                Contact con = [SELECT Id, Name, Email FROM Contact WHERE Id =: l.Contact_Trainee__c];
                String sub = 'Leave '+l.Status__c;
                String bodymail = 'Hi '+con.Name+ ',';
                bodymail += '<br/><br/>I hope you are doing well!';
                bodymail += 'I have received your request for leave from'+l.Start_Date__c+ ' to ' +l.End_Date__c+'. This notification serves as confirmation that your request for leave has been '+l.Status__c;
                bodymail += '<br/><br/><b>P.S:</b> The leaves that you take will extend your training period.';
                bodymail += '<br/><br/>Have a great day ahead!';
                bodymail += '<br/><br/>Regards,';
                bodymail += '<br/>Mv Team';
                
                String Emailval = con.Email +', hr@mvclouds.com, dharmik@mvclouds.com';
                sendGmail(sub, bodymail, Emailval);
            }
        }
    }
    
    @future (callout=true) 
    public static void sendGmail(String subjectMail,String bodyGmail,String sendTo){ 
        String errorMessage =''; 
        string before = 'From: MV Team <MVTeam@mvclouds.com>\n'+ 
        'To: '+sendTo+'\n'+ 
        'Subject: '+subjectMail+'\n' + 
        'Content-Type: text/html \n\n'+bodyGmail; 
        
        System.debug(before); 
        Blob beforeblob = Blob.valueOf(before); 
        
        string paramvalue = EncodingUtil.base64Encode(beforeblob); 
        paramvalue = paramvalue.replace('+', '-'); 
        paramvalue = paramvalue.replace('/', '_'); 
        System.debug(paramvalue); 
        
        Http httpMail = new Http(); 
        HttpRequest httpReqMail = new HttpRequest(); 
        HttpResponse httpResMail = new HttpResponse(); 
        httpReqMail.setEndpoint('callout:Gmail/gmail/v1/users/me/messages/send');

        httpReqMail.setMethod('POST'); 
        httpReqMail.setHeader('Content-Type', 'application/json'); 
        httpReqMail.setHeader('Content-Length', '-1'); 
        String refreshToknBody = '{"userId":"me","raw":"'+paramvalue+'"}'; 
        system.debug(refreshToknBody); 
        httpReqMail.setBody(refreshToknBody); 
        try{ 
            httpResMail = httpMail.send(httpReqMail); 
            if(httpResMail.getStatusCode() == 200){ 
                System.debug(httpResMail.getBody()); 
            }else{ 
                String errorMessageMail = 'Unexpected Error while communicating with Google Calendar API. ' +'Status '+httpResMail.getBody()+' and Status Code '+httpResMail.getStatuscode(); 
                System.debug('Error ' + errorMessageMail); 
                System.debug(httpResMail); 
            } 
        }catch(System.Exception e){ 
            System.debug('#### Exception Executed '+e.getStackTraceString() + ' '+e.getMessage()); 
        } 
    }
    
}