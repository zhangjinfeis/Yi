// pages/user-exam-apply/user-exam-apply.js
var util = require('../../utils/util.js');
var user = require('../../service/user.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        listIndex: 0,

        btnLoading :false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        util.auth(function(){
            that.loadList();
        });
    },


    /**
     * 加载体检班次列表
     */
    loadList:function(){
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/user/exam_reserve',
            method: 'post',
            success: function (res) {
                //console.log(res.data.data);
                that.setData({
                    list: res.data.data
                });
            }
        })
    },

    /**
     * 选择班次
     */
    bindExamChange: function(e) {
        this.setData({
            listIndex: e.detail.value
        })
    },

    submitExamApply:function(){
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/user/exam_create',
            method: 'post',
            data:{
                user_id:user.get_info().id,
                exam_id:this.data.list[this.data.listIndex].id
            },
            success: function (res) {
                if(res.data.code == 200){
                    wx.showToast({
                        title: '预约成功'
                    })
                    setTimeout(function(){
                        wx.redirectTo({
                            url: '/pages/user-exam/user-exam',
                        })
                    },1500);
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