export interface User {
  name?: string
  login?: string
  email: string
  password: string
}

export interface Message {
  login: string,
  msg: string,
  class?: string
}