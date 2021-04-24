import { FC, useEffect } from 'react'
import { Paginator } from '../common/Paginator/Paginator'
import { User } from './User'
import { UsersSearchForm } from './UsersSearchForm'
import { FilterType, requestUsers, follow, unfollow } from '../../redux/users-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentPageFromState, getIsFollowInProgressFromState,
    getPageSize, getTotalUsersCountFromState,
    getUsersFilter, getUsersFromState } from '../../redux/users-selectors'
import { useHistory } from 'react-router'
import * as queryString from 'querystring'

type PropsType = {
}

type QueryParamsType = {term?: string; page?: string; friend?: string}
export const Users: FC<PropsType> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCountFromState)
    const currentPage = useSelector(getCurrentPageFromState)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsersFromState)
    const isFollowingInProgress = useSelector(getIsFollowInProgressFromState)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        if (!!parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false}

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = filter.friend
        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    const onPageChanged = (page: number) => {
        dispatch(requestUsers(page, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const followHanlder = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollowHandler = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return (
    <div>
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
        </div>
        <Paginator currentPage={currentPage}
            onPageChanged={onPageChanged}
            totalItemsCount={totalUsersCount}
            pageSize={pageSize} />
        {
            users.map(u => <User key={u.id}
                user={u}
                isFollowingInProgress={isFollowingInProgress}
                follow={followHanlder}
                unfollow={unfollowHandler} />)
        }
    </div>
    )

}

