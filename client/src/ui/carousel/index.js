import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let CarouselView = {

  dom: function () {
    return htmlToFragment(template);
  }
};

export { CarouselView };
