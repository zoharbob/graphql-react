import React, { useState } from 'react';
import { List, Button, Select } from 'antd';
import { statusOptions } from './Tasks';
import './App.css';

const { Option } = Select;

const UserTasks = ({ users, data, fetchTasksByUserId, deleteUserTasks, deleteSpecificUserTask }) => {

    const [userId, setUserId] = useState();

    React.useEffect(() => {
        if(data[0]?.userId) {
            setUserId(data[0].userId);
        }
    }, [data]);

    const handleSelectUser = userId => {
        fetchTasksByUserId(userId);
        setUserId(userId);
    };
    
    const handleUnlink = () => {
        deleteUserTasks(userId);
    };
    
    const selectedUser = (
        <div className="user-tasks-select-container">
            <span style={{marginRight: 10}}>User Tasks</span>
            <Select placeholder="Select User" className="dialog-options" onChange={handleSelectUser} value={userId}>
                {users.map(({ id, name }) => (
                    <Option key={id} value={id}>{name}</Option>
                ))}
            </Select>
            <div className="unlink-container">
                {data.length ? <Button danger size="small" onClick={handleUnlink}>Unlink user from tasks</Button> : null}
            </div>
        </div>
    );

    return (
        <div className="list-container">
            <List
                header={selectedUser}
                bordered
                dataSource={data}
                renderItem={({ userId, taskId, name, status }) => (
                    <List.Item>
                        <div className="list-item-container">
                            <h3>Name: {name}</h3>
                            <h3>Status: {statusOptions[status]}</h3>
                            <Button type="primary" danger style={{width: 100}} onClick={() => deleteSpecificUserTask(userId, taskId)}>Delete</Button>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    )
};

export default UserTasks;