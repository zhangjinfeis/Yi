
/**
 * 教练是否登录
 */
function is_login() {
    var app = getApp();
    return app.globalData.coachInfo.id ? true : false;
}

/**
 * 获取教练信息
 */
function get_info() {
    var app = getApp();
    return app.globalData.coachInfo;
}

/**
 * 更新教练信息
 */
function set_info(arr) {
    var app = getApp();
    app.globalData.coachInfo = arr;
}



module.exports = {
    is_login: is_login,
    get_info: get_info,
    set_info: set_info
}