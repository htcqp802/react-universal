import React, {Component, PropTypes} from 'react';
import {reduxForm, change} from 'redux-form';
import {form2Validation, rightKinds} from './applyLoanValidation';
import  * as applyLoan from 'redux/modules/applyLoan';
import {connect} from 'react-redux';
import Caculate from './Caculate';

const style = require('./ApplyLoanForm.less');

@reduxForm({
    form: 'applyLoan',
    fields: [
        'houseInfoList[].right_kind',       //房屋性质
        'houseInfoList[].communityName',   //小区名
        'houseInfoList[].communityID',
        'houseInfoList[].buildingNumber',
        'houseInfoList[].roomNumber',
        'houseInfoList[].build_area',       //面积
        'houseInfoList[].loan_bank_acc2',   //贷款余额
        'houseInfoList[].use_state',        //使用情况
        'houseInfoList[].direction',        //房屋朝向
        'houseInfoList[].prop_no',          //产权证
        'houseInfoList[].owner',            //姓名
        'houseInfoList[].card_no_house',     //身份证
        'houseInfoList[].place',
        'houseInfoList[].city'
    ],
    destroyOnUnmount: false,
    validate: form2Validation
})
@connect(
    state=> ({
        forms: state.form.applyLoan
    })
)

export default class ApplyLoanForm2 extends Component {

    static propTypes = {
        fields: PropTypes.object.isRequired,
        invalid: PropTypes.bool,
        pristine: PropTypes.bool,
        submitting: PropTypes.bool,
        handleSubmit: PropTypes.func.isRequired,
        previousPage: PropTypes.func.isRequired,

    }


    componentWillMount() {
        this.props.fields.houseInfoList.addField();
    }


