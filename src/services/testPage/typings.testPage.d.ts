declare namespace API {
  interface ITestParams {
    name?: string;
    pageNum: number;
    pageSize: number;
  }

  interface ITest {
    uuid: string;
    name: string;
    data1: string;
    data2: string;
  }

  interface ITestCreateParams {
    name: string;
    data1: string;
    data2: string;
  }

  interface ITestModifyParams extends ITestCreateParams {
    uuid: string;
  }
}
