public class CourseJourneyTriggerHandler {
    List<Course_Journey__c> recordNewList = new List<Course_Journey__c>();
    List<Course_Journey__c> recordOldList = new List<Course_Journey__c>();
    Map<Id, Course_Journey__c> recordNewMap = new Map<Id, Course_Journey__c>();
    Map<Id, Course_Journey__c> recordOldMap = new Map<Id, Course_Journey__c>();
    Boolean isInsert, isUpdate, isDelete, isUndelete = false;
    
    public CourseJourneyTriggerHandler(List<Course_Journey__c> newList, List<Course_Journey__c> oldList, Map<Id, Course_Journey__c> newMap, Map<Id, Course_Journey__c> oldMap, boolean isInsert, boolean isUpdate, Boolean isDelete, Boolean isUndelete) {
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
    }
    
    public void AfterDeleteEvent(){
    }
    
    public void AfterUndeleteEvent(){
    }

    public void AfterInsertChatterPost(){
    }
    
}