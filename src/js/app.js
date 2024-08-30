/**
 * !(i)
 * The code is included in the final file only when a function is called, for example: FLSFunctions.spollers();
 * Or when the entire file is imported, for example: import "files/script.js";
 * Unused code does not end up in the final file.

 * If we want to add a module, we should uncomment it.
 */

import { SetVH } from './modules/SetVH.js';
import BaseHelpers from './helpers/BaseHelpers.js';
import HeaderBtnToggle from './modules/HeaderBtnToggle.js';
import { SmoothScroll } from './modules/SmoothScroll.js';
import PopupManager from './modules/PopupManager.js';
import InitSliders from './modules/SwiperInit.js';
import FaqCard from './modules/FaqCard.js';

// set vh
SetVH();

// check webp/loaded page/device type
BaseHelpers.checkWebpSupport();
BaseHelpers.addTouchClass();
BaseHelpers.addLoadedClass();

document.addEventListener('DOMContentLoaded', function() {
  // header nav mobile toggle
  new HeaderBtnToggle();
  // modal init
  new PopupManager();
  // nav active anchor
  const smoothScroll = new SmoothScroll('.js-anchor', '--scroll-offset', 650);
  // slider init
  new InitSliders();
  // faq card
  new FaqCard();
});

document.addEventListener('DOMContentLoaded', function () {
  const dropdowns = document.querySelectorAll('.js-dropdown');

  if (dropdowns.length) {
    dropdowns.forEach(dropdown => {
      const toggleBtn = dropdown.querySelector('.js-dropdown-toggle');
      const dropdownBtns = dropdown.querySelectorAll('.js-dropdown-choose');
      const activeBtn = dropdown.querySelector('.js-dropdown-choose.is-choose');

      if (activeBtn) {
        const activeValue = activeBtn.textContent;
        const btnTitle = toggleBtn.querySelector('.u-dropdown__btn-title');
        if (btnTitle) {
          btnTitle.textContent = activeValue;
        }
      }

      toggleBtn.addEventListener('click', function () {
        dropdown.classList.toggle('is-show');
      });

      dropdownBtns.forEach(button => {
        button.addEventListener('click', function () {
          toggleBtn.querySelector('.u-dropdown__btn-title').textContent = this.textContent;

          dropdownBtns.forEach(btn => btn.classList.remove('is-choose'));
          this.classList.add('is-choose');

          dropdown.classList.remove('is-show');
        });
      });

      document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target) && !toggleBtn.contains(e.target)) {
          dropdown.classList.remove('is-show');
        }
      });
    });
  }
});