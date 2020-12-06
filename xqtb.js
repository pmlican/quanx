/*
星趣童堡签到：连续5天签到可以换5个赠币

Quantumult X 
[task_local]
# 星趣童堡
1 0 * * * https://raw.githubusercontent.com/pmlican/quanx/main/xqtb.js, tag=星趣童堡签到

[rewrite_local]
# 获取星趣童堡cookie
^https:\/\/pw\.gzych\.vip\/ykb_huiyuan\/api\/v1\/Member\/GetMemberStoredValue url script-request-header https://raw.githubusercontent.com/pmlican/quanx/main/xqtb.js

[mitm]
hostname = pw.gzych.vip
*/

const CheckinURL = 'https://pw.gzych.vip/ykb_huiyuan/api/v1/MemberCheckIn/Submit'
const TokenName = '星趣童堡'
const TokenKey = 'xqtb_token'

const $cmp = compatibility()

!(async () => {
    if ($cmp.isRequest) {
        GetToken()
    } else {
        await Checkin()
    }
})().finally(() => $cmp.done())

function GetToken() {
    if ($request.headers['Authorization']) {
        var TokenValue = $request.headers['Authorization']
        if ($cmp.read(TokenKey) != (undefined || null)) {
            if ($cmp.read(TokenKey) != TokenValue) {
                var token = $cmp.write(TokenValue, TokenKey)
                if (!token) {
                    $cmp.notify("更新" + TokenName + " Token 失败‼️", "", "")
                } else {
                    $cmp.notify("更新" + TokenName + " Token 成功 🎉", "", "")
                }
            }
        } else {
            var token = $cmp.write(TokenValue, TokenKey);
            if (!token) {
                $cmp.notify("首次写入" + TokenName + " Token 失败‼️", "", "")
            } else {
                $cmp.notify("首次写入" + TokenName + " Token 成功 🎉", "", "")
            }
        }
    } else {
        $cmp.notify("写入" + TokenName + "Token 失败‼️", "", "配置错误, 无法读取请求头, ")
    }
}

function Checkin() {
    return new Promise((resolve, reject) => {
    const nxdc = {
        url: CheckinURL,
        headers: {
            'Authorization': $cmp.read(TokenKey)
        },
    };
    $cmp.get(nxdc, function(error, response, data) {
        const result = JSON.parse(data)
        if (!error) {
            if (result.ResponseStatus.ErrorCode == 0) {
                $cmp.notify(TokenName, "", "签到成功！🎉")
            } else if(result.ResponseStatus.ErrorCode == 2102008002) {
                $cmp.notify(TokenName, "", "重复签到！😊")

            } else {
                $cmp.notify(TokenName, "签到失败‼️ 详情请见日志。", data)
            }
        } else {
            $cmp.notify(TokenName,  "签到接口请求失败，详情请见日志。", error)
        }
        resolve()
    })
  })
}

function compatibility(){const e="undefined"!=typeof $request,t="undefined"!=typeof $httpClient,r="undefined"!=typeof $task,n="undefined"!=typeof $app&&"undefined"!=typeof $http,o="function"==typeof require&&!n,s=(()=>{if(o){const e=require("request");return{request:e}}return null})(),i=(e,s,i)=>{r&&$notify(e,s,i),t&&$notification.post(e,s,i),o&&a(e+s+i),n&&$push.schedule({title:e,body:s?s+"\n"+i:i})},u=(e,n)=>r?$prefs.setValueForKey(e,n):t?$persistentStore.write(e,n):void 0,d=e=>r?$prefs.valueForKey(e):t?$persistentStore.read(e):void 0,l=e=>(e&&(e.status?e.statusCode=e.status:e.statusCode&&(e.status=e.statusCode)),e),f=(e,i)=>{r&&("string"==typeof e&&(e={url:e}),e.method="GET",$task.fetch(e).then(e=>{i(null,l(e),e.body)},e=>i(e.error,null,null))),t&&$httpClient.get(e,(e,t,r)=>{i(e,l(t),r)}),o&&s.request(e,(e,t,r)=>{i(e,l(t),r)}),n&&("string"==typeof e&&(e={url:e}),e.header=e.headers,e.handler=function(e){let t=e.error;t&&(t=JSON.stringify(e.error));let r=e.data;"object"==typeof r&&(r=JSON.stringify(e.data)),i(t,l(e.response),r)},$http.get(e))},p=(e,i)=>{r&&("string"==typeof e&&(e={url:e}),e.method="POST",$task.fetch(e).then(e=>{i(null,l(e),e.body)},e=>i(e.error,null,null))),t&&$httpClient.post(e,(e,t,r)=>{i(e,l(t),r)}),o&&s.request.post(e,(e,t,r)=>{i(e,l(t),r)}),n&&("string"==typeof e&&(e={url:e}),e.header=e.headers,e.handler=function(e){let t=e.error;t&&(t=JSON.stringify(e.error));let r=e.data;"object"==typeof r&&(r=JSON.stringify(e.data)),i(t,l(e.response),r)},$http.post(e))},a=e=>console.log(e),y=(t={})=>{e?$done(t):$done()};return{isQuanX:r,isSurge:t,isJSBox:n,isRequest:e,notify:i,write:u,read:d,get:f,post:p,log:a,done:y}}
