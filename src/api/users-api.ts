import { UserType } from "../redux/users-reducer"
import { APIResponseDataType, instants } from "./api"

type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export const usersAPI = {
    getUsers(countItemsPerPage: number, page: number) {
        return instants.get<GetUsersType>(`users?page=${page}&count=${countItemsPerPage}`).then(res => res.data)
    },
    followUsers(userId: number) {
        return instants.post<APIResponseDataType>(`follow/${userId}`).then(res => res.data)
    },
    unfollowUsers(userId: number) {
        return instants.delete<APIResponseDataType>(`follow/${userId}`).then(res => res.data)
    },
}
