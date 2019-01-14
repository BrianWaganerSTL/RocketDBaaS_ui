import { ThresholdCategoryLookup } from './ThresholdCategoryLookup.model';

export interface ThresholdMetricLookup {
  category: ThresholdCategoryLookup;
  metric_name: string;
  detail_element_sw: Boolean;
  created_dttm: Date;
  updated_dttm: Date;
}