    render() {
        const {
            fields:{
                houseInfoList
            },
            invalid,
            pristine,
            submitting,
            previousPage,
            handleSubmit
        } = this.props;


        return (
            <div>
                {
                    houseInfoList.map((building, index)=> {
                            return (
                                <Forms key={index} index={index} {...building}
                                       removeField={houseInfoList.removeField}></Forms>
                            )
                        }
                    )
                }
                <table className="form-table" style={{margin:"auto"}}>
                    <tbody>
                    {houseInfoList.length < 3 && <tr>
                        <td></td>
                        <td>
                            <button className={style.addMore} onClick={()=>houseInfoList.addField()}></button>
                        </td>
                    </tr>}
                    <tr>
                        <td style={{textAlign:"center"}} colSpan="3">
                            <button onClick={previousPage}>上一步</button>
                            <button style={{marginLeft:30}} disabled={invalid || pristine || submitting}
                                    onClick={handleSubmit}>
                                我还能借多少
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

@connect(state=>({
    loading: state.applyLoan.loading,
    loadError: state.applyLoan.loadError,
    loaded: state.applyLoan.loaded,
    BuildingList: state.applyLoan.BuildingList,
    ConstructionList: state.applyLoan.ConstructionList,
    HouseList:state.applyLoan.HouseList,
    name: state.applyLoan.name,
}), {...applyLoan, change})
class Forms extends Component {

    static propTypes = {
        loading: PropTypes.bool,
        loadError: PropTypes.object,
        loaded: PropTypes.bool,
        change: PropTypes.func.isRequired,
        loadCommunity: PropTypes.func.isRequired,
        loadBuildingNo: PropTypes.func.isRequired,
        loadRoom: PropTypes.func.isRequired,
        BuildingList: PropTypes.array,
        HouseList: PropTypes.array,
        ConstructionList: PropTypes.array,
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    }

    componentWillMount() {
        const {change, city} = this.props;
        city.defaultValue = 'beijing';
        change('applyLoan', city.name, 'beijing');
    }
    componentDidMount(){
        if(window.addEventListener){
            window.addEventListener('click',this.setBlock)
        }else if(window.attachEvent){
            window.attachEvent('onclick',this.setBlock);
        }

    }
    setBlock=()=>{
            this.setState({showLoadBlock:false})
    }
    componentWillUnmount(){
        if(window.removeEventListener){
            window.removeEventListener('click',this.setBlock);
        }else if(window.detachEvent){
            window.detachEvent('onclick',this.setBlock);
        }

    }


    state = {
        caculateShow: false,
        inputName: '',
        showLoadBlock:false
    }

    render() {
        const {
            loading,
            loadError,
            loaded,
            loadCommunity,
            loadBuildingNo,
            loadRoom,
            removeField,
            change,
            ConstructionList,
            BuildingList,
            HouseList,
            name,
            right_kind,       //房屋性质
            communityName,   //小区名
            communityID,
            buildingNumber,
            roomNumber,
            build_area,       //面积
            loan_bank_acc2,   //贷款余额
            use_state,        //使用情况
            direction,        //房屋朝向
            prop_no,          //产权证
            owner,            //姓名
            card_no_house,     //身份证
            place,
            city,
            index
        }=this.props;
        const smallStyle = {width: 130, marginLeft: 20}
        return (
            <table className={ index > 0 ? `${style.addMoreBg} form-table` : "form-table"}
                   style={{margin:"20px auto",position:"relative"}}>
                { index > 0 &&
                <thead className={style.close} onClick={()=>removeField(index)}></thead>}
                <tbody >
                <tr>
                    <td className="required">房屋性质：</td>
                    <td>
                        <input type="hidden" {...city}/>
                        <input type="hidden" {...place}/>
                        <select {...right_kind}>
                            <option value="请选择">请选择</option>
                            <option value={rightKinds[0]}>住宅</option>
                        </select>
                    </td>
                    { right_kind.error && right_kind.touched &&
                    <td className="error">{ right_kind.error}</td>}
                </tr>
                <tr>
                    <td className="required">小区名称:</td>
                    <td colSpan="2" style={{position:"relative"}}>
                        { communityName.error && communityName.touched &&
                        <span style={{fontSize:12,position:"absolute",top:-10}}
                              className="error">{ communityName.error}</span>}
                        <div className={style.inputGroup} >
                            <input type="hidden" {...communityID}/>
                            <input style={{width:200}} type="text"
                                   onKeyUp={()=>{
                                                    loadCommunity( communityName.value, communityName.name)
                                               }}
                                   placeholder="请输入小区名称" onClick={(e)=>{
                                   e.stopPropagation();
                                   this.setState({showLoadBlock:true})
                                   }} {...communityName}  />
                            {this.state.showLoadBlock && loading && name === communityName.name &&
                            <div className={style.prompt}>数据加载中 请稍后......</div>}
                            {this.state.showLoadBlock && loadError && !loading && !loaded &&
                            name === communityName.name &&
                            <div className={style.prompt}>服务器错误,请稍后再试</div>}
                            {this.state.showLoadBlock && ConstructionList && loaded && !loading && name === communityName.name &&
                            <ul className={style.items}>
                                {ConstructionList.length > 0 ?
                                    ConstructionList.map(item=>
                                        <li key={item.ConstructionID} onClick={(event)=>{
                                                    event.stopPropagation();
                                                change('applyLoan', communityName.name,item.ConstructionName)
                                                change('applyLoan', communityID.name,item.ConstructionID)
                                                change('applyLoan',place.name,item.ConstructionName)
                                               loadBuildingNo(item.ConstructionID, index);
                                                }}>{item.ConstructionName}</li>)
                                    :
                                    <li>无结果</li>}
                            </ul>}
                        </div>

                        <select style={smallStyle} {...buildingNumber}
                                onChange={(event)=>{
                                loadRoom(event.target.value.split(',')[0], index);
                                change('applyLoan',place.name,communityName.value+event.target.value.split(',')[1])
                                buildingNumber.onChange(event.target.value);
                                }} >
                            <option value="请选择楼号">请选择楼号</option>
                            {BuildingList && name === index && BuildingList.map(item=>
                                <option key={item.BuildingID}
                                        value={item.BuildingID+","+item.BuildingName}>{item.BuildingName}</option>
                            )}
                        </select>
                        <select style={smallStyle} {...roomNumber} onChange={(event)=>{
                            change('applyLoan',place.name,communityName.value+buildingNumber.value.split(',')[1]+event.target.value.split(',')[1])
                            roomNumber.onChange(event.target.value);
                        }}>
                            <option value="请输入门牌号">请输入门牌号</option>
                            {HouseList && name === index && HouseList.map(item=>
                                <option key={item.HouseID}
                                        value={item.HouseID+","+item.HouseName}>{item.HouseName}</option>
                            )}
                        </select>
                    </td>
                    <td>

                    </td>
                </tr>
                <tr>
                    <td className="required">建筑面积:</td>
                    <td><input type="text" className="hasUnit"
                               placeholder="98或98.8或98.88" {...build_area}/><span
                        className="unit">m²</span>
                    </td>
                    { build_area.error && build_area.touched &&
                    <td className="error">{ build_area.error}</td>}
                </tr>
                <tr>
                    <td className="required">贷款余额:</td>
                    <td style={{position:"relative"}}>{ loan_bank_acc2.error && loan_bank_acc2.touched &&
                    <span style={{fontSize:12,position:"absolute",top:-10}}
                          className="error">{ loan_bank_acc2.error}</span>}
                        <input type="text" className="hasUnit"
                            {...loan_bank_acc2} /><span
                            className="unit">元</span>

                    </td>
                    <td>
                        <div className={style.caculateBtn}
                             onClick={()=>{
                                         this.setState({caculateShow:true,inputName: loan_bank_acc2.name})
                                         }}></div>
                        <Caculate show={this.state.caculateShow}
                                  close={()=>this.setState({caculateShow:false})}
                                  name={this.state.inputName}></Caculate>
                    </td>
                </tr>
                <tr>
                    <td>使用情况:</td>
                    <td>
                        <select {...use_state}>
                            <option value="请选择">请选择</option>
                            <option value="USE">自用</option>
                            <option value="LEASE">租赁</option>
                            <option value="VACANT">空置</option>
                            <option value="OTHER">其他</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>房屋朝向:</td>
                    <td>
                        <select {...direction}>
                            <option value="请选择">请选择</option>
                            <option value="SOUTH_NORTH">南北向</option>
                            <option value="EAST_WEST">东西向</option>
                            <option value="SOUTH_DIRE">正南全阳</option>
                            <option value="EAST">东向</option>
                            <option value="WEST">西向</option>
                            <option value="EAST_SOUTH">东南</option>
                            <option value="WEST_SOUTH">西南</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>产权证号:</td>
                    <td>
                        <input type="text" {...prop_no} />
                    </td>
                </tr>
                <tr>
                    <td>产权人姓名:</td>
                    <td>
                        <input type="text" {...owner}/>
                    </td>
                </tr>
                <tr>
                    <td>产权人身份证:</td>
                    <td>
                        <input type="text" {...card_no_house} />
                    </td>
                    { card_no_house.error && card_no_house.touched &&
                    <td className="error">{ card_no_house.error}</td>}
                </tr>
                </tbody>
            </table>
        )
    }
}