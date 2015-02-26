// File main.js:
define(["require", "exports", "./log"], function (require, exports, log) {
    log.message("hello");
})
// File log.js:
define(["require", "exports"], function (require, exports) {
    exports.message = function (s) {
        console.log(s);
    }
})