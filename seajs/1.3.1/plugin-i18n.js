define("seajs/plugin-i18n",[],function(){var e=seajs.pluginSDK,t=e.Module,n=e.config.locale||"",r=t._resolve;t._resolve=function(e,t){return 0===e.indexOf("i18n!")&&(e="./i18n/"+n+"/"+e.substring(5)),r(e,t)}}),seajs.use("seajs/plugin-i18n");