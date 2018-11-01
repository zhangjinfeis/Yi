// pages/news/news.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,

        content: [],  //{list:  page:  is_bottom: }

        pageSize: 7,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        var that = this;
        //初始化分类
        wx.request({
            url: app.globalData.domain + '/api/skill/skill_index',
            method:'post',
            success:function(res){
                that.setData({
                    tabs: res.data.data
                });
                var content = [];
                for (var i = 0; i < res.data.data.length;i++){
                    content.push({list:[],page:1,is_bottom:false});
                }
                that.setData({
                    content: content
                });
                //console.log(that.data.content);
                //加载默认数据
                that.scrollMore({
                    page: that.data.content[0].page,
                    pageSize: that.data.pageSize
                });
            }
        })

        
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
    },


    /**
     * 列表加载更多
     */
    scrollMore: function(param) {
        //到达底部不请求
        if (this.data.content[this.data.activeIndex].is_bottom){
            return false;
        }

        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/skill/skill_list',
            data: {
                page: param.page,
                pageSize: param.pageSize,
                cate_id: this.data.tabs[this.data.activeIndex].id
            },
            method: "post",
            success: function(res) {
            
                var content = that.data.content;
                content[that.data.activeIndex].list = that.data.content[that.data.activeIndex].list.concat(res.data.data);
                that.setData({
                    content: content
                });
                //是否到底部
                if (Math.ceil(res.data.count / that.data.pageSize) <= that.data.content[that.data.activeIndex].page) {
                    content = that.data.content;
                    content[that.data.activeIndex].is_bottom = true;
                    that.setData({
                        content: content
                    });
                }
            }
        })
    },


    /**
     * 选项卡切换
     */
    tabClick: function(e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: parseInt(e.currentTarget.id),
        });

        if (!this.data.content[this.data.activeIndex].list.length) {
            this.scrollMore({
                page: this.data.content[this.data.activeIndex].page,
                pageSize: this.data.pageSize
            });
        };
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

        var content = this.data.content;
        content[this.data.activeIndex].page = content[this.data.activeIndex].page+1;
        this.setData({
            content: content
        });

        this.scrollMore({
            page: this.data.content[this.data.activeIndex].page,
            pageSize: this.data.pageSize
        });

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },






})