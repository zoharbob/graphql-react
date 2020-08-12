const { connection } = require('../../db.js');

const getUsers = async () => {
    return await new Promise(resolve => {
        connection.query('SELECT * from user_mgmt', (err, rows) => {
            if(err) throw err;

            resolve(rows);
        });
    });
};

const addUser = async (_, { userInput }) => {
    const {name, surname, email, birthDate: birth_date} = userInput;
    const user = {
        name,
        surname,
        email,
        birth_date
    };

    return await new Promise(resolve => {
        connection.query(`INSERT INTO user_mgmt SET ?`, user, (err, result) => {
            if(err) throw err;

            connection.query(`SELECT * from user_mgmt ORDER BY ID DESC LIMIT 1`, (err, rows) => {
                if (err) throw err;

                resolve(rows[0]);
            });
        });
    });
};

const deleteUser = async (_, { id }) => {
    return await new Promise(resolve => {
        connection.query(`DELETE FROM user_mgmt WHERE id = ?`, [id] ,(err, rows) => {
            if(err) {
                return resolve();
            }

            rows.affectedRows ? resolve(id) : resolve("ID not found");
        });
    });
};


const updateUser = async (_, { id, userInput }) => {
    const {birthDate: birth_date, ...user} = userInput;

    return new Promise(resolve => {
        connection.query(`UPDATE user_mgmt SET ? WHERE ?`, [{...user, birth_date}, {id}], (err, rows) => {
            if(err) throw err;

            if(rows.affectedRows) {
                resolve ({
                    id,
                    ...userInput
                })
            }
        });
    });
}

module.exports = {
    getUsers,
    addUser,
    deleteUser,
    updateUser
};