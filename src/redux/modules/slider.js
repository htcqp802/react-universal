const LOAD = 'slider/LOAD';
const LOAD_SUCCESS = 'slider/LOAD_SUCCESS';
const LOAD_FAIL = 'slider/LOAD_FAIL';

const initialState= {
    loaded:false
}

export default function reducer(state=initialState,action={}) {
    switch (action.type){
        case LOAD:
            return {
                ...state,
                loaded:false,
                loading:true
            }
        case LOAD_SUCCESS:
            return {
                ...state,
                loaded:true,
                loading:false,
                data:action.result
            }
        case LOAD_FAIL:
            return {
                ...state,
                loaded:false,
                loading:false,
                data:action.error
            }
        default:
            return state;
    }
}

export function load() {
    return {
        types:[LOAD,LOAD_SUCCESS,LOAD_FAIL],
        promise:(client)=>client.get('/api/v2/home/loanScroll')
    }
}