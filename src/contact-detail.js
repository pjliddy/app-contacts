import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from 'web-api';
import { ContactUpdated, ContactViewed } from 'messages';
import { areEqual } from 'utility';

export class ContactDetail {
  static inject = [WebAPI, EventAggregator];

  constructor(api, ea) {
    this.api = api;
    this.ea = ea;
  }

  // params and routeConfig passed in since contact-detail used as module in router
  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.api.getContactDetails(params.id).then(contact => {
      this.setContact(contact);
      this.ea.publish(new ContactViewed(contact));
    });
  }

  get canSave() {
    // return negative if api.isRequesting === true, so save button can't be clicked
    return this.contact.firstName && this.contact.lastName && !this.api.isRequesting;
  }

  save() {
    // call saveContact() from api & get saved contact object returned
    this.api.saveContact(this.contact).then(contact => {
      this.setContact(contact);
      this.ea.publish(new ContactUpdated(this.contact));
    });
  }

  canDeactivate() {
    if (!areEqual(this.originalContact, this.contact)) {
      let result = confirm('You have unsaved changes. Are you sure you wish to leave?');

      if (!result) {
        this.ea.publish(new ContactViewed(this.contact));
      }

      return result;
    }

    return true;
  }

  setContact(contact) {
    // set contact data to contact with id returned by api
    this.contact = contact;
    // set view title through routeConfig
    this.routeConfig.navModel.setTitle(contact.firstName);
    // save original contact data to evaluate if form has changed (disable save)
    this.originalContact = JSON.parse(JSON.stringify(contact));
  }
}
