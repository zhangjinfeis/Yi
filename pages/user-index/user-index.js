// pages/user-index/user-index.js
var user = require('../../service/user.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: app.globalData.userInfo,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        //if(!user.get_info.phone){
        //wx.redirectTo({url:'/pages/user-login/user-login'});
        // }

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

    },


    getUserInfo: function(e) {
        var userInfo = e.detail.userInfo;
        var that = this;
        wx.request({
            url: app.globalData.domain+'/mp/update_info',
            method:'post',
            data:{openid:app.globalData.userInfo.openid,userInfo:userInfo},
            success:function(res){
                if(res.data.status == 1){
                    that.setData({
                        'userInfo':res.data.data
                    });
                    app.globalData.userInfo = res.data.data;
                    wx.setStorage({
                        key:'user',
                        data: res.data.data
                    })
                }
            }
        })
    }

})