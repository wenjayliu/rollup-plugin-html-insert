
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
  'use strict';

  /** 金额之间的转换 */

  /* 将大数字改为如'12.3w 1.3亿'的格式*/
  const normalizeBigNumer = function(num) {
    let boo = false;
    if (num || num === 0) {
      boo = !isNaN(+num); // 如果不是数字直接返回0
    } else { // 如果为空直接返回0
      boo = false;
    }
    const f = 0; // 小数点位数
    if (boo) {
      if (num >= 100000000) {
        num = (num / 100000000).toFixed(f) + '亿'; // tofixed('')保留小数位数
        return num
      } else if (num >= 10000000) {
        num = (num / 10000000).toFixed(f) + '000w+';
        return num
      } else if (num >= 1000000) {
        num = (num / 1000000).toFixed(f) + '00w+';
        return num
      } else if (num >= 100000) {
        num = (num / 10000).toFixed(f) + 'w+';
        return num
      } else {
        const boo = String(num).indexOf('.');
        boo >= 0 ? num = num.toFixed(2) : '';
        num += '';
        const decimal = num.split('.')[1];
        let integer = num.split('.')[0];
        let result = '';
        while (integer.length > 3) {
          result = ',' + integer.slice(-3) + result;
          integer = integer.slice(0, integer.length - 3);
        }
        integer ? result = integer + result : '';
        decimal ? result += '.' + decimal : '';
        return result
      }
    } else {
      return '--'
    }
  };

  (function () {
      var a = 9125336556;
      var b = normalizeBigNumer(a);
      console.log(b);
      var appEl = document.getElementById('app');
      if (appEl) {
          appEl.innerHTML = b.toString();
      }
  })();

})();
