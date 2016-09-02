const LOAD = 'applyLoan/LOAD';
const LOAD_SUCCESS = 'applyLoan/LOAD_SUCCESS';
const LOAD_FAIL = 'applyLoan/LOAD_FAIL';
const BUILDING = 'applyLoan/BUILDING';
const ROOM = 'applyLoan/ROOM';
const GETRESULT = 'applyLoan/GETRESULT';
const initialState = {
    loading: false,
    loadError: null
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                loading: true,
                loadError: null,
                name: action.name
            }
        case LOAD_SUCCESS:
            const {ConstructionList} = action.result.data;
            return {
                ...state,
                loading: false,
                loadError: null,
                loaded: true,
                name: action.name,
                ConstructionList
            }
        case LOAD_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                loadError: action.error,
                name: action.name
            }
        case BUILDING:
            const {BuildingList} = action.result.data;
            return {
                ...state,
                name: action.name,
                BuildingList
            }
        case ROOM:
            const {HouseList} = action.result.data;
            return {
                ...state,
                name: action.name,
                HouseList
            }
        default:
            return state;
    }
}


export function loadCommunity(keyValue, name) {
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        name,
        promise: (client)=>client.post('/api/v2/house/constructionList', {
            data: {keyword: keyValue}
        })
    }
}

export function loadBuildingNo(constructionID, name) {
    return {
        types: [LOAD, BUILDING, LOAD_FAIL],
        name,
        promise: (client)=>client.post('/api/v2/house/buildingList', {
            data: {constructionID}
        })
    }
}

export function loadRoom(buildingID, name) {
    return {
        types: [LOAD, ROOM, LOAD_FAIL],
        name,
        promise: (client)=>client.post('/api/v2/house/houseList', {
            data: {buildingID}
        })
    }
}

export function caculateResult(params) {
    return {
        types: [LOAD, GETRESULT, LOAD_FAIL],
        promise: (client)=>client.post('/api/v2/house/unitPrice', {
            data: params
        })
    }
}

export function submit(params) {
    return {
        types: ['','commit',''],
        promise:(client)=>client.post('/api/v2/receipt/add',{
            data:params
        })
    }
}