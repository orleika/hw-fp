/* global self */
self.onmessage = function () {
  const max = 1000000
  let n = 0
  for (let i = 0; i < max; i++) {
    if (Math.pow(Math.random(), 2) + Math.pow(Math.random(), 2) < 1) {
      n++
    }
  }
  const pi = n / max * 4.0
  self.postMessage(pi)
}
