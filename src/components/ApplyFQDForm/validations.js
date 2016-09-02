import {required, oneOf, decimal, interval, createValidator} from 'utils/validation';

export const loanPeriods = [
    {'value': '0-6', 'text': '半年（包含）以内'},
    {'value': '6-12', 'text': '半年-1年（包含）'},
    {'value': '12-24', 'text': '1年-2年（包含）'},
    {'value': '24-48', 'text': '2年-4年'}
];
export const purposes = ["原材料采购", "采购机器设备", "购置不动产", "增设门店", "投资新项目（股权投资、债权投资等）", "资金过桥", "补充流动资金", "其它"]


export const form1 = (values, props)=> {
    const rules = {
        'id': [required()],
        'userId': [required()],
        'areaCode': [oneOf(props.area.map(item=>item.areaCode),'请选择融资企业所在地')],
        'moneyBorrow': [required('请输入融资金额'), decimal, interval(300, 2000,'金额必须在300-2000')],
        'loanPeriod': [oneOf(loanPeriods.map(item=>item.value),'请选择融资期限')],
        'purpose': [oneOf(purposes,'请选择融资用途')]
    }
    return createValidator(rules)(values);
}


export const operateYearsArr = ["2年(含)以内", "2-5年(含)", "5年以上"]
export const operatePlaceArr = ["自有", "短期租赁", "长期租赁"];
export const enterpriseTaxArr = ["一年完整纳税", "连续两年完整纳税", "连续三年或以上完整纳税"]
export const enterpriseCreditArr = ["无逾期、欠息记录", "非恶意逾期、欠息2次", "非恶意逾期、欠息2次以上"]
export const productChannelArr = ["国有大型企业、知名跨国企业", "知名民营企业", "小企业及个人"]
export const experienceArr = ["3年(含)以下", "3-5年(含)", "5年以上"]
export const houseArr = ["自购无贷款房", "自购有贷款房", "租用住房"]
export const marriageArr = ['未婚', '已婚', '离异']
export const spouseArr = ['配偶、子女均在本市', '配偶、子女在外地', '配偶、子女在海外'];
export const form2 = (values, props)=> {
    const rules = {
        'category': [oneOf(props.dataCategory.map(item=>item.categoryCode),'请选择行业类别')],
        'otherCateName': [],
        'operateYears': [oneOf(operateYearsArr,'请选择经验年限')],
        'operatePlace': [oneOf(operatePlaceArr,'请选择经验场所')],
        'enterpriseTax': [oneOf(enterpriseTaxArr,'请选择企业纳税')],
        'enterpriseCredit': [oneOf(enterpriseCreditArr,'请选择企业征信')],
        'productChannel': [oneOf(productChannelArr,'请选择企业进货渠道')],
        'marketingChannel': [oneOf(productChannelArr,'请选择销售渠道')],
        'age': [interval(20, 90,'请输入正确的年龄')],
        'experience': [oneOf(experienceArr,'请选择从业经验')],
        'house': [oneOf(houseArr,'请选择住房条件')],
        'marriage': [oneOf(marriageArr,'请选择婚姻状况')],
        'spouse': [],
        'ownerCredit': [oneOf(enterpriseCreditArr,'请选择企业主征信')]
    }
    if (props.form.category && props.form.category.value === '014') {
        rules.otherCateName.push(required('请输入行业类别'));
    } else {
        rules.otherCateName = [];
    }
    if (props.form.marriage && props.form.marriage.value === '已婚') {
        rules.spouse.push(oneOf(spouseArr,'请选择配偶自己状况'))
    } else {
        rules.spouse = [];
    }
    return createValidator(rules)(values)
}

export const guaranteeArr = [
    '不动产抵押',
    '车辆抵押',
    '股权质押',
    '租赁权质押',
    '债权抵押',
    '个人连带责任反担保',
    '专利权',
    '其他'
]

export const form3 = createValidator({
    'currentAsset': [required('请输入当前总资产'), decimal],
    'currentDebt': [required('请输入当前总负债'), decimal],
    'lastYearSalesIncome': [required('请输入去年销售收入'), decimal],
    'thisYearIncome': [required('请输入本年预计销售收入'), decimal],
    'lastYearProfit': [required('请输入去年净利润'), decimal],
    'debtInOneYear': [required('请输入一年内到期负债'), decimal],
    'assetWithdraw': [required('请输入短期内可变现资产'), decimal],
    'inventory': [required('请输入存货金额'), decimal],
    'guarantee': [required('请选择能够提供的反担保')]
})
