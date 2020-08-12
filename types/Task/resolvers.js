const { connection } = require('../../db.js');

const getTasks = async () => {
    return await new Promise(resolve => {
        connection.query('SELECT * from task_mgmt', (err, rows) => {
            if(err) throw err;

            resolve(rows);
        });
    });
}

const getTasksByUserId = async (_, { id }) => {
    return await new Promise(resolve => {
        connection.query(`SELECT DISTINCT user_mgmt.id AS userId, task_mgmt.id AS taskId, task_mgmt.name, task_mgmt.status FROM 
            user_task INNER JOIN user_mgmt ON user_task.UserId = user_mgmt.id
            INNER JOIN task_mgmt ON user_task.TaskId = task_mgmt.id WHERE user_mgmt.id = ?`, id, (err, rows) => {
            if (err) throw err;

            resolve(rows);
        });
    });
}

const addTask = async (_, { taskInput }) => {
    return await new Promise(resolve => {
        connection.query(`INSERT INTO task_mgmt SET ?`, taskInput, (err, result) => {
            if(err) throw err;

            connection.query(`SELECT * from task_mgmt ORDER BY ID DESC LIMIT 1`, (err, rows) => {
                if (err) throw err;

                resolve(rows[0]);
            });
        });
    });
}

const deleteTask = async (_, { id }) => {
    return new Promise(resolve => {
        connection.query(`DELETE FROM task_mgmt WHERE id = ?`, [id] ,(err, rows) => {
            if(err) {
                return resolve();
            }

            rows.affectedRows ? resolve(id) : resolve("ID not found");
        });
    })
}

const updateTask = async (_, { id, taskInput }) => {
    return new Promise(resolve => {
        connection.query(`UPDATE task_mgmt SET ? WHERE ?`, [taskInput, {id}], (err, rows) => {
            if(err) throw err;

            if(rows.affectedRows) {
                resolve ({
                    id,
                    ...taskInput
                })
            }
        });
    });
}

module.exports = {
    getTasks,
    getTasksByUserId,
    addTask,
    deleteTask,
    updateTask
}