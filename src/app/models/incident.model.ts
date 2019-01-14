import { ThresholdTest } from './thresholdTest.model';
import { Server } from './server.model';

export interface Incident {
  server: Server;
  threshold_test: ThresholdTest;
  start_dttm: Date;
  last_dttm: Date;
  closed_dttm?: Date;
  closed_sw: Boolean;
  min_value: number;
  cur_value: number;
  max_value: number;
  cur_test_w_values: string;
  pending_status: string;
  current_status: string;
  detail_element: string;
  critical_ticks: Int8Array;
  warning_ticks: Int8Array;
  normal_ticks: Int8Array;
  note?: string;
  note_by?: string;
  ticket?: string;
  created_dttm: Date;
  updated_dttm: Date;
}
