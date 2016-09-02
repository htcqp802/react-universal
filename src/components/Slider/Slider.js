import React, {Component, PropTypes} from 'react';
import Item from './Item';

export default class Slider extends Component {
    static propTypes = {
        children: PropTypes.array
    }

    static defaultProps = {
        height: 320,
        minWidth: 1200,
        tickTime: 5000
    }

    state = {
        active: 0
    }

    componentDidMount() {
        this.startInterval();
    }

    startInterval(){
        this.interval = setInterval(()=> {
            this.setState({
                active: this.state.active < this.props.children.length - 1 ? this.state.active + 1 : 0
            })
        }, this.props.tickTime);
    }
    stopInterval(){
        clearInterval(this.interval);
    }
    componentWillUnmount(){
        this.stopInterval();
    }
    render() {
        const style = require('./Slider.less');
        const sliders = this.props.children;
        const {width, height} = this.props;
        return (
            <div style={{width:width,height:height,top:-1,background:'url('+ require('./lld_banner_default.jpg') +')'}}  className={style.slider}>
                <ul className={style.sliderWraper}>
                    {Array.isArray(sliders) &&
                    sliders.map((item, index)=> {
                            const slider = item.props;
                            return <Item slider={slider} width="100%" height={height}
                                         opacity={index === 0 ? 1 : 0} show={this.state.active === index}
                                         key={index}/>
                        })
                    }
                </ul>
                <ul className={style.sliderPoint}>
                    {Array.isArray(sliders) &&
                        sliders.map((item, index)=> {
                            return <li key={index} className={this.state.active === index ? style.active : ""}><a
                                onClick={()=>{
                                this.stopInterval();
                                this.setState({active:index});
                                this.startInterval();
                            }}
                                target="_blank"></a></li>
                        })
                    }
                </ul>
            </div>
        )
    }
}