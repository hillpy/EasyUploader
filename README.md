<p align="center">
    <a href="https://github.com/hillpy/EasyUploader/blob/master/LICENSE"><img src="https://img.shields.io/github/license/hillpy/EasyUploader.svg" alt="License"></a>
    <a href="https://www.travis-ci.com/hillpy/EasyUploader"><img src="https://img.shields.io/travis/com/hillpy/EasyUploader.svg" alt="Build Status"></a>
    <a href="https://github.com/hillpy/EasyUploader/blob/master/dist/easyuploader.min.js"><img src="https://img.shields.io/bundlephobia/min/easyuploader.svg" alt="Minfied Size"></a>
    <a href="https://www.npmjs.com/package/easyuploader"><img src="https://img.shields.io/npm/dt/easyuploader.svg" alt="Downloads"></a>
    <a href="https://github.com/hillpy/EasyUploader/releases"><img src="https://img.shields.io/github/release/hillpy/EasyUploader.svg" alt="Github Release"></a>
    <a href="https://www.npmjs.com/package/easyuploader"><img src="https://img.shields.io/npm/v/easyuploader.svg" alt="NPM Release"></a>
</p>

* [中文](./README.zh-CN.md)
* [English](./README.md)

### What is EasyUploader

EasyUploader is a lightweight js file upload library. It is developed based on HTML5、canvas、 fileReader and other technologies.It is more suitable for the use of mobile. Due to the different HTML support conditions of PC browsers, their use is limited, especially Internet explorer browsers. Flash will be considered to upload files in the later stage.It does not depend on other js libraries.

### Why develop

File upload is very common in web development, and there are many existing upload librarys (webuploader uploaderfy, etc.).But the feeling is still heavy, not light enough, and want to control as much as possible and familiar with the source code.Therefore, I came up with the idea of developing an upload library and considered making it as simple and practical as possible.By the way, I can learn a lot of knowledge (HTML5 canvas closure tools, etc.).

### Document

[EasyUploader document](https://hillpy.github.io/EasyUploader/)

### Online example

[EasyUploader example](http://test.hillpy.com/easyuploader/index.html)

### Features

* file upload
* picture compress
* drag upload
* fix photo orientation

### Remark

This project is being developed. The release is still a test version for the time being.And I'm sorry my English is poor.Please submit the project questions on [github issue](https://github.com/hillpy/EasyUploader/issues "github issue").If you give me a star, I will be very happy.

### How to install

* use NPM.

    ```
    npm install easyuploader -save
    ```

* use script (unpkg CDN).

    ```
    <script src="https://unpkg.com/easyuploader/dist/easyuploader.min.js"></script>
    ```

### How to run

* run project

    1. Clone project.

        ```
        git clone https://github.com/hillpy/EasyUploader.git
        ```

    2. Install NPM dependencies package.

        ```
        npm install
        ```

    3. Open rollup watching and open web service(need php environment). url: localhost:1180/example/inex.html.

        ```
        npm run dev
        ```

    4. Bundle and build.

        ```
        npm run build
        ```

* run gitbook

    1. Global installation gitbook-cli.

        ```
        npm install gitbook-cli -g
        ```

    2. Install NPM dependencies package.

        ```
        cd doc && gitbook install
        ```

    3. Open service.

        ```
        gitbook serve
        ```

### CHANGELOG

[version log](https://github.com/hillpy/EasyUploader/releases)

### TODO

~~1. avoid id collisions~~

~~2. limit file upload types~~

3. multiple files upload

4. picture clip

5. breakpoint to continue and file slice upload

### Repository link

[Coding](https://coding.net/u/shinn_lancelot/p/EasyUploader/git "EasyUploader")<br>
[Gitee](https://gitee.com/hillpy/EasyUploader "EasyUploader")<br>
[Github](https://github.com/hillpy/EasyUploader "EasyUploader")<br>

### LICENSE

[Apache License 2.0](https://github.com/hillpy/EasyUploader/blob/master/LICENSE "Apache License 2.0")<br>