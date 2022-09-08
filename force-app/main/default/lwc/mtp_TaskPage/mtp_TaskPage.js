import { LightningElement, track, wire } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import mtb_Login_Images from '@salesforce/resourceUrl/mtb_Login_Images';
import mtp_CourcePage2_Css from '@salesforce/resourceUrl/mtp_CourcePage2_Css';
import getModuleTasks from '@salesforce/apex/mtp_CoursePage2Controller.getModuleTasks';
import saveRecords from '@salesforce/apex/mtp_CoursePage2Controller.saveRecords';

//1. Import reference to the Object and fields
import taskObject from "@salesforce/schema/mtp_Task__c";
//2. Import the named import updateRecord
import { updateRecord } from "lightning/uiRecordApi";



export default class Mtp_TaskPage extends LightningElement {
    @track isShowModal = false;
    @track taskName;
    @track taskDescription;
    @track taskId;
    @track moduleId;
    @track taskList = [];
    @track activeTab;

    /***************************************************
     * Author             : Sakina
     * Created Date       : 07/09/2022
     * Last Modified Date : 07/09/2022
     * Description        : 
     ***************************************************/
    connectedCallback() {

        const queryString = window.location.search;
        this.moduleId = (queryString.substring(queryString.length, queryString.indexOf("=") + 1));
        getModuleTasks({ getModuleId: this.moduleId })
            .then(result => {
                console.log({ result });
                this.taskList = result;
            })
            .catch(error => {
                this.error = error;
                console.log(this.error);
            });



    }
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
                this.isShowModal = true;
                this.taskName = event.target.name;
                var description = event.target.value;
                description = description.replaceAll(/(<([^>]+)>)/ig, '');
                this.taskDescription = description;
                this.taskId = event.target.id;
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
            this.isShowModal = false;
            console.log(event.target.id);
            let taskObj = { 'sobjectType': 'mtp_Task__c' };
            taskObj.Id = event.target.id.substring(0, 18);
            saveRecords({ task: taskObj })
                .then(result => {
                    console.log({ result });
                    eval("$A.get('e.force:refreshView').fire();");
                })
                .catch(error => {
                    this.error = error;
                    console.log(this.error);
                });


        } catch (e) {
            console.log(e);

        }
    }


}