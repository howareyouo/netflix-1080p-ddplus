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
