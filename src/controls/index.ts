import Channel = require('controls/Channel')
import Controls = require('controls/Controls')

Channel.init(() => {
    console.log('Ready!')
    document.getElementById('waitingMsg').style.display = 'none'
    document.getElementById('controls').style.display = 'table'
    Controls.attachEvents()
})

preventDefaults()

function preventDefaults() {

    //preventPageScrolling
    var isTouchSupported = 'ontouchstart' in document

    if (isTouchSupported) {
        document['ontouchstart'] = function (e:any) {
            e.preventDefault()
        }
    }

    document.oncontextmenu = function () {
        return false
    }
}
