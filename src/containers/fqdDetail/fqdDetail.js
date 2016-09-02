/**
 * Created by yaya on 2016/6/29.
 */

import React,{Component} from 'react';
//import {Go} from 'components';
import {Link} from 'react-router';

export default class fjdDetail extends Component {
  render() {
    const style = require('./fqdDetail.less');
    return (
      <div>
        <div className={style.banner}>
          <Link to="/applyfqd" className={style.btnApply}>立即申请</Link>
        </div>
        <div className={style.containerDesc}>
          <div className={style.containerDiv}>
            <p>凤企贷是一款旨在解决中小微企业经营资金周转的融资产品，其特点是充分挖掘企业动产价值、机器设备价值、信用价值、无形资产价值等，</p>
            <p>有效解决企业抵押难、担保难的问题，使中小微企业能够快速获得运营资金，助力企业发展。</p>
            <div className={style.descTitle}></div>
            <table width="1000px" className={style.descTable}>
              <thead className={style.hd}>
              <tr height="60px" className={style.odd}>
                <th width="140px"></th>
                <th width="420px" style={{backgroundColor: "#75a8e5"}}>凤企贷</th>
                <th width="430px" style={{backgroundColor:"#999999"}}>其它传统贷款</th></tr>
              </thead>
              <tbody>
              <tr height="60px" className={style.even}>
                <td style={{textAlign: "center"}}>申请方式</td>
                <td style={{backgroundColor: "#ebfaf7"}}>
                  <span className={`${style.face01} ${style.face} `}></span>
                  <span>三步轻松完成线上申请，通过审批后2天内放款</span></td>
                <td>
                  <span className={`${style.face02} ${style.face} `}></span>
                  <span style={{top:-8}}>银行的企业贷款门槛高，基本只受理中小企业以不</span>
                  <br/>
                  <span style={{top:10,left:55}}>动产进行抵押的借款</span>
                </td>
              </tr>
              <tr height="60px" className={style.odd}>
                <td style={{textAlign: "center"}}>借款成本</td>
                <td style={{backgroundColor: "#e2f1ee"}}>
                  <span className={`${style.face01} ${style.face} `}></span>
                  <span>最低综合成本年化11%，同行业极具竞争力</span></td>
                <td>
                  <span className={`${style.face02} ${style.face} `}></span>
                  <span>小额贷款年利息20%~30%不等</span></td>
              </tr>
              <tr height="60px" className={style.even}>
                <td style={{textAlign: "center"}}>担保方式</td>
                <td style={{backgroundColor: "#ebfaf7"}}>
                  <span className={`${style.face01} ${style.face} `}></span>
                  <span style={{top:-8}}>企业固定资产、无形资产等多种资产经评估可以成为</span>
                  <br/>
                  <span style={{top:10,left:55}}>反担保条件</span>
                </td>
                <td>
                  <span className={`${style.face02} ${style.face} `}></span>
                  <span>担保难，很多企业的资产不能成为反担保条件</span></td>
              </tr>
              <tr height="60px" className={style.odd}>
                <td style={{textAlign: "center"}}>融资方案</td>
                <td style={{backgroundColor: "#e2f1ee"}}>
                  <span className={`${style.face01} ${style.face} `}></span>
                  <span>根据企业情况制定灵活的融资方案</span></td>
                <td>
                  <span className={`${style.face02} ${style.face} `}></span>
                  <span>融资方案单一，基本通过银行流动资金贷款进行融资</span></td>
              </tr>
              <tr height="60px" className={style.even}>
                <td style={{textAlign: "center"}}>借款期限</td>
                <td style={{backgroundColor: "#ebfaf7"}}>
                  <span className={`${style.face01} ${style.face} `}></span>
                  <span>可根据企业资金情况设定灵活的还款方式与还款期限</span>
                </td>
                <td>
                  <span className={`${style.face02} ${style.face} `}></span>
                  <span>还款方式固定，借款期限一般为1年</span></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={style.containerQA} >
          <div className={style.containerDiv}>
            <div className={style.titleQA}></div>
            <div className={style.qaContent}>
              <div className={style.question}>
                <div className={`${style.qaicon} ${style.qicon} `}>Q</div>
                <span className={style.title}>适用对象</span></div>
              <div className={style.answer}>
                <div className={`${style.qaicon} ${style.aicon} `}>A</div>
                <div className={style.answerContent}>
                  <p className={style.text1} >经营状况稳定，征信记录良好的中小微企业。</p>
                </div>
              </div>
            </div>
            <div className={style.qaContent}>
              <div className={style.question}>
                <div className={`${style.qaicon} ${style.qicon} `}>Q</div>
                <span className={style.title} >申请条件</span></div>
              <div className={style.answer}>
                <div className={`${style.qaicon} ${style.aicon} `}>A</div>
                <div className={style.answerContent}>
                  <p className={style.text1} >1、融资人须为凤凰金融注册用户（通过凤凰金融提交融资申请）；</p>
                  <p className={style.text1} >2、融资企业需满足工商注册，实际经营稳定，且征信记录良好；</p>
                  <p className={style.text1} >3、融资企业需能提供一定的反担保条件。</p></div>
              </div>
            </div>
            <div className={style.qaContent} >
              <div className={style.question}>
                <div className={`${style.qaicon} ${style.qicon} `} >Q</div>
                <span className={style.title} >相关费用</span></div>
              <div className={style.answer}>
                <div className={`${style.qaicon} ${style.aicon} `}>A</div>
                <div className={style.answerContent}>
                  <p className={style.text1} >最低综合成本年化11%</p>
                  <p className={style.text1} >费用核算案例</p>
                  <p className={style.text1} >位于广州的某服装企业接到一笔海外订单，在生产过程中急需一笔资金采购原材料，于是在凤凰金融申请凤企贷，并用企业的厂房做反担保。经专业评估审核，该企业经营稳定，征信记录良好，符合凤企贷优质融资用户，并为该企业提供担保在凤凰金融进行融资，最后获得资金1000万，期限3个月，企业承担总成本最低仅需30万（实际费用以线下评估为准）。</p>
                <div className={style.fqdcase01}></div></div>
              </div>
            </div>
            <div className={` ${style.qaContent} ${style.noborder} `} >
              <div className={style.question}>
                <div className={`${style.qaicon} ${style.qicon} `} >Q</div>
                <span className={style.title} >什么是反担保条件</span></div>
              <div className={style.answer} >
                <div className={`${style.qaicon} ${style.aicon} `} >A</div>
                <div className={style.answerContent} >
                  <p className={style.text1} >1、企业实际控制人持有产权，包括住宅、土地、厂房、商业用地等有价值的标准抵押物；对第三方提供抵押物的，根据实际情况予以判断。</p>
                  <p className={style.text1} >2、长期经营权等有可转让价值的非标准反担保措施，如长期租赁权、长期经营权等。</p>
                  <p className={style.text1} >3、有价证券，包括银行存单、上市公司股票、国家政府债券等有价证券。</p>
                  <p className={style.text1} >4、企业自身具有较高转让流通价值的股权等。</p>
                  <p className={style.text1} >5、实际控制人及配偶，主要股东及配偶的个人无限连带责任反担保。</p></div>
              </div>
            </div>
            <div className={style.footerslink} >
              <Link className={style.btnApply} to="/applyfqd">立即申请</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
