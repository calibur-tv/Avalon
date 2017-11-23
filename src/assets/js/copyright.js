export default class Copyright {
  /**
   * [constructor 初始化 Copyright ]
   *
   * @param {number} minLength    [ 全局的黏贴触发 rewrite 的最小长度 ]
   * @param {string} shareLink    [ 全局的默认链接 ]
   *
   * @return {null}
   */
  constructor ({ minLength, shareLink } = {}) {
    this.config = {
      org: 'riuir',
      appendStr: 'riuir - 天下漫友是一家',
      minLength: minLength || 140,
      shareLink: shareLink || window.location.href.split('?')[0]
    }
    this.prefix = {
      org: '来源：',
      link: '链接：',
      author: '作者：'
    }
  }

  /**
   * [bind Copyright 的对外调用 API，用于监听指定 DOM 的文本复制事件 ]
   *
   * @param {Object} ele              [ 要绑定事件的 DOM 对象 ]
   * @param {number} minLength        [ 局部的黏贴触发 rewrite 的最小长度，可复写全局 minLength ]
   * @param {string} authorNickname   [ 作者的昵称 ]
   * @param {string} shareLink        [ 文章的链接 ]
   * @param {string} appendStr        [ 要附加的文本，可复写全局 text ]
   *
   * @return {null}
   */
  bind (ele, { minLength, authorNickname, shareLink, appendStr } = {}) {
    ele.addEventListener('copy', (evt) => {
      const lengthLimit = minLength || this.config.minLength
      const location = shareLink || this.config.shareLink
      const str = appendStr || this.config.appendStr
      const range = window.getSelection()
      const outputText = range.toString().trim()
      if (outputText.length >= lengthLimit) {
        const formatHTML = this.getCopyHtml(this.constructor.getRangeHtml(range.getRangeAt(0)), location, authorNickname, str)
        if (typeof evt.clipboardData !== 'undefined') {
          evt.clipboardData.setData('text/plain', this.getCopyText(outputText, location, authorNickname, str))
          evt.clipboardData.setData('text/html', formatHTML)
          if (evt.clipboardData.getData('text/plain').length) {
            evt.preventDefault()
          } else {
            this.constructor.hack(formatHTML) // Edge
          }
        } else {
          this.constructor.hack(formatHTML) // IE
        }
      }
    })
  }

  /**
   * [hack 当 clipboardData 事件无法正常工作时，使用 hack 方法添加 copyright，缺点是用户在按下 [ctrl + c] 之后会丢失光标]
   *
   * @param text
   *
   * @return {null}
   */
  static hack (text) {
    const dom = document.createElement('div')
    dom.innerHTML = text
    dom.style.position = 'fixed'
    dom.style.left = '-9999px'
    document.body.appendChild(dom)
    window.getSelection().selectAllChildren(dom)
    setTimeout(() => {
      document.body.removeChild(dom)
    }, 200)
  }

  /**
   * [getCopyHtml 格式化要放进黏贴板的 HTML ]
   *
   * @param html
   * @param shareLink
   * @param nickname
   * @param appendStr
   * @returns {string}
   */
  getCopyHtml (html, shareLink, nickname, appendStr) {
    const o = this.getExtraCopyright(shareLink, nickname, appendStr).join('<br />')
    return `<div>${html}${o}</div>`
  }

  /**
   * [getCopyHtml 格式化要放进黏贴板的 Text ]
   *
   * @param text
   * @param shareLink
   * @param nickname
   * @param appendStr
   * @returns {*}
   */
  getCopyText (text, shareLink, nickname, appendStr) {
    const o = this.getExtraCopyright(shareLink, nickname, appendStr).join('\n')
    return text + o
  }

  /**
   * [getExtraCopyright 获取待拼接的字符串数组]
   *
   * @param shareLink
   * @param nickname
   * @param appendStr
   * @returns {*}
   */
  getExtraCopyright (shareLink, nickname, appendStr) {
    return ['', '', `${this.prefix.author}：${nickname}`, `${this.prefix.link}：${shareLink}`, `${this.prefix.org}：${this.config.org}`, appendStr]
  }

  /**
   * [getRangeHtml 获取 copy 的文本的 HTML 格式，因为 window.getSelection().toString() 的 Bug，导致复制到笔记本中的 \n 失效]
   *
   * @param text
   * @returns {string}
   */
  static getRangeHtml (text) {
    const div = document.createElement('div')
    div.appendChild(text.cloneContents())
    return div.outerHTML
  }
}
