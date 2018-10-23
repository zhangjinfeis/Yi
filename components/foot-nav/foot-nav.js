// component/foot-nav/foot-nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      on:{
          type:'Number',
          value:''
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
      nodes0: [{
          name: 'span',
          attrs: {
              class: 'iconfont',
              style: ''
          },
          children: [{
              type: 'text',
              text: '&#xe600;'
          }]
      }],
      
      nodes1: [{
          name: 'span',
          attrs: {
              class: 'iconfont',
              style: ''
          },
          children: [{
              type: 'text',
              text: '&#xe658;'
          }]
      }],
      nodes2: [{
          name: 'span',
          attrs: {
              class: 'iconfont',
              style: ''
          },
          children: [{
              type: 'text',
              text: '&#xeb61;'
          }]
      }],
      nodes3: [{
          name: 'span',
          attrs: {
              class: 'iconfont',
              style: ''
          },
          children: [{
              type: 'text',
              text: '&#xe603;'
          }]
      }],
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
