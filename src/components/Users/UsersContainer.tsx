import { FC } from 'react'
import {useSelector} from 'react-redux'
import { Users } from './Users'
import { Preloader } from '../common/Preloader/Preloader'
import { getIsFetchingFromState } from '../../redux/users-selectors'


type UsersPagePropsType = {
    pageTitle: string
}

export const UsersPage: FC<UsersPagePropsType> = ({pageTitle}) => {

    const isFetching = useSelector(getIsFetchingFromState)

    return (
        <>
            <h2>{pageTitle}</h2>
            { isFetching ? <Preloader /> : null}
            <Users />
        </>
    )
}