export interface MetricsMountPoints {
  server_id: number;
  created_dttm: string;
  mount_point: string;
  allocated_gb: number;
  used_gb: number;
  used_pct: number;
  error_cnt: number;
  error_msg: string;
}
