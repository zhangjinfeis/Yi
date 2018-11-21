// pages/coach-user-pre/coach-user-pre.js
var coach = require('../../service/coach.js');
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      coachInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      util.auth(function () {
          that.setData({
              coachInfo: coach.get_info()
          });
          //加载导航菜单
          that.bindMenu();
      });
  },

    bindMenu: function () {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/coach/my_students',
            method: 'post',
            success: function (res) {
               //console.log(res.data.data);
                that.setData({
                    menu: res.data.data
                });
            }
        })
    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})