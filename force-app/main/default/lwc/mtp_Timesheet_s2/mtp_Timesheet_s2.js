import { LightningElement, track, wire } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import mtb_Login_Images from '@salesforce/resourceUrl/mtb_Login_Images';
import mtp_CourcePage2_Css from '@salesforce/resourceUrl/mtp_CourcePage2_Css';
import { NavigationMixin } from 'lightning/navigation';
import { CurrentPageReference } from 'lightning/navigation';

export default class mtp_Timesheet_s2 extends NavigationMixin(LightningElement) {



    connectedCallback() {
       
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


}