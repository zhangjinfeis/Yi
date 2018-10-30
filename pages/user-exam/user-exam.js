// pages/user-exam/user-exam.js
var util = require('../../utils/util.js');
var user = require('../../service/user.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        util.auth(function () {
            that.loadExam();
        });
    },


    /**
     * 加载预约信息
     */
    loadExam:function(){
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/user/exam',
            method: 'post',
            data:{user_id:user.get_info().id},
            success: function (res) {
                if(res.data.code == 200){
                    that.setData({
                        detail: res.data.data
                    });
                }
                
            }
        })
    },

    /**
     * 跳转到申请页面
     */
    bindExamApply: function() {
        wx.navigateTo({
            url:"/pages/user-exam-apply/user-exam-apply"
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