/**
 * Created by fh on 08-11-16.
 */
import { CrmActivity, CrmActivityConfig } from './crm-activity';
import { CrmContact, CrmContactConfig } from './crm-contact';
import { CrmDemo, CrmDemoConfig } from './crm-demo';
import { CrmNote, CrmNoteConfig } from './crm-note';

export class CrmCompanyConfig {
  activities?: CrmActivity [];
  account?: string;
  address1: string; // required
  address2?: string;
  attention?: string;
  city: string; // required
  companyId?: string;
  contacts?: CrmContact [];
  demoes?: CrmDemo [];
  department?: string;
  email?: string;
  isCustomer?: boolean;
  mobile?: string;
  name: string; // required
  notes?: CrmNote [];
  phone?: string;
  userId: string; // required
  zip: string; // required
}

export class CrmCompany {
  activities: CrmActivity [];
  account: string;
  address1: string;
  address2: string;
  attention: string;
  city: string;
  companyId: string;
  contacts: CrmContact [];
  demoes: CrmDemo [];
  department: string;
  email: string;
  isCustomer: boolean;
  mobile: string;
  name: string;
  notes: CrmNote [];
  phone: string;
  userId: string;
  zip: string;

  constructor(c: CrmCompanyConfig) {
    this.activities = c.activities || [];
    this.account = c.account || '';
    this.address1 = c.address1;
    this.address2 = c.address2 || '';
    this.attention = c.attention || '';
    this.city = c.city;
    this.companyId = c.companyId || '';
    this.contacts = c.contacts || [];
    this.demoes = c.demoes || [];
    this.department = c.department || '';
    this.email = c.email || '';
    this.isCustomer = c.isCustomer || false;
    this.mobile = c.mobile || '';
    this.name = c.name;
    this.notes = c.notes || [];
    this.phone = c.phone || '';
    this.zip = c.zip;
    this.userId = c.userId;
  }

  addActivity(a: CrmActivityConfig) {
    this.activities.push(new CrmActivity(a));
  }

  addContact(c: CrmContactConfig) {
    this.contacts.push(new CrmContact(c));
  }

  addDemo(d: CrmDemoConfig) {
    this.demoes.push(new CrmDemo(d));
  }

  addNote(n: CrmNoteConfig) {
    this.notes.push(new CrmNote(n));
  }

  create() {
    // send to crmCompanyService
    console.log('CompanyEntity => create');
  }

  read() {
    // send to crmCompanyService
    console.log('CompanyEntity => read');
  }

  update() {
    // send to crmCompanyService
    console.log('CompanyEntity => update');
  }

  delete() {
    // send to crmCompanyService
    console.log('CompanyEntity => delete');
  }

}

