/* global hexo */

'use strict';

hexo.extend.console.register("fc", "webfont compression", {}, require('./lib/console'));
