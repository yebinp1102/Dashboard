

export type UsageListType = {
  name: string,
  carb: number,
  use_time: number,
  use_dist: number,
  use_cnt: number,
}

export type FailureTypesType = {
  type: string;
  cnt: number;
}

export type FailureTimeType = {
  time: string;
  cnt: number | string;
}

export type UsageTimeType = {
  time: string;
  cnt: number | string;
}

export type UsageAgeType = {
  age: string;
  cnt: number | string;
}