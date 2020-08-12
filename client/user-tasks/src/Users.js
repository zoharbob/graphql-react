import React, {useState} from 'react';
import { List, Button, Input, DatePicker, message } from 'antd';
import Dialog from './Dialog';
import './App.css';
import moment from 'moment';
import './App.css';
import { isEmail } from 'validator';

const Users = ({ data, addUser, deleteUser, editUser }) => {

    const [visible, setVisibility] = useState(false);
    const [formData, setFormData] = useState({name:  '', surname: '', email: '', birthDate: ''});
    const [isEditMode, setIsEditMode] = useState(false);

    const userHeader = (
        <div>
            <span style={{marginRight: 10}}>Users</span>
            <Button type="primary" onClick={() => setVisibility(true)}>Add user</Button>
        </div>
    );

    const handleInputChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    };

    const handleDateChange = (date, dateString) => {
        setFormData({
            ...formData,
            birthDate: date
        });
    };

    const onModalOk = () => {
        if(Object.values(formData).some(item => item.length === 0)) {
            message.error('one of the fields is empty!');
            return;
        }
        if(!isEmail(formData.email)) {
            message.error('email is not valid!');
            return;
        }

        isEditMode ? editUser(formData) : addUser(formData);
        setVisibility(false);
        setIsEditMode(false);
        setFormData({name:  '', surname: '', email: '', birthDate: ''});
    };

    const onModalCancel = () => {
        setVisibility(false);
    };

    const handleDelete = id => {
        deleteUser(id);
    };

    const handleEdit = userId => {
        const user = data.find(({ id }) => id === userId);

        setVisibility(true);
        setIsEditMode(true);
        setFormData({
            ...user,
            birthDate: moment(user.birth_date)
        });
    };

    const disabledDate = current => {
        return current && current < moment().endOf('day');
    }

    return (
        <div className="list-container">
            <List
                header={userHeader}
                bordered
                dataSource={data}
                renderItem={({ id, name, surname, email, birth_date }) => (
                    <List.Item>
                        <div className="list-item-container">
                            <h3>Name: {name}</h3>
                            <h3>Surname: {surname}</h3>
                            <h3>Email: {email}</h3>
                            <h3>Birth Date {moment(birth_date).format("DD/MM/YYYY")}</h3>
                            <div>
                                <Button type="primary" onClick={() => handleDelete(id)} danger>Delete</Button>
                                <Button type="secondary" onClick={() => handleEdit(id)}>Edit User</Button>
                            </div>
                        </div>
                    </List.Item>
                )}
            />

            <Dialog visible={visible} onOk={onModalOk} onCancel={onModalCancel} title="Add User">
                <div className="field-container">
                    <Input name="name" placeholder="name" onChange={handleInputChange} value={formData.name} />
                </div>
                <div className="field-container">
                    <Input name="surname" placeholder="surname" onChange={handleInputChange} value={formData.surname} />
                </div>
                <div className="field-container">
                    <Input name="email" placeholder="email" onChange={handleInputChange} value={formData.email} />
                </div>
                <div className="field-container">
                    <DatePicker
                        onChange={handleDateChange}
                        disabledDate={disabledDate}
                        value={formData.birthDate}
                    />
                </div>
            </Dialog>
        </div>
    )
};

export default Users;