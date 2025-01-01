import clsx from 'clsx';
import React from 'react'

type Props = {
    name: string;
    buttonComponent?: any;
    isSmallText?: boolean;
}

const Header = ({ name, buttonComponent, isSmallText = false }: Props) => {
    return (
        <div className='mb-5 flex justify-between items-center'>
            <h1 className={clsx('font-semibold dark:text-white', isSmallText ? 'text-lg' : 'text-2xl')}>
                {name}
            </h1>
            {buttonComponent}
        </div>
    )
}

export default Header