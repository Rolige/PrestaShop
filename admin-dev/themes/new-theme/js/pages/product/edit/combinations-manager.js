/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */

import ProductMap from '@pages/product/product-map';
import CombinationsGridRenderer from '@pages/product/edit/combinations-grid-renderer';
import CombinationsService from '@pages/product/services/combinations-service';
import DynamicPaginator from '@components/pagination/dynamic-paginator';

const {$} = window;

export default class CombinationsManager {
  constructor() {
    this.$productForm = $(ProductMap.productForm);
    this.initialized = false;
    this.init();

    return {};
  }

  init() {
    const productId = this.getProductId();
    this.paginator = new DynamicPaginator(
      ProductMap.combinations.paginationContainer,
      new CombinationsService(productId),
      new CombinationsGridRenderer(),
    );

    // Paginate to first page when tab is shown
    this.$productForm.find(ProductMap.combinations.navigationTab).on('shown.bs.tab', () => this.firstInit());
  }

  firstInit() {
    if (this.initialized) {
      return;
    }

    this.initialized = true;
    this.paginator.paginate(1);
  }

  /**
   * @returns {Number}
   *
   * @private
   */
  getProductId() {
    return Number(this.$productForm.data('productId'));
  }
}
