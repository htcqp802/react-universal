import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {form1Validation} from './applyLoanValidation';

@reduxForm({
    form: 'applyLoan',
    fields: [
        'receiptInfo.houseAvailable',
        'receiptInfo.moneyBorrow',      //借款金额
        'receiptInfo.loanPeriod',       //借款期限
        'receiptInfo.userId',
        'receiptInfo.userName',
        'receiptInfo.phone'
    ],
    destroyOnUnmount: false,
    validate:form1Validation
})


export default class ApplyLoanForm1 extends Component {

    static propTypes = {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        invalid: PropTypes.bool.isRequired,
        values: PropTypes.object.isRequired
    }

    render() {
        const {
            invalid,
            fields:{receiptInfo:{moneyBorrow, loanPeriod, houseAvailable, userId, userName}},
            handleSubmit
        } = this.props;
        return (
            <table className="form-table">
                <tbody>
                <tr>
                    <td className="required">抵押房产位于北京六环内：</td>
                    <td>
                        <input type="radio" {...houseAvailable} value="yes" checked={houseAvailable.value === "yes"}/>是
                        <input type="radio" {...houseAvailable} value="no" checked={houseAvailable.value === "no"}/>否
                    </td>
                    {houseAvailable.error && houseAvailable.touched && <td className="error">{houseAvailable.error}</td>}
                </tr>
                <tr>
                    <td>您的姓名:</td>
                    <td><input type="text" disabled {...userName}/>
                        <input type="hidden" {...userId} />
                    </td>
                </tr>
                <tr>
                    <td className="required">融资金融:</td>
                    <td><input type="text" {...moneyBorrow} className="hasUnit" placeholder="20-300"/><span
                        className="unit">万元</span>
                    </td>
                    {moneyBorrow.error && moneyBorrow.touched && <td className="error">{moneyBorrow.error}</td>}
                </tr>
                <tr>
                    <td className="required">融资期限:</td>
                    <td><input type="text" {...loanPeriod} className="hasUnit" placeholder="1-12"/><span
                        className="unit">个月</span>
                    </td>
                    {loanPeriod.error && loanPeriod.touched && <td className="error">{loanPeriod.error}</td>}
                </tr>
                <tr>
                    <td>还款方式:</td>
                    <td>先息后本</td>
                </tr>
                <tr>
                    <td>月利息范围:</td>
                    <td>
                        <span className="orange">1.3%-2%</span>（实际利率以线下评估为准）
                    </td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <button disabled={invalid} onClick={handleSubmit}>
                            确认以上信息去评估借款额度
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}