import React from 'react'
import PriorityPage from '../PriorityPage.tsx/page'
import { Priority } from '@/types'


const HighPriority = () => {
    return (
        <PriorityPage priority={Priority.High} />
    )
}

export default HighPriority