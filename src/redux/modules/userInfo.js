const LOAD = 'userInfo/LOAD';
const LOAD_SUCCESS='userInfo/LOAD_SUCCESS';
const LOAD_FAIL = 'userInfo/LOAD_FAIL';

const initialState = {
    loaded:false
}

export default function reducer(state=initialState,action={}) {
    switch (action.type){
        case LOAD:
            return {
                loaded:false,
                loading:true
            }
        case LOAD_SUCCESS:
            return {
                loaded:true,
                loading:false,
                ...action.result
            }
        case LOAD_FAIL:
            return {
                loaded:false,
                loading:false,
                ...action.error
            }
        default:
            return state;
    }
}

export function isLoaded(globalState){
    return globalState.userInfo && globalState.userInfo.loaded;
}

export function load() {
    return {
        types:[LOAD,LOAD_SUCCESS,LOAD_FAIL],
        promise:client=>client.get('/so/api/v2/user/MYSELF/overview?version=1.2')
    }
}


