/*************************************
项目名称：the L
下载地址：https://too.st/7hI
更新日期：2024-01-04
脚本作者：@anyeyey
使用声明：⚠️仅供参考，🈲转载与售卖！
**************************************

[rewrite_local]
^https:\/\/api-a\.soulapp\.cn\/loveBell\/getCardInfo\?bi url script-response-body https://raw.githubusercontent.com/anyehttp/quantumult-x/main/Adguard/soul.js
^https:\/\/api-a\.soulapp\.cn\/loveBell\/queryMatchSpeedupConf\?bi url script-response-body https://raw.githubusercontent.com/anyehttp/quantumult-x/main/Adguard/soul.js
[mitm]
hostname = api-a.soulapp.cn
*************************************/
var anye = JSON.parse($response.body);
const vip1 = /^https:\/\/api-a\.soulapp\.cn\/loveBell\/getCardInfo\?bi/;
const vip2 = /^https:\/\/api-a\.soulapp\.cn\/loveBell\/queryMatchSpeedupConf\?bi/;

if(vip1.test($request.url)){
    anye.data.limitType = 1;
    anye.data.speedUp = true;
}

if(vip2.test($request.url)){
    anye.data.limitType = 1;
    //速度?
    anye.data.currentSpeed = 100;
    //时间
    anye.data.speedupTime = 9999;
    //次数
    anye.data.speedupCount = 9999;
    //加速否
    anye.data.speedup = true;
}


