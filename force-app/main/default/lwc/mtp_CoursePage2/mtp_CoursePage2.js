import { LightningElement, track, wire } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import mtb_Login_Images from '@salesforce/resourceUrl/mtb_Login_Images';
import mtp_CourcePage2_Css from '@salesforce/resourceUrl/mtp_CourcePage2_Css';
/* Developer Name: Sakina
   Created Date  : 5th September
   Desciption    : Call apex class
*/
// import getModuleData from '@salesforce/apex/mtp_CoursePage2Controller.getModuleData';
import { NavigationMixin } from 'lightning/navigation';
import { CurrentPageReference } from 'lightning/navigation';
import getsubcourse from '@salesforce/apex/CourseController.getsubcourse';

export default class Mtp_CoursePage2 extends NavigationMixin(LightningElement) {

    // Mod_1 = mtb_Login_Images + '/Mod_1.png';
    // Mod_2 = mtb_Login_Images + '/Mod_2.png';
    // Mod_3 = mtb_Login_Images + '/Mod_3.png';
    // Mod_4 = mtb_Login_Images + '/Mod_4.png';
    // Mod_5 = mtb_Login_Images + '/Mod_5.png';
    // Mod_6 = mtb_Login_Images + '/Mod_6.png';
    // image_72 = mtb_Login_Images + '/image_72.png';
    // image_73 = mtb_Login_Images + '/image_73.png';

    /* Created Date:- 6th September 2022
       Developer Name : Sakina
    */
    @track moduleName;
    @track moduleDescription;
    @track modules = [];
    @track moduleImages = [];
    @track error;
    @track recordId;

    @track arr3 = [];
    @track courseId;
    @track moduleDivId;
    // @track isCompleted;

    @track isSpinner = false;

    @track courseid;
    @track subcourse = [];

    // 
    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        if (currentPageReference) {
            var urlStateParameters = currentPageReference.state;
            this.courseid = urlStateParameters.recordId;
            console.log('this.courseid-->', this.courseid);
        }
    }

    // @wire(getsubcourse, { courseid: this.courseid })
    // wiredgetsubcourse({ error, data }) {
    //     console.log({ data });
    //     if (data) {
    //         this.subcourse = data;
    //         console.log('this.subcourse-->',this.subcourse);
    //     } else if (error) {
    //         console.log({error});
    //     }
    // }

    connectedCallback() {
        this.isSpinner = true;
        this.moduleImages.push(
            mtb_Login_Images + '/Mod_1.png',
            mtb_Login_Images + '/Mod_2.png',
            mtb_Login_Images + '/Mod_3.png',
            mtb_Login_Images + '/Mod_4.png',
            mtb_Login_Images + '/Mod_5.png',
            mtb_Login_Images + '/Mod_6.png',
        );

        setTimeout(() => {
            if (this.courseid != undefined || this.courseid != '')
                getsubcourse({ courseid: this.courseid })
                .then(result => {
                    console.log({ result });
                    this.subcourse = result;


                    let j = 0;
                    for (var i = 0; i < this.subcourse.length; i++) {
                        this.subcourse[i]['image'] = this.moduleImages[j];
                        j++;
                        if (j == this.moduleImages.length)
                            j = 0;
                    }
                })
                .catch(error => {
                    console.log({ error });
                });
            this.isSpinner = false;
        }, 1000);
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


        let moduleContainer = this.template.querySelector('.moduleContainer');
        let numberOfChild = moduleContainer.children.length;
        this.modules.forEach(item => {
            if (item.Completed__c == false) {
                if (numberOfChild > 0) {
                    moduleContainer.firstElementChild.style.opacity = 1;
                    this.moduleDivId = moduleContainer.firstElementChild.id;

                }

            }

        })

        // console.log(Object.isExtensible(this.subcourse));
        // // expected output: true
        // Object.preventExtensions(this.subcourse);
        // console.log(Object.isExtensible(this.subcourse));
        // // expected output: false
        // for (var i = 0; i < this.subcourse.length; i++) {
        //     for (let j = 0; j < this.moduleImages.length; j++) {
        //         this.subcourse[i]['image'] = this.moduleImages[i]; //use the color for the current row
        //     }
        // }
        // console.log('subcourse-->', this.subcourse);

    }

    // Get Background Image
    get backgroundImage() {
        return `background-image:url(${mtb_Login_Images + '/course_image.png'})`;
    }


    /***************************************************
           * Author             : Sakina
           * Created Date       : 6/09/2022
           * Last Modified Date : 6/09/2022
           * Description        : get Module Object Name and Description 
                                  from apex for display on site
           ***************************************************/
    // connectedCallback() {
    //     const queryString = window.location.search;
    //     this.courseId = (queryString.substring(queryString.length, queryString.indexOf("=") + 1));
    //     console.log(this.courseId);

    //     console.log({ queryString });
    //     getModuleData({ courseId: this.courseId })
    //         .then(result => {
    //             this.modules = result;

    //             console.log({ result });

    //             this.moduleImages.push(
    //                 mtb_Login_Images + '/Mod_1.png',
    //                 mtb_Login_Images + '/Mod_2.png',
    //                 mtb_Login_Images + '/Mod_3.png',
    //                 mtb_Login_Images + '/Mod_4.png',
    //                 mtb_Login_Images + '/Mod_5.png',
    //                 mtb_Login_Images + '/Mod_6.png',
    //             );


    //             // for (let i = 0; i < this.modules.length; i++) {
    //             //     for (let j = 0; j < this.moduleImages.length; j++) {
    //             //         console.log(this.moduleImages[i] + '--------' + i);
    //             //         console.log(this.moduleImages[j] + '+++++++++++++' + j);
    //             //         this.modules[i]['image'] = this.moduleImages[j];
    //             //     }

    //             // }

    //             // var colorIndex = 0;
    //             for (var i = 0; i < this.modules.length; i++) {
    //                 for (let j = 0; j < this.moduleImages.length; j++) {
    //                     this.modules[i]['image'] = this.moduleImages[i]; //use the color for the current row
    //                     console.log(j + '----');
    //                 }
    //                 console.log(i);
    //                 console.log(this.modules.indexOf(this.modules[i]) != this.moduleImages.indexOf(this.moduleImages[i]));
    //                 console.log(this.modules.indexOf(this.modules[i]));

    //                 console.log(this.moduleImages.indexOf(this.moduleImages[i]));
    //                 if (this.modules.indexOf(this.modules[i]) != this.moduleImages.indexOf(this.moduleImages[i])) {
    //                     j = 0;
    //                     console.log('j is' + j);

    //                 }
    //                 // if(this.modules.length - 1 !== this.moduleImages.indexOf(this.moduleImages[i]) {

    //                 // }
    //             }
    //             console.log(this.modules);


    //             // this.modules.forEach(item => {
    //             //     console.log(item);
    //             //     this.moduleImages.forEach(elem => {
    //             //             console.log(elem + '----' + item);

    //             //         })
    //             // });
    //         })
    //         .catch(error => {
    //             this.error = error;
    //             console.log(this.error);
    //         });
    // }




    /***************************************************
     * Author             : Sakina
     * Created Date       : 7/09/2022
     * Last Modified Date : 7/09/2022
     * Description        : Navigate to task page .
     ***************************************************/

    handleTaskPageNavigation(event) {

        let courseid = event.target.dataset.id;
        console.log({ courseid })
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Task__c'
            },
            state: {
                recordId: courseid
            }
        });
    }


}