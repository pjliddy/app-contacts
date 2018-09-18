// set simulated latency for api calls
let latency = 400;

// auto-increment contact ids (good idea)
let cid = 0;

function getId() {
  return ++cid;
}

// simulated array of contact objects
let contacts = [
  {
    id: getId(),
    firstName: 'John',
    lastName: 'Tolkien',
    email: 'tolkien@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'Clive',
    lastName: 'Lewis',
    email: 'lewis@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'Owen',
    lastName: 'Barfield',
    email: 'barfield@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'Charles',
    lastName: 'Williams',
    email: 'williams@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'Roger',
    lastName: 'Green',
    email: 'green@inklings.com',
    phoneNumber: '867-5309'
  }
];

export class WebAPI {
  // initialize "isRequesting" flag to false
  isRequesting = false;
  // return an array of contact objects
  getContactList() {
    // turn on "isRequesting" flag
    this.isRequesting = true;
    // create promise for API request
    return new Promise(resolve => {
      // simulate web api call with timeout delay on response
      setTimeout(() => {
        // results is an array of objects mapped from "contacts" data above
        let results = contacts.map(x =>  {
          return {
            id: x.id,
            firstName: x.firstName,
            lastName: x.lastName,
            email: x.email
          };
        });
        // promise resolves with results array
        resolve(results);
        // turn off "isRequesting" flag
        this.isRequesting = false;
      }, latency);
    });
  }

  getContactDetails(id) {
    // turn on "isRequesting" flag
    this.isRequesting = true;
    // create promise for API request
    return new Promise(resolve => {
      // simulate web api call with timeout delay on response
      setTimeout(() => {
        // found is the first contact with id == passed id
        let found = contacts.filter(c => c.id == id)[0];
        // promise resolves with found object
        resolve(JSON.parse(JSON.stringify(found)));
        // turn off "isRequesting" flag
        this.isRequesting = false;
      }, latency);
    });
  }

  saveContact(contact) {
    /**
        NOTE: this will work if a "new" button creates
        a blank form with a new/save button
     */

    // turn on "isRequesting" flag
    this.isRequesting = true;
    // create promise for API request
    return new Promise(resolve => {
      // simulate web api call with timeout delay on response
      setTimeout(() => {
        // create instance from contact param
        let instance = JSON.parse(JSON.stringify(contact));
        // find contact with id from passed contact obj
        let found = contacts.filter(c => c.id == contact.id)[0];

        // if there is a contact
        if (found) {
          // find it's index
          let index = contacts.indexOf(found);
          // update array with new instance
          contacts[index] = instance;
        } else {
          // get new id
          instance.id = getId();
          // add instance to contacts array
          contacts.push(instance);
        }
        resolve(instance);
        // turn off "isRequesting" flag
        this.isRequesting = false;
      }, latency);
    });
  }
}
