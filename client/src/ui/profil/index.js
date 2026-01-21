import { htmlToFragment, fixImagePaths } from "../../lib/utils.js";
import template from "./template.html?raw";

let ProfilView = {

  dom: function () {
    const fragment = htmlToFragment(template);
    fixImagePaths(fragment);
    return fragment;
  }
};

export { ProfilView };
