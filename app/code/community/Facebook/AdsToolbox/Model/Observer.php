<?php
/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the code directory.
 */

class Facebook_AdsToolbox_Model_Observer {

  public function addToCart($observer) {
    if (!session_id()) { return; }
    $productId = $observer->getProduct()->getId();
    $session = Mage::getSingleton("core/session",  array("name"=>"frontend"));
    $addToCartArray = $session->getData("fbms_add_to_cart") ?: array();
    $addToCartArray[] = $productId;
    $session->setData("fbms_add_to_cart", $addToCartArray);
  }
}
?>
