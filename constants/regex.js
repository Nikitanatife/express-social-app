const USER_NAME_REG_EX = /^[a-z ,.'-]+$/i;
const EMAIL_REG_EX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REG_EX =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/; // special/number/capital/lowercase
const URL_REG_EX =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;

module.exports = {
    USER_NAME_REG_EX,
    EMAIL_REG_EX,
    PASSWORD_REG_EX,
    URL_REG_EX,
};
