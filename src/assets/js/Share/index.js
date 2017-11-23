import './style.scss'

export default {
  name: 'v-share',
  render: function (createElement) {
    return createElement('div', {
      attrs: {
        id: 'share',
        'data-new': ''
      }
    })
  },
  mounted () {
    setTimeout(() => {
      // eslint-disable-next-line
      new socialShare(this.$el, {
        url: window.location.href.split('?')[0],
        title: document.title,
        source: 'calibur - 天下漫友是一家',
        description: document.getElementsByTagName('meta')['description'].content,
        disabled: ['google', 'twitter', 'facebook', 'linkedin', 'diandian']
      })
      this.$el.removeAttribute('data-new')
    }, 200)
  }
}
