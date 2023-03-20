module.exports = {
    //Verify that redered post belongs to the currently signed in user
    isAuthor: (value1, value2) => {
        return value1 === value2;
    },
};