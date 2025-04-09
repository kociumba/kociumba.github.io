console.log("%cTHERE IS NOTHING TO SEE HERE, GO AWAY 👋", "color: #c98a7d; font-style: italic;padding: 2px;font-size: 30px;");

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
const anim_element = document.getElementById("animation");
let body = document.body;

/**
 * @param {string} text 
 */
function typeText(text) {
    anim_element.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
        anim_element.textContent += text[i];
        anim_element.setAttribute("title", anim_element.textContent)
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
let counter = 0;

/**
 * @returns {HTMLElement | null}
 */
function getRandomTextElementOutsideFooter() {
    const body = document.body;
    const footer = document.querySelector('footer');
    const textElements = [];

    function collectTextElements(element) {
        if (element === footer || footer.contains(element)) {
            return;
        }

        if (element.nodeType === Node.TEXT_NODE && element.textContent.trim() !== '') {
            if (element.parentNode && !footer.contains(element.parentNode)) {
                if (element.parentNode.tagName.toLowerCase() === 'a') {
                    if (element.parentNode.parentNode && !footer.contains(element.parentNode.parentNode)) {
                        textElements.push(element.parentNode.parentNode);
                    }
                } else {
                    textElements.push(element.parentNode);
                }
            }
        } else if (element.nodeType === Node.ELEMENT_NODE) {
            if (element.tagName.toLowerCase() === 'a') {
                return;
            }
            if (element.childNodes.length > 0) {
                element.childNodes.forEach(collectTextElements);
            } else if (element.textContent.trim() !== '' && !footer.contains(element)) {
                textElements.push(element);
            }
        }
    }

    collectTextElements(body);

    const uniqueElements = [...new Set(textElements)];

    if (uniqueElements.length > 0) {
        const randomIndex = Math.floor(Math.random() * uniqueElements.length);
        return uniqueElements[randomIndex];
    } else {
        return null;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    setInterval(() => {
        typeText(anim_elements[counter]);
        counter = (counter + 1) % anim_elements.length;
    }, 4000);

    // pickRandom()
    triggerGlitchEffect()
})

/**
 * @type {int}
 */
let randomCounter = 0

/**
 * The random error easter egg
 */
function pickRandom() {
    let randomElement = getRandomTextElementOutsideFooter();
    if (randomElement) {
        randomElement.classList.add("funny");

        randomElement.onclick = (e) => {
            body.style.animation = "0.2s pulse-color"
            setTimeout(() => {
                body.style.animation = ""
            }, 500)
            randomElement.classList.remove("funny")
            randomCounter++
            randomElement.onclick = null

            if (randomCounter >= 10) {
                body.style.backgroundImage = "url('https://cataas.com/cat')";
                body.style.backgroundSize = "cover";
                body.style.backgroundBlendMode = "color-dodge"
                // body.style.mixBlendMode = "color-dodge"
            } else {
                pickRandom()
            }
        }
    }
}

function triggerGlitchEffect() {
    setTimeout(() => {
        let element = getRandomInt(0, 10) >= 5 ? document.getElementById("name") : document.getElementById("animation");
        if (element) {
            element.classList.add('glitch');
            let content = element.textContent
            element.setAttribute("title", content)
            element.onclick = () => {
                document.body.style.animation = "0.2s pulse-color";
                setTimeout(() => {
                    document.body.style.animation = "";
                }, 500);
                pickRandom()
                element.classList.remove('glitch');
                element.removeAttribute("title")
                element.onclick = null;
            }
        }
    }, getRandomInt(5000, 10000))
}