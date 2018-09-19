// Why is WebAPI imported into App

import { WebAPI } from 'web-api';

export class App {
  // Ditto?
  static inject = [WebAPI];

  constructor(api) {
    // Ditto?
    this.api = api;
  }

  // Basic Route configuration
  configureRouter(config, router) {
    this.router = router;

    // global config object passed in, then modified
    // to use router, view must have <router-view>; component's view-model requires a configureRouter() function
    config.title = 'Contacts';

    // check config.map parameter options (default vs. custom)
    config.map([
      { route: ['', 'home'], moduleId: 'home', name: 'home', title: 'Select'},
      { route: 'contacts/:id',  moduleId: 'contact-detail', name: 'contacts' }
    ]);
  }
}
