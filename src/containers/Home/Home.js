import React,{Component,PropTypes} from 'react';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import {Slider} from 'components';
import {load} from 'redux/modules/slider';
import {Link} from 'react-router';
import {Go} from 'components';


@asyncConnect([{
    promise:({store:{dispatch}})=>{
        return dispatch(load());
    }
}])
@connect(
    state=>({sliders: state.slider.data})
)
export default class Home extends Component{
    static propTypes = {
        sliders:PropTypes.array
    }
    render(){
        const style = require('./HomeContent.less');
        const lldNav = require('./lld_nav.jpg');
        const lldLeftimg1 = require('./lld_leftimg1.jpg');
        const lldLeftimg2 = require('./lld_leftimg2.jpg');
        const lldMore = require('./lld_more.jpg');
        const lldCcorpZjt = require('./lld_corp_zjt.jpg');
        const lldCorpGgdyd = require('./lld_corp_gdyd.jpg');
        const lldCorpBxzl = require('./lld_corp_bxzl.jpg');
        const lldCorpWhxy = require('./lld_corp_whxy.jpg');
        const {sliders} = this.props;
        return (
            <div>
                <Slider>
                    {Array.isArray(sliders) && 
                        sliders.map((slider,key)=>{
                            return <item key={key} href={slider.imageUrl} atl={slider.title} src={slider.uri}></item>
                        })
                    }
                </Slider>
                <div className={style.HomeContent}>

                    <div className={`${style.lld_nav} container`}>
                        <img src={lldNav} className={style.lldNav} alt="凤凰金融"/>
                    </div>
                    <div className={`${style.lld_con} ${style.lld_con1} container`}>
                        <div className={style.lld_left}>
                            <div className={style.posimgshow}>
                                <Link to="/fjddetail" >
                                    <img src={lldLeftimg1} />
                                </Link>
                            </div>
                            <div className={style.leftbgshow}>
                                <p className={style.lup}>率先入驻北京地区</p>
                                <p className={style.lfo}>个人房产二次抵押</p>
                            </div>
                        </div>
                        <div className={style.lld_mid}>
                            <p className={style.mup}>
                                <Link to="/fjddetail" >
                                </Link>
                            </p>
                            <div className={style.mfjd}>
                                <ul className={`${style.midlist} clearFix`}>
                                    <li>
                                        <Go className={style.changebg1}></Go>
                                        <p>最低月利率1.3%</p>
                                    </li>
                                    <li>
                                        <Go className={style.changebg2}></Go>
                                        <p>最快48小时到账</p>
                                    </li>
                                    <li>
                                        <Go className={style.changebg3}></Go>
                                        <p>最高可贷300万</p>
                                    </li>
                                </ul>
                            </div>
                            <p className={style.lld_link} >
                                <Link to="/fjdDetail"  className={style.but}>查看详情</Link>
                                <Link to="/applyloan"  className={style.but_link}>
                                    快速申请
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className={`${style.lld_con} ${style.lld_con2} container`}>
                        <div className={style.lld_left}>
                            <div className={style.posimgshow}>
                                <Link to="/fqddetail" >
                                    <img src={lldLeftimg2} />
                                </Link>
                            </div>
                            <div className={style.leftbgshow}>
                                <p className={style.lup}>&nbsp;</p>
                                <p className={style.lfo}>企业经营周转</p>
                            </div>
                        </div>
                        <div className={style.lld_mid}>
                            <p className={`${style.mup} ${style.mtup}`}>
                                <Link to="/fqddetail" >
                                </Link>
                            </p>
                            <div className={style.mfqd}>
                                <ul className={`${style.midlist} clearFix`}>
                                    <li>
                                        <Go className={style.changebg6}></Go>
                                        <p>最低综合成本年化11%</p>
                                    </li>
                                    <li>
                                        <Go className={style.changebg5}></Go>
                                        <p>在线申请仅3步</p>
                                    </li>
                                    <li>
                                        <Go className={style.changebg4}></Go>
                                        <p>灵活融资方案</p>
                                    </li>
                                </ul>
                            </div>
                            <p className={style.lld_link}>
                                <Link to="/fqddetail" className={style.but} >查看详情</Link>
                                <Link to="/applyfqd" className={style.but_link} >快速申请</Link>
                            </p>
                        </div>
                    </div>
                    <div className={`${style.lld_con3} container`}>
                        <img src={lldMore}/>
                    </div>
                    <p className={`${style.link_more} container`}></p>
                    <div className={style.lld_corp}>
                        <div className={style.corp_con}>
                            <h2>融资审核金融服务机构</h2>
                            <ul className={`${style.corplist} clearFix`}>
                                <li>
                                    <Go main="/financing/zjt" target="_blank">
                                        <img src={lldCcorpZjt} alt="凤凰金融"/>
                                        <div className={style.imgbox_sha}></div>
                                        <span className={style.detail} >专题介绍</span>
                                    </Go>
                                </li>
                                <li>
                                    <Go main="/financing/gdyd" target="_blank">
                                        <img src={lldCorpGgdyd} alt="凤凰金融"/>
                                        <div className={style.imgbox_sha}></div>
                                        <span className={style.detail}>专题介绍</span>
                                    </Go>
                                </li>
                                <li>
                                    <Go main="/financing/bxzl" target="_blank">
                                        <img src={lldCorpBxzl} alt="凤凰金融"/>
                                        <div className={style.imgbox_sha}></div>
                                        <span className={style.detail}>专题介绍</span>
                                    </Go>
                                </li>
                                <li>
                                    <Go main="/financing/whxy" target="_blank">
                                        <img src={lldCorpWhxy} alt="凤凰金融"/>
                                        <div className={style.imgbox_sha}></div>
                                        <span className={style.detail}>专题介绍</span>
                                    </Go>
                                </li>
                            </ul>
                            <p className={style.morecorp}>更多优质金融服务机构正在入驻中……</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
