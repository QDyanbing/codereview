declare namespace API {
  interface IResult<T> {
    success: boolean;
    errorCode?: '307';
    data: T;
    errorMessage?: string;
  }

  interface IListResult<T extends any> {
    success: boolean;
    errorCode?: '307';
    data: {
      total: number;
      data: T[];
    };
    errorMessage?: string;
  }
}
