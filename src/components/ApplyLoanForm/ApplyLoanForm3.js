import React, {Component, PropTypes} from 'react';
import {Go} from 'components';
import {connect} from 'react-redux';
import {caculateResult, submit} from 'redux/modules/applyLoan'
import {reduxForm, getValues} from 'redux-form'

@reduxForm({
    form: 'applyLoan',
    fields: [
        'userInfo.cust_name',
        'userInfo.marriage',
        'otherInfo.rate',
        'otherInfo.loan_account',
        'otherInfo.evaluate_account',
        'otherInfo.period',
        'otherInfo.purpose'
    ],
    destroyOnUnmount: false
})

@connect((state)=>({
        myForm: state.form.applyLoan
    }),
    {caculateResult, submit})
export default class ApplyLoanForm3 extends Component {
    static propTypes = {
        previousPage: PropTypes.func.isRequired,
        caculateResult: PropTypes.func.isRequired,
        fields: PropTypes.object,
        handleSubmit: PropTypes.func.isRequired,
        myForm: PropTypes.object,
        submit: PropTypes.func
    }

    state = {
        moneyLoan: 0,
        prices: 0,
        type: 0,
        companyRelationship: '',
        consumptiveDiscrube: '',
        yearsOfWorking: '',
        yearsOfPersonalIncome: '',
        yearsOfFamilyIncome: '',
        maritalStatus: '',
        showAlert: false,
        submitting:false
    }


    componentWillMount() {
        const houseInfoList = this.props.myForm.houseInfoList;

        houseInfoList.map(item=> {
            const params = {
                constructionID: item.communityID.value,
                buildingID: item.buildingNumber.value.split(',')[0],
                houseID: item.roomNumber.value.split(',')[0],
                buildArea: item.build_area.value
            }
            this.props.caculateResult(params).then(result=> {
                if (result.status === 'S') {
                    const {AvagePrice, TotalPrice, UnitPrice} = result.data;
                    if (TotalPrice) {
                        this.setState({moneyLoan: this.state.moneyLoan + TotalPrice * 0.9 - item.loanBankAcc2})
                    } else if (UnitPrice) {
                        this.setState({
                            moneyLoan: this.state.moneyLoan + UnitPrice * item.buildArea * 0.9 - item.loanBankAcc2,
                            prices: UnitPrice
                        })
                    } else if (AvagePrice) {
                        this.setState({
                            moneyLoan: this.state.moneyLoan + AvagePrice * item.buildArea * 0.9 - item.loanBankAcc2,
                            prices: AvagePrice
                        })
                    }
                }
            })
        })
    }


    handleSubmit() {
        this.setState({submitting:true});
        let finalString = '';
        const {companyRelationship, consumptiveDiscrube, yearsOfWorking, yearsOfPersonalIncome, yearsOfFamilyIncome, maritalStatus} = this.state;
        if (this.state.type === 1) {
            finalString = `企业经营：\n公司全称：${this.refs.companyName.value}\n借款人与公司关系：${companyRelationship}`
        } else if (this.state.type === 2) {
            finalString = `个人消费：\n消费描述：${consumptiveDiscrube}\n工作年限：${yearsOfWorking}\n个人年收入：${yearsOfPersonalIncome}\n家庭年收入：${yearsOfFamilyIncome}\n婚姻状况：${maritalStatus}`
        } else if (this.state.type === 3) {
            finalString = `其它：\n描述：${this.refs.describe.value}`
        }
        const {submit} = this.props;
        const myForm = getValues(this.props.myForm);

        const _form = {
            ...myForm,
            receiptInfo: {
                ...myForm.receiptInfo,
                moneyBorrow: myForm.receiptInfo.moneyBorrow * 10000
            },
            houseInfoList: this.props.myForm.houseInfoList.map(houseInfo=> {
                Object.keys(houseInfo).forEach(key=>{
                    if(typeof houseInfo[key] === 'object'){
                        houseInfo[key] = houseInfo[key].value || ""
                    }else{
                        delete houseInfo[key]
                    }
                })
                return {
                    ...houseInfo,
                    market_price_max: this.state.prices,
                    market_price_min: this.state.prices
                }
            }),
            userInfo: {
                ...myForm.userInfo,
                marriage: maritalStatus
            },
            otherInfo: {
                ...myForm.otherInfo,
                loan_account: myForm.receiptInfo.moneyBorrow * 10000,
                purpose: finalString,
                period: myForm.receiptInfo.loanPeriod
            }

        }
        submit(_form).then(result=> {
            this.setState({submitting:false});
            if (result.status === 'S') {
                this.setState({showAlert: true})
            }
        })

    }

