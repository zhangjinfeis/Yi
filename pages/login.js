// pages/login.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        domain: app.globalData.domain,
        userInfo: {
            "avatarUrl": app.globalData.domain + "/resources/mp/images/default_headimgurl.png",
            "nickName": "未授权用户",

        },
        btnText: "同意并授权",
        btnLoading: false,
        redirectUrl: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            redirectUrl: options.redirect
        });
        wx.login({
            success: res => {
                var that = this;
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                wx.request({
                    url: app.globalData.domain + '/mp/code2session',
                    method: 'post',
                    data: {
                        code: res.code
                    },
                    success(res) {
                        if (res.data.status == 2) { //当新登记用户后需要更新storage
                            //console.log(res.data.data.user);
                            var o_nickName = res.data.data.user.nickName;
                            if (!res.data.data.user.nickName) {
                                res.data.data.user.nickName = that.data.userInfo.nickName;
                                res.data.data.user.avatarUrl = that.data.userInfo.avatarUrl;
                            }
                            app.globalData.userInfo = res.data.data.user;
                            app.globalData.agencyInfo = res.data.data.agency;
                            app.globalData.coachInfo = res.data.data.coach;
                            that.setData({
                                userInfo: res.data.data.user
                            });
                            //当有基本信息
                            if (o_nickName) {
                                that.setData({
                                    btnText: "自动登录中",
                                    btnLoading: true
                                });
                                setTimeout(function() {
                                    wx.redirectTo({
                                        url: that.data.redirectUrl,
                                    })
                                }, 2000);
                            }
                        }
                    }
                })
            }
        })
        /*
        wx.getSetting({
            success:function(res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function (res) {
                            app.globalData.userInfo = res.userInfo;

                        }
                    })
                }
            }
        });
        */
    },

    onGotUserInfo: function(e) {
        //显示当前头像
        this.setData({
            'userInfo.avatarUrl': e.detail.userInfo.avatarUrl,
            'userInfo.nickName': e.detail.userInfo.nickName,
            btnText: "登录中",
            btnLoading: true
        });
        var that = this;
        wx.request({
            url: app.globalData.domain + '/mp/update_info',
            method: "post",
            data: {
                openid: that.data.userInfo.openid,
                userInfo: e.detail.userInfo
            },
            success: function(res) {
                if (res.data.code == 200) {
                    setTimeout(function() {
                        wx.redirectTo({
                            url: that.data.redirectUrl,
                        })
                    }, 1000);
                }


            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})