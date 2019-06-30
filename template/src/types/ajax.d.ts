declare namespace Ajax {
  // axios 返回数据
  export interface AxiosResponse {
    data: AjaxResponse
  }

  export interface Response {
    <Object>(any): Object
  }

  // 请求接口数据
  export interface AjaxResponse {
    code: number,
    data: any,
    message: string
  }
}
