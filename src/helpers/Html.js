import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

export default class Html extends Component {
    static propTypes = {
        component:PropTypes.node,
        assets:PropTypes.object,
        store:PropTypes.object
    }
    render() {
        const {component,assets,store} = this.props;
        const content = component ? ReactDOM.renderToString(component) : '';
        const head = Helmet.rewind();
        return (
            <html lang="en-us">
            <head>
                {head.title.toComponent()}
                {head.meta.toComponent()}
                <meta httpEquiv="X-UA-Compatible" content="IE=EDGE"/>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>凤凰金融-融资-借款服务专区-凤凰卫视集团旗下智能金融理财平台</title>
                <meta name="description" content="凤凰卫视集团成员，国家队金融机构股东，央行下属互联网金融协会首批会员。数百亿投资额0逾期、0违约，100%投资用户获得预期收益。用户资金第三方托管，保障资金安全。"/>
                <link rel="shortcut icon" href="/favicon.ico"/>
                {Object.keys(assets.styles).map((style, key) =>
                    <link href={assets.styles[style]} key={key} media="screen, projection"
                          rel="stylesheet" type="text/css" charSet="UTF-8"/>
                )}
            </head>
            <body>
                <div id="content" dangerouslySetInnerHTML={{__html: content}}></div>
                <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
                <script src={assets.javascript.main}></script>
            </body>
            </html>
        )
    }
}
