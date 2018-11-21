// pages/coach-lesson-add/coach-lesson-add.js
var coach = require('../../service/coach.js');
var util = require('../../utils/util.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        begin_date:'',
        date: "",
        time: [
            {
                name: '上午8:00-11:00',
                key: 1
            },
            {
                name: '下午2:00-5:00',
                key:2
            }
        ],
        timeIndex:0,

        places: [],
        placesIndex: 0,
        param:{},

        coachInfo: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        util.auth(function () {
            that.setData({
                coachInfo: coach.get_info()
            });
            that.loadDate();
            that.loadInfo();
        });
    },

    /**
     * 加载练车场地
     */
    loadInfo:function(){
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/coach/add_form',
            method: 'post',
            data: {
                coach_id: this.data.coachInfo.id,
            },
            success: function (res) {
                //console.log(res.data.data.place);
                that.setData({
                    places: res.data.data.place,
                })
            }
        })
    },

    /**
     * 加载当前日期
     */
    loadDate:function(){
        var mydate = new Date();
        var year = mydate.getFullYear();
        var month = mydate.getMonth()+1;
        var day = mydate.getDate();
        this.setData({
            begin_date: year+"-"+month+"-"+day,
            date: year + "-" + month + "-" + day
        });
    },

    /**
     * 日期切换
     */
    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value
        })
    },

    /**
     * 时间选择
     */
    radioChange: function(e) {
        this.setData({
            timeIndex: e.detail.value
        });
    },

    /**
     * 地点切换
     */
    bindPlacesChange: function (e) {
        this.setData({
            placesIndex: e.detail.value
        })
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

    bindSubmit:function(){
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/coach/add_subject',
            method: 'post',
            data: {
                coach_id: this.data.coachInfo.id,
                day_time: this.data.time[this.data.timeIndex].key,
                max_number : this.data.param.max_number,
                day:this.data.date,
                place_id:this.data.places[this.data.placesIndex].id
            },
            success: function (res) {
                if(res.data.code == 200){
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'success',
                        duration: 1500
                    });
                    setTimeout(function () {
                        wx.navigateBack({
                            delta: 1
                        })
                    }, 1500);
                }else{
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