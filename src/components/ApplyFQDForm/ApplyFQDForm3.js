import React, {Component, PropTypes} from 'react';
import {reduxForm, getValues, initializeWithKey} from 'redux-form';
import {Go} from 'components';
import {hold} from 'redux/modules/applyFQD';
import {connect} from 'react-redux';
import {filter} from 'utils/tools';
import {form3, guaranteeArr} from './validations'

const fields = [
    'currentAsset',
    'currentDebt',
    'lastYearSalesIncome',
    'thisYearIncome',
    'lastYearProfit',
    'debtInOneYear',
    'assetWithdraw',
    'inventory',
    'guarantee',
    'source'
]
@reduxForm({
    form: 'applyFQD',
    fields: fields,
    validate: form3
})
@connect(state=>({
    formValues: getValues(state.form.applyFQD),
    dataFQD: state.applyFQD.dataFQD
}), {hold, initializeWithKey})
export default class ApplyFQDForm3 extends Component {

    static propTypes = {
        previousPage: PropTypes.func.isRequired,
        fields: PropTypes.object.isRequired,
        hold: PropTypes.func.isRequired,
        closeAlter: PropTypes.func,
        invalid: PropTypes.bool
    }

    state = {
        showAlert: false,
        submitting: false
    }

    componentWillMount() {
        const formatMoney = (money)=>money ? (money / 10000).toFixed(2) : "";
        const {dataFQD, initializeWithKey} = this.props;
        if (dataFQD && dataFQD.data) {
            const _data = filter(fields, dataFQD.data);
            initializeWithKey('applyFQD', '3', {
                ..._data,
                currentAsset: formatMoney(_data.currentAsset),
                currentDebt: formatMoney(_data.currentDebt),
                lastYearSalesIncome: formatMoney(_data.lastYearSalesIncome),
                thisYearIncome: formatMoney(_data.thisYearIncome),
                lastYearProfit: formatMoney(_data.lastYearProfit),
                debtInOneYear: formatMoney(_data.debtInOneYear),
                assetWithdraw: formatMoney(_data.assetWithdraw),
                inventory: formatMoney(_data.inventory),
            }, fields)
        }
    }

