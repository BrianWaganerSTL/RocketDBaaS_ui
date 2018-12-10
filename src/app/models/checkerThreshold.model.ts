import { CheckerBaseElement } from './checkerBaseElement.model';

export interface CheckerThreshold {
  checker_base_element: CheckerBaseElement;
  server_override: number;
  normal_ticks: number;
  normal_predicate_type: string;
  normal_value: string;
  warning_ticks: number;
  warning_predicate_type: string;
  warning_value: string;
  critical_ticks: number;
  critical_predicate_type: string;
  critical_value: string;
  active_sw: Boolean;
  created_dttm: Date;
  updated_dttm: Date;
}
