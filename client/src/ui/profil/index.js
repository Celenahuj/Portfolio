import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let ProfilView = {

  dom: function () {
    return htmlToFragment(template);
  }
};

export { ProfilView };
