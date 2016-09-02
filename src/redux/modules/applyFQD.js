const AREACODE_LOAD = 'applyFQD/AREACODE_LOAD';
const AREACODE_SUCCESS = 'applyFQD/AREACODE_SUCCESS';
const AREACODE_FAIL = 'applyFQD/AREACODE_FAIL';
const FQD_LOAD = 'applyFQD/FQD_LOAD';
const FQD_FAIL = 'applyFQD/FQD_FAIL';
const FQD_SUCCESS = 'applyFQD/FQD_SUCCESS';
const CATEGORY_LOAD = 'applyFQD/CATEGORY_LOAD';
const CATEGORY_FAIL = 'applyFQD/CATEGORY_FAIL';
const CATEGORY_SUCCESS = 'applyFQD/CATEGORY_SUCCESS';
const HOLD = 'applyFQD/HOLD';


const initialState = {
    loadingAreaCode: false,
    loadingFQD: false,
    loadingCATEGORY: false
}


export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case AREACODE_LOAD:
            return {
                ...state,
                loadingAreaCode: true,
                loadedAreaCode: false
            }
        case AREACODE_SUCCESS:
            return {
                ...state,
                loadingAreaCode: false,
                loadedAreaCode: true,
                dataAreaCode: action.result
            }
        case AREACODE_FAIL:
            return {
                ...state,
                loadingAreaCode: false,
                loadedAreaCode: false,
                errorAreaCode: action.error
            }
        case FQD_LOAD:
            return {
                ...state,
                loadingFQD: true,
                loadedFQD: false
            }
        case FQD_SUCCESS:
            return {
                ...state,
                loadingFQD: false,
                loadedFQD: true,
                dataFQD: action.result
            }
        case FQD_FAIL:
            return {
                ...state,
                loadingFQD: false,
                loadedFQD: false,
                errorFQD: action.error
            }
        case CATEGORY_LOAD:
            return {
                ...state,
                loadingCategory: true,
                loadedCategory: false
            }
        case CATEGORY_SUCCESS:
            return {
                ...state,
                loadingCategory: false,
                loadedCategory: true,
                dataCategory: action.result
            }
        case CATEGORY_FAIL:
            return {
                ...state,
                loadingCategory: false,
                loadedCategory: false,
                errorCategory: action.error
            }
        default:
            return state;
    }
}

export function loadAreaCode() {
    return {
        types: [AREACODE_LOAD, AREACODE_SUCCESS, AREACODE_FAIL],
        promise: client=>client.get('/api/v2/receipt/fqd/getLoanAreas')
    }
}

export function loadFQD(userId) {
    return {
        types: [FQD_LOAD, FQD_SUCCESS, FQD_FAIL],
        promise: client=>client.get(`/api/v2/receipt/fqd/get?userId=${userId}`)
    }
}

export function loadCategory() {
    return {
        types: [CATEGORY_LOAD, CATEGORY_SUCCESS, CATEGORY_FAIL],
        promise: client=>client.get('/api/v2/receipt/fqd/getLoanCategory')
    }
}


export function hold(data,url) {
    const _data = {
        ...data[1],
        ...data[2],
        ...data[3]
    };
    const formatMoney = (money)=>money?money*10000:"";
    return {
        types: [HOLD, HOLD, HOLD],
        promise: client=>client.post('/api/v2/receipt/fqd/'+url, {
            data: {
                ..._data,
                moneyBorrow:formatMoney(_data.moneyBorrow),
                currentAsset:formatMoney(_data.currentAsset),
                currentDebt:formatMoney(_data.currentDebt),
                lastYearSalesIncome:formatMoney(_data.lastYearSalesIncome),
                thisYearIncome:formatMoney(_data.thisYearIncome),
                lastYearProfit:formatMoney(_data.lastYearProfit),
                debtInOneYear:formatMoney(_data.debtInOneYear),
                assetWithdraw:formatMoney(_data.assetWithdraw),
                inventory:formatMoney(_data.inventory),
            }
        })
    }
}




