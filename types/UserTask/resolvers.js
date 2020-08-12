const { connection } = require('../../db.js');

const addUserTasks = async (_, { userId, tasks }) => {
    const sql = "INSERT INTO user_task (UserId, TaskId) VALUES ?";
    const values = tasks.map(taskId => [userId, taskId]);

    return new Promise(resolve => {
        connection.query(sql, [values], function(err) {
            if (err) throw err;

            resolve();
        });
    })
}


const deleteTaskByUserIdAndTaskId = async (_, { userId, taskId }) => {
    return new Promise(resolve => {
        connection.query(`DELETE FROM user_task WHERE UserId = ? AND TaskId = ?`, [userId, taskId] ,(err, rows) => {
            if(err) {
                throw err;
            }

            if(rows.affectedRows) {
                resolve(rows.affectedRows);
            }

            resolve();
        });
    })
}

const deleteTasksByUserId = async (_, {id}) => {
    return await new Promise((resolve) => {
        connection.query(`DELETE FROM user_task WHERE UserId = ?`, [id] ,(err, rows) => {
            if(err) {
                throw err;
            }

            if(rows.affectedRows) {
                resolve(rows.affectedRows);
            }

            resolve();
        });
    })
}

module.exports = {
    addUserTasks,
    deleteTaskByUserIdAndTaskId,
    deleteTasksByUserId,
}