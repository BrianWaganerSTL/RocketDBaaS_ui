import { Cluster } from './cluster.model';

export interface Restore {
  from_cluster: Cluster;
  to_cluster: Cluster;
  restore_type: string;
  restore_to_dttm: string;
  restore_status: string;
  restore_by: string;
  ticket: string;
  start_dttm: string;
  stop_dttm: string;
  created_dttm: string;
  updated_dttm: string;
}
