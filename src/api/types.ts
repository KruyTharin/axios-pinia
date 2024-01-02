export interface IBaseResponse {
  statusCode: string
  message: string
}

export interface IUser {
  username: string
  email: string
  role: string
  id: string
  permissions: Array<string>
}

export interface IAuthToken {
  access_token: string
  refresh_token: string
  expires_in?: number
  refresh_expires_in?: number
}

export interface ILoginInput {
  email: string
  password: string
}

export interface ILoginResponse extends IBaseResponse {
  data: {
    access_token: string
    refresh_token: string
  }
}

export interface IUserResponse extends IBaseResponse {
  data: IUser
}
