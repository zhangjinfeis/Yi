// pages/user-index/user-index.js
var user = require('../../service/user.js');
var util = require('../../utils/util.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        //订单菜单
        tradeMenu: [],
        //保证协议id
        agreementId: 0,
        //关于我们id
        aboutId: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        var that = this;
        util.auth(function(){
            that.setData({
                userInfo: user.get_info()
            });

            //加载订单menu
            that.loadTradeMenu();
            //保证协议id
            that.loadAgreementId();
            //关于我们id加载
            that.loadAboutId();
        });
        

    },

    /**
     * 订单菜单加载
     */
    loadTradeMenu: function() {
        
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/user/order_index',
            method: 'post',
            data: {
                user_id: this.data.userInfo.id,
            },
            success: function(res) {
                that.setData({
                    tradeMenu: res.data.data
                });
            }
        })
    },

    /**
     * 保证协议id加载
     */
    loadAgreementId: function() {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/agreement/agreement',
            method: 'post',
            success: function(res) {
                that.setData({
                    agreementId: res.data.data.id
                });
            }
        })
    },

    /**
     * 关于我们id加载
     */
    loadAboutId: function() {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/about/about',
            method: 'post',
            success: function(res) {
                that.setData({
                    aboutId: res.data.data.id
                });
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

    },


    getUserInfo: function(e) {
        var userInfo = e.detail.userInfo;
        var that = this;
        wx.request({
            url: app.globalData.domain + '/mp/update_info',
            method: 'post',
            data: {
                openid: app.globalData.userInfo.openid,
                userInfo: userInfo
            },
            success: function(res) {
                if (res.data.status == 1) {
                    that.setData({
                        'userInfo': res.data.data
                    });
                    app.globalData.userInfo = res.data.data;
                    wx.setStorage({
                        key: 'user',
                        data: res.data.data
                    })
                }
            }
        })
    }

})