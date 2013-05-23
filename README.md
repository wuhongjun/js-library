# satyr
基于seajs,jQuery和一些第三方库构建模块,类似python标准库

## author list
* zenxds
* [sirzxj](https://github.com/sirzxj)

## 目录
	gallery						-- spm提供的已经以CMD格式封装好的通用库都在这里
	src 						-- 源码目录
	node_modules				-- Grunt用到的插件
	dist						-- 发布目录

## spm install
1. node 版本不能太低，最好安装最新的 [nodejs.org](http://nodejs.org/)
2. npm 一般安装node自带
3. npm install spm -g 注意依赖的source map可能需要单独安装

## install third part modules
	spm install gallery.module_name(jquery/marked/underscore/backbone/..)

## third part modules
* underscore
* mustache
* jquery
* mocha

## satyr modules
* cookie
* hash 		哈希实现(md5)
* debug
* random 	随机
* support
* time
* encode
* sort 排序
* copy

## TODO List
* 实现元素跟随滚动的效果 fixed
* placeholder fix
* modal like bootstrap modal
* tip
* autocomplete

## test framework
jasmine