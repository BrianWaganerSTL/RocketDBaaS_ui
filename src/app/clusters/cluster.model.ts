import {Application} from './application.model';
import {ServerPort} from './serverPort.model';

export interface Cluster {
  id: number;
  cluster_name: string;
  dbms_type: string;
  application: Application[];
  environment: string;
  requested_cpu: string;
  requested_mem_gb: string;
  requested_db_gb: string;
  read_write_port: ServerPort[];
  read_only_port: ServerPort[];
  tls_enabled_sw: string;
  backup_retention_days: string;
  cluster_health: string;
  active_sw: string;
  eff_dttm: string;
  exp_dttm: string;
  created_dttm: string;
  updated_dttm: string;
}
