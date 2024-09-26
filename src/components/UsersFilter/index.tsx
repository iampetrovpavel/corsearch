import { useState } from 'react';
import classes from './index.module.scss'
import { useClickAway } from '@uidotdev/usehooks';
import { SortFields, User } from '../../types/users';

interface UsersFilter {
    handleChangeFilter: (value: string) => void,
    handleChangeSortBy: (value: SortFields) => void,
    sortBy: string,
    handleChangeSortType: (value: number) => void,
    sortType: number
}

export function UsersFilter(props: UsersFilter) {
    const { handleChangeFilter, handleChangeSortBy, sortBy, handleChangeSortType, sortType } = props
    const [isOpen, setIsOpen] = useState(false);
    const ref = useClickAway<HTMLDivElement>(() => {
        setIsOpen(false);
    });

    const handleOpenModal = () => {
        if (isOpen === false) {
            setIsOpen(true);
        }
    };

    const handleChange = (value: SortFields) => {
        handleChangeSortBy(value)
        setIsOpen(false);
    }

    return (
        <div className={classes.container}>
            <div className={classes.filter}>
                <input className="input" type="text" placeholder="Filter" onChange={(e) => handleChangeFilter(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center'}}>
                <span style={{ fontSize: 20 }}>Sort By:</span>
                <div className={`dropdown ${isOpen ? "is-active" : ""}`}>
                    <div className="dropdown-trigger">
                        <button onClick={handleOpenModal} className="button" aria-haspopup="true" aria-controls="dropdown-menu" style={{ minWidth: 130 }}>
                            <span>{sortBy ? sortBy[0].toUpperCase() + sortBy.slice(1) : 'Select sort...'}</span>
                        </button>
                    </div>
                    <div ref={ref} className="dropdown-menu" id="dropdown-menu" role="menu">
                        <div className="dropdown-content">
                            <a href="#" onClick={() => handleChange('name')} className="dropdown-item">Name</a>
                            <a href="#" onClick={() => handleChange('email')} className="dropdown-item">Email</a>
                        </div>
                    </div>
                </div>
            </div>
            <button
                className="button"
                onClick={() => { handleChangeSortType(sortType * -1) }}
                style={{ width: 76 }}
            >
                {sortType === 1 ? 'ASC' : 'DESC'}
            </button>
        </div>
    )
}