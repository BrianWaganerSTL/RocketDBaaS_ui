import { CheckerThreshold } from './checkerThreshold.model';

export interface IssueTrackerModel {
  id: number;
  server_id: number;
  checker_threshold: CheckerThreshold;
  start_dttm: string;
  last_dttm: string;
  closed_sw: boolean;
  pending_status: string;
  current_status: string;
  element_details: string;
  critical_ticks: number;
  warning_ticks: number;
  normal_ticks: number;
  note: string;
  note_by: string;
  ticket: string;
  created_dttm: string;
  updated_dttm: string;
}
