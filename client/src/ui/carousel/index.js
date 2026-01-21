import { htmlToFragment, fixImagePaths } from "../../lib/utils.js";
import template from "./template.html?raw";

let CarouselView = {

  dom: function () {
    const fragment = htmlToFragment(template);
    fixImagePaths(fragment);
    return fragment;
  }
};

export { CarouselView };
