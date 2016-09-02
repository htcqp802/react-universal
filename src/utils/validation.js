const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0];

export function email(value) {
    if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return '无效的邮箱地址';
    }
}

export function required(message) {
    return value=>{
        if (isEmpty(value)) {
            return message || '此项为必填项,不允许为空';
        }
    }

}

export function minLength(min,message) {
    return value => {
        if (!isEmpty(value) && value.length < min) {
            return message || `至少需要${min}个字符`;
        }
    };
}

export function maxLength(max) {
    return value => {
        if (!isEmpty(value) && value.length > max) {
            return `最多输入${max}个字符`;
        }
    };
}

export function integer(value) {
    if (!Number.isInteger(Number(value))) {
        return '请输入整数';
    }
}
export function decimal(value) {
    if (!/^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/.test(value)) {
        return '请输入正数,可保留2位小数';
    }
}

export function interval(min, max,message) {
    return value => {
        if (!Number(value) || Number(value) < min || Number(value) > max) {
            return message || `请输入${min}-${max}间的数`;
        }
    }
}

export function oneOf(enumeration,message) {
    return value => {
        if (!~enumeration.indexOf(value)) {
            return message || '请选择';
        }
    };
}

export function match(field) {
    return (value, data) => {
        if (data) {
            if (value !== data[field]) {
                return '两次输入不一致';
            }
        }
    };
}

export function idCard(value) {
    if (!isEmpty(value) && !/(^\d{15}$)|(^\d{14}(\d|X|x)$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
        return '请输入正确的身份证号'
    }
}


export function createValidator(rules) {
    return (data = {}) => {
        const errors = {};
        Object.keys(rules).forEach((key) => {
            const rule = join([].concat(rules[key]));
            const error = rule(data[key], data);
            if (error) {
                errors[key] = error;
            }
        });
        return errors
    };
}
