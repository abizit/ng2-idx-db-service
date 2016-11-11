import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  config = {
    userId: 'fhu',
    dbName: 'flimsy',
    companyStore: 'companies'
  };

  constructor() { }

}
