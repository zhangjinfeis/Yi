// pages/news/news.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: ["科目一", "科目二", "科目三", "科目三"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,

        list_0: [],
        list_0_page:1,
        list_0_bottom:0,

        list_1: [],
        list_1_page: 1,
        list_1_bottom: 0,

        list_2: [],
        list_2_page: 1,
        list_2_bottom: 0,

        list_3: [],
        list_3_page: 1,
        list_3_bottom: 0,

        pageSize:7,
        cate_id:9
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;

        //加载默认数据
        this.scrollMore({ });


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
    scrollMore:function(param){
        var that = this;
        
        wx.request({
            url: app.globalData.domain + '/api/skill/skill_list',
            data: { page: param.page, pageSize: param.pageSize,cate_id:this.data.cate_id},
            method:"post",
            success:function(res){
                switch (that.data.activeIndex) {
                    case (0): 
                        that.setData({ list_0: that.data.list_0.concat(res.data.data) });
                        break;
                    case (1): that.setData({ list_1: that.data.list_1.concat(res.data.data) }); break;
                    case (2): that.setData({ list_2: that.data.list_2.concat(res.data.data) }); break;
                    case (3): that.setData({ list_3: that.data.list_3.concat(res.data.data) }); break;
                }
            }    
        })
    },


    /**
     * 选项卡切换
     */
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: parseInt(e.currentTarget.id),
        });
        
        switch (this.data.activeIndex) {
            case (0): 
                this.setData({ 'cate_id': 9 });
                if(!this.data.list_0.length){
                    this.scrollMore({page:this.data.list_0_page,pageSize:this.data.pageSize});
                };
                break;
            case (1): 
                this.setData({ 'cate_id': 10 });
                if (!this.data.list_1.length) {
                    this.scrollMore({ page: this.data.list_1_page, pageSize: this.data.pageSize });
                };
                break;
            case (2): 
                this.setData({ 'cate_id': 11 });
                if (!this.data.list_2.length) {
                    this.scrollMore({ page: this.data.list_2_page, pageSize: this.data.pageSize });
                };
                break;
            case (3): 
                this.setData({ 'cate_id': 12 });
                if (!this.data.list_3.length) {
                    this.scrollMore({ page: this.data.list_3_page, pageSize: this.data.pageSize });
                };
                break;
        }
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
        switch (this.data.activeIndex) {
            case (0):
                
                this.setData({ 'list_0_page': this.data.list_0_page+1 });
                console.log(this.data.list_0_page);
                this.scrollMore({ page: this.data.list_0_page, pageSize: this.data.pageSize });
                break;
            case (1):
                this.setData({ 'list_1_page': this.data.list_1_page + 1 });
                this.scrollMore({ page: this.data.list_1_page, pageSize: this.data.pageSize });
                break;
            case (2):
                this.setData({ 'list_2_page': this.data.list_2_page + 1 });
                this.scrollMore({ page: this.data.list_2_page, pageSize: this.data.pageSize });
                break;
            case (3):
                this.setData({ 'list_3_page': this.data.list_3_page + 1 });
                this.scrollMore({ page: this.data.list_3_page, pageSize: this.data.pageSize });
                break;
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },



    


})