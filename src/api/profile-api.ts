import { PhotosType, ProfileType } from "../redux/profile-reducer"
import { APIResponseDataType, instants } from "./api"

type GetUserDataType = ProfileType

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getUser(userId: number) {
        return instants.get<GetUserDataType>(`profile/${userId}`).then(res => res.data)
    },
    getStatus(userId: number) {
        return instants.get<string>(`profile/status/${userId}`).then(res => res.data)
    },
    updateStatus(status: string) {
        return instants.put<APIResponseDataType>(`profile/status`, { status }).then(res => res.data)
    },
    savePhoto(photoFile: File) {
        let formData = new FormData()
        formData.append("image", photoFile)

        return instants.put<APIResponseDataType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instants.put<APIResponseDataType<ProfileType>>(`profile`, profile).then(res => res.data)
    },
}