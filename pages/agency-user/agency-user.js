// pages/agency-user/agency-user.js
var agency = require('../../service/agency.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
        page:1,
        pageSize:10
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        agency.set_info([]);
        this.loadList(options.status);
    },

    loadList: function(status) {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/agency/trade_list',
            method: 'post',
            data: {
                code: this.data.agencyInfo.code,
                status: status,
                page:this.data.page,
                pageSize:this.data.pageSize
            },
            success: function (res) {
                var list = that.data.list;
                list = list.concat(res.data.data);
                that.setData({
                    list: list
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