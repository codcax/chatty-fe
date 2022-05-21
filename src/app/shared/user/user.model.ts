export interface User {
  username: string,
  email: string,
  description?: string,
  avatar?: string,
  status: {
    mode: string,
    tagline: string,
    duration?: number,
    setTime?: Date,
  },
  phoneNumber: string
}

export interface UpdateUsername {
  newUsername: string,
  password: string
}
