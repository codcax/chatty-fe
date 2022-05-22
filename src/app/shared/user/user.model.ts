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

export interface UpdateEmail {
  newEmail: string,
  password: string
}

export interface UpdatePassword {
  newPassword: string,
  newConfirmPassword: string,
  password: string
}
