import axios from 'axios';

// 测试-列表获取
export async function getTest(data: API.ITestParams) {
  return axios.post<any, API.IListResult<API.ITest>>('/api/getTest.json', data);
}

// 测试-列表新增
export async function setTestCreate(data: API.ITestCreateParams) {
  return axios.post<any, API.IResult<boolean>>('/api/setTestCreate.json', data);
}

// 测试-列表修改
export async function setTestModify(data: API.ITestModifyParams) {
  return axios.post<any, API.IResult<boolean>>('/api/setTestModify.json', data);
}

// 测试-列表删除
export async function setTestDelete(uuid: string) {
  return axios.post<any, API.IResult<boolean>>('/api/setTestDelete.json', {
    uuid,
  });
}
