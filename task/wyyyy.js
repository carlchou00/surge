/*
 * 环境变量:
 * - wyyyy_data: 网易云音乐的 Cookie
 */

const $ = new Env('网易云音乐启动！');

// 通知函数，使用 env 通知
function notify(notice) {
    $.msg($.name, '', notice);
}

// 获取随机元素
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// 获取随机 User-Agent
function getRandomUserAgent() {
    const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'];
    const browserVersions = {
        'Chrome': ['91.0.4472.124', '92.0.4515.107', '93.0.4577.82'],
        'Firefox': ['89.0', '90.0', '91.0'],
        'Safari': ['14.0.3', '14.1.2', '15.0'],
        'Edge': ['91.0.864.67', '92.0.902.55', '93.0.961.38'],
        'Opera': ['77.0.4054.277', '78.0.4093.112', '79.0.4143.72']
    };
    const os = ['Windows NT 10.0; Win64; x64', 'Macintosh; Intel Mac OS X 10_15_7', 'X11; Linux x86_64'];
    const webkitVersion = ['537.36', '605.1.15'];

    const browser = getRandomElement(browsers);
    const version = getRandomElement(browserVersions[browser]);
    const operatingSystem = getRandomElement(os);
    const webkit = getRandomElement(webkitVersion);

    if (browser === 'Safari') {
        return `Mozilla/5.0 (${operatingSystem}) AppleWebKit/${webkit} (KHTML, like Gecko) Version/${version} Safari/${webkit}`;
    }
    return `Mozilla/5.0 (${operatingSystem}) AppleWebKit/${webkit} (KHTML, like Gecko) ${browser}/${version} Safari/${webkit}`;
}

// 云贝签到
async function yunbeiSignin(session, data) {
    console.log('云贝签到启动');
    const response = await session.post('https://wyy.ukzs.net/api/yunbei/signs', { data });
    const dic = await response.json();
    if (dic.code === 200) {
        console.log('云贝签到成功');
        return '云贝签到成功';
    } else {
        console.log('云贝签到失败可能是 ck 到期', dic);
        return '云贝签到失败';
    }
}

// 签到
async function signin(session, data) {
    console.log('签到启动');
    const response = await session.post('https://wyy.ukzs.net/api/daily_signin', { data });
    const dic = await response.json();
    if (dic.code === 200) {
        console.log('签到成功');
        return '签到成功';
    } else {
        console.log('签到失败可能是 ck 到期', dic);
        return '签到失败';
    }
}

// 刷歌
async function shuffleSongs(session, data) {
    console.log('刷歌启动');
    const response = await session.post('https://wyy.ukzs.net/api/personalized', { data });
    const dic = await response.json();
    if (dic.code === 200) {
        console.log('刷歌成功');
        return '刷歌签到成功';
    } else {
        console.log('刷歌失败可能是 ck 到期', dic);
        return '刷歌签到失败';
    }
}

// 原神启动
async function startGenshin(session, Cookie) {
    const data = { limit: 10, cookie: Cookie };
    const shuffleResult = await shuffleSongs(session, data);
    const signinResult = await signin(session, data);
    const yunbeiResult = await yunbeiSignin(session, data);
    return `${signinResult} ${yunbeiResult} ${shuffleResult}`;
}

