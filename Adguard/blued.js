/*************************************
项目名称：blued
下载地址：https://too.st/7vj
更新日期：2024-01-15
脚本作者：@anyeyey
使用声明：⚠️仅供参考，🈲转载与售卖！
失效请反馈
群组：https://t.me/IPAs_Dd
频道：https://t.me/IPAs_share
不生效就退出后台重新打开
不生效就退出后台重新打开
不生效就退出后台重新打开
不生效就退出后台重新打开
不生效就退出后台重新打开
不生效就退出后台重新打开
blued功能脚本  悄悄查看消息  地图无需展示头像即可查看全部头像   聊天界面查看会员隐藏的距离
**************************************

[rewrite_local]
^https:\/\/social\.blued\.cn\/users\/.*\/setting url script-response-body https://raw.githubusercontent.com/carlchou00/surge/refs/heads/main/Adguard/blued.js
^https:\/\/social\.blued\.cn\/users\/shadow url script-response-body https://raw.githubusercontent.com/carlchou00/surge/refs/heads/main/Adguard/blued.js
^https:\/\/social\.blued\.cn\/users\/.*\/basi url script-response-body https://raw.githubusercontent.com/carlchou00/surge/refs/heads/main/Adguard/blued.js
^https:\/\/social\.blued\.cn\/users\/recommend url script-response-body https://raw.githubusercontent.com/carlchou00/surge/refs/heads/main/Adguard/blued.js
^https:\/\/220\.249\.135\.81\/users\/recommend url script-response-body https://raw.githubusercontent.com/carlchou00/surge/refs/heads/main/Adguard/blued.js

^https:\/\/social\.blued\.cn\/users\?aaid url script-response-body https://raw.githubusercontent.com/carlchou00/surge/refs/heads/main/Adguard/blued.js
^https:\/\/116\.196\.137\.183\/users\?aaid url script-response-body https://raw.githubusercontent.com/carlchou00/surge/refs/heads/main/Adguard/blued.js
^https:\/\/220\.249\.135\.81\/users\?aaid url script-response-body https://raw.githubusercontent.com/carlchou00/surge/refs/heads/main/Adguard/blued.js

[mitm]
hostname = *.blued.*,220.249.135.81,116.196.137.183
*************************************/
var anye = JSON.parse($response.body);

const vip1 = /^https:\/\/social\.blued\.cn\/users\/.*\/setting/;
//const vip4 = /^https:\/\/220\.249\.135\.81\/users\/89023383/;
const vip2 = /^https:\/\/social\.blued\.cn\/users\/shadow/;
const vip3 = /^https:\/\/social\.blued\.cn\/users\/.*\/basi/;
const recommend = /^https:\/\/social\.blued\.cn\/users\/recommend/;
const recommend2 = /^https:\/\/220\.249\.135\.81\/users\/recommend/;
//const recommend3 = /^https:\/\/116\.196\.137\.183\/users\/recommend/;
// ^https:\/\/116\.196\.137\.183\/users\/recommend url script-response-body https://raw.githubusercontent.com/carlchou00/surge/refs/heads/main/Adguard/blued.js
// const splash = /^https:\/\/argo\.blued\.cn\/blued\/splash/;
const recLive = /^https:\/\/social\.blued\.cn\/users\?aaid/;
const recLive1 = /^https:\/\/116\.196\.137\.183\/users\?aaid/;
const recLive2 = /^https:\/\/220\.249\.135\.81\/users\?aaid/;
// const promote = /^https:\/\/220\.249\.135\.81\/blued\/promote/;
// const promote1 = /^https:\/\/116\.196\.137\.183\/blued\/promote/;
// const youmiss = /^https:\/\/116\.196\.137\.183\/users\/nearby\/new_face/;
// const youmiss1 = /^https:\/\/220\.249\.135\.81\/users\/nearby\/new_face/;
//const floats = /^https:\/\/220\.249\.135\.81\/blued\/floats/;
//const floats1 = /^https:\/\/116\.196\.137\.183\/blued\/floats/;
//const banners = /^https:\/\/220\.249\.135\.81\/ticktocks\/banner/;
//const banners1 = /^https:\/\/116\.196\.137\.183\/ticktocks\/banner/;
//const live = /^https:\/\/220\.249\.135\.81\/live\/cates-v2\/0/;
//const live1 = /^https:\/\/116\.196\.137\.183\/live\/cates-v2\/0/;


if ((vip1.test($request.url)) && anye.data && anye.data.length > 0) {
    // 设置
    anye.data.forEach((item) => {
        item.is_global_view_secretly = 1;
        item.is_traceless_access = 1;
        item.is_hide_distance = 1;
        item.black_allowed_count = 999999;
    })
}

if (vip2.test($request.url) && anye.data && anye.data.length > 0) {
    // 地图显示头像和影子功能
    anye.data[0].is_open_shadow = 1;
    anye.data[0].has_right = 1;
}

if (vip3.test($request.url) && anye.data && anye.data.length > 0) {
    // 聊天界面查看会员隐藏的距离
    anye.data[0].is_hide_distance = 0;
}

if ((recommend.test($request.url) || recommend2.test($request.url)) && anye.data && anye.data.length > 0) {
    // 首页推荐
    anye.data = [];
}


// 信息流直播推荐
if ((recLive.test($request.url) || recLive1.test($request.url) || recLive2.test($request.url)) && anye) {
    if (anye.data && anye.data.extra) {
        anye.data.extra.adms_operating = [];
        anye.data.extra.nearby_dating = [];
        anye.data.extra.adms_user = [];
    }

    if (anye.extra) {
        anye.extra.adms_operating = [];
        anye.extra.nearby_dating = [];
        anye.extra.adms_user = [];
    }
}

$done({ body: JSON.stringify(anye) });