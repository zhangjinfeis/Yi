
/**
 * 代理是否登录
 */
function is_login() {
    var app = getApp();
    return app.globalData.agencyInfo.id ? true : false;
}

/**
 * 获取代理信息
 */
function get_info() {
    var app = getApp();
    return app.globalData.agencyInfo;
}

/**
 * 更新代理信息
 */
function set_info(arr) {
    var app = getApp();
    app.globalData.agencyInfo = arr;
}



module.exports = {
    is_login: is_login,
    get_info: get_info,
    set_info: set_info
}