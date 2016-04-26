var isAdmin = function (req) {
    return true;
};

var isUser = function (req) {
    return true;
};

module.exports = {
    isAdmin: isAdmin,
    isUser: isUser
}
