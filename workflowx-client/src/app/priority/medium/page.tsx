import React from 'react'
import PriorityPage from '../PriorityPage.tsx/page'
import { Priority } from '@/types'


const MediumPriority = () => {
    return (
        <PriorityPage priority={Priority.Medium} />
    )
}

export default MediumPriority