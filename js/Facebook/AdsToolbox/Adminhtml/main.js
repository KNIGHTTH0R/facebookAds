/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant 
 * of patent rights can be found in the PATENTS file in the code directory.
 */

function currentPixelId() {
  return window.facebookMarketingConfig.pixelId;
}

function setCurrentPixelId(pixelId) {
  window.facebookMarketingConfig.pixelId = pixelId;
}

(function () {
  function _run() {
    ReactDOM.render(React.createElement(PixelFlowContainer, {
      currentPixelId: window.currentPixelId() }), document.getElementById('pixel-flow'));
  }

  if (document.addEventListener) {
    // modern browsers
    document.addEventListener('DOMContentLoaded', _run);
  } else {
    document.attachEvent('onreadystatechange', function () {
      // IE <= 8
      if (document.readyState == 'complete') {
        _run();
      }
    });
  }
})();