    render() {
        const style = require('./ApplyLoanForm.less');
        const {
            previousPage
        } = this.props;
        const {type, showAlert} = this.state;
        return (
            <div className={style.form3}>
                <div className={style.shadow} style={{display:showAlert?'block':'none'}}></div>
                <div className={style.alert} style={{display:showAlert?'block':'none'}}>
                    <div className={style.head}>
                        <p>提交成功</p>
                        <div className={style.close}
                             onClick={()=>this.setState({showAlert:!this.state.showAlert})}></div>
                    </div>
                    <div className={style.content}>
                        <div className={style.success}></div>
                        <p>恭喜您提交成功！您可随时前往个人中心查看审批进度。</p>
                    </div>
                    <div className={style.foot}>
                        <Go my="/account/loanRecord">查看进度</Go>
                        <Go main="/lld/help">了解借款帮助</Go>
                    </div>
                </div>
                <div className={style.pz}></div>
                <p style={{display:this.state.moneyLoan < 200000 ? 'block' : 'none'}} className={style.title}>
                    非常遗憾，经评估您的额度过低，请检查贷款余额是否超出抵押房屋的市场价值，或忽略评估直接提交申请。</p>
                <div style={{display:this.state.moneyLoan >= 200000 ? 'block' : 'none'}}>
                    <p className={style.title}>恭喜您！经评估您的额度可达元</p>
                    <p className={style.little}>（该评估值会根据实际看房情况有适当浮动）</p>
                    <p className={style.winwin}>
                        完成全部信息可让您的评估更精准，并确保能在
                        <span style={{color:'#ff6825'}}>24小时内上门看房</span>
                        哦!
                    </p>
                </div>
                <table style={{margin:"auto"}} className="form-table">
                    <tbody>
                    <tr>
                        <td >借款用途：</td>
                        <td>
                            <input type="radio" name="type" value="企业经营" onClick={()=>this.setState({type:1})}/>企业经营
                            <input type="radio" name="type" value="个人消费" onClick={()=>this.setState({type:2})}/>个人消费
                            <input type="radio" name="type" value="其他" onClick={()=>this.setState({type:3})}/>其他
                        </td>
                    </tr>
                    {type === 1 &&
                    <tr>
                        <td>公司全称:</td>
                        <td><input type="text" ref="companyName"/></td>
                    </tr>
                    }
                    {type === 1 &&
                    <tr>
                        <td>借款人与公司关系:</td>
                        <td>
                            <input type="radio" onClick={()=>this.setState({companyRelationship:'法人'})}
                                   name="companyRelationship" value="法人"/>法人
                            <input type="radio" onClick={()=>this.setState({companyRelationship:'实际控制人'})}
                                   name="companyRelationship" value="实际控制人"/>实际控制人
                            <input type="radio" onClick={()=>this.setState({companyRelationship:'股东'})}
                                   name="companyRelationship" value="股东"/>股东
                        </td>
                    </tr>
                    }


                    {type === 2 && <tr>
                        <td>消费描述:</td>
                        <td><textarea type="text" rows="3" ref="consumptiveDiscrube"/></td>
                    </tr>}
                    {type === 2 && <tr>
                        <td>工作年限:</td>
                        <td>
                            <input type="radio" onClick={()=>this.setState({yearsOfWorking:'1年-3年'})}
                                   name="yearsOfWorking" value="1年-3年"/>1年-3年
                            <input type="radio" onClick={()=>this.setState({yearsOfWorking:'3年-5年'})}
                                   name="yearsOfWorking" value="3年-5年"/>3年-5年
                            <input type="radio" onClick={()=>this.setState({yearsOfWorking:'5年-10年'})}
                                   name="yearsOfWorking" value="5年-10年"/>5年-10年
                            <input type="radio" onClick={()=>this.setState({yearsOfWorking:'10年以上'})}
                                   name="yearsOfWorking" value="10年以上"/>10年以上
                        </td>
                    </tr>}

                    {type === 2 && <tr>
                        <td>个人年收入:</td>
                        <td>
                            <input type="radio" onClick={()=>this.setState({yearsOfPersonalIncome:'5万以下'})}
                                   name="yearsOfPersonalIncome" value="5万以下"/>5万以下
                            <input type="radio" onClick={()=>this.setState({yearsOfPersonalIncome:'5-10万'})}
                                   name="yearsOfPersonalIncome" value="5-10万"/>5-10万
                            <input type="radio" onClick={()=>this.setState({yearsOfPersonalIncome:'10-30万'})}
                                   name="yearsOfPersonalIncome"
                                   value="10-30万"/>10-30万
                            <input type="radio" onClick={()=>this.setState({yearsOfPersonalIncome:'30万以上'})}
                                   name="yearsOfPersonalIncome" value="30万以上"/>30万以上
                        </td>
                    </tr>}
                    {type === 2 && <tr>
                        <td>家庭年收入:</td>
                        <td>
                            <input type="radio" onClick={()=>this.setState({yearsOfFamilyIncome:'10万以下'})}
                                   name="yearsOfFamilyIncome" value="10万以下"/>10万以下
                            <input type="radio" onClick={()=>this.setState({yearsOfFamilyIncome:'10-30万'})}
                                   name="yearsOfFamilyIncome" value="10-30万"/>10-30万
                            <input type="radio" onClick={()=>this.setState({yearsOfFamilyIncome:'30-50万'})}
                                   name="yearsOfFamilyIncome" value="30-50万"/>30-50万
                            <input type="radio" onClick={()=>this.setState({yearsOfFamilyIncome:'50万以上'})}
                                   name="yearsOfFamilyIncome" value="50万以上"/>50万以上
                        </td>
                    </tr>}
                    {type === 2 && <tr>
                        <td>婚姻状况:</td>
                        <td>
                            <input type="radio" onClick={()=>this.setState({maritalStatus:'单身'})} name="maritalStatus"
                                   value="单身"/>单身
                            <input type="radio" onClick={()=>this.setState({maritalStatus:'已婚'})} name="maritalStatus"
                                   value="已婚"/>已婚
                        </td>
                    </tr>}

                    {type === 3 && <tr>
                        <td>描述:</td>
                        <td><textarea ref="describe" rows="5"></textarea></td>
                    </tr>
                    }
                    <tr>
                        <td colSpan="2">
                            <button onClick={previousPage}>上一步</button>
                            <button style={{marginLeft:20}} disabled={this.state.submitting} onClick={this.handleSubmit.bind(this)}>{this.state.submitting ? '提交中...' :'提交申请'}
                            </button>
                        </td>
                        <td>
                            <div>提交申请即表示阅读并同意</div>
                            <div><Go main="zcxy/jkxy" style={{color:"#ff6825",textDecoration:"underline"}}>《借款用户须知》</Go>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}