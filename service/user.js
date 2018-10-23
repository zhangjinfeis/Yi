
/**
 * 会员是否登录
 */
function is_login(){
    var app = getApp();
    return app.globalData.userInfo.phone?true:false;
}

/**
 * 获取会员信息
 */
function get_info(){
    var app = getApp();
    return app.globalData.userInfo;
}

/**
 * 更新会员信息
 */
function set_info(arr){
    var app = getApp();
    app.globalData.userInfo = arr;
}



module.exports = {
    is_login:is_login,
    get_info:get_info,
    set_info:set_info
}