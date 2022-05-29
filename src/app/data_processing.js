export const find = (list, rule) => {
    let result = null
    list.forEach(item => {
        let flag = true
        Object.keys(rule).forEach(key => {
            if (item[key] !== rule[key]) flag = false
        })
        if (flag) result = item;
    })
    return result ? result.value : null;
}

export const findAll = (list, time) => {

    let result = []
    for (let i in list) {
        if (list[i].t == time) result.push(list[i])
    }

    console.log(result)

    return result.length !== 0 ? result : null;
}