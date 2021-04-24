export type UserType = {
    id: number
    name: string
    status: string
    followed: boolean
    photos: PhotosType
}
export type ContactType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type PhotosType = {
    small: string | undefined
    large: string | undefined
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: any
    photos: PhotosType
    aboutMe: any

}