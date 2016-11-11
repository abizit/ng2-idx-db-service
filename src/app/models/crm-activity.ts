/**
 * Created by fh on 08-11-16.
 */
export class CrmActivityConfig {
  activityId?: string;
  activityType: number; // required
  companyId: string; // required
  content?: string;
  followUp?: boolean;
  name: string; // required
  userId: string; // required
}

export class CrmActivity {
  activityId: string;
  activityType: number;
  companyId: string;
  content: string;
  followUp: boolean;
  name: string;
  userId: string;

  constructor(c: CrmActivityConfig) {
    this.activityId = c.activityId || '';
    this.activityType = c.activityType;
    this.companyId = c.companyId;
    this.content = c.content || '';
    this.followUp = c.followUp || false;
    this.name = c.name;
    this.userId = c.userId;
  }
}
