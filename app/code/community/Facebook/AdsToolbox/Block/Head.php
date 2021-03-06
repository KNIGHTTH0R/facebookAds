<?php
/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the code directory.
 */

require_once 'app/Mage.php';

class Facebook_AdsToolbox_Block_Head extends Mage_Core_Block_Template {
  public function getFacebookPixelID() {
    return Mage::getStoreConfig('facebook_ads_toolbox/fbpixel/id');
  }
}
