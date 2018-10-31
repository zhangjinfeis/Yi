// pages/user-guestbook/user-guestbook.js
var user = require('../../service/user.js');
var util = require('../../utils/util.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        input_count: 0,
        body:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        util.auth(function() {

        });
    },

    submitGuestbook:function(){
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/user/guestbook_create',
            method: 'post',
            data: {
                user_id: user.get_info().id,
                body:this.data.body
            },
            success: function (res) {
                if(res.data.code == 200){
                    wx.showToast({
                        title: res.data.msg,
                    });
                    setTimeout(function(){
                        wx.redirectTo({
                            url: '/pages/user-index/user-index',
                        })
                    },1500);
                    
                }else{
                    wx.showToast({
                        title: res.data.msg,
                        icon:'none'
                    })
                }
            }
        })
    },


    /**
     * 输入字数统计
     */
    wheninput: function(e) {
        this.setData({
            input_count: e.detail.value.length,
            body: e.detail.value
        });

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