import { Environment } from './environment.model';
import { Datacenter } from './datacenter.model';
import { Cluster } from './cluster.model';

export interface Server {
  id?: number;
  cluster?: Cluster;
  environment?: Environment;
  server_name?: string;
  server_ip?: string;
  cpu?: number;
  ram_gb?: number;
  db_gb?: number;
  datacenter?: Datacenter;
  node_role: string;
  server_health?: string;
  last_reboot?: Date;
  os_version?: string;
  db_version?: string;
  db_version_number?: number;
  db_patched_dttm?: Date;
  pending_restart_sw: string;
  metrics_sw: boolean;
  active_sw: string;
  created_dttm: Date;
  updated_dttm: Date;
}
