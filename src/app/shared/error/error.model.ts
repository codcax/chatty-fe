export interface Error {
  message: string,
  code: number,
  type: string
}

export interface Errors extends Array<Error>{}
