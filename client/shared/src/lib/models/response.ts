export type Response<T = any> = {
  ok: true;
  data: T;
  error: null;
} | {
  ok: false;
  data: null;
  error: string;
  reason: any;
};
