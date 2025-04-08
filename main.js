console.log("%cTHERE IS NOTHING TO SEE HERE", "color: #c98a7d; font-style: italic;padding: 2px;font-size: 30px;");

/**
 * @type {string[]}
 */
const anim_elements = [
    "musician",
    "programmer",
    "visual artist",
    "goofy goober",
    "all around creative"
]

/**
 * @type {HTMLElement}
 */
const anim_element = document.getElementById("animation")

/**
 * @param {string} text 
 */
function typeText(text) {
    anim_element.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
        anim_element.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(interval);
    }, getRandomInt(40, 60)); // idk why, gonna see if it makes any difference
}

/**
 * @param {int} min 
 * @param {int} max 
 * @returns {int}
 */
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}


/**
 * @type {int}
 */
let counter = 0
setInterval(() => {
    typeText(anim_elements[counter]);
    counter = (counter + 1) % anim_elements.length;
}, 4000);