function insertScript(scriptText) {
  let el = document.createElement('script')
  el.textContent = scriptText
  document.head.append(el)
}

let conf = {
  useDDplus: 1,
  useAVCH: 0,
  useDV: 1,
  useHEVC: 0,
  useHEACC: 1,
  useAV1: 1,
  useVP9: 0,
  useAVC: 0,
  useAVCH_: 0,
  useAllSub: 0,
  forceMaxBitrate: 0,
}

// very messy workaround for accessing chrome storage outside of background / content scripts
chrome.storage.sync.get(conf, items => {
  let text = ''
  Object.keys(conf).forEach(key => {
    text += text ? ',' : 'var '
    text += key + '=' + (items[key] || 0)
  })
  insertScript(text)
})

let scriptUrl = chrome.runtime.getURL('max_bitrate.js')
let xhr = new XMLHttpRequest()
xhr.open('GET', scriptUrl, true)
xhr.onload = function (e) {
  let xhr = e.target
  if (xhr.status == 200) {
    insertScript(xhr.responseText)
  }
}
xhr.send()
