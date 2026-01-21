import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let InfoView = {

  dom: function () {
    return htmlToFragment(template);
  }
};

export { InfoView };
