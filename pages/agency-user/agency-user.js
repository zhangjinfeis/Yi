// pages/agency-user/agency-user.js
var user = require('../../service/user.js');
var agency = require('../../service/agency.js');
var util = require('../../utils/util.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        agencyInfo: {},

        status: 1,
        list: [],
        page: 1,
        pageSize: 10,
        is_bottom: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //options.status = 2;
        var that = this;
        util.auth(function() {
            util.authAgency();

            that.setData({
                agencyInfo: agency.get_info(),
                status: options.status
            });

            that.loadList();

        });

    },

    loadList: function() {
        if (this.data.is_bottom) {
            return false;
        }
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/agency/trade_list',
            method: 'post',
            data: {
                code: this.data.agencyInfo.code,
                status: this.data.status,
                page: this.data.page,
                pageSize: this.data.pageSize
            },
            success: function(res) {
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
                        is_bottom: true
                    });
                }
            }
        })
    },

    /**
     * 拨打电话
     */
    bindPhoneCall: function(e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phone + ''
        })
    },


    /**
     * 设置签约完成
     */
    bindFinishSign: function(e) {
        var that = this;
        wx.showModal({
            title: "",
            content:"确定完成签约？",
            success: function(res) {
                if (res.confirm) {
                    wx.request({
                        url: app.globalData.domain + '/api/agency/edit_trade_status',
                        method: 'post',
                        data: {
                            code: that.data.agencyInfo.code,
                            order_id: e.currentTarget.dataset.id,
                            status: 2,
                        },
                        success: function(res) {
                            if (res.data.code == 200) {
                                wx.showToast({
                                    title: "操作成功",
                                })
                                setTimeout(function() {
                                    that.refreshList();
                                }, 1500);
                            }
                        }
                    })
                }
            }
        });
    },

    /**
     * 设置缴费完成
     */
    bindFinishPay: function (e) {
        var that = this;
        wx.showModal({
            title: '',
            content:'确定完成线下缴费？',
            success: function (res) {
                if (res.confirm) {
                    wx.request({
                        url: app.globalData.domain + '/api/agency/edit_trade_status',
                        method: 'post',
                        data: {
                            code: that.data.agencyInfo.code,
                            order_id: e.currentTarget.dataset.id,
                            status: 3,
                        },
                        success: function (res) {
                            if (res.data.code == 200) {
                                wx.showToast({
                                    title: "操作成功",
                                })
                                setTimeout(function () {
                                    that.refreshList();
                                }, 1500);
                            }
                        }
                    })
                }
            }
        });
    },

    /**
     * 刷新列表
     */
    refreshList: function() {
        var that = this;
        this.setData({
            page: 1
        });
        wx.request({
            url: app.globalData.domain + '/api/agency/trade_list',
            method: 'post',
            data: {
                code: this.data.agencyInfo.code,
                status: this.data.status,
                page: this.data.page,
                pageSize: this.data.pageSize
            },
            success: function(res) {
                wx.stopPullDownRefresh();
                wx.hideNavigationBarLoading();
                that.setData({
                    list: res.data.data
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
        wx.showNavigationBarLoading();
        this.refreshList();
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