// pages/user-process/user-process.js
var util = require('../../utils/util.js');
var user = require('../../service/user.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        status:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        util.auth(function() {
            that.setData({
                userInfo: user.get_info(),
            });
        });
    },

    loadProcess: function() {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/user/process',
            method: 'post',
            data: {
                user_id: this.data.userInfo.id,
            },
            success: function (res) {
                if (res.data.code == 200) {
                    that.setData({
                        status: res.data.data,
                    });
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
        this.loadProcess();
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