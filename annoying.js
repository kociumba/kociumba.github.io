const toggleCheckbox = document.getElementById("annoying-toggle");
const toggleOContainer = document.getElementById("annoying-container");

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

    const carousel = document.createElement("div");
    carousel.className = "banner-carousel";

    const adTexts = [
        "🚨 Call +00-420-69-2137 to get 50% off your next google search 🚨",
        "Rumors are Tariffs have been enforced on package managers 🤔, click here to see if your package manager is affected !!!",
        "Subscribe to WasteYourMoney Ltd just for 19.99$/second",
        "Experts say: \"In the next 50 years sunliight might become the next big thing next to crypto and ai\"",
        "Buy 1 nothing now and get 2 more compleatly free 🤯"
    ];

    adTexts.forEach(text => {
        const span = document.createElement("span");
        span.textContent = text;
        carousel.appendChild(span);
    });

    // HACK: need to actually move elements from start to finish instead of this, since there is still a small skip when the doubl queue ends
    carousel.innerHTML += carousel.innerHTML;

    bannerElem.appendChild(carousel);
    document.body.appendChild(bannerElem);

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