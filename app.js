//app.js
var user = require ('./service/user.js');

App({
    onLaunch: function() {
        // 登录获取openid
        /*
        wx.login({
            success: res => {
                var that = this;
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                wx.request({
                    url: this.globalData.domain +'/mp/code2session', 
                    method:'post',
                    data: {
                        code:res.code
                    },
                    success(res) {
                        console.log(res.data);
                        if(res.data.status == 2){  //当新登记用户后需要更新storage
                            that.globalData.userInfo = res.data.data;
                        }
                    }
                })
            }
        })
        */

    },
    globalData: {
        domain: "https://mp.whrango.com",
        userInfo: {},
        agencyInfo: {},
        coachInfo: {},
    },
})