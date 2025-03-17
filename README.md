## hexo-font-spider

[![NPM](https://nodei.co/npm/hexo-font-spider.png)](https://nodei.co/npm/hexo-font-spider/)

[hexo](https://hexo.io/)控制台插件，用于精简自定义字体文件大小，压缩后的字体文件只包含所有文章中要用到的字符。

### 安装

```bash
hexo-site> npm install hexo-font-spider --save
```

网站生成`public`目录之后，可以在命令行中用`hexo fc`自动检测并压缩字体文件

```bash
hexo-site> hexo clean
hexo-site> hexo generate
hexo-site> hexo fc
```

字体文件格式建议使用*.ttf

### 示例

在线示例：<a href="https://demo.wujiaxing.com/prowiki" target="_blank">https://demo.wujiaxing.com/prowiki</a>

### 说明

本插件只是对[font-spider](https://www.npmjs.com/package/font-spider)的封装、路径纠正后直接内部调用其API，一些可选参数使用的默认值，且不支持通过插件命令改变。至于命令名`fc`是字体压缩（font compression）的首字母。

因为自己写的主题使用的阿里巴巴的普惠体，字体文件大小接近10M，导致加载缓慢。而且不想每次生成静态网站时都手动输入`font-spider`命令，路径映射相当麻烦还容易出错，所以写了这个hexo插件。

关于font-spider的路径映射问题。font-spider使用的是[browser-x](https://www.npmjs.com/package/browser-x)虚拟浏览器解析文档，网站url的根路径在通过本地文件访问时，会定向到文件所在磁盘的根目录，就像用浏览器直接打开public目录中的html文件，一些css/js等文件会404，浏览器的控制台中可查看具体细节。

例如访问`C:/Users/default/Desktop/index.html`，其中引用的css文件会变成读取`C:/style.css`

如果用`font-spider`命令压缩，最简单的方法是把public目录复制到磁盘根目录，public目录名改为_config.yml中配置的root值，然后在磁盘根目录执行命令`font-spider ./[root_val]/**/*.html`。

原项目几年没有更新了，如果有严重问题本人能力有限估计也解决不了，感兴趣的可以参考源码自行调整修改。

### BUG

`hexo server`本地启动服务后，引用的*.ttf字体依然是压缩前的文件，猜测可能是主题模板中的字体文件覆盖了public目录中的字体文件。

如果部署public目录的静态网站文件应该不影响，访问的是压缩后的字体文件。

或者把`./font/abc.ttf`改为`./font//abc.ttf`能直接使用压缩后的文件，本地启动服务创建的动态网站同样生效。
