import React, {Component} from 'react';
import {Go,BackTop} from 'components';



export default class ToolLeft extends Component {


    handleClick() {
        if (navigator.userAgent.toLowerCase().indexOf('opera') !== -1 && window.event.preventDefault) window.event.preventDefault();
        const newWindow = window.open('http://60.10.131.83/icsoc_kf/client.php?locale=zh-cn&amp;style=original&amp;url=' + escape(document.location.href) + '&amp;referrer=' + escape(document.referrer), 'webim', 'toolbar=0,scrollbars=1,location=0,status=1,menubar=0,width=880,height=640,resizable=1');
        newWindow.focus();
        newWindow.opener = window;
        return false;
    }
    render() {
        const style = require('./ToolLeft.less');
        return (
            <div className={style.toolLeft}>
                <ul>
                    <li className={style.counst}>
                        <Go main="/act/201607-pc-8yuefanye.html" target="_blank"></Go>
                    </li>
                    <li className={style.guide}>
                        <Go main="/guide/llc/" target="_blank"></Go>
                    </li>
                    <li className={style.caculater}>

                    </li>
                    <li className={style.service}>
                        <a
                            href="http://60.10.131.83/icsoc_kf/client.php?locale=zh-cn&amp;style=original"
                            target="_blank"
                            onClick={this.handleClick}></a>
                    </li>
                    <li className={style.backTop}>
                        <BackTop></BackTop>
                    </li>
                </ul>
            </div>
        )
    }
}