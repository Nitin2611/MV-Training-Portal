import { LightningElement, track } from 'lwc';
import mtp_Timesheet_bg_image from '@salesforce/resourceUrl/mtp_Timesheet_bg_image';
import mtp_Approve_icon from '@salesforce/resourceUrl/mtp_Approve_icon';
import mtp_Reject_icon from '@salesforce/resourceUrl/mtp_Reject_icon';
import mtp_Airplane_StartTime_icon from '@salesforce/resourceUrl/mtp_Airplane_StartTime_icon';
import mtp_Airplane_EndTime_icon from '@salesforce/resourceUrl/mtp_Airplane_EndTime_icon';
import mtp_Calendar_icon from '@salesforce/resourceUrl/mtp_Calendar_icon';

import getTimesheetData from '@salesforce/apex/mtp_TimesheetController.getTimesheetData';
export default class Mtp_Timesheet extends LightningElement {
    bgImage = mtp_Timesheet_bg_image;                       // background-image of timesheet component
    approveIcon = mtp_Approve_icon;                         // approve icon for timesheet
    rejectIcon = mtp_Reject_icon;                           // reject icon for timesheet 
    startTimeIcon = mtp_Airplane_StartTime_icon;            // start time (airplane) icon for timesheet
    endTimeIcon = mtp_Airplane_EndTime_icon;                // end time (airplane) icon for timesheet
    calendarIcon = mtp_Calendar_icon;                       // calendar icon for timesheet

    @track timesheetDataList = [];

    connectedCallback() {
        try {

            getTimesheetData()
                .then(result => {
                    this.timesheetDataList = result;
                    console.log("timesheetDataList ==>");
                    console.log({ result });

                })
                .catch(error => {
                    console.log({ error });
                });

        } catch (error) {
            console.log({ error });
        }
    }
}