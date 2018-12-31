import { Environment } from './environment.model';
import { Datacenter } from './datacenter.model';

export interface PoolServer {
  id: number;
  environment: Environment;
  server_name: string;
  server_ip: string;
  dbms_type: string;
  cpu: number;
  ram_gb: number;
  db_gb: number;
  datacenter: Datacenter;
  server_health: string;
  last_reboot: Date;
  os_version: string;
  db_version: string;
  created_dttm: string;
  updated_dttm: string;
}
