import React, {Component} from 'react';
import {Link} from 'react-router';
import {asyncConnect} from 'redux-async-connect';
import {connect} from 'react-redux';
import {loadAreaCode,loadFQD,loadCategory} from 'redux/modules/applyFQD';
import {ApplyFQDForm1, ApplyFQDForm2, ApplyFQDForm3,Go} from 'components';


@asyncConnect([{
    promise: ({store:{getState,dispatch}})=> {
        const id = getState().auth.user.id;
        return Promise.all([
            dispatch(loadAreaCode()),
            dispatch(loadFQD(id)),
            dispatch(loadCategory())
        ]);
    }
}])
@connect((state)=>({
    dataCategory: state.applyFQD.dataCategory,
    area: state.applyFQD.dataAreaCode
}))
export default class ApplyLoan extends Component {
    constructor(props) {
        super(props)
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.closeAlter = this.closeAlter.bind(this);
        this.state = {
            page: 1,
            showAlert:false
        }
    }


    nextPage() {
        this.setState({page: this.state.page + 1})
    }

    previousPage() {
        this.setState({page: this.state.page - 1})
    }
    closeAlter(param){
        this.setState({showAlert:param})
    }

    render() {
        const style = require('../ApplyLoan/ApplyLoan.less');
        const style2 = require('./ApplyFQD.less');
        const bg = {backgroundImage:'url('+ require('./lld_step1.png') +')'};
        const {page,showAlert} = this.state;
        const {dataCategory,area} = this.props;
        return (
            <div className={style.applyLoan}>
                <div className={style2.shadow} style={{display:showAlert?'block':'none'}}></div>
                <div className={style2.alert} style={{display:showAlert?'block':'none'}}>
                    <div className={style2.head}>
                        <p>保存成功</p>
                        <div className={style2.close} onClick={()=>this.setState({showAlert:!this.state.showAlert})}></div>
                    </div>
                    <div className={style2.content}>
                        <div className={style2.success}></div>
                        <p>您的凤企贷申请保存成功！下次可通过登录我的账户完成资料补充后提交申请。</p>
                    </div>
                    <div className={style2.foot}>
                        <Go my="/account/loanRecord?tab=2">关闭</Go>
                    </div>
                </div>
                <ul className={style.path}>
                    <li><Link to="/">理理贷</Link></li>
                    <li>></li>
                    <li><Link to="/fqddetail">凤企贷</Link></li>
                    <li>></li>
                    <li>借款申请</li>
                </ul>
                {
                    page === 1 &&
                    <div className={style.panel}>
                        <div className={style.step1} style={bg}></div>
                        <div className={style.content}>
                            <div className={style.title+" "+style.center}>欢迎您选择<span
                                className={style.orange}>凤企贷</span>，让我们先了解一下您的需求吧！
                            </div>
                        </div>
                        <ApplyFQDForm1 formKey="1" area={area} onSubmit={this.nextPage}></ApplyFQDForm1>
                    </div>
                }
                {
                    page === 2 &&
                    <div className={style.panel}>
                        <div className={style.step2} style={bg}></div>
                        <ApplyFQDForm2 formKey="2" dataCategory={dataCategory} onSubmit={this.nextPage} closeAlter={this.closeAlter} previousPage={this.previousPage}></ApplyFQDForm2>
                    </div>
                }
                {
                    page === 3 &&
                    <div className={style.panel}>
                        <div className={style.step3} style={bg}></div>
                        <ApplyFQDForm3 formKey="3" previousPage={this.previousPage} closeAlter={this.closeAlter}></ApplyFQDForm3>
                    </div>
                }
            </div>
        )
    }
}