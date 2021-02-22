import React from 'react'
import style from './Paginator.module.css'

type PaginatorType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChanged: (page: number) => void
}

export const Paginator = ({ currentPage, totalUsersCount, pageSize, onPageChanged }: PaginatorType) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
        
    let pages = []
    for(let i=1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
            <div>
                {pages.map( p => {
                     return <span key={p} className={currentPage === p ? style.selectedPage : style.otherPage}
                    onClick={() => onPageChanged(p)}>{p}</span>
                })}
            </div>
    )
}