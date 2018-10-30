// pages/user-meal-trade/user-meal-trade.js
var user = require('../../service/user.js');
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},

        //订单菜单
        tradeMenu: [],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,

        content: [[{}, {}, {}], [], [], []],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            activeIndex: options.index,
            userInfo:user.get_info()
        });
        //加载订单menu
        this.loadTradeMenu();
        
    },

    /**
     * 初始化tab
     */
    initTab: function() {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tradeMenu.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tradeMenu.length * that.data.activeIndex 
                });
            }
        });
    },

    /**
     * 选项卡切换
     */
    tabClick: function(e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
        this.loadList();
    },

    /**
     * 订单菜单加载
     */
    loadTradeMenu: function() {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/user/order_menu',
            method: 'post',
            success: function(res) {
                //console.log(res.data.data);
                that.setData({
                    tradeMenu: res.data.data
                });
                var content = [];
                for (var i = 0; i < res.data.data.length; i++) {
                    content.push({
                        list: []
                    });
                }
                that.setData({
                    content: content
                });
                //初始化tab
                that.initTab();
                //初始化列表
                that.loadList();
            }
        })
    },

    /**
     * 加载列表
     */
    loadList: function() {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/user/order_list',
            method: 'post',
            data: {
                user_id: this.data.userInfo.id,
                status: this.data.tradeMenu[this.data.activeIndex].status
            },
            success: function(res) {
                var content = that.data.content;
                content[that.data.activeIndex].list = res.data.data;
                that.setData({
                    content: content
                });
            }
        })
    },

    /**
     * 加载列表
     */
    refreshList: function () {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/user/order_list',
            method: 'post',
            data: {
                user_id: this.data.userInfo.id,
                status: this.data.tradeMenu[this.data.activeIndex].status
            },
            success: function (res) {
                wx.stopPullDownRefresh();
                wx.hideNavigationBarLoading();
                var content = that.data.content;
                content[that.data.activeIndex].list = res.data.data;
                that.setData({
                    content: content
                });
            }
        })
    },

    /**
     * 开启支付
     */
    bindPayStart: function (e) {
        wx.request({
            url: app.globalData.domain + '/api/user/pay_trade',
            method: 'post',
            data: {
                trade_id: e.currentTarget.dataset.tradeid
            },
            success: function (res) {
    
                if(res.data.code == 200){
                    
                    wx.requestPayment({
                        timeStamp: res.data.config.timeStamp+'',
                        nonceStr: res.data.config.nonceStr,
                        package: res.data.config.package,
                        signType: res.data.config.signType,
                        paySign: res.data.config.paySign,
                        success:function(){

                        }
                    });
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})