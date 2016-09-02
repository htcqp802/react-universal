import React, {Component, PropTypes} from 'react';
import {reduxForm, getValues, initializeWithKey} from 'redux-form';
import {connect} from 'react-redux';
import {hold} from 'redux/modules/applyFQD';
import {filter} from 'utils/tools';
const fields = [
    'category',
    'otherCateName',
    'operateYears',
    'operatePlace',
    'enterpriseTax',
    'enterpriseCredit',
    'productChannel',
    'marketingChannel',
    'age',
    'experience',
    'house',
    'marriage',
    'spouse',
    'ownerCredit'
];

import {
    form2,
    operateYearsArr,
    operatePlaceArr,
    enterpriseTaxArr,
    enterpriseCreditArr,
    productChannelArr,
    experienceArr,
    houseArr,
    spouseArr
} from './validations';

@reduxForm({
    form: 'applyFQD',
    fields: fields,
    destroyOnUnmount: false,
    validate: form2
})

@connect(state=>({
    formValues: getValues(state.form.applyFQD),
    dataFQD: state.applyFQD.dataFQD
}), {hold, initializeWithKey})
export default class ApplyFQDForm2 extends Component {

    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        previousPage: PropTypes.func.isRequired,
        fields: PropTypes.object.isRequired,
        invalid: PropTypes.bool.isRequired,
        submitting: PropTypes.bool.isRequired,
        dataCategory: PropTypes.array.isRequired,
        hold: PropTypes.func.isRequired,
        formValues: PropTypes.object,
        closeAlter: PropTypes.func
    }

    componentWillMount() {
        const {dataFQD, initializeWithKey} = this.props;
        if (dataFQD && dataFQD.data) {
            initializeWithKey('applyFQD', '2', filter(fields, dataFQD.data),fields)
        }
    }

    render() {
        const style = require('./ApplyFQDForm.less');
        const {
            handleSubmit,
            previousPage,
            invalid,
            submitting,
            hold,
            fields:{
                category,
                otherCateName,
                operateYears,
                operatePlace,
                enterpriseTax,
                enterpriseCredit,
                productChannel,
                marketingChannel,
                age,
                experience,
                house,
                marriage,
                spouse,
                ownerCredit
            },
            dataCategory,
            formValues,
            closeAlter
        } = this.props;
        const errorPrompt = (field)=>(<td className="error">{field.error && field.touched ? field.error : ""}</td>);
        return (
            <div>
                <div className={`${style.title} orange`}>企业信息</div>
                <table className="form-table" style={{margin:'auto'}}>
                    <tbody>
                    <tr>
                        <td className="required">行业类别</td>
                        <td>
                            <select {...category} >
                                <option value="请选择">请选择</option>
                                {dataCategory && dataCategory.map((item, index)=><option key={index}
                                                                                         value={item.categoryCode}>{item.categoryName}</option>)}
                            </select>
                        </td>
                        {category.value === '014' && <td style={{paddingLeft:10}}>
                            <input type="text" {...otherCateName} style={{width:150}}/>
                            {otherCateName.touched && otherCateName.error && <span className="orange"
                                                                                   style={{position: 'absolute',right: -100,lineHeight: '42px'}}>请输入行业类别</span>}
                        </td>
                        }
                        {category.error && category.touched && <td className="error">{category.error}</td>}

                    </tr>
                    <tr>
                        <td className="required">经营年限</td>
                        <td>
                            <select {...operateYears}>
                                <option value="请选择">请选择</option>
                                {operateYearsArr.map((item, index)=><option key={index} value={item}>{item}</option>)}
                            </select>
                        </td>
                        {errorPrompt(operateYears)}
                    </tr>
                    <tr>
                        <td className="required">经营场所</td>
                        <td>
                            <select {...operatePlace}>
                                <option value="请选择">请选择</option>
                                {operatePlaceArr.map((item, index)=><option key={index} value={item}>{item}</option>)}
                            </select>
                        </td>
                        {errorPrompt(operatePlace)}
                    </tr>
                    <tr>
                        <td className="required">企业纳税</td>
                        <td>
                            <select {...enterpriseTax}>
                                <option value="请选择">请选择</option>
                                {enterpriseTaxArr.map((item, index)=><option key={index} value={item}>{item}</option>)}
                            </select>
                        </td>
                        {errorPrompt(enterpriseTax)}
                    </tr>
                    <tr>
                        <td className="required">企业征信</td>
                        <td>
                            <select {...enterpriseCredit}>
                                <option value="请选择">请选择</option>
                                {enterpriseCreditArr.map((item, index)=><option key={index}
                                                                                value={item}>{item}</option>)}
                            </select>
                        </td>
                        {errorPrompt(enterpriseCredit)}
                    </tr>
                    <tr>
                        <td className="required">企业进货渠道</td>
                        <td>
                            <select {...productChannel}>
                                <option value="请选择">请选择</option>
                                {productChannelArr.map((item, index)=><option key={index} value={item}>{item}</option>)}
                            </select>
                        </td>
                        {errorPrompt(productChannel)}
                    </tr>
                    <tr>
                        <td className="required">企业销售渠道</td>
                        <td>
                            <select {...marketingChannel}>
                                <option value="请选择">请选择</option>
                                {productChannelArr.map((item, index)=><option key={index}
                                                                              value={item}>{item}</option>)}
                            </select>
                        </td>
                        {errorPrompt(marketingChannel)}
                    </tr>
                    </tbody>
                </table>
                <div className={`${style.title} orange`}>企业主信息</div>
                <table className="form-table" style={{margin:'auto'}}>
                    <tbody>
                    <tr>
                        <td className="required">年龄</td>
                        <td>
                            <input type="text" className="hasUnit" {...age}/><span
                            className="unit">岁</span>
                        </td>
                        {errorPrompt(age)}
                    </tr>
                    <tr>
                        <td className="required">从业经验</td>
                        <td>
                            <select {...experience}>
                                <option value="请选择">请选择</option>
                                {experienceArr.map((item, index)=><option key={index}
                                                                          value={item}>{item}</option>)}
                            </select>
                        </td>
                        {errorPrompt(experience)}
                    </tr>
                    <tr>
                        <td className="required">住房条件</td>
                        <td>
                            <select {...house}>
                                <option value="请选择">请选择</option>
                                {houseArr.map((item, index)=><option key={index}
                                                                     value={item}>{item}</option>)}
                            </select>
                        </td>
                        {errorPrompt(house)}
                    </tr>
                    <tr>
                        <td className="required">婚姻状况</td>
                        <td>
                            <input type="radio" {...marriage} checked={marriage.value === '未婚'} value="未婚"/>未婚
                            <input type="radio" {...marriage} checked={marriage.value === '已婚'} value="已婚"/>已婚
                            <input type="radio" {...marriage} checked={marriage.value === '离异'} value="离异"/>离异
                        </td>
                        {errorPrompt(marriage)}
                    </tr>
                    {marriage.value === '已婚' && <tr>
                        <td className="required"> 配偶子女状况:</td>
                        <td>
                            <select {...spouse}>
                                <option value="请选择">请选择</option>
                                {spouseArr.map((item,index)=><option key={index} value={item}>{item}</option>)}
                            </select>
                        </td>
                        {errorPrompt(spouse)}
                    </tr>}
                    <tr>
                        <td className="required">企业主征信</td>
                        <td>
                            <select {...ownerCredit}>
                                <option value="请选择">请选择</option>
                                {enterpriseCreditArr.map((item, index)=><option key={index}
                                                                                value={item}>{item}</option>)}
                            </select>
                        </td>
                        {errorPrompt(ownerCredit)}
                    </tr>
                    <tr>
                        <td style={{textAlign:"center"}} colSpan="2">
                            <button onClick={previousPage}>上一步</button>
                            <button style={{marginLeft:30}}
                                    onClick={handleSubmit} disabled={invalid || submitting}>
                                下一步
                            </button>
                            <p className={style.botom}>
                                还有信息没填好先
                                <a onClick={()=>{
                                hold(formValues,'save').then(result=>{
                                if(result.status === 'S'){closeAlter(true);
                                }})
                                }}
                                   className="orange">暂存</a>
                            </p>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}