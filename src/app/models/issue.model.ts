export interface IssueModel {
  id: number;
  server_id: number;
  issue: string;
  start_dttm: string;
  last_dttm: string;
  note: string;
  note_by: string;
  note_color: string;
  ticket: string;
  created_dttm: string;
  updated_dttm: string;
}
