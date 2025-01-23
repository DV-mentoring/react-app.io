import { ITask } from '../../shared/api/api'

export const filteredTasksByDay = (tasks: ITask[], day: string) => {
    const today = new Date()
    return tasks.filter((task) => {
        const taskDate = new Date(task.date)
        if (day === 'Yesterday') {
            const yesterday = new Date(today)
            yesterday.setDate(today.getDate() - 1)
            return taskDate.toDateString() === yesterday.toDateString()
        }
        if (day === 'Upcoming') {
            return taskDate > today
        }
        return taskDate.toDateString() === today.toDateString()
    })
}
