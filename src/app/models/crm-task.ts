/**
 * Created by fh on 08-11-16.
 */
import { CrmNote } from './crm-note';

export class CrmTaskConfig {
  dueDate?: string;
  name: string; // required
  notes?: CrmNote[];
  overDue?: boolean;
  taskItemId?: string;
  txt?: string;
  userId: string; // required
}

export class CrmTask {
  dueDate: string;
  name: string;
  notes: CrmNote[];
  overDue: boolean;
  taskItemId: string;
  txt: string;
  userId: string;

  constructor(t: CrmTaskConfig) {
    this.dueDate = t.dueDate || '';
    this.name = t.name;
    this.notes = t.notes || [];
    this.overDue = t.overDue || false;
    this.taskItemId = t.taskItemId || '';
    this.txt = t.txt || '';
    this.userId = t.userId;
  }
}
