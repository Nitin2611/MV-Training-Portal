public class ContactTriggerHandler {

    List<Contact> recordNewList = new List<Contact>();
    List<Contact> recordOldList = new List<Contact>();
    Map<Id, Contact> recordNewMap = new Map<Id, Contact>();
    Map<Id, Contact> recordOldMap = new Map<Id, Contact>();
    Boolean isInsert, isUpdate, isDelete, isUndelete = false;
    
    public ContactTriggerHandler(List<Contact> newList, List<Contact> oldList, Map<Id, Contact> newMap, Map<Id, Contact> oldMap, boolean isInsert, boolean isUpdate, Boolean isDelete, Boolean isUndelete) {
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
        commonmethod();
    }
    
    public void AfterUpdateEvent(){
     //   commonmethod();
    }
    
    public void AfterDeleteEvent(){
    }
    
    public void AfterUndeleteEvent(){
    }

    public void AfterInsertChatterPost(){
    }
    
    public void commonmethod(){
        List<Course_Journey__c> courseJList = new List<Course_Journey__c>();
        for(Contact c: this.recordNewList){
            if(c.IsTrainee__c){

                List<Task__c> taskList = [SELECT Id, Name, Task__c, Type__c, Course__c, Start_Time__c, End_Time__c, Approved__c, Current__c, Approved_By__c, Description__c FROM Task__c WHERE Course__c != null];
                for(Task__c t: taskList){
                    Course_Journey__c cj = new Course_Journey__c();
                    cj.Contact__c = c.Id;
                    cj.Task__c = t.Id;
                    cj.Course__c = t.Course__c;
                    cj.Name = c.Name+' '+t.Name;
                    courseJList.add(cj);
                }
            }
        }
        insert courseJList;
    }
}