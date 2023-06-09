import s from "./Users.module.css"
import User from "./User/User"
import React, { FC } from "react"
import Preloader from "../common/Preloader/Preloader"
import Paginator from "../common/Paginator/Paginator"
import PerPage from "../common/PerPage/PerPage"
import { UsersPropsType } from "./UsersContainer"
import UsersSearchForm from "./UsersSearchForm/UsersSearchForm"
import { FilterType } from "../../redux/users-reducer"

type UsersOwnPropsType = {
    onPerPage: (count: number) => void
    onPageChange: (page: number) => void
    onFilterChange: (filter: FilterType) => void
}

let Users: FC<UsersPropsType & UsersOwnPropsType> = (props) => {
    ;<>{props.isFetching || <Preloader />}</>

    return (
        <div className={s.users}>
            <h1>Users</h1>
            <div>
                <div className={s.paginator_block}>
                    <div>
                        <p>Pages: </p>
                        <Paginator
                            totalItemsCount={props.totalItemsCount}
                            countItemsPerPage={props.countItemsPerPage}
                            currentPage={props.currentPage}
                            onPageChange={props.onPageChange}
                            portionSize={props.portionSize}
                        />
                    </div>
                    <div>
                        <p>Count users on page: </p>
                        <PerPage
                            onPerPage={props.onPerPage}
                            countItemsPerPage={props.countItemsPerPage}
                        />
                    </div>
                </div>
                <UsersSearchForm onFilterChange={props.onFilterChange}/>
            </div>

            <div className={s.users_block}>
                {props.users.map((u) => {
                    if (!!u) {
                        return (
                            <User
                                key={u.id}
                                user={u}
                                follow={props.follow}
                                unfollow={props.unfollow}
                                isFollowing={props.isFollowing}
                            />
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default Users
