import { LightningElement, track } from 'lwc';
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

    @track course ;

    renderedCallback(){
        Promise.all([
            loadScript(this,jQuery ),
            loadScript(this, rwdImageMapJs),
            loadScript(this,rwdImageMapMinjs),        
        ])
        .then(() => {
            console.log('JQuery loaded.');
        })
        .catch(error=>{
            console.log('Failed to load the JQuery : ' +error);
        });
    }

    connectedCallback() {
        getcourse()
            .then(result => {
                console.log(result);
                this.course = result;
                console.log(result[0].Id);
            })
            .catch(error => {
                console.log('error');
                console.log({ error });
            });
    }


    cpImg1 = mtpCoursePage1Img1;    //Image beside professional couse text
    cpImg2 = mtpCoursePage1Img2;    //Cat Image
    cpImg3 = mtpCoursePage1Img3;    //Image beside cat
    cpImg4 = mtpCoursePage1Img4;    //Small airplane image
    cpImg5 = mtpCoursePage1Img5;    //Map Image
    cpbgImg = mtpCoursePage1bg;     //Background Image

    level1method(event){
        var urlValue = '/s/course/course2?id=a02N000000N3dwOIAR';
        var pageapiname = 'Course2__c';
        // console.log(urlValue);
        // this[NavigationMixin.Navigate]({
        //     type: 'comm__namedPage',
        //     attributes: {
        //         name: pageapiname,
        //         url: urlValue
        //     },
        // });
        var alter = event.target.alt;
        console.log(alter);
        console.log('test end');
    }

    level2method(event){
        console.log({event});
        // alert('click on level 2');
    }

    level3method(event){
        console.log({event});
        // alert('click on level 3');
    }

    level4method(event){
        console.log({event});
        // alert('click on level 4');
    }

    level5method(event){
        console.log({event});
        // alert('click on level 5');
    }

    level6method(event){
        console.log({event});
        // alert('click on level 6');
    }

    imageareaclicked(event){
        var alter = event.target.alt;
        this.course.forEach(element => {
            console.log(element.Course_Index__c);
            if(element.Course_Index__c == alter){
                console.log(element.Id);
                var urlValue = '/s/course/course2?id='+element.Id;
                var pageapiname = 'Course2__c';
                this[NavigationMixin.Navigate]({
                    type: 'comm__namedPage',
                    attributes: {
                        name: pageapiname,
                        url: urlValue
                    },
                });
            }
        });
    }
}