// 主函数
async function main() {
    const randomUserAgent = getRandomUserAgent();
    console.log(`随机 User-Agent：${randomUserAgent}`);

    console.log('获取 cookie ');
    //const Cookie = process.env.wyyyy_data;
    const Cookie = 'MUSIC_R_T=1487998092613; Max-Age=2147483647; Expires=Fri, 08 Aug 2092 17:25:33 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1487998092613; Max-Age=2147483647; Expires=Fri, 08 Aug 2092 17:25:33 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_R_T=1487998092613; Max-Age=2147483647; Expires=Fri, 08 Aug 2092 17:25:33 GMT; Path=/api/feedback; HTTPOnly;MUSIC_R_T=1487998092613; Max-Age=2147483647; Expires=Fri, 08 Aug 2092 17:25:33 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_A_T=1487998071508; Max-Age=2147483647; Expires=Fri, 08 Aug 2092 17:25:33 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_R_T=1487998092613; Max-Age=2147483647; Expires=Fri, 08 Aug 2092 17:25:33 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_A_T=1487998071508; Max-Age=2147483647; Expires=Fri, 08 Aug 2092 17:25:33 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_A_T=1487998071508; Max-Age=2147483647; Expires=Fri, 08 Aug 2092 17:25:33 GMT; Path=/api/feedback; HTTPOnly;MUSIC_A_T=1487998071508; Max-Age=2147483647; Expires=Fri, 08 Aug 2092 17:25:33 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_U=00774608502516BD56C6E558B620D19DD0E9BDBD5B2B9B24834FCB980CDFFE9E94ED5964A0345A800E468583A4B506A0381A9D55B04CBEE4D6F3466F67B8A2D394C507A3588C12281B52A97C45269EF8B93F3F5878DD509A0AEC3543C563C84FCB6D806217501B98108A3711BDCAED4F9BC0CA20A3B7773AB67F07F103346C733F34AEDA28B2251496B488C662086048C3CCDC5C89B249F0D39A2429A3761E094A61724BA3A069271EB66FB51CC991E44595BCC797C3F0491B85B8A42E2EABF6D5992363CF7E56D08E6F258CD2D48369BD96D6D2A52F4BB86349155E46B4E6D285AB82B2DD799D9C3B28F2217DEEC27290A79FB87F31D039E27646015741F00BCBAE852F11319DD03158FB10AE8218BDFA8A2E7B026A6184D5A12933EA676082A613862B3E7EBB3D24B94548FE66587009; Max-Age=15552000; Expires=Fri, 17 Jan 2025 14:11:26 GMT; Path=/; HTTPOnly;MUSIC_R_T=1487998092613; Max-Age=2147483647; Expires=Fri, 08 Aug 2092 17:25:33 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_R_T=1487998092613; Max-Age=2147483647; Expires=Fri, 08 Aug 2092 17:25:33 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_A_T=1487998071508; Max-Age=2147483647; Expires=Fri, 08 Aug 2092 17:25:33 GMT; Path=/weapi/clientlog; HTTPOnly;__csrf=c811297d2cc2463f46c8dbb2e99f5d9e; Max-Age=1296010; Expires=Mon, 05 Aug 2024 14:11:36 GMT; Path=/;;MUSIC_R_T=1487998092613; Max-Age=2147483647; Expires=Fri, 08 Aug 2092 17:25:33 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_A_T=1487998071508; Max-Age=2147483647; Expires=Fri, 08 Aug 2092 17:25:33 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_A_T=1487998071508; Max-Age=2147483647; Expires=Fri, 08 Aug 2092 17:25:33 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_R_T=1487998092613; Max-Age=2147483647; Expires=Fri, 08 Aug 2092 17:25:33 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_A_T=1487998071508; Max-Age=2147483647; Expires=Fri, 08 Aug 2092 17:25:33 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_A_T=1487998071508; Max-Age=2147483647; Expires=Fri, 08 Aug 2092 17:25:33 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_A_T=1487998071508; Max-Age=2147483647; Expires=Fri, 08 Aug 2092 17:25:33 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1487998092613; Max-Age=2147483647; Expires=Fri, 08 Aug 2092 17:25:33 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_SNS=; Max-Age=0; Expires=Sun, 21 Jul 2024 14:11:26 GMT; Path=/;MUSIC_R_T=1487998092613; Max-Age=2147483647; Expires=Fri, 08 Aug 2092 17:25:33 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_A_T=1487998071508; Max-Age=2147483647; Expires=Fri, 08 Aug 2092 17:25:33 GMT; Path=/api/clientlog; HTTPOnly'
 

    if (!Cookie) {
        console.log('请设置环境变量 wyyyy_data');
        return;
    }

    const CookieArray = Cookie.split('&');
    const accountCount = CookieArray.length;
    console.log(`检测到有 ${accountCount} 个账号`);

    const headers = { 'User-Agent': randomUserAgent, 'Cookie': Cookie };

    const session = new (require('node-fetch'))({ headers });

    console.log('原神启动中');
    const tasks = CookieArray.map(cookie => startGenshin(session, cookie));

    const results = await Promise.all(tasks);
    let notification = '';

    results.forEach((result, index) => {
        notification += `账号${index + 1} - ${result}\n`;
    });

    console.log(notification);
    console.log('原神启动完成');

    // 使用 env 进行通知
    notify(notification);
}

main().catch(err => {
    notify(`脚本执行出错: ${err.message}`);
});

// Env.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=rawOpts["update-pasteboard"]||rawOpts.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
