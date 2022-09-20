import { LightningElement,wire,track,api } from 'lwc';
export default class Mtp_timesheet_container extends LightningElement {

    @track showtimesheet = true;
    selectedDate;
    handleChange(event){
        console.log('day',event.detail);
        this.selectedDate = event.detail;
        this.showtimesheet = false;
    }
}