// pages/agency-commission-apply/agency-commission-apply.js
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

        //当前提现记录
        apply:{},

        //提现方式
        typeItems: [{
                name: '支付宝',
                value: '1'
            },
            {
                name: '银联卡',
                value: '2'
            }
        ],
        typeIndex: 0,

        //待提交数据
        param: {
            alipay: "",
            card_number: "",
            bank: "",
            payee: "",
            money: 0,
        },

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        util.auth(function() {
            util.authAgency();

            that.setData({
                agencyInfo: agency.get_info()
            });

            //当前申请中的项目
            that.loadApply();


        });
    },

    /**
     * 当前申请中的项目
     */
    loadApply:function(){
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/agency/cash_wait',
            method: 'post',
            data: {code:agency.get_info().code},
            success: function (res) {
                if (res.data.code == 200) {
                    that.setData({
                        apply:res.data.data
                    });
                }

            }
        })
    },

    /**
     * 提现方式选择
     */
    radioChange: function(e) {
        this.setData({
            typeIndex: e.detail.value
        });
    },

    /**
     * input填写
     */
    bindKeyInput: function(e) {
        var inputname = e.currentTarget.dataset.inputname;
        var param = this.data.param;
        param[inputname] = e.detail.value;
        this.setData({
            submit: param
        });
    },

    /**
     * 提交提现申请
     */
    bindSubmit: function() {
        var that = this;
        var param = this.data.param;
        param.type = this.data.typeItems[this.data.typeIndex].value;
        param.code = agency.get_info().code;
        wx.request({
            url: app.globalData.domain + '/api/agency/cash_withdrawal',
            method: 'post',
            data: param,
            success: function(res) {
                if(res.data.code == 200){
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
                        icon:"none"
                    })
                }
                
            }
        })
    },

    /**
     * 重新申请
     */
    bindReapply:function(){
        this.setData({
            'apply':{}
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