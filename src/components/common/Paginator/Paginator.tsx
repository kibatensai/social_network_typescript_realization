import React, { useState } from 'react'
import style from './Paginator.module.css'

type PaginatorType = {
    currentPage: number
    totalItemsCount: number
    pageSize: number
    onPageChanged: (page: number) => void
    portionSize?: number
}

export const Paginator = ({ currentPage, totalItemsCount, pageSize, onPageChanged, portionSize = 20 }: PaginatorType) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)
        
    let pages = []
    for(let i=1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionNumber = portionNumber * portionSize

    return ( 
            <>
            <div className={style.paginator}>
                {portionNumber > 1 && <button onClick={() => { setPortionNumber(portionNumber - 1)}}>PREV</button>}
            <div>
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionNumber)
                    .map( p => {
                     return <span key={p} className={currentPage === p ? style.selectedPage : style.otherPage}
                    onClick={() => onPageChanged(p)}>{p}</span>
                })}
            </div>
                {portionCount >= portionNumber && <button onClick={() => { setPortionNumber(portionNumber + 1)}}>NEXT</button>}
            </div>
            </>
    )
}