


/**
 * Renders a template string by replacing placeholders with corresponding data values.
 *
 * @param {string} template - The template string containing placeholders in the format {{key}}.
 * @param {Object} data - An object containing key-value pairs where the key corresponds to the placeholder in the template.
 * @returns {string} - The rendered HTML string with placeholders replaced by data values.
 */
let genericRenderer = function(template, data){
    let html = template;
    for(let key in data){
        html = html.replaceAll(new RegExp("{{"+key+"}}", "g"), data[key]);
    }
    return html;
}

/**
 * Converts an HTML string into a DocumentFragment.
 *
 * @param {string} htmlString - The HTML string to convert.
 * @returns {DocumentFragment} - A DocumentFragment containing the parsed HTML elements.
 */
function htmlToFragment(htmlString) {
    const template = document.createElement('template');
    template.innerHTML = htmlString.trim(); // trim supprime les espaces inutiles
    return template.content;
}

/**
 * Returns the correct asset path for images considering the base URL in production
 * @param {string} path - The image path relative to public folder
 * @returns {string} - The full path including base URL
 */
function getAssetPath(path) {
    const base = import.meta.env.BASE_URL || '/';
    // Remove leading slash from path if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${base}${cleanPath}`;
}

/**
 * Fix all image paths in a fragment to work with the base URL
 * @param {DocumentFragment|Element} fragment - The fragment or element containing images
 */
function fixImagePaths(fragment) {
    const images = fragment.querySelectorAll('img[src], img[data-src]');
    images.forEach(img => {
        const src = img.getAttribute('data-src') || img.getAttribute('src');
        if (src && !src.startsWith('http') && !src.startsWith('data:')) {
            img.src = getAssetPath(src);
            img.removeAttribute('data-src');
        }
    });
}

export { genericRenderer, htmlToFragment, getAssetPath, fixImagePaths };