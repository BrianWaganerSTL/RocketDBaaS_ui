export interface MetricsPingServer {
  server_id: number;
  created_dttm: string;
  ping_status: string;
  ping_response_ms: number;
  error_cnt: number;
  error_msg: string;
}
