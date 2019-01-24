import { ThresholdMetricLookup } from './thresholdMetricLookup.model';
import { ThresholdNotificationMethodLookup } from './ThresholdNotificationMethodLookup.model';

export interface ThresholdTest {
  threshold_metric: ThresholdMetricLookup;
  detail_element?: string;
  normal_ticks: Int8Array;
  warning_ticks: Int8Array;
  warning_predicate_type: string;
  warning_value: string;
  critical_ticks: Int8Array;
  critical_predicate_type: string;
  critical_value: string;
  notification_method: ThresholdNotificationMethodLookup;
  active_sw: Boolean;
  created_dttm: Date;
  updated_dttm: Date;
}
