import { LightningElement } from 'lwc';
import eventPage from '@salesforce/resourceUrl/eventPage';
import course from '@salesforce/resourceUrl/course';



export default class Mtp_newEvents extends LightningElement {
    courseimg = course;

    get imgEvent() {
        return `background-image:url(${eventPage})`;
    }

}