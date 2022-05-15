export interface User{
  username: string,
  email: string,
  description?: string,
  avatar?: string,
  status: {
    mode: string,
    duration?:number,
    setTime?: Date,
  }
}
