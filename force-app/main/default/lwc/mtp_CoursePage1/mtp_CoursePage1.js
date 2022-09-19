import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import jQuery from '@salesforce/resourceUrl/jQuery';
import rwdImageMapJs from '@salesforce/resourceUrl/rwdImageMapJs';
import rwdImageMapMinjs from '@salesforce/resourceUrl/rwdImageMapMinjs';
import mtpCoursePage1Img1 from '@salesforce/resourceUrl/mtp_CoursePage1_Img1';
import mtpCoursePage1Img2 from '@salesforce/resourceUrl/mtp_CoursePage1_Img2';
import mtpCoursePage1Img3 from '@salesforce/resourceUrl/mtp_CoursePage1_Img3';
import mtpCoursePage1Img4 from '@salesforce/resourceUrl/mtp_CoursePage1_Img4';
import mtpCoursePage1Img5 from '@salesforce/resourceUrl/mtp_CoursePage1_Img5';
import mtpCoursePage1bg from '@salesforce/resourceUrl/mtp_CoursePage1_bg';
import getcourse from '@salesforce/apex/CourseController.getcourse';



export default class Mtp_CoursePage1 extends NavigationMixin(LightningElement) {

    @track course;
    @track trackCourse = false;
    @track isSpinner = false;

    renderedCallback() {
        Promise.all([
                loadScript(this, jQuery),
                loadScript(this, rwdImageMapJs),
                loadScript(this, rwdImageMapMinjs),
            ])
            .then(() => {
                console.log('JQuery loaded.');
            })
            .catch(error => {
                console.log('Failed to load the JQuery : ' + error);
            });
    }

    @wire(getcourse)
    wiredgetcourse({ error, data }) {
        console.log({ data });
        this.isSpinner = true;
        if (data) {
            this.course = data;
            console.log('this.course-->',this.course);
            this.isSpinner = false;
        } else if (error) {
            console.log({error});
        }
    }


