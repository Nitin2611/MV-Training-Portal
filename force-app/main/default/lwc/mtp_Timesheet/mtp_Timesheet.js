import { LightningElement } from 'lwc';
import mtp_Timesheet_bg_image from '@salesforce/resourceUrl/mtp_Timesheet_bg_image';
import mtp_Approve_icon from '@salesforce/resourceUrl/mtp_Approve_icon';
import mtp_Reject_icon from '@salesforce/resourceUrl/mtp_Reject_icon';
import mtp_Airplane_StartTime_icon from '@salesforce/resourceUrl/mtp_Airplane_StartTime_icon';
import mtp_Airplane_EndTime_icon from '@salesforce/resourceUrl/mtp_Airplane_EndTime_icon';
import mtp_Calendar_icon from '@salesforce/resourceUrl/mtp_Calendar_icon';

export default class Mtp_Timesheet extends LightningElement {
    bgImage = mtp_Timesheet_bg_image;
    approveIcon = mtp_Approve_icon;
    rejectIcon = mtp_Reject_icon;
    startTimeIcon = mtp_Airplane_StartTime_icon;
    endTimeIcon = mtp_Airplane_EndTime_icon;
    calendarIcon = mtp_Calendar_icon;


}