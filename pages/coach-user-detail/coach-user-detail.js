// pages/coach-user-detail/coach-user-detail.js
var coach = require('../../service/coach.js');
var util = require('../../utils/util.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coachInfo: {},
        options: {},
        subject_2: [],
        subject_3: [],
        student:{},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        options.user_id = 40;
        var that = this;
        util.auth(function() {
            that.setData({
                coachInfo: coach.get_info(),
                options: options
            });
            that.loadSubjects();

        });
    },


    //加载科目2、3信息
    loadSubjects: function() {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/coach/check_student',
            method: 'post',
            data: {
                coach_id: this.data.coachInfo.id,
                user_id: this.data.options.user_id
            },
            success: function(res) {
                that.setData({
                    subject_2: res.data.data.subject_2,
                    subject_3: res.data.data.subject_3,
                    student:res.data.student
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