function setCookie(name, value, maxAge) {
    let cookie = `${name}=${encodeURIComponent(value)}`
    //判断传入过期时间类型，是数字的话就添加到cookie
    if (typeof maxAge==='number') {
        cookie += `;max-age=${maxAge}`
    }
    document.cookie = cookie
}
function getCookieObject() {
    if(!document.cookie.length) return 'cookie为空'
    let result = {}
    //将添加cookie时自动生成的空格去掉，避免后面索引对不上
    let cookieStr = document.cookie.replace(/; /g, ';')
    //为cookie最后添加分号，这样一会循环才能遍历最后一项
    if (cookieStr.slice(-1) !== ';') cookieStr += ';'
    //滑动选取每一项cookie元素
    let startIndex = 0
    let nextStartIndex = 0
    //等号的索引
    let equalIndex = 0
    //当startIndex之后不再有分号时，已经遍历每一项cookie元素
    while (cookieStr.indexOf(';', startIndex) !== -1) {
        equalIndex = cookieStr.indexOf('=', startIndex)
        nextStartIndex = cookieStr.indexOf(';', startIndex) + 1
        let key = cookieStr.slice(startIndex, equalIndex)
        let value = decodeURIComponent(cookieStr.slice(equalIndex + 1, nextStartIndex-1))
        result[key] = value
        startIndex = nextStartIndex
    }
    return result
}
function getCookie(name) {
    if(!name)  return 'cookie中不存在此键'
    let cookieStr = document.cookie
    if (cookieStr.slice(-1) !== ';') cookieStr += ';'
    let startIndex=cookieStr.indexOf(`${name}=`)
    if(startIndex===-1) return 'cookie中不存在此键'
    startIndex+=name.length+1
    let endIndex=cookieStr.indexOf(';',startIndex)
    return decodeURIComponent(cookieStr.slice(startIndex,endIndex))
}
function deleteCookie(name){
    setCookie(name,'',0)
    console.log(`cookie中${name}删除成功`)
}
function clearCookie(){
    let cookieObj=getCookieObject()
    Object.keys(cookieObj).forEach((v,i)=>{
        deleteCookie(v)
    })
    console.log('cookie清除成功')
}
//test
setCookie('username', 'escaay;;;')
setCookie('phone', '88888')
console.log('getCookieObject:  ',getCookieObject())
console.log("getCookie('username'):  ",getCookie('username'))
deleteCookie('username')
console.log('getCookieObject:  ',getCookieObject())
console.log("getCookie('username'):  ",getCookie('username'))
clearCookie()
console.log('getCookieObject:  ',getCookieObject())