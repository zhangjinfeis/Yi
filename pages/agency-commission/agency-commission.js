// pages/agency-commission/agency-commission.js
var agency = require("../../service/agency.js");
var util = require("../../utils/util.js");
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        page: 1,
        pageSize: 10,
        isBottom: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        util.auth(function () {
            util.authAgency();

            //加载列表
            that.loadList();

        });
    },

    loadList:function(){
        if (this.data.isBottom) {
            return false;
        }
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/agency/commission_history',
            method: 'post',
            data: {
                code: agency.get_info().code,
                page: this.data.page,
                pageSize: this.data.pageSize
            },
            success: function (res) {
                if (res.data.code != 200) {
                    return false;
                }
                var list = that.data.list;
                list = list.concat(res.data.data);
                that.setData({
                    list: list
                });

                //是否到底部
                if (Math.ceil(res.data.count / that.data.pageSize) <= that.data.page) {
                    that.setData({
                        isBottom: true
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
        var page = this.data.page;
        this.setData({
            page: page + 1
        });
        this.loadList();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})