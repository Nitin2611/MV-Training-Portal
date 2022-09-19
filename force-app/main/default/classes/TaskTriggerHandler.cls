public class TaskTriggerHandler {

    List<Task__c> recordNewList = new List<Task__c>();
    List<Task__c> recordOldList = new List<Task__c>();
    Map<Id, Task__c> recordNewMap = new Map<Id, Task__c>();
    Map<Id, Task__c> recordOldMap = new Map<Id, Task__c>();
    Boolean isInsert, isUpdate, isDelete, isUndelete = false;
    
    public TaskTriggerHandler(List<Task__c> newList, List<Task__c> oldList, Map<Id, Task__c> newMap, Map<Id, Task__c> oldMap, boolean isInsert, boolean isUpdate, Boolean isDelete, Boolean isUndelete) {
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