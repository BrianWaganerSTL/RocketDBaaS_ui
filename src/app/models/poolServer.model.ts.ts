export interface PoolServer {
  environment: string;
  server_name: string;
  server_ip: string;
  dbms_type: string;
  cpu: number;
  mem_gb: number;
  db_gb: number;
  data_center: string;
  status_in_pool: string;
  created_dttm: string;
  updated_dttm: string;
}
