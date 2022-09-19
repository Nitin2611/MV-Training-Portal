public without sharing class CourseController {


    // For Course
    @AuraEnabled(cacheable=true)
    public static List<Course__C> getcourse(){
        try {
            // List<Course__C> course = [SELECT Id,Course__c,Name,Completed__c  , Course_Index__c FROM Course__c];
            //List<mtp_Module__c> module = [SELECT Id,Completed__c FROM mtp_Module__c];

            list<Course__c> courselst = [SELECT Id, Name, Course__c, Course_Lookup__c, Type__c, Completed__c, Course_Index__c, Status__c FROM Course__c WHERE Course_Lookup__c = null AND Type__c = 'Course'];
            return courselst;
        } catch (Exception e) {
            System.debug(e.getMessage());
            return null;
        }
    }

    // For SubCourse
    @AuraEnabled
    public static List<AggregateResult> getsubcourse(String courseid){
        try {
            list<Course__c> courselst = [SELECT Id, Name, Course__c, Course_Lookup__c, Type__c FROM Course__c WHERE Course_Lookup__c =: courseid];
            Set<Id> courseIds = new Set<Id>();
            for(Course__c c: courselst){
              courseIds.add(c.Id);
            }
            List<AggregateResult> cjlst = new List<AggregateResult>();
            cjlst = [SELECT COUNT(Id), Course__r.Course__c s,Course__c g FROM Course_Journey__c  WHERE Course__c =: courseIds GROUP BY Course__r.Course__c,Course__c];
            return cjlst;
        } catch (Exception e) {
            System.debug(e.getMessage());
            return null;
        }
    }


    // For Task and Sub Task
    @AuraEnabled
    public static List<Course_Journey__c> gettask(String courseid, String tasktype){
        try {

          User usr = [SELECT Id, ContactId, Contact.Name FROM User WHERE Id =: UserInfo.getUserId()];

            // list<Task__c> tasklst = [SELECT Id, Name, Task__c, Type__c, Description__c, Course__c, Start_Time__c, End_Time__c, Approved__c, Current__c, Approved_By__c FROM Task__c WHERE Course__c =: courseid AND Type__c =: tasktype];
            // return tasklst;

            List<Course_Journey__c> cjlist = new List<Course_Journey__c>();
            cjlist = [SELECT Id, Name, Contact__c, Course__c, Task__c, Status__c, CreatedDate,Task__r.Name,Task__r.Description__c,Task__r.Start_Time__c,Task__r.End_Time__c FROM Course_Journey__c WHERE Course__c =: courseid AND Task__r.Type__c =: tasktype AND Contact__c =: usr.ContactId];
            return cjlist;
        } catch (Exception e) {
            System.debug(e.getMessage());
            return null;
        }
    }

    // For creating Course Journey Objec record
    @AuraEnabled
    public static string createCourseJourney(String tId){
      try {
        User usr = [SELECT Id, ContactId, Contact.Name FROM User WHERE Id =: UserInfo.getUserId()];
        List<Course_Journey__c> checklist = [SELECT Id, Name, Contact__c, Task__c FROM Course_Journey__c WHERE Task__c =: tId AND Contact__c =: usr.ContactId];
        if(checklist.size() == 0){
          Task__c taskRef = [Select Id, Name, Course__c FROM Task__c WHERE Id =: tId];
          
          Course_Journey__c cj = new Course_Journey__c(Name = usr.Contact.Name + ' - ' + taskRef.Name ,Contact__c = usr.ContactId, Course__c = taskRef.Course__c, Task__c = taskRef.Id, Status__c = 'In Progress');
          insert cj;
          return 'success';
        }else{
          return 'existing';
        }
      } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
      }
    }

    // For updating Course Journey Objec record
    @AuraEnabled
    public static string updateCourseJourney(String tId){
      try {
        User usr = [SELECT Id, ContactId, Contact.Name FROM User WHERE Id =: UserInfo.getUserId()];
        List<Course_Journey__c> checklist = [SELECT Id, Name, Contact__c, Task__c, Status__c FROM Course_Journey__c WHERE Task__c =: tId AND Contact__c =: usr.ContactId];
        if(checklist.size() > 0 && checklist[0].Status__c == 'In Progress'){
            checklist[0].Status__c = 'Completed';
            update checklist[0];
        }

        // To check if all task completed in the Sub Course ****START****
        Task__c tsk = [SELECT Id, Name, Course__c FROM Task__c WHERE Id =: tId];
        List<Task__c> tasklist = new List<Task__c>();
        tasklist = [SELECT Id, Name, Course__c FROM Task__c WHERE Course__c =: tsk.Course__c];
        boolean checktask = false;
        for(Course_Journey__c cj : [SELECT Id, Name, Contact__c, Task__c, Status__c FROM Course_Journey__c WHERE Task__c IN: tasklist AND Contact__c =: usr.ContactId]){
          if(cj.Status__c == 'In Progress' && !String.isBlank(cj.Status__c)){
            checktask = true;
          }
        }
        if(!checktask){
          Course__c cou = new Course__c(Id = tsk.Course__c);
          cou.Status__c = 'Completed';
          update cou;
        }
        //****END****

        // To check if all Sub Courses are completed in the Course
        Course__c courseObj = [SELECT Id, Name, Completed__c, Course_Index__c, Course__c, Course_Lookup__c, Status__c FROM Course__c WHERE Id =: tsk.Course__c];
        List<Course__c> courseList = new List<Course__c>();
        boolean checkCourse = false;
        for(Course__c cour : [SELECT Id, Name, Completed__c, Course_Index__c, Course__c, Course_Lookup__c, Type__c, Status__c FROM Course__c WHERE Course_Lookup__c =: courseObj.Course_Lookup__c]) {
          if(cour.Status__c == 'In Progress' && !String.isBlank(cour.Status__c)){
            checkCourse = true;
          }
        }
        if(!checkCourse) {
          Course__c cou = new Course__c(Id = courseObj.Course_Lookup__c);
          cou.Status__c = 'Completed';
          update cou;
        }
        return 'success';

      } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
      }
    }
}