import React, {Component} from 'react';
import {Link} from 'react-router';
import {ApplyLoanForm1, ApplyLoanForm2, ApplyLoanForm3} from 'components';
import {connect} from 'react-redux';

@connect((state)=>({
    user: state.auth.user,
    HouseList: state.applyLoan.HouseList,
}))
export default class ApplyLoan extends Component {
    constructor(props) {
        super(props)
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.state = {
            page: 1
        }
    }


    nextPage() {
        this.setState({page: this.state.page + 1})
    }

    previousPage() {
        this.setState({page: this.state.page - 1})
    }

    render() {
        const style = require('./ApplyLoan.less');
        const {page} = this.state;
        const {user:{id, name, mobile},HouseList} = this.props;
        return (
            <div className={style.applyLoan}>
                <ul className={style.path}>
                    <li><Link to="/">理理贷</Link></li>
                    <li>></li>
                    <li><Link to="/fqddetail">凤加贷</Link></li>
                    <li>></li>
                    <li>借款申请</li>
                </ul>
                {
                    page === 1 &&
                    <div className={style.panel}>
                        <div className={style.step1}></div>
                        <div className={style.content}>
                            <div className={style.title+" "+style.center}>欢迎您选择<span
                                className={style.orange}>凤加贷</span>，让我们先了解一下您的需求吧！
                            </div>
                            <p className={style.center}>北京地区凤加贷申请由中金投集团提供线下审核服务</p>
                            <div className={style.navCondition}>
                                <span className={style.first}>房产位于北京六环内</span>
                                <span className={style.second}>房屋产权人全部满足18-58岁</span>
                                <span className={style.third}>一抵为银行且房贷逾期不超过1次</span>
                            </div>
                            <ApplyLoanForm1 onSubmit={this.nextPage}
                                            initialValues={{receiptInfo:{userName:name,userId:id,phone:mobile},userInfo:{cust_name:name},otherInfo:{rate:'1.3%-2%'}}}/>
                        </div>
                    </div>
                }
                {
                    page === 2 &&
                    <div className={style.panel}>
                        <div className={style.step2}></div>
                        <ApplyLoanForm2 onSubmit={this.nextPage} HouseList={HouseList} previousPage={this.previousPage}/>
                    </div>
                }
                {
                    page === 3 &&
                    <div className={style.panel}>
                        <div className={style.step3}></div>
                        <ApplyLoanForm3 previousPage={this.previousPage}></ApplyLoanForm3>
                    </div>
                }
            </div>
        )
    }
}