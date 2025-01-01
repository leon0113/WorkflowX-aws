'use client'
import { useSearchQuery } from '@/state/api'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { debounce } from 'lodash'
import Header from '@/components/Header'
import TaskCard from '@/components/TaskCard'
import ProjectCard from '@/components/ProjectCard'
import UserCard from '@/components/UserCard'

const Search = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const { data, isError, isLoading } = useSearchQuery(searchTerm, { skip: searchTerm.length < 3 });

    const handleSearch = debounce(
        (e: ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value);
        },
        500
    );

    useEffect(() => {
        return handleSearch.cancel
    }, [handleSearch.cancel])

    return (
        <div className='p-8'>
            <Header name='Search' />
            <div className="">
                <input type="text" placeholder='Search...' className='w-1/2 rounded border p-3 shadow'
                    onChange={handleSearch} />
            </div>
            <div className='p-5'>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Something went wrong!😥</p>}
                {
                    !isLoading && !isError && data && (
                        <div>
                            {data.tasks && data.tasks?.length > 0 && (
                                <h2 className='text-lg font-semibold p-2'>Tasks:</h2>
                            )}
                            {data.tasks?.map((task) => (
                                <TaskCard key={task.id} task={task} />
                            ))}

                            {data.projects && data.projects?.length > 0 && (
                                <h2 className='text-lg font-semibold p-2'>Projects:</h2>
                            )}
                            {data.projects?.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}

                            {data.users && data.users?.length > 0 && (
                                <h2 className='text-lg font-semibold p-2'>Users:</h2>
                            )}
                            {data.users?.map((user) => (
                                <UserCard key={user.userId} user={user} />
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Search