// pages/swiper/swiper.js
var user = require('../../service/user.js');
var agency = require('../../service/agency.js');
var coach = require('../../service/coach.js');
var util = require('../../utils/util.js');
var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo:user.get_info(),
        agencyInfo:{},
        coachInfo:coach.get_info(),

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
        var that = this;
        util.auth(function(){
            //加载首页导航
            that.loadNav();
            //加载套餐列表
            that.loadMeal();
            //加载banner
            that.loadBanner();
            //学车流程
            that.loadFlow();
            //安全保障
            that.loadInsurance();
        });

        

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
     * 检测代理权限
     */
    bindNoAgency: function () {
        wx.showToast({
            title: '无访问权限',
            icon:'none'
        })
    },

    /**
     * 检测教练权限
     */
    bindNoCoach: function () {
        wx.showToast({
            title: '无访问权限',
            icon: 'none'
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