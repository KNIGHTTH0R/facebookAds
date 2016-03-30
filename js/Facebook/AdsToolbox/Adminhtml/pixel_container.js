/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant 
 * of patent rights can be found in the PATENTS file in the code directory.
 */

var PixelFlowContainer = React.createClass({
  displayName: "PixelFlowContainer",

  getInitialState: function () {
    return {
      currentPixelId: this.props.currentPixelId,
      modal: false
    };
  },
  onPixelSelected: function (pixelId) {
    this.savePixelId(pixelId);
  },
  savePixelId: function (pixelId) {
    new Ajax.Request(facebookMarketingConfig.pixelAjaxRoute, {
      parameters: { pixelId: pixelId },
      onSuccess: (function (transport) {
        var response = transport.responseText.evalJSON();

        if (response.success) {
          window.setCurrentPixelId = response.pixelId;
          this.modalMessage = "The Facebook Pixel with ID: " + response.pixelId + " is now installed on your website.";
        } else {
          this.modalMessage = "There was a problem saving the pixel. Please try again";
        }

        this.setState({
          isDisabled: true,
          storedPixelId: response.pixelId,
          currentPixelId: response.pixelId,
          modal: true
        });
      }).bind(this)
    });
  },
  closeModal: function () {
    this.setState({ modal: false });
  },
  render: function () {
    var modal = this.state.modal ? React.createElement(Modal, { onClose: this.closeModal, message: this.modalMessage }) : null;
    return React.createElement(
      "div",
      { className: "pixelFlowContainer" },
      modal,
      React.createElement(
        "h1",
        null,
        "Easily install the Facebook Pixel on every page of your website"
      ),
      React.createElement(
        "h2",
        null,
        "Use information from your pixel to make Facebook ads that better reach your customers."
      ),
      React.createElement(FacebookAuthFlow, {
        onPixelSelected: this.savePixelId,
        currentPixelId: this.state.currentPixelId })
    );
  }
});