import React, {Component, PropTypes} from 'react';

function getScroll(w, top) {
    let ret = w[`page${top ? 'Y' : 'X'}Offset`];
    const method = `scroll${top ? 'Top' : 'Left'}`;
    if (typeof ret !== 'number') {
        const d = w.document;
        // ie6,7,8 standard mode
        ret = d.documentElement[method];
        if (typeof ret !== 'number') {
            // quirks mode
            ret = d.body[method];
        }
    }
    return ret;
}

export default class BackTop extends Component {
    static propTypes = {
        visibilityHeight: PropTypes.number,
    }

    static defaultProps = {
        onClick() {
        },
        visibilityHeight: 400
    }

    constructor(props) {
        super(props);
        if (__CLIENT__) {
            const scrollTop = getScroll(window, true);
            this.state = {
                visible: scrollTop > this.props.visibilityHeight,
            };
        }

    }

    scrollToTop = (e) => {
        if (e) e.preventDefault();
        this.setScrollTop(0);
        this.props.onClick(e);
    }

    setScrollTop(value) {
        document.body.scrollTop = value;
        document.documentElement.scrollTop = value;
    }

    handleScroll = () => {
        const scrollTop = getScroll(window, true);
        this.setState({
            visible: scrollTop > this.props.visibilityHeight,
        });
    }

    componentDidMount() {
        if(window.addEventListener){
            window.addEventListener('scroll', this.handleScroll);
        }else if(window.attachEvent){
            window.attachEvent('onscroll', this.handleScroll);
        }

    }

    componentWillUnmount() {
        if(window.detachEvent){
            window.detachEvent('onscroll',this.handleScroll);
        }else if(window.removeEventListener){
            window.removeEventListener('scroll',this.handleScroll);
        }

    }

    render() {
        return (
            <div style={{width:'100%',height:'100%'}} onClick={this.scrollToTop}>
            </div>
        )
    }
}