const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


/**
 * 判断是否登录
 */
const auth = function(callback){
    var app = getApp();
    if(!app.globalData.userInfo.id){
        var p = getCurrentPages()
        var route = "/"+p.pop().__route__
        wx.redirectTo({
            url: '/pages/login?redirect=' + encodeURI(route),
        })
    }else{
        callback();
    }
}

module.exports = {
    formatTime: formatTime,
    auth: auth
}
