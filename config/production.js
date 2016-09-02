// base configuration
const settings = {
  web: {
    host: '10.255.52.82', //服务器
    // host: '10.254.21.65',     //本地
    port: 5005
  },
  api: {
    host: 'http://test.fengjr.inc',
    port: 80 // port暂时未用
  },
  domains: {
    "domain": "fengjr.inc",
    "main": "http://test.fengjr.inc",
    "my": "http://mytest.fengjr.inc",
    "pay": "http://paytest.fengjr.inc",
    "bx": "http://bx.fengjr.inc",
    "mall": "http://mall.fengjr.inc",
    "lld":"http://lld.fengjr.inc"
  },
  system_id: 'bx',
  source: 'pc',
  workers: 8 // 进程个数
};

// CDN configuration
const staticPrefix = {
  img: [ //图片
    '//img0.fengjr.com/public/dist/', // 双斜杠开头会自动判断 http/https
    '//img1.fengjr.com/public/dist/',
    '//img2.fengjr.com/public/dist/',
    '//img3.fengjr.com/public/dist/',
    '//img4.fengjr.com/public/dist/'
  ],
  font: '//font.fengjr.com/public/dist/',
  js: '//js.fengjr.com/public/dist/',
  css: '//css.fengjr.com/public/dist/',
  'static': 'http://lld.fengjr.inc/' // fallback
  // 'static': 'http://lldlocal.fengjr.inc:'+ settings.web.port +'/'
};

module.exports = {
  staticPrefix: staticPrefix,
  domains: settings.domains,
  "distDir": false,
  api: settings.api,
  web: settings.web,
  system_id: settings.system_id,
  source: settings.source,
  workers: settings.workers // 进程个数
}

