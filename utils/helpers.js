const connection = require('../config/connection');

const checkUsername = async (username) => {
    const [results, metadata] = await connection.query('select username from user;');
    
    for(let i = 0; i < results.length; i++){
       if(results[i].username === username){
        return false;
       }
    }
    return true;
}

module.exports = checkUsername;