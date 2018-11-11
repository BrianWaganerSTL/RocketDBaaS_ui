import {Server} from '../servers/server.model';

export interface ServerActivity {
  server: Server[];
  server_activity: string;
  activity_status: string;
  start_dttm: string;
  stop_dttm: string;
  created_dttm: string;
  updated_dttm: string;
}
