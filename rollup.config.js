import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";

const production = !process.env.ROLLUP_WATCH;
let ouputFile = "example/js/easyuploader.js";
production && (ouputFile = "dist/easyuploader.min.js");

export default {
    input: "src/main.js",
    output: {
        file: ouputFile,
        format: "iife",   //system, amd, cjs, es, iife, umd
        name: "easyUploader"
    },
    plugins: [
		resolve(),
		commonjs(),
		production && uglify()
	]
}