// pages/place/place.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        icon_place: [{
            name: 'span',
            attrs: {
                class: 'iconfont',
                style: 'display:inline;'
            },
            children: [{
                type: 'text',
                text: '&#xe65f;'
            }]
        }],
        list: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        wx.getLocation({
            type: 'gcj02',
            success(res) {
                wx.request({
                    url: app.globalData.domain + '/api/plade/plade_list',
                    method: 'post',
                    data: {
                        lat: res.latitude,
                        lng: res.longitude
                    },
                    success: function(res) {
                        that.setData({
                            list: res.data.data
                        });
                    }
                })
            }
        })
    },

    bindOpenLocation: function(e) {
        wx.openLocation({
            latitude: parseFloat(e.currentTarget.dataset.lat),
            longitude:parseFloat(e.currentTarget.dataset.lng),
            scale: 12
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