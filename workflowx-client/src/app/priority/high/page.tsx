import React from 'react'
import PriorityPage from '../PriorityPage'
import { Priority } from '@/types'


const HighPriority = () => {
    return (
        <PriorityPage priority={Priority.High} />
    )
}

export default HighPriority