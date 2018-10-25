// pages/swiper/swiper.js
var user = require('../../service/user.js');
var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        domain: app.globalData.domain,
        //banner
        banner: {
            imgUrls: [
                'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
                'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
            ],
            indicatorDots: true,
            autoplay: true,
            interval: 5000,
            duration: 500,
            circular: true,
        },

        mealList:[],



    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var userInfo = user.get_info();
        console.log(userInfo);


        //加载套餐列表
        this.loadMeal();
        /*
        wx.login({
            success: function(res) {
                console.log(res.code);

            }
        });
        */
        /*
        wx.getUserInfo({
            success: function(res) {
                console.log(res);
            }
        });
        */
        /*
          wx.checkSession({
              success:function(res){
                  console.log(res.errMsg);
              }
          });
          */

    },

    loadMeal:function(){
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/meal/meal_list',
            method: 'post',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (res) {
                that.setData({
                    mealList: res.data.data
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