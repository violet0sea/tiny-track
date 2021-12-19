// 前端异常
// 1.JS error
// 2.请求异常
// 3.静态资源加载异常
// 4.Promise异常
// 5.Iframe异常
// 6.跨域Script error
// 6.崩溃卡顿

// 监控实现方案
// 1.window.onerror
// 2.addEventListener监听资源加载异常
// 3.监听Promise异常

(function () {
    function listenWindowOnError(cb) {
      window.onerror = function (message, source, lineno, colno, error) {
        var string = message.toLowerCase();
        var substring = "script error";
        // 忽略script error
        if (string.indexOf(substring) > -1) {
          console.log('Script Error: See Browser Console for Detail');
        } else {
          console.log('catch error: ', {
            message,
            source,
            lineno,
            colno,
            error,
          });
          if (typeof cb === 'function') {
            cb(message, source, lineno, colno, error)
          }
          return true;
        }
      }
    }

    function handleErrorEvent(error) {
        console.log('event error: ', error)
    }

    function listenErrorEvent() {
        window.addEventListener('error', handleErrorEvent, true);
    }

    function handleRejection(e) {
        e.preventDefault();
        console.log('Promise uncatched error: ', e);
        return true;
    }

    function listenPromiseError() {
        window.addEventListener('unhandledrejection', handleRejection);
    }

    function main() {
        listenWindowOnError();
        listenErrorEvent();
        listenPromiseError();
    }

    main();
})();
