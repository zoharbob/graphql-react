import React, {useState} from 'react';
import {Button, Input, List, Select, message} from 'antd';
import Dialog from './Dialog';
import './App.css';

const { Option } = Select;

export const statusOptions = {
    created: 'Created',
    in_progress: 'In Progress',
    done: 'Done',
};

const Tasks = ({ data, addTask, deleteTask, editTask }) => {

    const [visible, setVisibility] = useState(false);
    const [formData, setFormData] = useState({name: '', status: ''});
    const [isEditMode, setIsEditMode] = useState(false);

    const tasksHeader = (
        <div>
            <span style={{marginRight: 10}}>Tasks</span>
            <Button type="primary" onClick={() => setVisibility(true)}>Add Task</Button>
        </div>
    );

    const onModalOk = () => {
        if(Object.values(formData).some(item => item.length === 0)) {
            message.error('one of the fields is empty!');
            return;
        }

        isEditMode ? editTask(formData) : addTask(formData);
        setVisibility(false);
        setIsEditMode(false);
        setFormData({name:  '', status: ''})
    };

    const onModalCancel = () => {
        setVisibility(false);
    };

    const taskNameChange = event => {
        setFormData({
            ...formData,
            name: event.target.value
        })
    };

    const statusChange = status => {
      setFormData({
          ...formData,
          status
      })
    };

    const handleDelete = id => {
        deleteTask(id);
    };

    const handleEdit = taskId => {
        const task = data.find(({ id }) => id === taskId);

        setVisibility(true);
        setIsEditMode(true);
        setFormData(task);
    };

    return (
        <div className="list-container">
            <List
                header={tasksHeader}
                bordered
                dataSource={data}
                renderItem={({ id, name, status }) => (
                    <List.Item>
                        <div className="list-item-container">
                            <h3>Name: {name}</h3>
                            <h3>Status: {statusOptions[status]}</h3>
                            <div>
                                <Button type="primary" onClick={() => handleDelete(id)} danger>Delete</Button>
                                <Button type="secondary" onClick={() => handleEdit(id)}>Edit Task</Button>
                            </div>
                        </div>
                    </List.Item>
                )}
            />

            <Dialog visible={visible} onOk={onModalOk} onCancel={onModalCancel} title="Add Task">
                <div className="field-container">
                    <Input name="name" placeholder="name" onChange={taskNameChange} value={formData.name} />
                </div>
                <Select placeholder="Select Task" className="dialog-options" onChange={statusChange} value={formData.status}>
                    <Option key="created" value="created">Created</Option>
                    <Option key="inProgress" value="in_progress">In-Progress</Option>
                    <Option key="done" value="done">Done</Option>
                </Select>
            </Dialog>
        </div>
    )
};

export default Tasks;