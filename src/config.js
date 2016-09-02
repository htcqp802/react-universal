require('babel-polyfill');

const environment = {
    development: require('../config/local'),
    production: require('../config/production')
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
    app: {
        title: '凤凰金融-融资-借款服务专区-凤凰卫视集团旗下智能金融理财平台',
        description: '凤凰卫视集团成员，国家队金融机构股东，央行下属互联网金融协会首批会员。数百亿投资额0逾期、0违约，100%投资用户获得预期收益。用户资金第三方托管，保障资金安全。',
        head: {
            // titleTemplate: 'React Redux Example: %s',
            meta: [
                {
                    name: 'description',
                    content: '凤凰卫视集团成员，国家队金融机构股东，央行下属互联网金融协会首批会员。数百亿投资额0逾期、0违约，100%投资用户获得预期收益。用户资金第三方托管，保障资金安全。'
                },
                {charset: 'utf-8'},
                {name: 'keywords', content: '凤凰金融，凤凰卫视，互联网金融，投资理财，活期理财，定期理财，保险，基金，精品理财'}
            ]
        }
    }
}, environment)
