/**
 * Created by dell on 2016/6/29.
 */
import React,{Component} from 'react';
import {Link} from 'react-router';


export default class fjdDetail extends Component {
  render() {
    const style = require('./fjdDetail.less');
    return (
      <div>
        <div className={style.banner}>
          <Link to="/applyloan" className={style.btnApply}>立即申请</Link>
        </div>
        <div className={style.containerDesc}>
          <div className={style.containerDiv}>
            <p>凤加贷是房产二次抵押融资产品，融资人一次审核一次授信，资金额度循环使用，</p>
            <p>帮您盘活房产剩余价值，实现财富再增值和消费升级。</p>
            <div className={style.descTitle}></div>
            <table width="1000px" className={style.descTable}>
              <thead className={style.hd}>
              <tr height="60px" className={style.odd}>
                <th width="140px"></th>
                <th width="420px" style={{backgroundColor: "#75a8e5"}}>凤加贷</th>
                <th width="430px" style={{backgroundColor:"#999999"}}>其它传统贷款</th></tr>
              </thead>
              <tbody>
              <tr height="60px" className={style.even}>
                <td style={{textAlign: "center"}}>申请方式</td>
                <td style={{backgroundColor: "#eaf2fa"}}>
                  <span className={`${style.face01} ${style.face} `}></span>
                  <span>三步轻松完成线上申请，最快当天上门服务</span></td>
                <td>
                  <span className={`${style.face02} ${style.face} `}></span>
                  <span>携带各种证件去门店申请，几天的受理时间</span></td>
              </tr>
              <tr height="60px" className={style.odd}>
                <td style={{textAlign: "center"}}>贷款利率</td>
                <td style={{backgroundColor: "#e2eaf2"}}>
                  <span className={`${style.face01} ${style.face} `}></span>
                  <span>月利率最低1.3%，综合抵押率可达90%</span></td>
                <td>
                  <span className={`${style.face02} ${style.face} `}></span>
                  <span>月利率最低为2.5%，综合抵押率最高仅70%</span></td>
              </tr>
              <tr height="60px" className={style.even}>
                <td style={{textAlign: "center"}}>还款计划</td>
                <td style={{backgroundColor: "#eaf2fa"}}>
                  <span className={`${style.face01} ${style.face} `}></span>
                  <span>可贷1-12个月，按需支取随贷随还</span></td>
                <td>
                  <span className={`${style.face02} ${style.face} `}></span>
                  <span>支持提前还款，但会收取一定违约金</span></td>
              </tr>
              <tr height="60px" className={style.odd}>
                <td style={{textAlign: "center"}}>到账时间</td>
                <td style={{backgroundColor: "#e2eaf2"}}>
                  <span className={`${style.face01} ${style.face} `}></span>
                  <span>最快48小时到账，一次审批授信额度长期有效</span></td>
                <td>
                  <span className={`${style.face02} ${style.face} `}></span>
                  <span>最快7-8个工作日到账，授信后贷款额度不可循环使用</span></td>
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
                <span className={style.title}>适用人群</span></div>
              <div className={style.answer}>
                <div className={`${style.qaicon} ${style.aicon} `}>A</div>
                <div className={style.answerContent}>
                  <p className={style.text1} >房产位于北京，有按揭的用户、银行办理抵押房产的用户均可申请凤加贷，适用于按揭买房、装修、留学、旅游、个体经营等所有消费或经营类用途。</p>
                  <ul className={`clearFix`}>
                    <li>
                      <div className={style.img} style={{background: "url(//img1..com/public/dist/20160628172438/img/lld/applyloan_detail_case01-7f906a94.png) center center no-repeat"}}></div>
                      <p className={style.name}>案例一：</p>
                      <p className={style.text2} >白领小王在北京按揭购买了一套房，还希望能有笔钱用来装修，通过凤加贷他申请到一笔装修金，装修期间还顺便带上家人去旅游。</p></li>
                    <li>
                      <div className={style.img} style={{background: "url(//img1..com/public/dist/20160628172438/img/lld/applyloan_detail_case02-18caf26a.png) center center no-repeat"}}></div>
                      <p className={style.name}>案例二：</p>
                      <p className={style.text2}>老张将自己名下的北京房产抵押给银行，贷款开了公司，近期公司材料采购急用钱，通过凤加贷他申请到了一笔材料款，解了燃眉之急。</p></li>
                    <li className={style.last} >
                      <div className={style.img} style={{background: "url(//img3..com/public/dist/20160628172438/img/lld/applyloan_detail_case03-96ad6dc2.png) center center no-repeat"}}></div>
                      <p className={style.name}>案例三：</p>
                      <p className={style.text2}>李女士想在北京买二套房子，但首付太高钱不够，拿到银行的批贷后立即办理了凤加贷，帮她缓解了首付压力。</p></li>
                  </ul>
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
                  <p className={style.text1} >1、融资人须为凤凰金融注册用户；</p>
                  <p className={style.text1} >2、融资人须为抵押房屋的产权人，产权人全部满足18-58岁；</p>
                  <p className={style.text1} >3、用作抵押的房产限北京六环以内的普通住宅；</p>
                  <p className={style.text1} >4、房产已抵押给银行，且房贷逾期不超过1次；</p>
                  <p className={style.text1} >5、房产证由房主持有且无其它抵押。</p></div>
              </div>
            </div>
            <div className={style.qaContent} >
              <div className={style.question}>
                <div className={`${style.qaicon} ${style.qicon} `} >Q</div>
                <span className={style.title} >相关费用</span></div>
              <div className={style.answer}>
                <div className={`${style.qaicon} ${style.aicon} `}>A</div>
                <div className={style.answerContent}>
                  <p className={style.text1} >1、保险费：批贷金额的万分之六（由中金投收缴）</p>
                  <p className={style.text1} >2、公证费：批贷金额的千分之三+640元（由公证处收缴）</p>
                  <p className={style.text1} >3、抵押登记费：80—550元（由建委收缴）</p></div>
              </div>
            </div>
            <div className={style.qaContent} >
              <div className={style.question}>
                <div className={`${style.qaicon} ${style.qicon} `}>Q</div>
                <span className={style.title}>关于利率</span></div>
              <div className={style.answer}>
                <div className={`${style.qaicon} ${style.aicon} `} >A</div>
                <div className={style.answerContent} >
                  <p className={style.text1} >凤加贷的贷款月利率范围：1.3%—2%，综合抵押率：70%—90%，实际利率需根据房产抵押物情况和融资人资质等进行评分得到。越优质的房产抵押物和融资人资质，月利率越低。例如：</p>
                  <p className={style.text1} >优质抵押物：房龄较短，位置优越，朝向佳，在房产市场上的流通性好，一抵房贷的还贷方式为等额本息或等额本金。</p>
                  <p className={style.text1} >优质融资人：征信良好，家庭收入稳定，负债少。</p>
                  <p className={style.text1} >费率核算案例：</p>
                  <p className={style.text1} >张总2015年1月用其名下价值100万的房产向银行申请了70万贷款，贷款年利率6%，共计年利息4.2万元；3月张总因经营又需要资金，但其名下只有一套已向银行贷过款的房产，故申请了凤加贷进行房产二次抵押，经专业评估机构审核按100万*90%-70万=20万向张总发放了20万元，月利率1.5%，共计年利息3.6万元，至此张总用其名下价值100万的房产共计完成融资90万，年利息共计7.8万元，实际年利率为8.67%。</p></div>
              </div>
            </div>
            <div className={` ${style.qaContent} ${style.noborder} `} >
              <div className={style.question}>
                <div className={`${style.qaicon} ${style.qicon} `} >Q</div>
                <span className={style.title} >审核机构</span></div>
              <div className={style.answer} >
                <div className={`${style.qaicon} ${style.aicon} `} >A</div>
                <div className={style.answerContent} >
                  <p className={style.text1} >凤加贷北京地区个人房产的二次抵押融资申请，由具备专业经验的金融服务机构中金投集团进行线下审核、手续办理及放款。</p></div>
              </div>
            </div>
            <div className={style.footerslink} >
              <Link className={style.btnApply} to="/applyloan">立即申请</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
