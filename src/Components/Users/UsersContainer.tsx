import {
    follow,
    unfollow,
    requestUsers,
    UserType,
    FilterType,
} from "../../redux/users-reducer"
import {
    getUsers,
    getCurrentPage,
    getTotalItemsCount,
    getCountItemsPerPage,
    getIsFollowing,
    getPortionSize,
    getFilter,
} from "../../selectors/users-select"
import { getIsFetching } from "../../selectors/common-select"
import Users from "./Users"
import React from "react"
import { AppStateType } from "../../redux/redux-store"
import { connect } from "react-redux"

type MapStateToPropsType = {
    users: Array<UserType | null>
    currentPage: number
    totalItemsCount: number
    countItemsPerPage: number
    isFetching: boolean
    isFollowing: Array<number | null>
    portionSize: number
    filter: FilterType
}

type MapDispatchToPropsType = {
    follow: (user: number) => void
    unfollow: (user: number) => void
    requestUsers: (
        countItemsPerPage: number,
        currentPage: number,
        term: string
    ) => void
}

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

class UsersAPIComponent extends React.Component<UsersPropsType> {
    componentDidMount() {
        this.props.requestUsers(
            this.props.countItemsPerPage,
            this.props.currentPage,
            this.props.filter.term
        )
    }
    componentWillUnmount() {
        this.props.requestUsers(this.props.countItemsPerPage, 1, "")
    }

    onPageChange = (page: number): void => {
        this.props.requestUsers(
            this.props.countItemsPerPage,
            page,
            this.props.filter.term
        )
    }

    onPerPage = (count: number): void => {
        this.props.requestUsers(
            count,
            this.props.currentPage,
            this.props.filter.term
        )
    }

    onFilterChange = (filter: FilterType): void => {
        this.props.requestUsers(this.props.countItemsPerPage, 1, filter.term)
    }

    render() {
        return (
            <Users
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                totalItemsCount={this.props.totalItemsCount}
                countItemsPerPage={this.props.countItemsPerPage}
                currentPage={this.props.currentPage}
                onPageChange={this.onPageChange}
                isFetching={this.props.isFetching}
                isFollowing={this.props.isFollowing}
                requestUsers={this.props.requestUsers}
                onPerPage={this.onPerPage}
                onFilterChange={this.onFilterChange}
                portionSize={this.props.portionSize}
                filter={this.props.filter}
            />
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        currentPage: getCurrentPage(state),
        totalItemsCount: getTotalItemsCount(state),
        countItemsPerPage: getCountItemsPerPage(state),
        isFetching: getIsFetching(state),
        isFollowing: getIsFollowing(state),
        portionSize: getPortionSize(state),
        filter: getFilter(state),
    }
}

/*const mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      let action = followActionCreator(userId);
      dispatch(action);
    },
    unfollow: (userId) => {
      let action = unfollowActionCreator(userId);
      dispatch(action);
    },
    setUsers: (users) => {
      let action = setUsersActionCreator(users);
      dispatch(action);
    },
    setTotalUsers: (pages) => {
      let action = setTotalUsersActionCreator(pages);
      dispatch(action);
    },
    setCurrentPage: (page) => {
      let action = setCurrentPageActionCreator(page);
      dispatch(action);
    },
    toggleIsFetching: (isFetching) => {
        let action = toggleIsFetchingActionCreator(isFetching)
        dispatch(action)
    }
  };
};*/

const usersContainer = connect<
    MapStateToPropsType,
    MapDispatchToPropsType,
    unknown,
    AppStateType
>(mapStateToProps, {
    follow,
    unfollow,
    requestUsers,
})(UsersAPIComponent)

export default usersContainer
