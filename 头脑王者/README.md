# 准备工具

* Node V6.11.4
* MongoDB
* Fiddler抓包工具
* 一台安卓手机

# 使用方法

## 1.下载该repo到你的电脑，然后安装依赖。

	git clone https://github.com/zhongdeming428/WechatGameHelper.git

	cd 头脑王者

	cnpm install

## 2.导入quizzes.json到MongoDB


Windows下，在<mongo_install_location>\bin目录下使用mongod命令打开MongoDB引擎，然后同路径下通过mongo命令打开MongoDB Shell。

连接上MongoDB之后通过以下命令导入数据库：

	mongoimport -d tnwz -c quizzes --file ~/Downloads/quizzes.json --jsonArray --drop

## 3.配置Fiddler

### 1.配置Fiddler抓取手机数据包

详细教程参见 [百度经验](https://jingyan.baidu.com/article/03b2f78c7b6bb05ea237aed2.html)

### 2.配置Fiddler抓取HTTPs请求

详细教程参见 [GitHub issues](https://github.com/zhuweiyou/weixin-game-helper/issues/6)

### 3.配置FiddlerScript
这一步十分重要，我们需要把一下代码粘贴到Fiddler ScriptEditor的OnBeforeResponse函数中去。

	if (oSession.fullUrl.Contains("question.hortor.net/question/bat/findQuiz"))
		{
			//把内容通过ajax http发送到本地Node服务器
			var _xhr = new ActiveXObject('Microsoft.XMLHTTP');
			var url = 'http://127.0.0.1:3000/';

			_xhr.onreadystatechange = function() {}
			_xhr.open('POST', url, true);
			_xhr.setRequestHeader("Content-Type", "application/json");
			_xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			_xhr.send(oSession.GetResponseBodyAsString());
		}

具体步骤：

* 打开Fiddler ScriptEditor
* 点击工具栏的Go选项卡
* 点击“to OnBeforeResponse”
* 粘贴以上代码

![截图1]('pics/screenshot1.png')

配置成功后，Fiddler应该能够完全接受你的手机的所有数据请求。

## 4. 启动本地Node服务器

打开命令行，定位到当前目录，使用node命令开始执行：

	node app.js

如图：

![截图2]('pics/screenshot2.png')

## 5. 开始答题

开始答题之后，每次题目出现之前，将会在Command Line给出答案，点击对应答案即可。

由于数据量有限，所以不保证所有题目都会给出答案，请自行承担所有后果。

建议在高端局使用该辅助，低端局不建议使用。

# 参考
* [如何用Fiddler对Android应用进行抓包](https://jingyan.baidu.com/article/03b2f78c7b6bb05ea237aed2.html)
* [如何抓取微信小程序 HTTPS 请求](https://github.com/zhuweiyou/weixin-game-helper/issues/6)
* [Fiddler Documentation](http://docs.telerik.com/fiddler/configure-fiddler/tasks/configurefiddler)
* [Node.js MongoDB Driver API](http://mongodb.github.io/node-mongodb-native/2.2/api/)
* [GitHub Repository/weixin-game-helper](https://github.com/zhuweiyou/weixin-game-helper/blob/master/%E5%A4%B4%E8%84%91%E7%8E%8B%E8%80%85/README.md)

# 特别感谢

GitHub用户@zhuweiyou提供的宝贵数据库以及宝贵经验。






