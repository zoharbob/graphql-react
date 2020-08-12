import axios from 'axios';
import moment from "moment";

const headers = {
    'Content-Type': 'application/graphql',
}

const getUsers = () => {
    const query = `
        query {
        getUsers {
            id
            name
            surname
            email
            birth_date
        }
    }`;
    return axios.post('http://localhost:4000/graphql', query, {headers});
};

const getTasks = () => {
    const query = `
        query {
            getTasks {
                id
                name
                status
            }
        }
    `;
    return axios.post('http://localhost:4000/graphql', query, {headers});
};

const sendUserTasks = (selectedUser, selectedTasks) => {
    const variables = {
        userId: selectedUser,
        tasks: selectedTasks
    };
    const query = `mutation ($userId: ID!, $tasks: [ID]) {
        addUserTasks(userId: $userId, tasks: $tasks) 
    }`;
    return axios.post(`http://localhost:4000/graphql`, {query, variables});
};

const fetchTasksByUserId = userId => {
    const variables = {
        userId
    };
    const query = `query ($userId: ID!) {   
        getTasksByUserId(id: $userId) {
            userId
            taskId
            name
            status
        }
    }`;
    return axios.post(`http://localhost:4000/graphql`, {query, variables});
};

const addUser = formData => {
    const variables = {
        formData: {...formData, birthDate: moment(formData.birthDate).format('YYYY-MM-DD')}
    };
    const query = `mutation ($formData: UserInput) {
        addUser(userInput: $formData) {
            id
            name
            surname
            email
            birth_date
        }
    }`;
    return axios.post('http://localhost:4000/graphql', {query, variables});
};

const addTask = formData => {
    const variables = {
        formData
    };
    const query = `mutation ($formData: TaskInput) {
        addTask(taskInput: $formData) {
            id
            name
            status
        }
    }`;
    return axios.post('http://localhost:4000/graphql', {query, variables});
};

const deleteUser = userId => {
    const variables = {
        userId
    };
    const query = `mutation ($userId: ID) {
        deleteUser(id: $userId)
    }`;

    return axios.post(`http://localhost:4000/graphql`, {query, variables});
};

const deleteTask = taskId => {
    const variables = {
        taskId
    };
    const query = `mutation ($taskId: ID) {
        deleteTask(id: $taskId)
    }`;
    return axios.post(`http://localhost:4000/graphql`, {query, variables});
};

const deleteUserTasks = userId => {
    const variables = {
        userId
    };
    const query = `mutation ($userId: ID) {
        deleteTasksByUserId(id: $userId)
    }`;
    return axios.post(`http://localhost:4000/graphql`, {query, variables});
};

const deleteSpecificUserTask = (userId, taskId) => {
    const variables = {
        userId,
        taskId
    };
    const query = `mutation ($userId: ID, $taskId: ID) {
        deleteTaskByUserIdAndTaskId(userId: $userId, taskId: $taskId)
    }`;
    return axios.post(`http://localhost:4000/graphql`, {query, variables});
};

const editTask = (id, formData) => {
    const variables = {
        taskId: id,
        formData
    };
    const query = `mutation ($taskId: ID!, $formData: TaskInput) {
        updateTask(id: $taskId, taskInput: $formData) {
            id 
            name
            status
        }
    }`;
    return axios.post(`http://localhost:4000/graphql`, {query, variables});
};

const editUser = (id, formData) => {
    const { birth_date, ...restFormData } = formData;
    const variables = {
        userId: id,
        formData: {...restFormData, birthDate: moment(restFormData.birthDate).format('YYYY-MM-DD')}
    };
    const query = `mutation ($userId: ID!, $formData: UserInput) {
        updateUser(id: $userId, userInput: $formData) {
            id 
            name
            surname
            email
            birth_date
        }
    }`;
    return axios.post(`http://localhost:4000/graphql`, {query, variables});
};

export {
    getUsers,
    getTasks,
    sendUserTasks,
    fetchTasksByUserId,
    addUser,
    addTask,
    deleteUser,
    deleteTask,
    deleteUserTasks,
    deleteSpecificUserTask,
    editTask,
    editUser
}