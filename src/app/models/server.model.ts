import { Environment } from './environment.model';

export interface Server {
  cluster: number;
  environment: Environment;
  server_name: string;
  server_ip: string;
  cpu: number;
  ram_gb: number;
  db_gb: number;
  data_center: string;
  node_role: string;
  server_health: string;
  os_version: string;
  db_version: string;
  pending_restart_sw: string;
  active_sw: string;
  created_dttm: string;
  updated_dttm: string;
}
