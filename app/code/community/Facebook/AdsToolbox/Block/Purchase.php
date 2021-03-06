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
require_once 'common.php';

class Facebook_AdsToolbox_Block_Purchase
  extends Mage_Core_Block_Template {

  use FacebookAdsToolboxBlockCommon;

  private $orderData = array();

  protected function _prepareLayout() {
    $order = Mage::getSingleton('sales/order');
    $order->loadByIncrementId(
      Mage::getSingleton('checkout/session')->getLastRealOrderId()
    );
    $totalData = $order->getData();
    $allitems = $order->getAllVisibleItems();

    $this->orderData['value'] = $totalData['grand_total'];
    $this->orderData['content_ids'] = array();
    foreach ($allitems as $item) {
      $this->orderData['content_ids'][] = $item->getData('product_id');
    }
  }

  public function getValue() {
    return $this->orderData['value'];
  }

  public function getContentIDs() {
    return $this->arryToContentIdString($this->orderData['content_ids']);
  }
}
