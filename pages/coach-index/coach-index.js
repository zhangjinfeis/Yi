// pages/coach-index/coach-index.js
var coach = require('../../service/coach.js');
var user = require('../../service/user.js');
var util = require('../../utils/util.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coachInfo: {},
        userInfo:{},

        menu:{},

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
        util.auth(function() {
            that.setData({
                coachInfo: coach.get_info(),
                userInfo: user.get_info()
            });
            //加载导航菜单
            that.bindMenu();

            //保证协议id
            that.loadAgreementId();

            //关于我们id加载
            that.loadAboutId();

        });
    },

    bindMenu:function(){
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/coach/my_center',
            method: 'post',
            success: function (res) {
                that.setData({
                    menu: res.data.data
                });
            }
        })
    },

    /**
     * 保证协议id加载
     */
    loadAgreementId: function () {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/agreement/agreement',
            method: 'post',
            success: function (res) {
                that.setData({
                    agreementId: res.data.data.id
                });
            }
        })
    },

    /**
     * 关于我们id加载
     */
    loadAboutId: function () {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/about/about',
            method: 'post',
            success: function (res) {
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

    }
})