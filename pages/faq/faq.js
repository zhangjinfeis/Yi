// pages/faq/faq.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
        list_bottom:false,

        page:1,
        pageSize:10
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.scrollMore({
            page:this.data.page,
            pageSize:this.data.pageSize
        });
    },

    /**
     * 加载更多
     */
    scrollMore:function(param){
        if (this.data.list_bottom) {
            return false;
        }
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/question/questions',
            method: 'post',
            data: {
                page: param.page,
                pageSize: param.pageSize
            },
            success: function (res) {
                var data = res.data.data;
                for(var i = 0;i < data.length;i++){
                    data[i]['is_open'] = false;
                }
                that.setData({
                    list: that.data.list.concat(res.data.data)
                });
                //是否到底部
                if (Math.ceil(res.data.count / that.data.pageSize) <= that.data.page) {
                    that.setData({
                        list_bottom: true
                    });
                }
            }
        })
    },

    toggleItem:function(e){
        var index = e.currentTarget.dataset.index;
        var data = this.data.list;
        data[index].is_open = !e.currentTarget.dataset.open;
        this.setData({
            list:data
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
        this.setData({
            'page': this.data.page + 1
        });
        this.scrollMore({
            page: this.data.page,
            pageSize: this.data.pageSize
        });
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },


})