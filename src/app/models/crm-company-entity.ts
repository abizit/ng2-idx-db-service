import { Injectable } from '@angular/core';

import { CrmCompany } from './crm-company';

declare var uuid: any;

/**
 * Company entity.
 */
export class Company extends CrmCompany {
  /**
   * Change tracking
   */
  remove: boolean = false;
  dirty: boolean = false;
  lastSync: number = 0;
  lastChange: number = 0;
}

/**
 * CompanyEntity class. Defines each entity and its methods.
 */
@Injectable()
export class CompanyEntity {

  /**
   * Companys entity.
   */
  companies: Array<Company> = [];

  /**
   * Adds a company.
   *
   * @param record
   */
  addRecord(record: Company) {
    this.companies.push(record);
  }

  /**
   * Creates a company.
   *
   * @param record
   */
  createRecord(record: Company) {
    this.companies.push(record);
  }

  /**
   * Edits a company.
   *
   * @param record
   */
  updateRecord(record: Company) {
    var index: number = this.companies.indexOf(record);
    this.companies[index] = record;
  }

  /**
   * Deletes a company.
   *
   * @param record
   */
  deleteRecord(record: Company) {
    var index: number = this.companies.indexOf(record);
    this.companies[index] = record;
    // this.companies.splice(index, 1);
  }

  /**
   * Clears the companies entity.
   */
  clearStore() {
    this.companies.splice(0);
  }

  /**
   * Creates key.
   *
   * @return A new key
   */
  createKey(): string {
    // Generates and returns a RFC4122 v4 UUID.
    return uuid.v4();
  }

  /**
   * Sorts companies by name.
   */
  sortByName() {
    this.companies = this.companies.sort((record1, record2) => {
      if (record1.name > record2.name) {
        return 1;
      }
      if (record1.name < record2.name) {
        return -1;
      }
      return 0;
    });
  }

  /**
   * Sorts companies by zip.
   */
  sortByZip() {
    this.companies = this.companies.sort((record1, record2) => {
      if (record1.zip > record2.zip) {
        return 1;
      }
      if (record1.zip < record2.zip) {
        return -1;
      }
      return 0;
    });
  }
}
