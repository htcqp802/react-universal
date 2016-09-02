import React, {Component, PropTypes} from 'react';
import {reduxForm,initializeWithKey} from 'redux-form';
import {connect} from 'react-redux';
import {loanPeriods,purposes,form1} from './validations';
import {filter} from 'utils/tools';

const fields = ['id', 'userId', 'areaCode', 'moneyBorrow', 'loanPeriod', 'purpose']

@reduxForm({
    form: 'applyFQD',
    fields: fields,
    destroyOnUnmount: false,
    validate:form1
})
@connect(state=>({
    user:state.auth.user,
    dataFQD:state.applyFQD.dataFQD
}),{initializeWithKey})
export default class ApplyFQDForm1 extends Component {

    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        fields: PropTypes.object,
        area: PropTypes.array,
        invalid:PropTypes.bool.isRequired,
        submitting: PropTypes.bool.isRequired
    }
    
    componentWillMount(){
        const {dataFQD,initializeWithKey,user} = this.props;
        if(dataFQD && dataFQD.data){
           const _dataFQD = dataFQD.data
            const initialValues = filter(fields,_dataFQD);
            initializeWithKey('applyFQD','1',{
                ...initialValues,
                moneyBorrow:(initialValues.moneyBorrow/10000).toFixed(2)
            },fields);
        }else{
        
            initializeWithKey('applyFQD','1',{
                id:0,
                userId:user.id
            },fields)
        }
    }

    render() {
        const errorPrompt = (field)=>(<td className="error">{field.error && field.touched ? field.error:""}</td>);
        const {
            handleSubmit,
            fields:{areaCode, moneyBorrow, loanPeriod, purpose},
            area,
            invalid,
            submitting
        } = this.props;


        return (
            <div>
                <table className="form-table" style={{margin:'auto'}}>
                    <tbody>
                    <tr>
                        <td className="required">融资企业位于</td>
                        <td>
                            <select  {...areaCode}>
                                <option value="请选择">请选择</option>
                                {area && area.map((item,index)=><option key={index}
                                                                value={item.areaCode}>{item.areaName}</option>)}
                            </select>
                        </td>
                        {errorPrompt(areaCode)}
                    </tr>
                    <tr>
                        <td className="required">融资金额</td>
                        <td>
                            <input type="text" className="hasUnit" {...moneyBorrow} placeholder="300-2000"/><span
                            className="unit">万元</span>
                        </td>
                        {errorPrompt(moneyBorrow)}
                    </tr>
                    <tr>
                        <td className="required">融资期限</td>
                        <td>
                            <select {...loanPeriod}>
                                <option value="请选择">请选择</option>
                                {loanPeriods.map((item,index)=><option key={index} value={item.value}>{item.text}</option>)}
                            </select>
                        </td>
                        {errorPrompt(loanPeriod)}
                    </tr>
                    <tr>
                        <td className="required">融资用途</td>
                        <td>
                            <select {...purpose}>
                                <option value="请选择">请选择</option>
                                {purposes.map((item,index)=><option key={index} value={item}>{item}</option>)}
                            </select>
                        </td>
                        {errorPrompt(purpose)}
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <button style={{width:266}} onClick={handleSubmit} disabled={invalid || submitting}>
                                下一步
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}