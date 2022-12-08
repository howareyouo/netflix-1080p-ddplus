let fn = function () {
  if (!document.querySelector('video')) {
    return
  }

  window.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 88, key: 'x'}))

  let selects = document.querySelectorAll('.player-streams select')
  let btn = document.querySelector('.player-streams button')
  if (!selects) {
    return
  }

  for (let i = selects.length - 2; i >= 0; i--) {
    let options = selects[i].options
    for (let o of options) o.removeAttribute('selected')
    options[options.length - 1].setAttribute('selected', 'selected')
  }
  btn.click()
  return 1
}

let run = function () {
  fn() || setTimeout(run, 100)
}

let lastUrl = location.href
if (window.forceMaxBitrate) {
  setInterval(function () {
    let url = location.href
    if (url !== lastUrl && /netflix.com\/watch\/.*!/.test(url)) {
      console.log('Netflix max_bitrate enabled')
      lastUrl = url
      run()
    }
  }, 500)
}

const keys = {w: .1, s: -.1, a: -5, d: 5, z: -10, c: 10, q: -15, e: 15}
document.addEventListener('keydown', function (e) {
  if (e.target.isContentEditable || e.target.tagName == 'INPUT' || e.ctrlKey || e.altKey) return
  let key = e.key.toLowerCase()
  let val = keys[key]
  if (key in keys) {
    let videoPlayer = window.netflix.appContext.state.playerApp.getAPI().videoPlayer
    let playerSessionId = videoPlayer.getAllPlayerSessionIds()[0]
    let player = videoPlayer.getVideoPlayerBySessionId(playerSessionId)
    if (key == 'w' || key == 's') {
      player.setVolume(player.getVolume() + val)
    } else {
      player.seek(player.getCurrentTime() + val * 1000)
    }
  }
})
