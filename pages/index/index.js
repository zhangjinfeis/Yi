// pages/swiper/swiper.js
var user = require('../../service/user.js');
var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        domain: app.globalData.domain,
        nav: [],
        //banner
        banner: {
            list: [],
            indicatorDots: true,
            autoplay: true,
            interval: 5000,
            duration: 500,
            circular: true,
        },
        //套餐列表
        mealList: [],
        //学车流程id
        flowId: 0,
        //安全保障id
        insuranceId: 0,



    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var userInfo = user.get_info();
        console.log(userInfo);

        //加载首页导航
        this.loadNav();

        //加载套餐列表
        this.loadMeal();

        //加载banner
        this.loadBanner();

        //学车流程
        this.loadFlow();

        //安全保障
        this.loadInsurance();

    },

    /**
     * 套餐列表
     */
    loadMeal: function() {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/meal/meal_list',
            method: 'post',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function(res) {
                that.setData({
                    mealList: res.data.data
                });
            }
        })
    },

    /**
     * 首页导航
     */
    loadNav: function() {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/nav/nav',
            method: 'post',
            success: function(res) {
                that.setData({
                    'nav': res.data.data
                });
            }
        })
    },

    /**
     * banner图
     */
    loadBanner: function() {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/banner/banner',
            method: 'post',
            success: function(res) {
                that.setData({
                    'banner.list': res.data.data
                });
            }
        })
    },

    /**
     * 学车流程
     */
    loadFlow: function() {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/flow/flow',
            method: 'post',
            success: function(res) {
                that.setData({
                    'flowId': res.data.data.id
                });
            }
        })
    },

    /**
     * 学车流程
     */
    loadInsurance: function() {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/insurance/insurance',
            method: 'post',
            success: function(res) {
                that.setData({
                    'insuranceId': res.data.data.id
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