import React from 'react';
import 'antd/dist/antd.css';
import Users from './Users';
import Tasks from './Tasks';
import AddUserTask from './AddUserTask';
import UserTasks from './UserTasks';
import {message} from 'antd'
import * as requests from './request';
import './App.css';

function App() {

  const [users, setUsers] = React.useState([]);
  const [tasks, setTasks] = React.useState([]);
  const [userTasks, setUserTasks] = React.useState([]);

  React.useEffect(() => {
    requests.getUsers().then(({data: {data}}) => {
        if(data) {
            setUsers(data.getUsers);
        }
    });
    requests.getTasks().then(({data: {data}}) => {
        if(data) {
          setTasks(data.getTasks);
        }
    })
  }, []);

    const sendUserTasks = ({selectedUser, selectedTasks}) => {
        requests.sendUserTasks(selectedUser, selectedTasks).then(() => {
            fetchTasksByUserId(selectedUser);
        });
    };
    
    const fetchTasksByUserId = userId => {
        requests.fetchTasksByUserId(userId).then(({data: {data}}) => {
            if(data) {
                setUserTasks(data.getTasksByUserId);
            }
        });
    };
    
    const addUser = formData => {
        requests.addUser(formData).then(() => {
            requests.getUsers().then(({data: {data}}) => {
                setUsers(data.getUsers);
            })
        }).catch(err => err);
    };
    
    const addTask = formData => {
        requests.addTask(formData).then(() => {
            requests.getTasks().then(({data: {data}}) => {
                if(data) {
                    setTasks(data.getTasks);
                }
            })
        });
    };
    
    const deleteUser = userId => {
        requests.deleteUser(userId).then(({data: {data}})  => {
            if(data?.deleteUser) {
                requests.getUsers().then(({data: {data}}) => {
                    setUsers(data.getUsers);
                });
            } else {
                message.error('The user is linked to tasks, unlink user from tasks first');
            }
        }).catch(err => {
            message.error('failed to delete');
        });
    };
    
    const deleteTask = taskId => {
        requests.deleteTask(taskId).then(({data: {data}}) => {
            if(data?.deleteTask) {
                requests.getTasks().then(({data: {data}}) => {
                    setTasks(data.getTasks);
                })
            } else {
                message.error('The task is linked to a user, unlink task from user first');
            }
        }).catch(err => {
            message.error('failed to delete');
        });
    };
    
    const deleteUserTasks = userId => {
        requests.deleteUserTasks(userId).then(() => {
            fetchTasksByUserId(userId);
        });
    };
    
    const deleteSpecificUserTask = (userId, taskId) => {
        requests.deleteSpecificUserTask(userId, taskId).then(() => {
            fetchTasksByUserId(userId);
        });
    };
    
    const editTask = ({id, ...formData}) => {
        requests.editTask(id, formData).then(() => {
            requests.getTasks().then(({data: {data}}) => {
                if(data) {
                    setTasks(data.getTasks);
                }
            }).catch(err => err)
        });
    };
    
    const editUser = ({id, ...formData}) => {
        requests.editUser(id, formData).then(() => {
            requests.getUsers().then(({data: {data}}) => {
                if(data) {
                    setUsers(data.getUsers);
                }
            }).catch(err => err);
        });
    };

  return (
    <div className="App">
        <Users 
            data={users} 
            addUser={addUser} 
            deleteUser={deleteUser}
            editUser={editUser}
        />
        <Tasks
            data={tasks}
            addTask={addTask}
            deleteTask={deleteTask}
            editTask={editTask}
        />
        <UserTasks
            users={users}
            data={userTasks}
            fetchTasksByUserId={fetchTasksByUserId}
            deleteSpecificUserTask={deleteSpecificUserTask}
            deleteUserTasks={deleteUserTasks}
        />
        <AddUserTask users={users} tasks={tasks} sendUserTasks={sendUserTasks} />
    </div>
  );
}

export default App;
