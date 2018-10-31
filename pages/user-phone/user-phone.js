// pages/user-phone/user-phone.js
var user = require('../../service/user.js');
var util = require('../../utils/util.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: {
            phone: '',
            sms_code: '',
        },
        code_text:"获取验证码",
        inter:null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        util.auth(function() {

        });
    },

    submitPhone: function() {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/user/val_phone',
            method: 'post',
            data: {
                user_id: user.get_info().id,
                phone: this.data.detail.phone,
                sms_code: this.data.detail.sms_code,
            },
            success: function(res) {
                if(res.data.code == 200){
                    app.globalData.userInfo.phone = that.data.detail.phone
                    wx.showToast({
                        title: res.data.msg,
                    });
                    setTimeout(function () {
                        wx.navigateBack({
                            delta: 1
                        })
                    }, 1500);
                }else{
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                }
            }
        })
    },

    /**
     * input填写
     */
    bindKeyInput: function(e) {
        var inputname = e.currentTarget.dataset.inputname;
        var detail = this.data.detail;
        detail[inputname] = e.detail.value;
        this.setData({
            detail: detail
        });
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
                phone: this.data.detail.phone
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
    f_text_count: function () {
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

    }
})