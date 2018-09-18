import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from 'web-api';
import { ContactUpdated, ContactViewed } from 'messages';

// @inject(WebAPI, EventAggregator)
export class ContactList {
  /*
    Dependency injection
    static inside of class defintion (vs. @inject outside)
  */
  static inject = [WebAPI, EventAggregator];

  constructor(api, ea) {
    this.api = api;
    this.contacts = [];
    this.selectedId = null;

    ea.subscribe(ContactViewed, msg => this.select(msg.contact));
    ea.subscribe(ContactUpdated, msg => {
      let id = msg.contact.id;
      // identify contact object with id in msg contact
      let found = this.contacts.find(c => c.id === id);
      // copy values of all enumerable properties from msg to found contact
      Object.assign(found, msg.contact);
    });
  }

  created() {
    this.api.getContactList().then(contacts => this.contacts = contacts);
  }

  select(contact) {
    this.selectedId = contact.id;
    return true;
  }
}
