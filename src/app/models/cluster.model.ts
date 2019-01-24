import { Application } from './application.model';
import { ServerPort } from './serverPort.model';
import { Environment } from './environment.model';

export interface Cluster {
  id?: number;
  cluster_name: string;
  dbms_type: string;
  application: Application;
  // application_id: number;
  environment: Environment;
  // environment: string;
  read_write_port?: ServerPort;
  read_only_port?: ServerPort;
  tls_enabled_sw: string;
  backup_retention_days: string;
  cluster_health: string;
  active_sw?: string;
  eff_dttm?: string;
  exp_dttm?: string;
  created_dttm?: string;
  updated_dttm?: string;
}

// Used to create
//  - Application(if doesn't exist
//  - Cluster
//  - Servers
export interface ApplicationClusterServersPOST {
  application_name: string;
  environment_name: string;
  dbms_type: string;
  cluster_name: string;
  tls_enabled_sw: string;
  backup_retention_days: string;
  cluster_health: string;
  server_ids: Int8Array[];
}
