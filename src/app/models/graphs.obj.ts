export interface DataPoint {
  name: Date;
  value: number;
}

export interface GraphSeries {
  name: string;
  series: DataPoint[];
}

export interface GraphObj {
  GraphSeries;
}
