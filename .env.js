const dev = process.env.NODE_ENV === 'development'

const api = {
  baseUrl: 'https://api.riuir.com'
}

const qiniu = {
  domain: 'https://cdn.riuir.com',
  access: 'liU4ohXRsbaSB4uQyR5lij97IsP7YT7NcyC2CND7',
  secret: '_Z0oR7NYYgEb_UsJTtTOZ6TPS5il2_l5Zj09vj_l',
  bucket: 'clannader'
}

const host = {
  dev: 'http://www.api.dev/',
  cdn: 'https://cdn.riuir.com/',
  prod: 'https://api.riuir.com/'
}

const script = {
  baiduStat: dev ? '' : `var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?5c22f3db91001090bfc7d5096c296534";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          })();`,
  baiduPush: dev ? '' : `(function(){
          var bp = document.createElement('script');
          var curProtocol = window.location.protocol.split(':')[0];
          if (curProtocol === 'https') {
            bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';        
          }
          else {
            bp.src = 'http://push.zhanzhang.baidu.com/push.js';
          }
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(bp, s);
        })();`
}

module.exports = {
  api,
  qiniu,
  host,
  script
}
