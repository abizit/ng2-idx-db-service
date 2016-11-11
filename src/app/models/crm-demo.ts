/**
 * Created by fh on 08-11-16.
 */
export class CrmDemoConfig {
  companyId: string; // required
  demoId?: string;
  department?: string;
  name: string; // required
  product: string; // required
  userId: string; // required
}

export class CrmDemo {
  companyId: string;
  demoId: string;
  department: string;
  name: string;
  product: string;
  userId: string;

  constructor(d: CrmDemoConfig) {
    this.companyId = d.companyId; // required
    this.demoId = d.demoId || '';
    this.department = d.department || '';
    this.name = d.name; // required
    this.product = d.product; // required
    this.userId = d.userId; // required
  }
}
