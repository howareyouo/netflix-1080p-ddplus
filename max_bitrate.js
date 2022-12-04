let fn = function () {
  if (!document.querySelector('video')) {
    return
  }

  window.dispatchEvent(new KeyboardEvent('keydown', {
    shiftKey: true, altKey: true, keyCode: 83
  }))

  let selects = document.querySelectorAll('.player-streams select')
  let btns = document.querySelector('.player-streams button')
  if (!selects || !btns || selects.length + btns.length < 5) {
    return
  }

  for (let i = selects.length - 2; i >= 0; i--) {
    let options = selects[i].options
    Array.from(options).forEach(o => o.removeAttribute('selected'))
    options[options.length - 1].setAttribute('selected', 'selected')
  }
  btns[0].click()
  return true
}

let run = function () {
  fn() || setTimeout(run, 100)
}

let lastUrl = location.href
if (window.forceMaxBitrate) {
  setInterval(function () {
    let currentUrl = location.href
    if (currentUrl !== lastUrl && /netflix.com\/watch\/.*!/.test(currentUrl)) {
      console.log('Netflix max_bitrate enabled')
      lastUrl = currentUrl
      run()
    }
  }, 500)
}

const keys = {w: .1, s: -.1, a: -5, d: 5, z: -10, c: 10, q: -15, e: 15}
document.addEventListener('keydown', function(e) {
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
