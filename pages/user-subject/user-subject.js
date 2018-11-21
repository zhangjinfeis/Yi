// pages/user-subject2/user-subject2.js
var util = require('../../utils/util.js');
var user = require('../../service/user.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:{},
        options:{},

        list:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        util.auth(function () {
            that.setData({
                userInfo:user.get_info(),
                options:options
            });
            //that.loadList();
        });
    },

    loadList:function(){
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/subject/user_subjectapply',
            method: 'post',
            data: {
                user_id: this.data.userInfo.id,
                type:this.data.options.subject_type
            },
            success: function (res) {
                if (res.data.code == 200) {
                    that.setData({
                        list: res.data.data
                    });
                }

            }
        })
    },

    /**
     * 预约跳转
     */
    bindSubjectApply: function() {
        wx.navigateTo({
            url: '/pages/user-subject-apply/user-subject-apply?subject_type='+this.data.options.subject_type,
        })
    },

    /**
     * 拨打电话
     */
    bindPhoneCall: function (e) {
        var phone = e.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: phone + ''
        })
    },


    bindCancel:function(e){
        var that = this;
        wx.showModal({
            content: '确定取消预约？',
            success:function(){
                wx.request({
                    url: app.globalData.domain + '/api/subject/del_subjectapply',
                    method: 'post',
                    data: {
                        user_id: that.data.userInfo.id,
                        subject_apply_id: e.currentTarget.dataset.applyid
                    },
                    success: function (res) {
                        if (res.data.code == 200) {
                            var list = that.data.list;
                            for (var i = 0; i < list.length; i++) {
                                if (list[i].subject_apply_id == e.currentTarget.dataset.applyid) {
                                    list.splice(i, 1);
                                }
                            }
                            wx.showToast({
                                title: res.data.msg,
                                icon: 'success',
                                duration: 1500
                            })
                            setTimeout(function () {
                                that.setData({
                                    list: list
                                });
                            }, 1500);
                        }

                    }
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