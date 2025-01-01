import React from 'react'
import PriorityPage from '../PriorityPage.tsx/page'
import { Priority } from '@/types'

const UrgentPriority = () => {
    return (
        <PriorityPage priority={Priority.Urgent} />
    )
}

export default UrgentPriority