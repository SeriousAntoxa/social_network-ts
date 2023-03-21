type InitialStateType = typeof initialState
type FriendType = {
    id: number
    name: string
}

let initialState = {
    friends: [
        { id: 1, name: "Elena" },
        { id: 2, name: "Maria" },
        { id: 3, name: "Andrei" },
    ] as Array<FriendType> | [],
}

const sidebarReducer = (state = initialState, action: any): InitialStateType => {
    return { ...state }
}

export default sidebarReducer