const BASE_URL = 'https://jsonplaceholder.typicode.com/';

export const fetchTodos = async (currentPage, limit = 10) => {
    try {
        const response = await fetch(`${BASE_URL}/todos?_page=${currentPage}&_limit=${limit}`);
        if (!response.ok) {
            throw new Error('Error fetching todos');
        }
        const totalCount = response.headers.get("X-Total-Count");
        const data = await response.json();
        return {
            tasks: data.map((task) => ({
                id: task.id,
                title: task.title,
                date: new Date(),
                isActive: !task.completed,
            })),
            totalCount: Number(totalCount),
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};