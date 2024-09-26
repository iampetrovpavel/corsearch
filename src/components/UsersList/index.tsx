import { useEffect, useState } from "react"
import { Adapter } from "../../adapters/base"
import { SortFields, User } from "../../types/users"
import { UsersFilter } from "../UsersFilter"
import classes from './index.module.scss'
import { UserCard } from "../UserCard"

interface UsersListPropsType<T> {
    adapter: Adapter<T>
}

type UsersFilter = {
    fields: [],
    value: string | null
}

export default function UsersList({ adapter }: UsersListPropsType<User>) {
    const [filter, setFilter] = useState<string>('')
    const [sortBy, setSortBy] = useState<SortFields>('name')
    const [sortType, setSortType] = useState<number>(1)
    const [users, setUsers] = useState<User[] | null>()

    useEffect(() => {
        adapter.find()
            .then(users => {
                setUsers(users)
            })
            .catch(() => {
                setUsers(null)
            })
    }, [])

    if (typeof users === 'undefined') return <h3>Loading...</h3>
    if (typeof users === null) return <h3>Something went wrong...</h3>

    function handleChangeFilter(value: string) {
        setFilter(value)
    }

    function handleChangeSortBy(value: SortFields) {
        setSortBy(value)
    }

    function handleChangeSortType(value: number) {
        setSortType(value)
    }

    const filteredUsers = users?.filter((user) => {
        if (user.name.toLowerCase().includes(filter.toLowerCase())) return true
        return false
    })

    const sortedUsers = filteredUsers?.sort((a, b) => sortType * a[sortBy].localeCompare(b[sortBy]))

    return (
        <>
            <UsersFilter
                handleChangeFilter={handleChangeFilter}
                handleChangeSortBy={handleChangeSortBy}
                sortBy={sortBy}
                handleChangeSortType={handleChangeSortType}
                sortType={sortType}
            />
            {sortedUsers?.length === 0 && <div className={classes.empty} style={{ color: 'lightgrey' }}>Empty</div>}
            <div className={classes.users_list}>
                {sortedUsers?.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </>
    )
}