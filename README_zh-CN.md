[![issue](https://img.shields.io/github/issues/hillpy/easyUploader.svg)](https://github.com/hillpy/easyUploader/issues)
[![star](https://img.shields.io/github/stars/hillpy/easyUploader.svg)](https://github.com/hillpy/easyUploader)
[![fork](https://img.shields.io/github/forks/hillpy/easyUploader.svg)](https://github.com/hillpy/easyUploader)
[![license](https://img.shields.io/github/license/hillpy/easyUploader.svg)](https://github.com/hillpy/easyUploader/blob/master/LICENSE)
[![Build Status](https://www.travis-ci.com/hillpy/easyUploader.svg?branch=master)](https://www.travis-ci.com/hillpy/easyUploader)

* [README_zh-CN](./README_zh-CN.md)
* [README](./README.md)

### easyUploader是什么

easyUploader是一个轻量级的、基于HTML5的js文件上传插件。

### 文档

[easyUploader document](https://hillpy.github.io/easyUploader/)

### 在线例子

[easyUploader example](http://test.hillpy.com/easyuploader/index.html)

### 特性

* 文件上传
* 图片压缩
* 拖曳上传
* 照片上传旋转修正

### 备注

项目正在开发中。英文文档正在编写中。我很抱歉我的英语比较烂。

### 如何安装

* 使用NPM方式

    ```
    npm install easyupload -save
    ```

* 使用script (unpkg CDN)方式.
    ```
     <script src="https://unpkg.com/easyuploader/dist/easyuploader.min.js"></script>
    ```

### 如何运行

* 运行项目

    1. 克隆本项目

        ```
        git clone https://github.com/hillpy/easyUploader.git
        ```
    2. 安装node依赖包

        ```
        npm install
        ```
    3. 开启rollup监听及web服务（需php环境），url：localhost:1180

        ```
        npm run dev
        ```
    4. 打包构建

        ```
        npm run build
        ```

* 运行文档

    1. 全局安装gitbook-cli

        ```
        npm install gitbook-cli -g
        ```

    2. 安装依赖库

        ```
        cd doc && gitbook install
        ```

    3. 启动服务

        ```
        gitbook serve
        ```

### 版本日志

[版本日志](https://github.com/hillpy/easyUploader/releases)

### 待做

~~1. 避免创建的input中id属性出现冲突~~

~~2. 限制文件上传类型~~

3. 多文件上传

4. 图片裁剪

5. 断点续传、文件分片上传

### 仓库链接

[Coding](https://coding.net/u/shinn_lancelot/p/easyUploader/git "easyUploader")<br>
[Gitee](https://gitee.com/hillpy/easyUploader "easyUploader")<br>
[Github](https://github.com/hillpy/easyUploader "easyUploader")<br>

### 协议

[Apache License 2.0](https://github.com/hillpy/easyUploader/blob/master/LICENSE "Apache License 2.0")<br>