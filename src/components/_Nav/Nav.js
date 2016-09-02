import React, {Component} from 'react';
import {IndexLink, Link} from 'react-router';
import {Go} from 'components';
import {connect} from 'react-redux';


@connect(state=>({
    user: state.auth.user,
    userInfo: state.userInfo.data
}))
export default class Nav extends Component {


    render() {
        const style = require('./Nav.less');
        const logo = require('./logo.png');
        const ewm = require('./img_ewm.png');
        const {user, userInfo} = this.props;
        const mumbers = (obj)=>
            obj > 0 &&
            <span className={style.textRight}>{obj.toFixed(2)}元</span>
        return (
            <div className={style.nav}>
                <div className={`${style.head} container`}>
                    <div className={style.pullLeft}>
                        <IndexLink to="/">
                            <img src={logo} className={style.logo} alt="凤凰金融"/>
                        </IndexLink>
                    </div>
                    <ul className={style.pullRight}>
                        <li className={style.getApp}><Go main="/"><i className={style.icon}></i>下载APP <img src={ewm}
                                                                                                           alt=""/></Go>
                        </li>
                        {!user && <li ><Go my="/login">登录</Go></li>}
                        {user &&
                        <span>
                            <li className={style.navTop}>
                                <span style={{position:'relative',zIndex:9}}>
                                    <i className={style.photo}></i>
                                我的账号
                                <i className={`${style.arrow} fa orange`}></i>

                                    </span>
                                <i className={style.bg}></i>

                                <ul className={style.dropdown}>
                                    <li>
                                        <small></small>
                                        <Go my="/account"><span>资产总览</span>{mumbers(userInfo.totalAsset)}</Go>
                                    </li>
                                    <li>
                                        <small></small>
                                        <Go my="/account/currentbx"><span>活期理财</span>{mumbers(userInfo.aztec.asset)}</Go>
                                    </li>
                                    <li>
                                        <small></small>
                                        <Go my="/account/invest"><span>定期理财</span>{mumbers(userInfo.regular.asset)}</Go>
                                    </li>
                                    <li>
                                        <small></small>
                                        <Go my="/account/bx"><span>保险理财</span>{mumbers(userInfo.insurance.asset)}</Go>
                                    </li>
                                    <li>
                                        <small></small>
                                        <Go my="/account/zc"><span>我的众筹</span></Go>
                                    </li>
                                    <li>
                                        <small></small>
                                        <Go my="/account/jifen"><span>我的积分</span>{mumbers(userInfo.point.points)}</Go>
                                    </li>
                                    <li>
                                        <Go my="/account/bonus"><span>我的红包</span>{mumbers(userInfo.count.availableCouponCount)}</Go>
                                    </li>
                                    <li>
                                        <small></small>
                                        <Go my="/account/jiaxi"><span>我的加息卷</span>{mumbers(userInfo.count.interestTicketCount)}</Go>
                                    </li>
                                    <li>
                                        <small></small>
                                        <Go my="/account/invite"><span>邀请好友</span></Go>
                                    </li>
                                    <li>
                                        <small></small>
                                        <Go my="/account/cardVoucher"><span>兑换卡券</span></Go>
                                    </li>
                                    <li>
                                        <small></small>
                                        <Go my="/account/message"><span>站内消息</span>{mumbers(userInfo.count.unreadMsgCount)}</Go>
                                    </li>
                                    <li className={style.logout}>
                                        <Go main="/logout">安全退出</Go>
                                    </li>
                                </ul>
                            </li>
                            <li>
                            <Go my="/" className="orange">{user.loginName}</Go>,欢迎您
                            </li>
                        </span>
                        }
                        <li className={style.getEnvelope}><Go my="/register"><i className={style.icon}></i>注册领红包</Go>
                        </li>
                    </ul>
                </div>

                <nav>
                    <ul className={`${style.navbar} container`}>
                        <li><i className={style.bg}></i><Go main="/">首页</Go></li>
                        <li style={{width:"130px"}}><i className={style.bg}></i><Go main="/financing">理财<i
                            className={`${style.arrow} fa`}></i></Go>
                            <ul className={`${style.dropdown} ${style.l4}`}>
                                <li><i className={style.bg}></i><Go bx="/current" target="_blank">活期理财<span
                                    className={style.yellow}>New</span></Go></li>
                                <li><i className={style.bg}></i><Go main="/financing" target="_blank">定期理财</Go></li>
                                <li><i className={style.bg}></i><Go bx="/" target="_blank">保险理财</Go></li>
                                <li><i className={style.bg}></i><Go main="/financing/list?type=newUser" target="_blank">新手专享</Go>
                                </li>
                            </ul>
                        </li>
                        <li><i className={style.bg}></i><Go main="/zc">众筹</Go></li>
                        <li><i style={{height:"40px"}} className={style.bg}></i><Link to="/">融资<i
                            className={`${style.arrow} fa`}></i></Link>
                            <ul className={`${style.dropdown} ${style.l2}`}>
                                <li><i className={style.bg}></i><Link to="/fqddetail" target="_blank">凤企贷</Link></li>
                                <li><i className={style.bg}></i><Link to="/fjdDetail">凤加贷</Link></li>
                            </ul>
                        </li>
                        <li><i className={style.bg}></i><Go main="/aboutus/jianjie">关于凤凰金融/About Us</Go></li>
                        <li style={{width:"156px"}}><i className={style.bg}></i><Go main="/safety">安全保障<i
                            className={`${style.arrow} fa`}></i></Go>
                            <ul className={`${style.dropdown} ${style.l2}`}>
                                <li><i className={style.bg}></i><Go main="/safety" target="_blank">安全保障措施</Go></li>
                                <li><i className={style.bg}></i><Go main="/financing/jgdetail"
                                                                    target="_blank">保障机构介绍</Go></li>
                            </ul>
                        </li>
                        <li><i className={style.bg}></i><Go main="/service/jr">帮助中心</Go></li>
                        <li className={style.right}><i className={style.bg}></i><Go mall="/" target="_blank">积分商城</Go>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}
