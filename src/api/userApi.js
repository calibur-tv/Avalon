import BaseApi from './_baseApi'

export default class extends BaseApi {
  getLoginUser () {
    return this.http.post('door/user')
  }

  login ({ access, secret, remember, method, geetest }) {
    return this.http.post('door/login', {
      access, secret, remember, method, geetest
    })
  }

  register ({ method, access, secret, nickname, authCode, inviteCode, geetest }) {
    return this.http.post('door/register', {
      method, access, secret, nickname, authCode, inviteCode, geetest
    })
  }

  logout () {
    return this.http.post('door/logout')
  }

  sendSignAuthCode ({ method, access, nickname }) {
    return this.http.post('door/send', {
      method, access, nickname
    })
  }

  checkAccessIsUnique ({ method, access }) {
    return this.http.post(`door/check/${this.signUp.method}/${this.signUp.access}`)
  }
}
