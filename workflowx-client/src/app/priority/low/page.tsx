import React from 'react'
import PriorityPage from '../PriorityPage'
import { Priority } from '@/types'


const LowPriority = () => {
    return (
        <PriorityPage priority={Priority.Low} />
    )
}

export default LowPriority