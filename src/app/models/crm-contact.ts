/**
 * Created by fh on 08-11-16.
 */
import { CrmNote, CrmNoteConfig } from './crm-note';

export class CrmContactConfig {
  companyId?: string;
  contactId?: string;
  department?: string;
  email?: string;
  mobile?: string;
  name: string; // required
  notes?: CrmNote[];
  phone?: string;
  userId: string; // required
}

export class CrmContact {
  companyId: string;
  contactId: string;
  department: string;
  email: string;
  mobile: string;
  name: string;
  notes: CrmNote[];
  phone: string;
  userId: string;

  constructor(c: CrmContactConfig) {
    this.companyId = c.companyId || '';
    this.contactId = c.contactId || '';
    this.department = c.department || '';
    this.email = c.email || '';
    this.mobile = c.mobile || '';
    this.name = c.name;
    this.notes = c.notes || [];
    this.phone = c.phone || '';
    this.userId = c.userId;
  }

  create(n: CrmNoteConfig) {
    console.log('CrmNote => add: ' + n);
    this.notes.push(new CrmNote(n));
  }

  delete(id: CrmNote) {
    console.log('CrmNote => delete: ' + id);
  }
}
