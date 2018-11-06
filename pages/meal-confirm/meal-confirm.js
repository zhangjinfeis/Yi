// pages/meal-confirm/meal-confirm.js
var app = getApp();
var user = require('../../service/user.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: {},

        plade: [],
        pladeIndex: 0,
        code_text: '获取验证码',

        trade: {
            meal_id: null,
            name: '',
            code: '',
            plade_id: null,
            school: '',
            address: '',
            phone: '',
            sms_code: '',
        },

        inter: null,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //载入套餐信息
        this.loadDetail(options.meal_id);
        //载入学车场地
        this.loadplade();
    },

    /**
     * 套餐信息
     */
    loadDetail: function(id) {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/meal/meal',
            method: 'post',
            data: {
                meal_id: id
            },
            success: function(res) {
                that.setData({
                    detail: res.data.data,
                });
            }
        })
    },

    /**
     * 学车场地
     */
    loadplade: function() {
        var that = this;
        wx.getLocation({
            type: 'gcj02',
            success(res) {
                wx.request({
                    url: app.globalData.domain + '/api/plade/plade_list',
                    method: 'post',
                    data: {
                        lat: res.latitude,
                        lng: res.longitude
                    },
                    success: function(res) {
                        that.setData({
                            plade: res.data.data
                        });
                    }
                })
            }
        })
    },

    /**
     * input填写
     */
    bindKeyInput: function(e) {
        var inputname = e.currentTarget.dataset.inputname;
        var trade = this.data.trade;
        trade[inputname] = e.detail.value;
        this.setData({
            trade: trade
        });
    },

    /**
     * 选择学车场地
     */
    bindPladeChange: function(e) {
        this.setData({
            'trade.plade_id': this.data.plade[e.detail.value].id,
            pladeIndex: e.detail.value
        })
    },

    /**
     * 提交订单
     */
    bindSubmit: function() {
        var that = this;
        var trade = this.data.trade;
        trade.user_id = user.get_info().id;
        trade.meal_id = this.data.detail.id;
        trade.plade_id = this.data.plade[this.data.pladeIndex].id;
        wx.request({
            url: app.globalData.domain + '/api/user/make_order',
            method: 'post',
            data: this.data.trade,
            success: function(res) {
                if (res.data.code == 200) {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'success',
                    });
                    setTimeout(function(){
                        wx.navigateTo({
                            url: 'pages/user-meal-trade/user-meal-trade?index=1',
                        })
                    },1500);
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                    });
                }
            }
        })
    },

    /**
     * 发送验证码
     */
    bindSmsCode: function() {
        var that = this;
        if (this.data.code_text != '获取验证码') {
            return false;
        }
        wx.request({
            url: app.globalData.domain + '/api/sms/make_code',
            method: 'post',
            data: {
                user_id: user.get_info().id,
                phone: this.data.trade.phone
            },
            success: function(res) {
                if (res.data.code == 200) {
                    that.setData({
                        code_text: 60
                    });
                    that.data.inter = setInterval(that.f_text_count, 1000);
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                    });
                }
            }
        })
    },

    /**
     * 验证码倒计时
     */
    f_text_count: function() {
        var sec = parseInt(this.data.code_text);
        if (sec == 0) {
            this.setData({
                code_text: '获取验证码'
            });
            clearInterval(this.data.inter);
            return false;
        }
        sec = sec - 1;
        this.setData({
            code_text: sec
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

    },




})