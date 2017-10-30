import Vue from 'vue'
import Share from '~/components/views/share.vue'

Vue.component(Share.name, Share)

export default ({ app }) => {
  app.router.afterEach(() => {
    if (typeof document !== 'undefined') {
      const ele = document.getElementById('share')
      if (ele && ele.getAttribute('data-new') === null) {
        setTimeout(() => {
          ele.innerHTML = ''
          ele.initialized = false
          // eslint-disable-next-line
          new socialShare(ele, {
            url: window.location.href.split('?')[0],
            title: document.title,
            source: 'riuir 天下漫友是一家',
            description: document.getElementsByTagName('meta')['description'].content,
            disabled: ['google', 'twitter', 'facebook', 'linkedin', 'diandian']
          })
        }, 0)
      }
    }
  })
}
