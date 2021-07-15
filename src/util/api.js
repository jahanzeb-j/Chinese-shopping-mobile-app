import Vue from 'vue'
import {router} from '../router/index.js'
import { LS } from './ls'

// console.log(HOST_HDPUSER)



export const _isLogin = () => {
    let url =  HOST_HDPUSER + '/user/isLogin'
    let loginCode = LS.get('loginCode')
    return Vue.resource(url).get({loginCode: loginCode}).then((response) => {
        if (response.status == 200 && response.body.code == '200') {
            LS.set('timeStamp_01', new Date().getTime())
            LS.set('loginCode', response.body.respBody.loginCode)
            return new Promise(function(resolve, reject) {
                resolve({loginStatus: true, loginCode: response.body.respBody.loginCode})
            })
        }else{
            return new Promise(function(resolve, reject) {
                resolve({loginStatus: false});
            })
        }
    }).catch((response) => {
        return new Promise(function(resolve, reject) {
            reject({loginStatus: false});
        })
    })
}

export const _getLoginCode = async () => {
    let timeStamp_01 = LS.get('timeStamp_01')
    let loginCode = LS.get('loginCode')
    // 5分钟内取缓存的logincode
    if(timeStamp_01 !== '' && (new Date().getTime() - parseInt(timeStamp_01)) / 1000 < 300){
        Vue.http.options.headers = {
            'loginCode': loginCode
        }
        LS.set('timeStamp_01', new Date().getTime())
        return new Promise(function(resolve, reject) {
            resolve({loginCode});
        })
    }else{
        let { loginStatus } = await _isLogin()
        if( loginStatus ){
            let loginCode = LS.get('loginCode')
            // Vue.http.options.headers = {
            //     'loginCode': loginCode
            // }
            return new Promise(function(resolve, reject) {
                resolve({loginCode});
            })
        }else{
            let loginBackUrl = window.location.href
            router.push({path: '/login',query: {loginBackUrl}})
        }
    }
}

export const api_get_no = (option) => {
    /*
    *params
    *   url: ajax的url地址
    *  data: ajax的请求数据
    *callback:事件回调
    */
    let {url, data = {}, done = () => {}, fail = () => {}} = option
    return Vue.resource(url).get(data).then((response) => {
        if (response.status == 200) {
            done(response.body)
            return response.body
        }
    }).catch((response) => {
        // fail(response)
    })
    
}
export const api_get = (option) => {
    /*
    *params
    *   url: ajax的url地址
    *  data: ajax的请求数据
    *callback:事件回调
    */
    let {url, data = {}, done = () => {}, fail = () => {}} = option
    return _getLoginCode().then((res)=>{
        // Vue.http.options.headers = {
        //     'loginCode': res.loginCode
        // }
        return Vue.resource(url).get(data).then((response) => {
            if (response.status == 200) {
                done(response.body)
                return response.body
            }
        }).catch((response) => {
            // fail(response)
        })
    })
}

export const api_post =  (option) => {
    /*
    *params
    *   url: ajax的url地址
    *  data: ajax的请求数据
    *  type：传递数据的类型，json为默认，可以是file
    *callback:事件回调
    */
    let {url, data = {}, type = 'json', done = () => {}, fail = () => {}} = option
    data = type === 'json' ? JSON.stringify(data) : data

    return _getLoginCode().then((res) => {
        let loginCode = LS.get('loginCode')
        Vue.http.options.headers = {
            'loginCode': loginCode
        }
        // 区分是否为文件，如果是json则发送json数据，不是则发formdata数据
        Vue.http.options.headers['content-Type'] = type === 'json' ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=utf-8'
        Vue.http.options.emulateJSON = true;
        return Vue.resource(url).save(data).then((response) => {
            if (response.status == 200) {
                done(response.body)
                return response.body
            }
        }).catch((response) => {
            fail(response)
        })
    })
}
export const api_post_no =  (option) => {
    /*
    *params
    *   url: ajax的url地址
    *  data: ajax的请求数据
    *  type：传递数据的类型，json为默认，可以是file
    *callback:事件回调
    */
    let {url, data = {}, type = 'json', done = () => {}, fail = () => {}} = option
    data = type === 'json' ? JSON.stringify(data) : data
    Vue.http.options.headers = {
       
    }
    // 区分是否为文件，如果是json则发送json数据，不是则发formdata数据
    Vue.http.options.headers['content-Type'] = type === 'json' ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=utf-8'
    Vue.http.options.emulateJSON = true;
    return Vue.resource(url).save(data).then((response) => {
        if (response.status == 200) {
            done(response.body)
            return response.body
        }
    }).catch((response) => {
        fail(response)
    })
   
}