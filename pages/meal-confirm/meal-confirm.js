// pages/meal-confirm/meal-confirm.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail:{},

        place: [],
        placeId:0,

        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //载入套餐信息
        this.loadDetail(options.meal_id);
        //载入学车场地
        this.loadPlace();
    },

    loadDetail: function (id) {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/api/meal/meal',
            method: 'post',
            data: {
                meal_id: id
            },
            success: function (res) {
                console.log(res.data.data);
                that.setData({
                    detail: res.data.data
                });
            }
        })
    },

    loadPlace:function(){
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
                    success: function (res) {
                        console.log(res.data.data);
                        that.setData({
                            place: res.data.data
                        });
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

    },

    showTopTips: function() {
        var that = this;
        this.setData({
            showTopTips: true
        });
        setTimeout(function() {
            that.setData({
                showTopTips: false
            });
        }, 3000);
    },
    radioChange: function(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value);

        var radioItems = this.data.radioItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
            radioItems[i].checked = radioItems[i].value == e.detail.value;
        }

        this.setData({
            radioItems: radioItems
        });
    },
    checkboxChange: function(e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);

        var checkboxItems = this.data.checkboxItems,
            values = e.detail.value;
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            checkboxItems[i].checked = false;

            for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                if (checkboxItems[i].value == values[j]) {
                    checkboxItems[i].checked = true;
                    break;
                }
            }
        }

        this.setData({
            checkboxItems: checkboxItems
        });
    },
    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value
        })
    },
    bindTimeChange: function(e) {
        this.setData({
            time: e.detail.value
        })
    },
    bindCountryCodeChange: function(e) {
        console.log('picker country code 发生选择改变，携带值为', e.detail.value);

        this.setData({
            countryCodeIndex: e.detail.value
        })
    },
    bindCountryChange: function(e) {
        console.log('picker country 发生选择改变，携带值为', e.detail.value);

        this.setData({
            countryIndex: e.detail.value
        })
    },
    bindAccountChange: function(e) {
        console.log('picker account 发生选择改变，携带值为', e.detail.value);

        this.setData({
            accountIndex: e.detail.value
        })
    },
    bindAgreeChange: function(e) {
        this.setData({
            isAgree: !!e.detail.value.length
        });
    }


})