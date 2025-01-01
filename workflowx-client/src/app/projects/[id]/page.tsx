'use client'

import React, { useState } from 'react'
import ProjectHeader from './ProjectHeader'
import BoardView from '../BoardView'
import List from '../ListView'
import TimelineView from '../TimelineView'
import TableView from '../TableView'
import ModalNewTask from '@/components/ModalNewTask'
import { Status } from '@/types'

type Props = {
    params: {
        id: string
    }
}

const Project = ({ params }: Props) => {
    const { id } = params;
    const [activeTab, setActiveTab] = useState('Board');
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
    const [givenStatus, setGivenStatus] = useState("");

    return (
        <div>
            {/* //TODO: Model for new task  */}
            <ModalNewTask
                isOpen={isModalNewTaskOpen}
                onClose={() => setIsModalNewTaskOpen(false)}
                id={id}
                givenStatus={givenStatus}
                setGivenStatus={setGivenStatus}
            />

            <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} id={id} />
            {
                activeTab === "Board" && (
                    <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} setGivenStatus={setGivenStatus} />
                )
            }
            {
                activeTab === "List" && (
                    <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
                )
            }
            {
                activeTab === "Timeline" && (
                    <TimelineView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
                )
            }
            {
                activeTab === "Table" && (
                    <TableView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
                )
            }
        </div>
    )
}

export default Project