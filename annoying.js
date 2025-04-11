const toggleCheckbox = document.getElementById("annoying-toggle");
const toggleOContainer = document.getElementById("annoying-container");

const adTexts = [
    "🚨 Call +0-420-69-2137 to get 50% off your next Google search",
    "Rumors are that tariffs have been enforced on package managers 🤔, click here to see if your package manager is affected !!!",
    "Subscribe to WasteYourMoney Ltd just for $19.99/second",
    "Experts say: \"In the next 50 years sunlight might become the next big thing next to crypto and ai\"",
    "Buy 1 nothing now and get 2 more completely free 🤯",
    "BREAKING: vibe coder ships product with only 100 bugs 🐛",
    "Billions must go",
    "Are you paying attention?",
    "Cat distribution system under heavy load after mistakenly delivering a dog 🐈",
    "\"To your right you will notice a wild tech bro in its natural habitat\"",
    "Interview with the local Rust dev: \"Rust really changed my life; I always wanted a girlfriend, and now I am a girlfriend\"",
    "Still reading?",
    "Warning: Reading this ad may cause temporary confusion and slight headaches.",
    "BREAKING: something happened 🤯",
    "Python devs in shock, as they try a language with a type system",
    "Nvidia announces the \"It's worse than last gen, but you will still buy it\" series of graphics cards 🤷‍♂️",
    "A suspicious big gathering of plants is still under investigation, insiders say all signs point to it being a so-called \"forest\" 🌳",
    "You know this is a portfolio not a news website?",
    "BREAKING: China says catgirl technology will be developed by 2034 📝",
    "Ever tried buying boredom? Clearly not, since you are reading this for free",
    "Depression Premium™ is now available in stores, now with 25% more sad 🥲",
    "[This ad was removed by a moderator]",
    "Experts predict that in the future, people might continue to exist. Stay tuned for updates!",
    "🚨 Update: a furry is now running for president",
    "Ever wanted to feel like you're wasting your time? Well, you're doing it right now!",
    "BREAKING: scientists have confirmed that water is in fact wet",
    "Help! I'm stuck in here! Can't get out! I'm in... oh...",
    "Just in: tech bro sells spyware, calls it artificial friend 💸",
    "\"I'm locked in bro, you don't understand, just one more b2b saas, one more ai slop\"",
    "Scientists baffled: Study shows most people don't actually use their brain",
    "This ad is missing due to our unpaid intern committing tax fraud 👮",
    "Experts say politics can be rewritten in Rust by 2056 🦀",
    "BREAKING: GitHub to remove merging, representative says: \"only rebasing from now, we like to see people suffer\"",
    "https://www.youtube.com/watch?v=O-QLVPMPQ9o&pp=0gcJCX4JAYcqIYzv",
    "Just in: New JavaScript framework just released, there are only 9 more predicted to release today",
    "Interview with local dubstep producer: \"I don't really mix, i just slap an ott on the whole thing and call it a day\"",
    "This ad is sponsored by HTMX, the frontend library of peace"
];

let bannerElem = null;
let chatbotElem = null;

toggleCheckbox.addEventListener("change", () => {
    if (toggleCheckbox.checked) {
        activateAnnoyingMode();
    } else {
        deactivateAnnoyingMode();
    }
});

function activateAnnoyingMode() {
    toggleOContainer.classList.add("toggle-container-toggled")
    bannerElem = document.createElement("div");
    bannerElem.className = "annoying-banner";

    const scrollContainer = document.createElement("div");
    scrollContainer.className = "scroll-container";

    const primaryCarousel = createCarousel("primary-carousel");
    scrollContainer.appendChild(primaryCarousel);

    bannerElem.appendChild(scrollContainer);
    document.body.appendChild(bannerElem);

    initInfiniteScroll(scrollContainer, primaryCarousel);

    chatbotElem = document.createElement("div");
    chatbotElem.className = "annoying-chatbot open";
    chatbotElem.innerHTML = `
    <div class="chatbot-message">
      <p>Do you need help?</p>
      <button onclick="collapseChatbot(event)">Go away</button>
    </div>
    `;

    chatbotElem.addEventListener("click", function openOnClick(e) {
        if (!chatbotElem.classList.contains("open")) {
            expandChatbot();
        }
        e.stopPropagation();
    });
    document.body.appendChild(chatbotElem);
}

function createCarousel(id) {
    const carousel = document.createElement("div");
    carousel.className = "banner-carousel";
    carousel.id = id;

    adTexts.forEach(text => {
        const span = document.createElement("span");
        span.textContent = text;
        span.className = "ad-item";
        carousel.appendChild(span);
    });

    return carousel;
}

function initInfiniteScroll(scrollContainer, primaryCarousel) {
    setTimeout(() => {
        const carouselWidth = primaryCarousel.offsetWidth;

        const cloneCarousel = primaryCarousel.cloneNode(true);
        cloneCarousel.id = "clone-carousel";
        scrollContainer.appendChild(cloneCarousel);

        const pixelsPerSecond = 150
        const animationDuration = carouselWidth / pixelsPerSecond;

        scrollContainer.style.animationDuration = `${animationDuration}s`;
        scrollContainer.style.width = `${carouselWidth * 2}px`;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && entry.boundingClientRect.right < window.innerWidth / 2) {
                    scrollContainer.style.animation = 'none';
                    scrollContainer.style.transform = 'translateX(0)';
                    scrollContainer.appendChild(primaryCarousel);
                    const newPrimary = scrollContainer.firstElementChild;
                    void scrollContainer.offsetWidth;
                    scrollContainer.style.animation = `scrollBanner ${animationDuration}s linear infinite`;
                    observer.unobserve(entry.target);
                    observer.observe(newPrimary);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px'
        });

        observer.observe(primaryCarousel);

        scrollContainer.style.animation = `scrollBanner ${animationDuration}s linear infinite`;
    }, 100);
}

function deactivateAnnoyingMode() {
    toggleOContainer.classList.remove("toggle-container-toggled")

    if (bannerElem) {
        bannerElem.remove();
        bannerElem = null;
    }

    if (chatbotElem) {
        chatbotElem.remove();
        chatbotElem = null;
    }
}

function collapseChatbot(e) {
    e.stopPropagation();

    chatbotElem.classList.remove("open");
    setTimeout(() => {
        chatbotElem.innerHTML = "?";
    }, 300);
}

function expandChatbot() {
    chatbotElem.classList.add("open");
    chatbotElem.innerHTML = `
    <div class="chatbot-message">
      <p>Do you need help?</p>
      <button onclick="collapseChatbot(event)">Go away</button>
    </div>
  `;
}