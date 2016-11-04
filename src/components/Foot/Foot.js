import React, {Component} from 'react';
import {Link} from 'react-router';
import {Go} from 'components';

export default class Foot extends Component {
    render() {
        const style = require('./Foot.less');
        const wx = require('./new_weixin.png');
        const wb = require('./new_weibo.png');
        const app = require('./new_app.png');
        return (
            <div className={`${style.foot} clearFix`}>
                <div className="container">
                    <div className={`${style.detailLink} clearFix`}>
                        <div className={style.linkLfet}>
                            <div className={style.w148}>
                                <p className={style.first}>关于我们</p>
                                <p>
                                    <Go
                                        main="/aboutus/jianjie" rel="nofollow"
                                        target="_blank">
                                        平台实力
                                    </Go>
                                </p>
                                <p>
                                    <Go main="/aboutus/honour" rel="nofollow"
                                        target="_blank">
                                        社会荣誉
                                    </Go>
                                </p>
                                <p>
                                    <Go main="/cms/media" rel="nofollow" target="_blank">
                                        媒体报道
                                    </Go>
                                </p>
                                <p>
                                    <Go main="/aboutus/contactus" target="_blank">
                                        联系我们
                                    </Go>
                                </p>
                            </div>
                            <div className={style.w148}>
                                <p className={style.first}> 业务介绍</p>
                                <p>
                                    <Go main="/financing" rel="nofollow" target="_blank">
                                        理财
                                    </Go>
                                </p>
                                <p>
                                    <Go main="/zc" rel="nofollow" target="_blank">
                                        众筹
                                    </Go>
                                </p>
                                <p>
                                    <Link to="/" rel="nofollow">
                                        融资
                                    </Link>
                                </p>
                                <p>
                                    <Go mall="/" rel="nofollow" target="_blank">
                                        积分商城
                                    </Go>
                                </p>
                            </div>
                            <div className={style.w148}>
                                <p className={style.first}> 安全保障</p>
                                <p>
                                    <Go main="/safety" rel="nofollow" target="_blank">安全保障措施</Go>
                                </p>
                                <p>
                                    <Go main="/financing/jgdetail" rel="nofollow" target="_blank">保障机构介绍</Go>
                                </p>
                                <p>
                                    <Go main="/service/law" rel="nofollow" target="_blank">法律法规说明</Go>
                                </p>
                            </div>
                        </div>
                        <div className={style.linkMiddile}>
                            <div className={style.w148}>
                                <img src={wx}/>
                                <p>关注微信，活动早知道</p>
                            </div>
                            <div className={style.w148}>
                                <img src={wb}/>
                                <p>关注微博，资讯天天读</p>
                            </div>
                            <div className={style.w148}>
                                <img src={app}/>
                                <p>下载APP，理财随时随地</p>
                            </div>
                        </div>
                        <div className={style.linkRight}>
                            <div className={style.showcompony}>
                                <div className={style.showBtn}>
                                    <div className={style.showBox}>
                                        <ul className={style.selectBoxList}>
                                            <li ><a href="http://phtv.ifeng.com" target="_blank">凤凰卫视</a>
                                            </li>
                                            <li ><a href="www.ifeng.com" target="_blank">凤凰网</a>
                                            </li>
                                            <li ><a href="http://www.ifengweekly.com"
                                                    target="_blank">凤凰周刊</a></li>
                                            <li ><a href="http://uradio.ifeng.com"
                                                    target="_blank">凤凰URadio</a></li>
                                            <li ><a href="http://www.pmm.cn" target="_blank">凤凰都市传媒</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <p>凤凰金融客服热线</p><p className={style.bignum}>400 076 1166</p>
                                <p>客服工作时间：9:00-21:00</p>
                                <p><Go
                                    main="/service/feedback" target="_blank">意见反馈</Go></p></div>
                        </div>
                    </div>
                    <div className={style.detailImpotant}>
                        <div style={{width:"510px",lineHeight:"28px",float:"left"}} ><p>版权所有 © 凤凰金融 | Copyright 2015
                            .com &amp; jr.ifeng.com,All Rights Reserved</p></div>
                        <div style={{width:"500px",float:"left"}}>
                            <div style={{paddingLeft:"40px"}} className={style.iconKexin}>
                                <a
                                href="http://www.itrust.org.cn/yz/pjwx.asp?wm=1721473510" 
                                title="" target="_blank" 
                                className={style.kexin}
                                ></a>
                                <a
                                href="https://search.szfw.org/cert/l/CX20141107005870005552"
                                title="凤凰金融荣获中国电子商务协会“诚信网站”认证殊荣。" target="_blank"
                                className={style.credibility}
                                ></a>
                                <a
                                href="https://trustsealinfo.verisign.com/splash?form_file=fdf/splash.fdf&amp;dn=www..com&amp;lang=zh_cn"
                                title="凤凰金融已引入VeriSign SSL加密技术，您的隐私及个人资料安全已受到最高级别的保护。" target="_blank"
                                className={style.norton}
                                ></a>
                                <a
                                href="http://gawa.bjchy.gov.cn/websearch/" title="凤凰金融已完成在公安机关的信息备案。"
                                target="_blank"
                                className={style.police}
                                ></a>
                                <a
                                href="https://ss.knet.cn/verifyseal.dll?sn=e15072411010559584wwxy000000&amp;amp;ct=df&amp;amp;a=1&amp;amp;pa=0.7701204186305404"
                                target="_blank"
                                className={style.knet}
                                ></a>
                                <a
                                href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502030877"
                                target="_blank"
                                className={style.gongan}
                                ></a>
                            </div>
                        </div>
                        <div style={{width:"180px",textAlign:"right",float:"right"}} >
                            <p>京公网安备 11010502030877号</p>
                            <p>投资有风险，购买需谨慎</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
