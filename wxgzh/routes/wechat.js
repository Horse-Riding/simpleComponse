var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var config=require('../config.js');
var request = require("request");
const querystring = require("querystring");

router.use(express.query()); 
router.use('/', wechat(config, function(req, res, next) {
	// console.log(req.weixin);
	console.log(res);
	// var message = req.weixin;
	res.send('Get user list.')
	// location.href = "https://liuhongyun.cn"
    // 1.1获取access_token
	request({
		timeout: 5000, // 设置超时
		method: 'GET', //请求方式
		url: 'https://api.weixin.qq.com/cgi-bin/token', 
		qs: { //参数，注意get和post的参数设置不一样 
			grant_type: "client_credential",
			appid: config.appid,
			secret: config.appsecret
		}	 
	}, 
	function(error, response, body) {
		if(!error && response.statusCode == 200) {
			console.log(body);
			body = JSON.parse(body);
			if(body.access_token) {
				var token = body.access_token;
				setItem(token);
			}
		} else {
			console.log("error");
		}
	});	
	// 1.2定义菜单 
	var btn = {
		"button": [{  //一级菜单
				"type": "click",
				"name": "今日歌曲",				
				"key": "V1001_TODAY_MUSIC"
			},
			{
				"name": "菜单",
				"sub_button": [{  //二级菜单
					"type": "view",
					"name": "搜狗",
					"url": "http://www.soso.com/"
				},
				{
					"type": "view",
					"name": "百度",
					"url": "https://www.baidu.com/"
				},
				{
					"type": "click",
					"name": "赞一下我们",
					"key": "V1001_GOOD"
				}]
			}
		]
	} 
	// 1.3加载自定义菜单 ，非个人主体公众号才有此权限。个人主体可用测帐号的appid，secret来实现自定义菜单。________________________________________________________________________________________
	function setItem(token) {　
		request({
			timeout: 5000, // 设置超时
			method: 'POST', //请求方式
			url: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + token, 
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			form: JSON.stringify(btn)
			}, 
			function(error, response, body) {
				if(!error && response.statusCode == 200) {
					console.log(body);                 
				} else {
					console.log("error");
				}
			}	
		)
	}

    // 2.关注后发送消息
	if((message.MsgType == 'event') && (message.Event == 'subscribe')) {	
		var refillStr = "<a href=\"https://www.baidu.com\" >1. 打开百度</a>"		
		var consumeStr = "<a href=\"http://your_IP/weixin/consume?weixinId=" + message.FromUserName + "\">2. 点击记录团队消费</a>" 
		var deleteStr = "<a href=\"http://your_IP/weixin/delete?weixinId=" + message.FromUserName + "\">3. 点击回退记录</a>" 
		var historyStr = "<a href=\"http://your_IP/weixin/history?weixinId=" + message.FromUserName + "\">4. 点击查询历史记录</a>"		
		var emptyStr = "          ";				
		var replyStr = "感谢你的关注！" + "\n"+ emptyStr + "\n" + refillStr + "\n"+ emptyStr + "\n" + consumeStr + "\n"+ emptyStr + "\n" + deleteStr + "\n"+ emptyStr + "\n" + historyStr;
		res.reply(replyStr);
	}
	
	// 3.自定义回复消息
	if (message.Content === '1') { 
		res.reply('一生一世');
	}
	if (message.Content === '2') {
		res.reply('二人世界');
	}
	if (message.Content === '3') {
		res.reply('三心两意');
	}
	if (message.Content === '4') {
		res.reply('四通八达');
	}	
	if (message.Content === '5') {
		res.reply('五湖四海');
	}
	if (message.Content === '6') {
		res.reply('六畜兴旺');
	}
	if (message.Content === '7') {
		res.reply('七上八下');
	}
	if (message.Content === '8') {
		res.reply('八仙过海');
	}
	if (message.Content === '9') {
		res.reply('九牛二虎');
	}
	if (message.Content === '0') {
		res.reply('零零星星');
	}

 
}));
 
module.exports = router;
