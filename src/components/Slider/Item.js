import React, {Component,PropTypes} from 'react';

export default class Item extends Component {

    static propTypes = {
        width:PropTypes.string,
        height:PropTypes.number,
        slider:PropTypes.object,
        show:PropTypes.bool,
        opacity:PropTypes.number
    }

    state = {
        opacity: this.props.opacity
    }
    componentWillMount(){
        this.intervals = [];
    }
    componentWillReceiveProps(nextProps) {
        this.intervals.forEach((item)=>{
            clearInterval(item);
        });
        if (nextProps.show) {
           const interval1 = setInterval(()=> {
                if (this.state.opacity < 1) {
                    this.setState({opacity: this.state.opacity + 0.01});
                    this.intervals.push(interval1);
                } else {
                    this.setState({opacity: 1})
                    clearInterval(interval1);
                }
            }, 10)

        } else {
            const interval2 = setInterval(()=> {
                if (this.state.opacity >= 0) {
                    this.setState({opacity: this.state.opacity - 0.01})
                    this.intervals.push(interval2);
                } else {
                    this.setState({opacity: 0})
                    clearInterval(interval2);
                }
            }, 10)
        }
    }

    render() {
        const {slider,width,height} = this.props;
        const style = {
            backgroundImage: `url(${slider.src})`,
            opacity: this.state.opacity,
            display: this.state.opacity === 0 ? 'none' : 'block',
            width:width,
            height:height,
            backgroundPosition:"50% 0"
        }
        return (
            <li style={style} >
                <a href={slider.href} target="_blank" title={slider.atl}>
                </a>
            </li>
        )
    }
}
