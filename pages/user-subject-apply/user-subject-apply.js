// pages/user-subject-apply/user-subject-apply.js
var util = require('../../utils/util.js');
var user = require('../../service/user.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:{},
        coach:{},
        subjects:[],
        subjectsIndex:0,
        place:'',

        items: ["S弯", "起步", "直角转弯"],
        itemsIndex: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //console.log(options);
        var that = this;
        util.auth(function () {
            that.setData({
                userInfo: user.get_info(),
                options: options
            });
            that.loadSubjects();
            that.loadMyCoach();
            that.loadItems();
        });
    },

    /**
     * 载入训练
     */
    loadSubjects:function(){
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/subject/user_subjects',
            method: 'post',
            data: {
                user_id: this.data.userInfo.id,
            },
            success: function (res) {
                if (res.data.code == 200) {
                    that.setData({
                        subjects: res.data.data,
                        place: res.data.data[0].subject_place
                    });
                }

            }
        })
    },

    /**
     * 切换训练时间
     */
    bindDayChange: function (e) {
        var list = this.data.subjects;
        for(var i=0;i<list.length;i++){
            if (i == e.detail.value){
                this.setData({
                    place:list[i].subject_place
                });
            }
        }
        this.setData({
            subjectsIndex: e.detail.value
        })
    },

    /**
     * 加载教练
     */
    loadMyCoach: function () {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/user/user_coach',
            method: 'post',
            data: {
                user_id: this.data.userInfo.id
            },
            success: function (res) {
                if (res.data.code == 200) {
                    that.setData({
                        coach: res.data.data.coach
                    });
                }

            }
        })
    },

    /**
     * 加载可联系的项
     */
    loadItems: function () {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/subject/user_subject_item',
            method: 'post',
            data: {
                user_id: this.data.userInfo.id
            },
            success: function (res) {
                if (res.data.code == 200) {
                    that.setData({
                        items: res.data.data
                    });
                }

            }
        })
    },

    /**
     * 练习项目切换
     */
    bindItemChange: function (e) {
        this.setData({
            itemsIndex: e.detail.value
        })
    },

    bindSubmit:function(){
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/subject/make_subjectapply',
            method: 'post',
            data: {
                user_id: this.data.userInfo.id,
                subject_item_id: this.data.items[this.data.itemsIndex].id,
                subject_id: this.data.subjects[this.data.subjectsIndex].subject_id,
                subject_type:this.data.options.subject_type
            },
            success: function (res) {
                if (res.data.code == 200) {
                    wx.showToast({
                        title: res.data.msg,
                        icon:"success",
                        duration:1500
                    });
                    setTimeout(function () {
                        wx.navigateBack({
                            delta: 1
                        })
                    }, 1500);
                }else{
                    wx.showToast({
                        title: res.data.msg,
                        icon: "none",
                        duration: 1500
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