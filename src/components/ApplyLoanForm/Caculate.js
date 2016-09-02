import React, {Component, PropTypes} from 'react';
import {reduxForm, change} from 'redux-form';
import {caculateValidation} from './applyLoanValidation';
import {connect} from 'react-redux';

@reduxForm({
    form: 'caculate',
    fields: ['cAmount', 'loanTime', 'payWay', 'cNll', 'payedYear', 'payedMounth'],
    destroyOnUnmount: false,
    validate: caculateValidation
})
@connect(
    ()=>({}),
    {change}
)
export default class Caculate extends Component {

    static propTypes = {
        fields: PropTypes.object.isRequired,
        invalid: PropTypes.bool,
        pristine: PropTypes.bool,
        submitting: PropTypes.bool,
        handleSubmit: PropTypes.func.isRequired,
        change: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired
    }


    render() {
        const style = require('./Caculate.less');
        const {
            close,
            show,
            fields:{cAmount, loanTime, payWay, cNll, payedYear, payedMounth},
            invalid,
            pristine,
            submitting,
            handleSubmit,
            change,
            name
        } = this.props;
        const inputError = (field)=>
        field.touched && field.error &&
        <span style={{fontSize:12,position:"absolute",top:-10}}
              className="error">{field.error}</span>

        return (
            <div style={{display:show?"block":"none"}}>
                <div className={style.shadow}></div>
                <div className={style.content}>
                    <div className={style.title}>
                        计算您的贷款余额
                                    <span className={style.close}
                                          onClick={close}></span>
                    </div>
                    <table className="form-table" style={{margin:"auto",marginTop:20}}>
                        <tbody>
                        <tr>
                            <td className="required">
                                贷款合同金额:
                            </td>
                            <td>
                                {inputError(cAmount)}
                                <input type="text" className="hasUnit" {...cAmount}/><span
                                className="unit">万元</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="required">
                                贷款期限:
                            </td>
                            <td>
                                {inputError(loanTime)}
                                <input type="text" className="hasUnit" {...loanTime}/><span
                                className="unit">年</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="required">
                                还款方式:
                            </td>
                            <td>
                                {inputError(payWay)}
                                <select {...payWay}>
                                    <option value="请选择">请选择</option>
                                    <option value="1">等额本金</option>
                                    <option value="2">等额本息</option>
                                    <option value="3">先息后本</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className="required">
                                年利率:
                            </td>
                            <td>
                                {inputError(cNll)}
                                <input type="text" className="hasUnit" {...cNll}/><span
                                className="unit">%</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="required">
                                已还款期限:
                            </td>
                            <td>
                                {inputError(payedYear)}
                                <input type="text" style={{width:128,boxSizing:'border-box'}}
                                       className="hasUnit" {...payedYear}/><span
                                className="unit">年</span>
                                {inputError(payedMounth)}
                                <input type="text" style={{width:128,boxSizing:'border-box',marginLeft:20}}
                                       className="hasUnit"  {...payedMounth}/><span
                                className="unit">月</span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{textAlign:'center'}}>
                                <button disabled={submitting || invalid || pristine}
                                        onClick={handleSubmit(
                                        values=>{
                                        const {payWay, cAmount, loanTime, cNll, payedYear, payedMounth} = values;
                                         let result;
                                            switch (Number(payWay)) {
                                                case 1:
                                                    result = cAmount*10000 * (1 - (payedYear * 12 + payedMounth) / (loanTime * 12));
                                                    break;
                                                case 2:
                                                    result = cAmount*10000 * (1 - (Math.pow(1 + (cNll/100) / 12, (payedYear * 12 + payedMounth)) - 1) / (Math.pow(1 + (cNll/100) / 12, loanTime * 12) - 1));
                                                    break;
                                                case 3:
                                                    result = (payedYear * 12 + payedMounth) < loanTime * 12 ? cAmount*10000 : 0;
                                                    break;
                                                default:
                                                    return result;
                                            }
                                            change('applyLoan',name,result.toFixed(2));
                                            close();
                                        }
                                        )}>
                                    计算
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}