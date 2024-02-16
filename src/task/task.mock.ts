export const createTaskMock = {
    title: 'Task 1',
    description: 'Description of task 1',
}

export const taskMock = {
    id: 1,
    title: 'Task 1',
    description: 'Description of task 1',
    done: false,
    created_at: new Date(),
    updated_at: new Date(),
    active: true
}

export const tasksMock = [
    {
        id: 1,
        title: 'Task 1',
        description: 'Description of task 1',
        done: false,
        created_at: new Date(),
        updated_at: new Date(),
        active: true,
        user: {
            id: 2
        }
    },
    {
        id: 2,
        title: 'Task 2',
        description: 'Description of task 2',
        done: false,
        created_at: new Date(),
        updated_at: new Date(),
        active: true,
        user: {
            id: 1
        }
    }
]
export const updateTaskMock = {
    title: 'Task 1',
    description: 'Description of task 1',
    done: true
}
export const userMock = {
    id: 1,
    name: 'Test User',
    email: 'test.@test.com',
    password: 'password',
    created_at: new Date(),
    updated_at: new Date(),
    active: true
  };