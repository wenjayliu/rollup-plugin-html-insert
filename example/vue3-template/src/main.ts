import { normalizeBigNumer } from "vkk-utils/math/amount";
(function () {
  const a: number  = 9125336556
  const b: number  = normalizeBigNumer(a)
  console.log(b)
  const appEl = document.getElementById('app')
  if (appEl) {
    appEl.innerHTML  = b.toString()
  }
})()