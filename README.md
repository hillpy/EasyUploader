[![issue](https://img.shields.io/github/issues/hillpy/easyUploader.svg)](https://github.com/hillpy/easyUploader/issues)
[![star](https://img.shields.io/github/stars/hillpy/easyUploader.svg)](https://github.com/hillpy/easyUploader)
[![fork](https://img.shields.io/github/forks/hillpy/easyUploader.svg)](https://github.com/hillpy/easyUploader)
[![license](https://img.shields.io/github/license/hillpy/easyUploader.svg)](https://github.com/hillpy/easyUploader/blob/master/LICENSE)
[![Build Status](https://www.travis-ci.com/hillpy/easyUploader.svg?branch=master)](https://www.travis-ci.com/hillpy/easyUploader)

* [README_zh-CN](./README_zh-CN.md)
* [README](./README.md)

### What is easyUploader

EasyUploader is a lightweight js file upload library. It is developed based on HTML5、canvas、 fileReader and other technologies.It is more suitable for the use of mobile. Due to the different HTML support conditions of PC browsers, their use is limited, especially Internet explorer browsers. Flash will be considered to upload files in the later stage.It does not depend on other js libraries.

### Why develop

File upload is very common in web development, and there are many existing upload plug-ins (webuploader uploaderfy, etc.).But the feeling is still heavy, not light enough, and want to control as much as possible and familiar with the source code.Therefore, I came up with the idea of developing an upload plug-in and considered making it as simple and practical as possible.By the way, I can learn a lot of knowledge (HTML5 canvas closure tools, etc.).

### Document

[easyUploader document](https://hillpy.github.io/easyUploader/)

### Online example

[easyUploader example](http://test.hillpy.com/easyuploader/index.html)

### Features

* file upload
* picture compress
* drag upload
* fix photo orientation

### P.S.

This project is being developed. The release is still a test version for the time being.And I'm sorry my English is poor.Please submit the project questions on [github issue](https://github.com/hillpy/easyUploader/issues "github issue").If you give me a star, I will be very happy.

### How to install

* use NPM.
    ```
    npm install easyupload -save
    ```

* use script (unpkg CDN).

    ```
    <script src="https://unpkg.com/easyuploader/dist/easyuploader.min.js"></script>
    ```

### How to run

* run project

    1. Clone project.

        ```
        git clone https://github.com/hillpy/easyUploader.git
        ```

    2. Install NPM dependencies package.

        ```
        npm install
        ```

    3. Open rollup watching and open web service(need php environment). url: localhost:1180.

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

[version log](https://github.com/hillpy/easyUploader/releases)

### TODO

~~1. avoid id collisions~~

~~2. limit file upload types~~

3. multiple files upload

4. picture clip

5. breakpoint to continue and file slice upload

### Repository link

[Coding](https://coding.net/u/shinn_lancelot/p/easyUploader/git "easyUploader")<br>
[Gitee](https://gitee.com/hillpy/easyUploader "easyUploader")<br>
[Github](https://github.com/hillpy/easyUploader "easyUploader")<br>

### LICENSE

[Apache License 2.0](https://github.com/hillpy/easyUploader/blob/master/LICENSE "Apache License 2.0")<br>