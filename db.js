const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'newuser',
    password: 'newpassword',
    database: 'tasks'
});

connection.connect(function(err) {
    if (err) throw err;

    console.log("Connected!");
    const queryUserMgmtTable = "CREATE TABLE if not exists user_mgmt (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50), surname VARCHAR(50), email VARCHAR(50), birth_date DATETIME)";
    const queryTaskMgmtTable = "Create table if not exists task_mgmt(id INT AUTO_INCREMENT PRIMARY KEY, name Varchar(50), status ENUM('created', 'in_progress', 'done') NOT NULL)";
    const queryUser_taskTable = "Create table if not exists user_task(UserId INT, FOREIGN KEY (UserId) REFERENCES user_mgmt(id), TaskId INT, FOREIGN KEY (TaskId) REFERENCES task_mgmt(id))";

    connection.query(queryUserMgmtTable, function (err, result) {
        if (err) throw err;
        console.log("Table user_mgmt created");
    });
    connection.query(queryTaskMgmtTable, function (err, result) {
        if (err) throw err;
        console.log("Table task_mgmt created");
    });
    connection.query(queryUser_taskTable, function (err, result) {
        if (err) throw err;
        console.log("Table user_task created");
    });
});

module.exports = {
    connection
};