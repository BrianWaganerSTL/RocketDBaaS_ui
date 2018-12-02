export interface MetricsLoad {
  server_id: number;
  created_dttm: string;
  load_1min: number;
  load_5min: number;
  load_15min: number;
  error_cnt: number;
  error_msg: string;
}
