export interface Backup {
  cluster: number;
  backup_type: string;
  backup_status: string;
  db_size_gb: number;
  backup_size_gb: number;
  start_dttm: string;
  stop_dttm: string;
  created_dttm: string;
  updated_dttm: string;
}

// TODO: Add a deleted_dttm column
