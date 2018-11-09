export interface Restore {
  from_cluster: number;
  to_cluster: number;
  restore_type: string;
  restore_to_dttm: string;
  restore_status: string;
  start_dttm: string;
  stop_dttm: string;
  created_dttm: string;
  updated_dttm: string;
}
