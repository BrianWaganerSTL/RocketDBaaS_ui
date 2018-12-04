export interface DataPoint {
  name: Date;
  value: number;
}

export interface GraphSeries {
  name: Date;
  series: DataPoint[];
}

export interface GraphObj {
  GraphSeries;
}
