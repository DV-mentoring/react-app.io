import React, { useState, useEffect, FC } from 'react'
import { Box, Container, Pagination } from '@mui/material'
import { TodoStats } from '../todo-stats/TodoStats'
import { TodoTask } from '../../shared/ui/todo/Todo'
import { ButtonAddTask } from '../../shared/ui/button/add-button/ButtonAddTask'
import { MyModal } from '../../shared/ui/modal/MyModal'
import { SelectFilterButton } from '../../shared/ui/button/select-button/SelectFilterButton'
import { useDispatch, useSelector } from 'react-redux'
import { filteredTasksByDay } from '../helpers/helpers'
import {
    selectFilteredTasks,
    selectFilterTask,
} from '../../app/store/tasks/selectors'
import {
    addTask,
    editTask,
    filterTask,
    removeTask,
    toggleTask,
} from '../../app/store/tasks/taskSlice'
import { fetchTasks, IFetchTasksResponse, ITask } from '../../shared/api/api'
import { LIMIT_RENDERED_TASKS } from '../helpers/constants'
import { AppDispatch } from '../../app/store/store'
import { filterType } from '../helpers/types'

interface ITodoListProps {
    day: string
}

const TodoList: FC<ITodoListProps> = ({ day }) => {
    const dispatch = useDispatch<AppDispatch>()
    const tasks: ITask[] = useSelector(selectFilteredTasks)
    const filter = useSelector(selectFilterTask) as filterType

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [quantityPage, setQuantityPage] = useState<number>(0)
    const [openEditModal, setEditModal] = useState<boolean>(false)
    const [currentTask, setCurrentTask] = useState<Partial<ITask> | null>(null) //{}
    const filteredTasks: ITask[] = filteredTasksByDay(tasks || [], day)

    useEffect(() => {
        dispatch(fetchTasks({ currentPage, limit: LIMIT_RENDERED_TASKS })).then(
            (result) => {
                const payload = result.payload as IFetchTasksResponse
                if (payload) {
                    setQuantityPage(
                        Math.ceil(payload.totalCount / LIMIT_RENDERED_TASKS),
                    )
                }
            },
        )
    }, [dispatch, currentPage])

    const deleteTask = (id: number) => {
        dispatch(removeTask(id))
    }

    const toggleTaskStatus = (id: number) => {
        dispatch(toggleTask(id))
    }

    const handleModalOpen = (task?: ITask) => {
        setCurrentTask(
            task || {
                title: '',
                date: new Date().toISOString(),
                isActive: true,
            },
        )
        setEditModal(true)
    }

    const handleModalClose = () => {
        setEditModal(false)
        setCurrentTask(null)
    }

    const addOrUpdateTask = (task: ITask) => {
        if (task.id) {
            dispatch(editTask(task as ITask))
        } else {
            dispatch(
                addTask({
                    ...task,
                    id: Date.now(),
                    isActive: false,
                } as ITask),
            )
        }
    }

    const filterTasks = (filter: filterType) => {
        dispatch(filterTask(filter))
    }

    return (
        <Container>
            <TodoStats tasks={filteredTasks} day={day} />
            <Box className="box-select-button">
                <SelectFilterButton
                    onFilterChange={filterTasks}
                    filter={filter}
                />
            </Box>
            {filteredTasks.map((task: ITask) => (
                <TodoTask
                    key={task.id}
                    task={task}
                    onToggle={toggleTaskStatus}
                    deleteTask={deleteTask}
                    handleEditModalOpen={() => handleModalOpen(task)}
                />
            ))}
            <ButtonAddTask setOpenModal={() => handleModalOpen()} />
            <Pagination
                className="pagination"
                variant="outlined"
                count={quantityPage}
                page={currentPage}
                onChange={(_, num) => setCurrentPage(num)}
            />
            <MyModal
                openModal={openEditModal}
                handleModalClose={handleModalClose}
                initalTask={currentTask || {}}
                onSubmit={(task) => task && addOrUpdateTask(task as ITask)}
            />
        </Container>
    )
}

export { TodoList }
