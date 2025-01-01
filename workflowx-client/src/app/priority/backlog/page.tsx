import React from 'react'
import PriorityPage from '../PriorityPage'
import { Priority } from '@/types'


const BacklogPriority = () => {
    return (
        <PriorityPage priority={Priority.High} />
    )
}

export default BacklogPriority