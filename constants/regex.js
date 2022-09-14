const nameRegEx = /^[a-z ,.'-]+$/i;
const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegEx =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/; // special/number/capital/lowercase
const urlRegEx =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;

module.exports = {
    nameRegEx,
    emailRegEx,
    passwordRegEx,
    urlRegEx,
};
