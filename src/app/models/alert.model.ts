export interface AlertModel {
  id: number;
  cluster: number;
  server_name: string;
  alert: string;
  alert_cleared_sw: boolean;
  start_dttm: boolean;
  sent_notification_sw: boolean;
  note: string;
  note_by: string;
  note_color: string;
  ticket: string;
  created_dttm: string;
  updated_dttm: string;
}
