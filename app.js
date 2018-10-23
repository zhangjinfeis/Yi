//app.js
var user = require ('./service/user.js');

App({
    onLaunch: function() {
        //wx.clearStorage();
        //判断是否要登记会员
        var userInfo = wx.getStorageSync('user');
        //console.log(userInfo);
        if (!userInfo.openid){
            // 登录获取openid
            var domain = 'https://mp.whrango.com';
            wx.login({
                success: res => {
                    var that = this;
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    wx.request({
                        url: domain +'/mp/code2session', //仅为示例，并非真实的接口地址
                        method:'post',
                        data: {
                            code:res.code
                        },
                        success(res) {
                            if(res.data.status == 2){  //当新登记用户后需要更新storage
                                that.globalData.userInfo = res.data.data;
                                wx.setStorage({
                                    key: 'user',
                                    data: res.data.data
                                });
                            }
                        }
                    })
                }
            })
        }else{
            this.globalData.userInfo = userInfo;
        }
    },
    globalData: {
        domain: "https://mp.whrango.com",
        userInfo:{},
    },
})