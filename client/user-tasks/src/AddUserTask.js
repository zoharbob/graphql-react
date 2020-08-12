import React, { useState } from 'react';
import { Button, Select } from 'antd';
import './App.css';

const { Option } = Select;

const AddUserTask = ({ users, tasks, sendUserTasks }) => {

    const [selectedTasks, setSelectedTasks] = useState([]);
    const [selectedUser, setSelectedUser] = useState();

    const handleChangeTasks = value => {
        setSelectedTasks(value);
    };

    const handleChangeUser = value => {
        setSelectedUser(value);
    };

    const addTaskToUser = () => {
        sendUserTasks({selectedUser, selectedTasks});
        setSelectedUser('');
        setSelectedTasks([]);
    };

    return (
        <div>
            <h3>Add Tasks to User</h3>
            <Select placeholder="Select User" className="dialog-options" onChange={handleChangeUser} value={selectedUser}>
                {users.map(({ id, name }) => (
                    <Option key={id} value={id}>{name}</Option>
                ))}
            </Select>

            <Select placeholder="Select Task" mode="multiple" className="dialog-options" onChange={handleChangeTasks} value={selectedTasks}>
                {tasks.map(({ id, name }) => (
                    <Option key={id} value={id}>{name}</Option>
                ))}
            </Select>

            <Button type="primary" onClick={addTaskToUser}>Add tasks</Button>
        </div>
    )
}

export default AddUserTask;