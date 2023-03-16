module.exports = {
    isAuthor: (value1, value2) => {
        console.log("Username: " + value1);
        console.log("poster username: " + value2);
        return value1 === value2;
    },
};