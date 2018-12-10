import { IssueTrackerModel } from './issueTrackerModel';
import { Application } from './application.model';

export interface IssueNotification {
  issue_tracker: IssueTrackerModel;
  application: Application;
  notification_dttm: Date;
  notification_method: string;
  notification_subject: string;
  notification_body: string;
  acknowledged_by: string;
  acknowledged_dttm: string;
  created_dttm: string;
  updated_dttm: string;
}
