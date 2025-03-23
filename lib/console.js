'use strict';

const fontSpider = require('font-spider');
const path = require('path');
const fs = require('fs');
const log = require('hexo-log').default({
    debug: false,
    silent: false
});

function traverseDirectory(dirPath, callback) {
    fs.readdirSync(dirPath).forEach(file => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isFile()) {
        callback(filePath);
      } else if (stats.isDirectory()) {
        traverseDirectory(filePath, callback); // 递归处理子目录
      }
    });
}

module.exports = function(args) {
    log.info('hexo-font-spider working');
    const root_dir = this.config.root;
    const html_dir = this.config.public_dir;
    let html_list = [];
    traverseDirectory(html_dir,function(filePath){
        if(filePath.endsWith(".html")){
            html_list.push(filePath);
        }
    });
    if(html_list.length > 0){
        fontSpider.spider(html_list, {
            silent: true, debug: false,
            resourceMap: function(file) {
                // 浏览器访问本地文件，取根目录的绝对路径值跟随系统，但路径分隔符固定为/
                let origin_url = path.resolve(root_dir.endsWith(path.sep)?root_dir:root_dir+path.sep).replaceAll(path.win32.sep, path.posix.sep).toLowerCase();
                let actual_url = path.join(process.cwd(), html_dir.endsWith(path.sep)?html_dir:html_dir+path.sep).replaceAll(path.win32.sep, path.posix.sep).toLowerCase();
                // log.info(origin_url, actual_url);
                file = file.replace(origin_url, actual_url); // 只需要替换一次
                // log.info("scan file: "+file);
                return file;
            },
        }).then(function(webFonts) {
            return fontSpider.compressor(webFonts, {backup: true});
        }).catch(function(errors) {
            log.error(errors);
        });
        log.info('hexo-font-spider done');
    }else{
        log.warn("hexo-font-spider found no html");
    }
}