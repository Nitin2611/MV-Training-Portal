import { LightningElement, track, wire } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';

import { CurrentPageReference } from 'lightning/navigation';

import mtb_Login_Images from '@salesforce/resourceUrl/mtb_Login_Images';
import mtp_CourcePage2_Css from '@salesforce/resourceUrl/mtp_CourcePage2_Css';
// import getModuleTasks from '@salesforce/apex/mtp_CoursePage2Controller.getModuleTasks';
// import saveRecords from '@salesforce/apex/mtp_CoursePage2Controller.saveRecords';

import gettask from '@salesforce/apex/CourseController.gettask';
import createCourseJourney from '@salesforce/apex/CourseController.createCourseJourney';
import updateCourseJourney from '@salesforce/apex/CourseController.updateCourseJourney';

//1. Import reference to the Object and fields
import taskObject from "@salesforce/schema/mtp_Task__c";
//2. Import the named import updateRecord
import { updateRecord } from "lightning/uiRecordApi";
import EndDate from '@salesforce/schema/Contract.EndDate';



export default class Mtp_TaskPage extends LightningElement {
    @track isShowModal = false;
    @track taskName;
    @track taskDescription;
    @track taskId;
    @track moduleId;
    @track taskList = [];
    @track activeTab;
    @track courseid;
    @track taskImages = [];

    @track isSpinner = false;

    @track isStart = false;
    @track isEnd = false;
    @track isCompleted = false;


    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        if (currentPageReference) {
            var urlStateParameters = currentPageReference.state;
            this.courseid = urlStateParameters.recordId;
            console.log('this.courseid-->', this.courseid);
        }
    }

    connectedCallback() {
        this.isSpinner = true;
        this.taskImages.push(
            mtb_Login_Images + '/Mod_1.png',
            mtb_Login_Images + '/Mod_2.png',
            mtb_Login_Images + '/Mod_3.png',
            mtb_Login_Images + '/Mod_4.png',
            mtb_Login_Images + '/Mod_5.png',
            mtb_Login_Images + '/Mod_6.png',
        );
        setTimeout(() => {
            gettask({ courseid: this.courseid, tasktype: 'Task' })
                .then(result => {
                    console.log({ result });
                    this.taskList = result;

                    let j = 0;

                    for (var i = 0; i < this.taskList.length; i++) {
                        this.taskList[i]['image'] = this.taskImages[j];
                        this.taskList[i]['start'] = this.taskList[i].Status__c == 'To-Do' ? true : false;
                        this.taskList[i]['inprogress'] = this.taskList[i].Status__c == 'In Progress' ? true : false;
                        this.taskList[i]['pa'] = this.taskList[i].Status__c == 'Pending for Approval' ? true : false;
                        this.taskList[i]['completed'] = this.taskList[i].Status__c == 'Approved' ? true : false;

                        this.taskList[i]['image']

                        j++;
                        if (j == this.taskImages.length)
                            j = 0;
                    }
                    console.log('tasklist',this.taskList);

                })
                .catch(error => {
                    console.log({ error });
                })
            this.isSpinner = false;
        }, 1000);
    }





    /***************************************************
     * Author             : Sakina
     * Created Date       : 07/09/2022
     * Last Modified Date : 07/09/2022
     * Description        : 
     ***************************************************/
    // connectedCallback() {

    //     const queryString = window.location.search;
    //     this.moduleId = (queryString.substring(queryString.length, queryString.indexOf("=") + 1));
    //     getModuleTasks({ getModuleId: this.moduleId })
    //         .then(result => {
    //             console.log({ result });
    //             this.taskList = result;
    //         })
    //         .catch(error => {
    //             this.error = error;
    //             console.log(this.error);
    //         });



    // }
    renderedCallback() {
        Promise.all([
                loadStyle(this, mtp_CourcePage2_Css)
            ]).then(() => {
                console.log('Css loaded');
            })
            .catch(error => {
                console.log({ error });
            });
    }

    // Get Background Image
    get backgroundImage() {
        return `background-image:url(${mtb_Login_Images + '/course_image.png'})`;
    }

    /***************************************************
     * Author             : Sakina
     * Created Date       : 8/09/2022
     * Last Modified Date : 8/09/2022
     * Description        : show modal on click of start button
     ***************************************************/
    showModalBox(event) {
            try {

                console.log('start',event.currentTarget.dataset.start);
                console.log('inpro',event.currentTarget.dataset.inpro);
                console.log('como',event.currentTarget.dataset.completed);
                this.isStart = event.currentTarget.dataset.start;
                this.isEnd = event.currentTarget.dataset.inpro;
                this.isCompleted = event.currentTarget.dataset.completed;

                this.isSpinner = true;
                // this.isShowModal = true;
                this.taskName = event.target.name;
                var description = event.target.value;
                description = description.replaceAll(/(<([^>]+)>)/ig, '');
                this.taskDescription = description;
                this.taskId = event.target.id;
                let td = event.target.id.substring(0, 18);
                console.log('this.td ---- ' + td);
                // createCourseJourney({ tId: td })
                //     .then(result => {
                    //         console.log({ result });
                    //         // eval("$A.get('e.force:refreshView').fire();");
                    //     })
                    //     .catch(error => {
                        //         this.error = error;
                        //         console.log(this.error);
                        //     });
                        setTimeout(() => {
                            this.isShowModal = true;
                        }, 1000);
                this.isSpinner = false;

                console.log('this.IsStart--',this.isStart);
                console.log('this.IsEnd--',this.isEnd);
                console.log('this.IsCompleted--',this.isCompleted);
                
            } catch (e) {
                console.log({ e });
            }
        }
        /***************************************************
         * Author             : Sakina
         * Created Date       : 8/09/2022
         * Last Modified Date : 8/09/2022
         * Description        : hide  modal on click of close button
         ***************************************************/
    hideModalBox() {
        this.isShowModal = false;
    }

    /***************************************************
     * Author             : Sakina
     * Created Date       : 8/09/2022
     * Last Modified Date : 8/09/2022
     * Description        : Add task to completed tab after click on ebd button
     ***************************************************/
    redirectToCompleted(event) {
        try {
            this.isSpinner = true;
            this.isShowModal = false;
            console.log(event.target.id);
            // let taskObj = { 'sobjectType': 'mtp_Task__c' };
            // taskObj.Id = event.target.id.substring(0, 18);
            // saveRecords({ task: taskObj })
            //     .then(result => {
            //         console.log({ result });
            //         eval("$A.get('e.force:refreshView').fire();");
            //     })
            //     .catch(error => {
            //         this.error = error;
            //         console.log(this.error);
            //     });
            let td = event.target.id.substring(0, 18);
            updateCourseJourney({ tId: td })
                .then(result => {
                    console.log({ result });
                    // eval("$A.get('e.force:refreshView').fire();");
                })
                .catch(error => {
                    this.error = error;
                    console.log(this.error);
                });
            this.isSpinner = false;

        } catch (e) {
            console.log(e);

        }
    }


}