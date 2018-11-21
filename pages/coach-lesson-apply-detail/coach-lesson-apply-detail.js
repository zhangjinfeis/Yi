// pages/coach-lesson-apply-detail/coach-lesson-apply-detail.js
var coach = require('../../service/coach.js');
var util = require('../../utils/util.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coachInfo: {},
        options:{},

        subject:{},
        list:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        util.auth(function() {
            that.setData({
                coachInfo: coach.get_info(),
                options: options
            });
            that.loadApply();

        });
    },

    /**
     * 加载预约的学员列表
     */
    loadApply: function() {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/coach/subject_info',
            method: 'post',
            data: {
                subject_id: this.data.options.subject_id,
            },
            success: function(res) {
                //console.log(res.data.data.place);
                that.setData({
                    list: res.data.data,
                    subject:res.data.info
                })
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