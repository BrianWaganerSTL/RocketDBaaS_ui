export interface Server {
  cluster: number;
  server_name: string;
  server_ip: string;
  cpu: number;
  mem_gb: number;
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
