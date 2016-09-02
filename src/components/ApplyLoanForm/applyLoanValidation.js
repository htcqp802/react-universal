import {createValidator, required, integer, interval, decimal, oneOf, idCard}  from 'utils/validation';

export const form1Validation = values => {
    const errors = {};
    errors.receiptInfo = createValidator({
        houseAvailable: [required('请选择房产是否位于六环内')],
        moneyBorrow: [required('请输入融资金额'), decimal, interval(20, 300)],
        loanPeriod: [required('请输入融资期限'), integer, interval(1, 12)]
    })(values.receiptInfo)

    return errors;
}

export const rightKinds = ["SHANG_PING_FANG"];


export const form2Validation = (values)=> {
    const errors = {};
    errors.houseInfoList = values.houseInfoList.map(createValidator({
        'right_kind': [oneOf(rightKinds,'请选择房屋性质')],
        // communityName: [required('请输入小区名称')],
        'build_area': [required('请输入建筑面积'), decimal],
        'loan_bank_acc2': [required('请输入贷款金额'), decimal],
        'card_no_house': [idCard]
    }))
    return errors;
}

export const caculateValidation = createValidator({
    cAmount: [required('请输入贷款合同金额'), decimal],
    loanTime: [required('请输入贷款期限'), integer],
    payWay: [oneOf(['1', '2', '3'],'请选择还款方式')],
    cNll: [required('请输入年利率'), decimal],
    payedYear: [required('请输入已还期限(年)'), integer],
    payedMounth: [required('请输入已还期限(月)'), integer]
})