    imageareaclicked(event) {
        try {
            this.isSpinner = true;
            var titleval = event.target.title;
            console.log({titleval});
            var recordId = '';
            for(var key in this.course){

                if(titleval == this.course[key].Course__c /*&& this.course[key].Status__c == 'In Progress'*/) {
                    recordId = this.course[key].Id;
                } 
                // else if(titleval == this.course[key].Course__c && this.course[key].Status__c == 'To Do') {
                //     this.template.querySelector('c-mtp_-toast-message').showToast('error', 'Please completed Previous Course', 3000);   
                // } else if(titleval == this.course[key].Course__c && this.course[key].Status__c == 'Completed') {
                //     this.template.querySelector('c-mtp_-toast-message').showToast('error', 'You have already Completed this Course', 3000);
                // }
                // if(key == this.course[key].Course_Index__c && this.course[key].Completed__c){
                //     console.log('Key');
                //     this.template.querySelector('c-mtp_-toast-message').showToast('error', '', 3000);
                // } else {
                //     if(titleval == this.course[key].Course__c && !this.course[key].Completed__c){
                //         console.log('IFFF');
                //         recordId = this.course[key].Id;
                //     } else if(titleval == this.course[key].Course__c && this.course[key].Completed__c){
                //         this.template.querySelector('c-mtp_-toast-message').showToast('error', 'Please completed Previous Course', 3000);
                //     }
                // }




            }
            console.log({recordId});
            if(recordId != '')
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: 'Course2__c'
                },
                state: {
                    recordId: recordId
                }
            });
            this.isSpinner = false;
        } catch (e) {
            console.log({ e });
        }
    }

    // connectedCallback() {
    //     getcourse()
    //         .then(result => {
    //             console.log(result);
    //             this.course = result;
    //             console.log(result[0].Id);
    //             // this.courseId= result.Id;
    //             // this.corseIndex = Course_Index__c
    //         })
    //         .catch(error => {
    //             console.log('error');
    //             console.log({ error });
    //         });
    // }


    cpImg1 = mtpCoursePage1Img1; //Image beside professional couse text
    cpImg2 = mtpCoursePage1Img2; //Cat Image
    cpImg3 = mtpCoursePage1Img3; //Image beside cat
    cpImg4 = mtpCoursePage1Img4; //Small airplane image
    cpImg5 = mtpCoursePage1Img5; //Map Image
    cpbgImg = mtpCoursePage1bg; //Background Image

    // level1method(event) {
    //     var urlValue = '/s/course/course2?id=a02N000000N3dwOIAR';
    //     var pageapiname = 'Course2__c';
    //     // console.log(urlValue);
    //     // this[NavigationMixin.Navigate]({
    //     //     type: 'comm__namedPage',
    //     //     attributes: {
    //     //         name: pageapiname,
    //     //         url: urlValue
    //     //     },
    //     // });
    //     var alter = event.target.alt;
    //     console.log(alter);
    //     console.log('test end');
    // }

    // level2method() {
    //     alert('click l 2');
    //     this.course.forEach(element => {
    //         if (element.Course_Index__c == area.alt && result == 'html' && element.Completed__c == false) {
    //             console.log(element.Id);
    //             var urlValue = '/s/course/course2?id=' + element.Id;
    //             console.log(urlValue);
    //             var pageapiname = 'Course2__c';
    //             this[NavigationMixin.Navigate]({
    //                 type: 'comm__namedPage',
    //                 attributes: {
    //                     name: 'Course2__c'
    //                 },
    //                 state: {
    //                     recordId: element.Id
    //                 }
    //             });

    //         } 
    //     });

    //     // alert('click on level 2');
    // }

    // level3method(event) {
    //     console.log({ event });
    //     // alert('click on level 3');
    // }

    // level4method(event) {
    //     console.log({ event });
    //     // alert('click on level 4');
    // }

    // level5method(event) {
    //     console.log({ event });
    //     // alert('click on level 5');
    // }

    // level6method(event) {
    //     console.log({ event });
    //     // alert('click on level 6');
    // }

    // callAction(area) {
    //     try {
    //         let text = area.title;
    //         let result = text.toLowerCase();
    //         this.course.forEach(element => {


    //             console.log(element.Id);
    //             var urlValue = '/s/course/course2?id=' + element.Id;
    //             console.log(urlValue);
    //             var pageapiname = 'Course2__c';
    //             // this[NavigationMixin.Navigate]({
    //             //     type: 'comm__namedPage',
    //             //     attributes: {
    //             //         name: pageapiname,
    //             //         url: urlValue,
    //             //     },
    //             // });
    //             this[NavigationMixin.Navigate]({
    //                 type: 'comm__namedPage',
    //                 attributes: {
    //                     name: 'Course2__c'
    //                 },
    //                 state: {
    //                     recordId: element.Id
    //                 }
    //             });

    //         });
    //         // for (var i = 0; i < this.course.length; i++) {
    //         //     if (this.course[0].Completed__c == false) {
    //         //         var urlValue = '/s/course/course2?id=' + this.course[0].Id;
    //         //         console.log(urlValue);
    //         //         var pageapiname = 'Course2__c';
    //         //         this[NavigationMixin.Navigate]({
    //         //             type: 'comm__namedPage',
    //         //             attributes: {
    //         //                 name: 'Course2__c'
    //         //             },
    //         //             state: {
    //         //                 recordId: this.course[0].Id
    //         //             }
    //         //         });
    //         //         break;
    //         //     }
    //         //     // if (i == 1) {
    //         //     //     console.log(this.course[i].Completed__c + '----' + this.course[i - 1].Completed__c);
    //         //     //     if (this.course[i].Completed__c == false && this.course[i - 1].Completed__c == true) {
    //         //     //         var urlValue = '/s/course/course2?id=' + this.course[i].Id;
    //         //     //         var pageapiname = 'Course2__c';
    //         //     //         this[NavigationMixin.Navigate]({
    //         //     //             type: 'comm__namedPage',
    //         //     //             attributes: {
    //         //     //                 name: 'Course2__c'
    //         //     //             },
    //         //     //             state: {
    //         //     //                 recordId: this.course[i].Id
    //         //     //             }
    //         //     //         });
    //         //     //         break;

    //         //     //     } else if (this.course[i].Completed__c == true) {

    //         //     //         var urlValue = '/s/course/course2?id=' + this.course[i].Id;
    //         //     //         console.log(urlValue);
    //         //     //         var pageapiname = 'Course2__c';
    //         //     //         this[NavigationMixin.Navigate]({
    //         //     //             type: 'comm__namedPage',
    //         //     //             attributes: {
    //         //     //                 name: 'Course2__c'
    //         //     //             },
    //         //     //             state: {
    //         //     //                 recordId: this.course[i].Id
    //         //     //             }
    //         //     //         });
    //         //     //         break;

    //         //     //     } else if (this.course[i].Completed__c == false && this.course[i - 1].Completed__c == false) {
    //         //     //         alert('please unclock previous course');
    //         //     //         break;
    //         //     //     }
    //         //     // }

    //         //     // if (result == 'html' && this.course[0].Completed__c == false) {
    //         //     //     console.log('llll1');
    //         //     //     var urlValue = '/s/course/course2?id=' + this.course[0].Id;
    //         //     //     console.log(urlValue);
    //         //     //     var pageapiname = 'Course2__c';
    //         //     //     this[NavigationMixin.Navigate]({
    //         //     //         type: 'comm__namedPage',
    //         //     //         attributes: {
    //         //     //             name: 'Course2__c'
    //         //     //         },
    //         //     //         state: {
    //         //     //             recordId: this.course[0].Id
    //         //     //         }
    //         //     //     });
    //         //     //     break;


    //         //     // } else if (result == 'html' && this.course[0].Completed__c == true) {
    //         //     //     var urlValue = '/s/course/course2?id=' + this.course[0].Id;
    //         //     //     console.log(urlValue);
    //         //     //     var pageapiname = 'Course2__c';
    //         //     //     this[NavigationMixin.Navigate]({
    //         //     //         type: 'comm__namedPage',
    //         //     //         attributes: {
    //         //     //             name: 'Course2__c'
    //         //     //         },
    //         //     //         state: {
    //         //     //             recordId: this.course[0].Id
    //         //     //         }
    //         //     //     });
    //         //     //     break;


    //         //     // }

    //         //     // if (result == 'css' && this.course[1].Completed__c == false && this.course[0].Completed__c == true) {
    //         //     //     var urlValue = '/s/course/course2?id=' + this.course[1].Id;
    //         //     //     console.log(urlValue);
    //         //     //     var pageapiname = 'Course2__c';
    //         //     //     this[NavigationMixin.Navigate]({
    //         //     //         type: 'comm__namedPage',
    //         //     //         attributes: {
    //         //     //             name: 'Course2__c'
    //         //     //         },
    //         //     //         state: {
    //         //     //             recordId: this.course[1].Id
    //         //     //         }
    //         //     //     });
    //         //     //     break;

    //         //     // } else if (result == 'html' && this.course[1].Completed__c == true) {
    //         //     //     var urlValue = '/s/course/course2?id=' + this.course[0].Id;
    //         //     //     console.log(urlValue);
    //         //     //     var pageapiname = 'Course2__c';
    //         //     //     this[NavigationMixin.Navigate]({
    //         //     //         type: 'comm__namedPage',
    //         //     //         attributes: {
    //         //     //             name: 'Course2__c'
    //         //     //         },
    //         //     //         state: {
    //         //     //             recordId: this.course[0].Id
    //         //     //         }
    //         //     //     });
    //         //     //     break;


    //         //     // } else if (result == 'css' && this.course[1].Completed__c == false && this.course[0].Completed__c == false) {
    //         //     //     alert('please unclock previous course');
    //         //     //     break;


    //         //     // }

    //         //     // if (result == 'javascript' && this.course[2].Completed__c == false && this.course[1].Completed__c == true) {
    //         //     //     var urlValue = '/s/course/course2?id=' + this.course[2].Id;
    //         //     //     console.log(urlValue);
    //         //     //     var pageapiname = 'Course2__c';
    //         //     //     this[NavigationMixin.Navigate]({
    //         //     //         type: 'comm__namedPage',
    //         //     //         attributes: {
    //         //     //             name: 'Course2__c'
    //         //     //         },
    //         //     //         state: {
    //         //     //             recordId: this.course[2].Id
    //         //     //         }
    //         //     //     });
    //         //     //     break;

    //         //     // } else if (result == 'html' && this.course[2].Completed__c == true) {
    //         //     //     var urlValue = '/s/course/course2?id=' + this.course[0].Id;
    //         //     //     console.log(urlValue);
    //         //     //     var pageapiname = 'Course2__c';
    //         //     //     this[NavigationMixin.Navigate]({
    //         //     //         type: 'comm__namedPage',
    //         //     //         attributes: {
    //         //     //             name: 'Course2__c'
    //         //     //         },
    //         //     //         state: {
    //         //     //             recordId: this.course[0].Id
    //         //     //         }
    //         //     //     });
    //         //     //     break;


    //         //     // } else if (result == 'javascript' && this.course[2].Completed__c == false && this.course[1].Completed__c == false) {
    //         //     //     alert('please unclock previous course');
    //         //     //     break;

    //         //     // }

    //         //     // if (result == 'java' && this.course[3].Completed__c == false && this.course[2].Completed__c == true) {
    //         //     //     var urlValue = '/s/course/course2?id=' + this.course[3].Id;
    //         //     //     console.log(urlValue);
    //         //     //     var pageapiname = 'Course2__c';
    //         //     //     this[NavigationMixin.Navigate]({
    //         //     //         type: 'comm__namedPage',
    //         //     //         attributes: {
    //         //     //             name: 'Course2__c'
    //         //     //         },
    //         //     //         state: {
    //         //     //             recordId: this.course[3].Id
    //         //     //         }
    //         //     //     });
    //         //     //     break;

    //         //     // } else if (result == 'html' && this.course[3].Completed__c == true) {
    //         //     //     var urlValue = '/s/course/course2?id=' + this.course[0].Id;
    //         //     //     console.log(urlValue);
    //         //     //     var pageapiname = 'Course2__c';
    //         //     //     this[NavigationMixin.Navigate]({
    //         //     //         type: 'comm__namedPage',
    //         //     //         attributes: {
    //         //     //             name: 'Course2__c'
    //         //     //         },
    //         //     //         state: {
    //         //     //             recordId: this.course[0].Id
    //         //     //         }
    //         //     //     });
    //         //     //     break;

    //         //     // } else if (result == 'java' && this.course[3].Completed__c == false && this.course[2].Completed__c == false) {
    //         //     //     alert('please unclock previous course');
    //         //     //     break;


    //         //     // }

    //         //     // if (result == 'python' && this.course[4].Completed__c == false && this.course[3].Completed__c == true) {
    //         //     //     var urlValue = '/s/course/course2?id=' + this.course[4].Id;
    //         //     //     console.log(urlValue);
    //         //     //     var pageapiname = 'Course2__c';
    //         //     //     this[NavigationMixin.Navigate]({
    //         //     //         type: 'comm__namedPage',
    //         //     //         attributes: {
    //         //     //             name: 'Course2__c'
    //         //     //         },
    //         //     //         state: {
    //         //     //             recordId: this.course[4].Id
    //         //     //         }
    //         //     //     });
    //         //     //     break;

    //         //     // } else if (result == 'html' && this.course[4].Completed__c == true) {
    //         //     //     var urlValue = '/s/course/course2?id=' + this.course[0].Id;
    //         //     //     console.log(urlValue);
    //         //     //     var pageapiname = 'Course2__c';
    //         //     //     this[NavigationMixin.Navigate]({
    //         //     //         type: 'comm__namedPage',
    //         //     //         attributes: {
    //         //     //             name: 'Course2__c'
    //         //     //         },
    //         //     //         state: {
    //         //     //             recordId: this.course[0].Id
    //         //     //         }
    //         //     //     });
    //         //     //     break;


    //         //     // } else if (result == 'python' && this.course[4].Completed__c == false && this.course[3].Completed__c == false) {
    //         //     //     alert('please unclock previous course');
    //         //     //     break;

    //         //     // }

    //         //     // if (result == 'salesforce' && this.course[5].Completed__c == false && this.course[4].Completed__c == true) {
    //         //     //     var urlValue = '/s/course/course2?id=' + this.course[5].Id;
    //         //     //     console.log(urlValue);
    //         //     //     var pageapiname = 'Course2__c';
    //         //     //     this[NavigationMixin.Navigate]({
    //         //     //         type: 'comm__namedPage',
    //         //     //         attributes: {
    //         //     //             name: 'Course2__c'
    //         //     //         },
    //         //     //         state: {
    //         //     //             recordId: this.course[5].Id
    //         //     //         }
    //         //     //     });
    //         //     //     break;

    //         //     // } else if (result == 'html' && this.course[5].Completed__c == true) {
    //         //     //     var urlValue = '/s/course/course2?id=' + this.course[0].Id;
    //         //     //     console.log(urlValue);
    //         //     //     var pageapiname = 'Course2__c';
    //         //     //     this[NavigationMixin.Navigate]({
    //         //     //         type: 'comm__namedPage',
    //         //     //         attributes: {
    //         //     //             name: 'Course2__c'
    //         //     //         },
    //         //     //         state: {
    //         //     //             recordId: this.course[0].Id
    //         //     //         }
    //         //     //     });
    //         //     //     break;


    //         //     // } else if (result == 'salesforce' && this.course[5].Completed__c == false && this.course[4].Completed__c == false) {
    //         //     //     alert('please unclock previous course');
    //         //     //     break;

    //         //     // }


    //         // }

    //     } catch (e) {
    //         console.log({ e });
    //     }
    // }


    



}