import React from 'react'
import PriorityPage from '../PriorityPage'
import { Priority } from '@/types'

const UrgentPriority = () => {
    return (
        <PriorityPage priority={Priority.Urgent} />
    )
}

export default UrgentPriority