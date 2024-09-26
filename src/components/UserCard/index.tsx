import { User } from '../../types/users'
import classes from './index.module.scss'

export function UserCard({user}: {user: User}) {
    return (
        <div className={["card", classes.card].join(' ')}>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">{user.name}</p>
                        <p className="subtitle is-6">{user.email}</p>
                    </div>
                </div>

                <div className="content">
                    Address: {Object.entries(user.address).filter(([key, value])=>(key !== 'geo')).map(([key, value])=>(`${value} `))}
                    <br/>
                    <a href="#">{user.website}</a>
                    {/* <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> */}
                </div>
            </div>
        </div>
    )
}