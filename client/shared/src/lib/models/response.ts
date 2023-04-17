export enum Status
{
  FAILURE = 'failure',
  SUCCESS = 'success',
}

export type Response<T = any> = {
  status: Status;
  data: T;
  error: null;
} | {
  status: Status;
  data: null;
  error: string;
  reason: any;
};
