export interface MetricsCpu {
  server_id: number;
  created_dttm: string;
  cpu_idle_pct: number;
  cpu_user_pct: number;
  cpu_system_pct: number;
  cpu_wait_pct: number;
  cpu_steal_pct: number;
}
