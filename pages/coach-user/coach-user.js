// pages/coach-user/coach-user.js
var coach = require('../../service/coach.js');
var util = require('../../utils/util.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coachInfo: {},
        tradeCate: [

        ],
        tradeCateIndex: 0,
        subjectType: [{
                'type': 2,
                'value': '科目二'
            },
            {
                'type': 3,
                'value': '科目三'
            }
        ],
        subjectTypeIndex: 0,
        param:{
            name: '',
            phone: ''
        },
        

        in_pro: 1, //1-当前学员  9-往期学员

        list: [],
        page: 1,
        pageSize: 15,
        isBottom: false,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        util.auth(function() {
            that.setData({
                in_pro: options.in_pro,
                coachInfo: coach.get_info()
            });
            that.loadSubjectType();
            
        });
    },

    /**
     * 列表加载
     */
    loadList: function() {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/coach/students',
            method: 'post',
            data: {
                in_pro: this.data.in_pro,
                coach_id: this.data.coachInfo.id,
                subject_type: this.data.subjectType[this.data.subjectTypeIndex].type,
                trade_cate: this.data.tradeCate[this.data.tradeCateIndex].id,
                realname: this.data.realname,
                phone: this.data.phone,
                page:this.data.page,
                pageSize:this.data.pageSize
            },
            success: function(res) {
                that.setData({
                    list:res.data.data
                })
                //是否到底部
                if (Math.ceil(res.data.count / that.data.pageSize) <= that.data.page) {
                    that.setData({
                        isBottom: true
                    });
                }
            }
        })
    },

    /**
     * 加载驾照分类
     */
    loadSubjectType: function() {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/common/meal_cate',
            method: 'post',
            success: function(res) {
                that.setData({
                    tradeCate: res.data.data
                });
                that.loadList();
            }
        })
    },

    /**
     * 选择驾照类别
     */
    tradeCateChange: function (e) {
        this.setData({
            tradeCateIndex: e.detail.value
        });
    },

    /**
     * 选择科目
     */
    subjectTypeChange: function (e) {
        this.setData({
            subjectTypeIndex: e.detail.value
        });
    },

    /**
     * 筛选提交
     */
    bindSubmit:function(){
        this.setData({
            page:1,
            list:[]
        });
        this.loadList();
    },

    /**
     * input填写
     */
    bindKeyInput: function (e) {
        var inputname = e.currentTarget.dataset.inputname;
        var param = this.data.param;
        param[inputname] = e.detail.value;
        this.setData({
            param: param
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
        var page = this.data.page;
        this.setData({
            page: page + 1
        });
        this.loadList();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})