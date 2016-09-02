export function filter(_data,data) {
    const $data = {}
    _data.map(item=>{
        $data[item] = data[item]
    })
    return $data;
}