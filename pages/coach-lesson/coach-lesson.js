// pages/coach-lesson/coach-lesson.js
var coach = require('../../service/coach.js');
var util = require('../../utils/util.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coachInfo: {},
        list: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        util.auth(function() {
            that.setData({
                coachInfo: coach.get_info()
            });
            that.loadList();

        });
    },

    /**
     * 列表加载
     */
    loadList: function() {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/coach/my_lesson',
            method: 'post',
            data: {
                coach_id: this.data.coachInfo.id,
            },
            success: function(res) {
                that.setData({
                    list: res.data.data
                })
            }
        })
    },

    bindLessonAdd: function(e) {
        wx.navigateTo({
            url: '/pages/coach-lesson-add/coach-lesson-add',
        })
    },

    bindLessonDel: function(e) {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/coach/del_subject',
            method: 'post',
            data: {
                subject_id: e.currentTarget.dataset.lessonid
            },
            success: function(res) {
                if (res.data.code == 200) {
                    var list = that.data.list;
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].id == e.currentTarget.dataset.lessonid) {
                            list.splice(i, 1);
                        }
                    }
                    that.setData({
                        list: list
                    });
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'success',
                        duration: 1500
                    });
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 1500
                    });
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
        this.loadList();
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