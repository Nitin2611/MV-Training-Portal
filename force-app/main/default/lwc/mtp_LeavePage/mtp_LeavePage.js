import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import mtp_LeavePageBG from '@salesforce/resourceUrl/mtp_LeavePageBG';
import course from '@salesforce/resourceUrl/course';
import timesheet from '@salesforce/resourceUrl/timesheet';
import leave from '@salesforce/resourceUrl/leave';
import calender from '@salesforce/resourceUrl/calender';
import arrow from '@salesforce/resourceUrl/arrow';

export default class Mtp_LeavePage extends NavigationMixin(LightningElement) {

    imgarrow = arrow;
    courseimg = course;
    timesheetimg = timesheet;
    leaveimg = leave;
    calenderimg = calender;
    get imghome() {
        return `background-image:url(${mtp_LeavePageBG})`;
    }

    navigation(event) {
        console.log({ event });
        let name = event.currentTarget.dataset.name;
        console.log({ name });

        var pageapiname;
        var urlValue = '/s/';

        if (name == "apply") {
            pageapiname = 'ApplyLeave__c';
            urlValue += 'course';
        } else if (name == "pending") {
            pageapiname = 'PendingLeave__c';
            urlValue += 'leave/pendingleave';
        } else if (name == "history") {
            pageapiname = 'History__c';
            urlValue += 'leave';
        }
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageapiname,
                url: urlValue
            },
        });
    }
}