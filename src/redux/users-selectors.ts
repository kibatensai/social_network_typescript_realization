export const getUsersFromState = (state: any) => {
    return state.usersPage.users
}

export const getPageSize = (state: any) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCountFromState = (state: any) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPageFromState = (state: any) => {
    return state.usersPage.currentPage
}

export const getIsFetchingFromState = (state: any) => {
    return state.usersPage.isFetching
}

export const getIsFollowInProgressFromState = (state: any) => {
    return state.usersPage.isFollowingInProgress
}


