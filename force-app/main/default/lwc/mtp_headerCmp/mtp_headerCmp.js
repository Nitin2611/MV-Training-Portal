import { LightningElement, track, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import mvlogo from '@salesforce/resourceUrl/MVLogo';
import mvicon from '@salesforce/resourceUrl/mtp_headerIcon';
import mvicon1 from '@salesforce/resourceUrl/mtp_headerIcon1';
import mvicon2 from '@salesforce/resourceUrl/mtp_headerIcon2';
import isGuestUser from '@salesforce/user/isGuest';
export default class Mtp_headerCmp extends NavigationMixin(LightningElement) {
    @track logo;
    @track icon1;
    @track icon2;
    @track icon3;
    isGuest = isGuestUser;
    connectedCallback() {
        console.log({ mvlogo });
        console.log('---->' + this.isGuest);
        var dynamicURL = window.location.toString();
        console.log('Dynamic URL ' + dynamicURL);
        var webURL;
        if (dynamicURL.indexOf("/") > 0) {
            webURL = dynamicURL.substring(0, dynamicURL.indexOf("/s/"));
        }
        this.logo = webURL + mvlogo;
        this.icon1 = webURL + mvicon;
        this.icon2 = webURL + mvicon1;
        this.icon3 = webURL + mvicon2;
    }
    eventPageNavigation(event) {
        var urlValue = '/s/';
        urlValue += 'newevents';
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'newEvents__c',
                url: urlValue
            },
        });
    }
    pageNavigation(event) {

        try {
            var inp = this.template.querySelector('.active');
            console.log({ inp });
            inp.checked = false;
        } catch (error) {
            console.log({ error });
        }

        console.log({ event });
        let menuIte = event.currentTarget.dataset.record;
        console.log({ menuIte });

        if (menuIte == 'Mv Clouds') {
            window.open("https://mvclouds.com/", "_blank");
        }

        var nameValue;
        var urlValue = '/s/';

        if (menuIte == "home") {
            nameValue = 'Home';
        } else if (menuIte == "course") {
            nameValue = 'Course__c';
            urlValue += 'course';
        } else if (menuIte == "timesheet") {
            nameValue = 'Timesheet__c';
            urlValue += 'timesheet';
        } else if (menuIte == "leave") {
            nameValue = 'Leave__c';
            urlValue += 'leave';
        } else if (menuIte == 'logout') {
            this[NavigationMixin.Navigate]({
                type: 'comm__loginPage',
                attributes: {
                    actionName: 'logout'
                },
            });
        }
        if (nameValue && urlValue) {
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: nameValue,
                    url: urlValue
                },
            });
        }
    }
}