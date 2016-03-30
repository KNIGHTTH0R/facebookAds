/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant 
 * of patent rights can be found in the PATENTS file in the code directory.
 */

var FacebookAuthFlow = React.createClass({
  displayName: 'FacebookAuthFlow',

  getInitialState: function () {
    return {
      messageChannelConnected: false
    };
  },
  bindMessageEvents: function () {
    window.addEventListener("message", this.receiveMessage, false);

    if (this.isIE() && window.MessageChannel) {
      this.setState({ messageChannelConnected: false });
      this.fbMessageChannel = new MessageChannel();
      this.fbMessageChannel.port1.onmessage = this.receiveMessageFromMessageChannel;
    }
  },
  isIE: function () {
    return (/MSIE |Trident\/|Edge\//.test(window.location.userAgent)
    );
  },
  receiveMessage: function (event) {
    var origin = event.origin || event.originalEvent.origin;
    if (origin === window.facebookMarketingConfig.popupOrigin) {
      this.props.onPixelSelected(event.data);
    }
  },
  openPopup: function () {
    var width = 600;
    var height = 400;
    var topPos = screen.height / 2 - height / 2;
    var leftPos = screen.width / 2 - width / 2;

    if (this.popupWindow) {
      this.popupWindow.close();
    }

    this.bindMessageEvents();
    this.popupWindow = window.open(facebookMarketingConfig.popupOrigin + '/pixel-installer.php?pixel_id=' + this.props.currentPixelId + '&timezone_id=' + window.facebookMarketingConfig.timezoneId + '&store_name=' + window.facebookMarketingConfig.storeName + '&base_currency=' + window.facebookMarketingConfig.baseCurrency, 'PixelSelector', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + width + ', height=' + height + ', top=' + topPos + ', left=' + leftPos);

    if (this.isIE() && window.MessageChannel) {
      this.connectMessageChannel();
    }
  },
  connectMessageChannel: function () {
    if (!this.state.messageChannelConnected) {
      setTimeout((function () {
        this.popupWindow.postMessage({ message: "FBMS connect message" }, "*", [this.fbMessageChannel.port2]);
      }).bind(this), 500);
    }
  },
  receiveMessageFromMessageChannel: function (e) {
    if (e.data.message === 'FBMS connection made') {
      this.state.messageChannelConnected = true;
    } else if (e.data.message === 'FBMS pixel selected') {
      this.props.onPixelSelected(e.data.pixelId);
    }
  },
  render: function () {
    return React.createElement(
      'div',
      { id: 'facebookFlow' },
      React.createElement(
        'button',
        { className: 'facebookButton blue', onClick: this.openPopup },
        React.createElement('i', { className: 'logo' }),
        'Get Started'
      )
    );
  }
});