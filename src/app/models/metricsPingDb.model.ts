export interface MetricsPingDb {
  server_id: number;
  created_dttm: string;
  ping_db_status: string;
  ping_db_response_ms: number;
  error_cnt: number;
  error_msg: string;
}
