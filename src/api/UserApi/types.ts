export type ProfileData = {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}

export type PasswordData = {
    oldPassword: string,
    newPassword: string,
}

export type SearchUserData = {
    login: string
}