    render() {
        const style = require('./ApplyFQDForm.less');
        const style2 = require('containers/ApplyFQD/ApplyFQD.less')
        const {
            previousPage,
            fields:{
                currentAsset,
                currentDebt,
                lastYearSalesIncome,
                thisYearIncome,
                lastYearProfit,
                debtInOneYear,
                assetWithdraw,
                inventory,
                guarantee,
                source
            },
            hold,
            formValues,
            closeAlter,
            invalid
        } = this.props;
        const {showAlert} = this.state;
        const checked = (item)=> {
            if (guarantee.value && guarantee.value.indexOf) {
                return guarantee.value.indexOf(item) > -1
            }
            return false
        }
        const errorPrompt = (field)=>(<td className="error">{field.error && field.touched ? field.error : ""}</td>);
        return (
            <div>
                <input type="hidden" {...source}/>
                <div className={style2.shadow} style={{display:showAlert?'block':'none'}}></div>
                <div className={style2.alert} style={{display:showAlert?'block':'none'}}>
                    <div className={style2.head}>
                        <p>提交成功</p>
                        <div className={style2.close}
                             onClick={()=>this.setState({showAlert:!this.state.showAlert})}></div>
                    </div>
                    <div className={style2.content}>
                        <div className={style2.success}></div>
                        <p>恭喜您提交成功，您的申请已进入线下审核流程，最快3个工作日收到审批结果，请通过登录我的账户查看详情。</p>
                    </div>
                    <div className={style2.foot}>
                        <Go my="/account/loanRecord?tab=2">前往账户查看</Go>
                    </div>
                </div>
                <div className={`${style.title} orange`}>企业财务信息</div>
                <table className="form-table" style={{margin:'auto'}}>
                    <tbody>
                    <tr>
                        <td className="required">当前总资产</td>
                        <td>
                            <input type="text" className="hasUnit" {...currentAsset}/><span
                            className="unit">万元</span>
                        </td>
                        {errorPrompt(currentAsset)}
                    </tr>
                    <tr>
                        <td className="required">当前总负责</td>
                        <td>
                            <input type="text" className="hasUnit" {...currentDebt}/><span
                            className="unit">万元</span>
                        </td>
                        {errorPrompt(currentDebt)}
                    </tr>
                    <tr>
                        <td className="required">去年销售收入</td>
                        <td>
                            <input type="text" className="hasUnit" {...lastYearSalesIncome}/><span
                            className="unit">万元</span>
                        </td>
                        {errorPrompt(lastYearSalesIncome)}
                    </tr>
                    <tr>
                        <td className="required">本年预计销售收入</td>
                        <td>
                            <input type="text" className="hasUnit" {...thisYearIncome}/><span
                            className="unit">万元</span>
                        </td>
                        {errorPrompt(thisYearIncome)}
                    </tr>
                    <tr>
                        <td className="required">去年净利润</td>
                        <td>
                            <input type="text" className="hasUnit" {...lastYearProfit}/><span
                            className="unit">万元</span>
                        </td>
                        {errorPrompt(lastYearProfit)}
                    </tr>
                    <tr>
                        <td className="required">一年内到期负债</td>
                        <td>
                            <input type="text" className="hasUnit" {...debtInOneYear}/><span
                            className="unit">万元</span>
                        </td>
                        {errorPrompt(debtInOneYear)}
                    </tr>
                    <tr>
                        <td className="required">短期内可变现资产</td>
                        <td>
                            <input type="text" className="hasUnit" {...assetWithdraw}/><span
                            className="unit">万元</span>
                        </td>
                        {errorPrompt(assetWithdraw)}
                    </tr>
                    <tr>
                        <td className="required">存货金额</td>
                        <td>
                            <input type="text" className="hasUnit" {...inventory}/><span
                            className="unit">万元</span>
                        </td>
                        {errorPrompt(inventory)}
                    </tr>
                    </tbody>
                </table>
                <div className={`${style.title} orange`}>反担保信息</div>
                <table className="form-table" style={{margin:'auto'}}>
                    <tbody>
                    <tr>
                        <td className="required">能够提供的反担保</td>
                        <td>
                            什么是反担保?
                        </td>
                        {guarantee.touched && guarantee.error && <td className="error">{guarantee.error}</td>}
                    </tr>
                    <tr>
                        <td></td>
                        <td colSpan="2" width="500px">
                            <ul className={style.list}>
                                {guaranteeArr.map((item, index)=>
                                    <li key={index}>
                                        <input type="checkbox"
                                               value={item}
                                               onBlur={()=>guarantee.onBlur()}
                                               checked={checked(item)}
                                               onChange={e=>{
                                               guarantee.onBlur();
                                               if(e.target.checked){
                                                guarantee.onChange(guarantee.value?guarantee.value+=e.target.value+"|":e.target.value+"|")
                                               }else{
                                                guarantee.onChange(guarantee.value.replace(e.target.value+"|",""))
                                               }
                                               }}/>{item}
                                    </li>)}
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <button onClick={previousPage}>上一步</button>
                            <button style={{marginLeft:20}} disabled={invalid || this.state.submitting} onClick={()=>{
                            this.setSate({submitting:true})
                                hold(formValues,'submit').then(()=>{
                                this.setState({submitting:false})
                                    this.setState({showAlert:true})
                                })
                            }}>{this.state.submitting ? '提交中...' : '提交申请'}
                            </button>
                            <p className={style.botom}>
                                还有信息没填好先
                                <a onClick={()=>{
                                hold(formValues,'save').then((result)=>{
                                if(result.status === 'S'){
                                    closeAlter(true)
                                }
                                });
                                }} className="orange">暂存</a>
                            </p>
                        </td>
                        <td>
                            <div>提交申请即表示阅读并同意</div>
                            <div><Go main="/zcxy/jkxy" target="_blank"
                                     style={{color:"#ff6825",textDecoration:"underline"}}>《借款用户须知》</Go>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}