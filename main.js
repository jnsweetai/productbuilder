class StatDisplay extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['name', 'value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    render() {
        const name = this.getAttribute('name');
        const value = this.getAttribute('value');
        this.shadowRoot.innerHTML = `
      <style>
        .stat {
          text-align: center;
        }
        .name {
          font-size: 1.2em;
          font-weight: bold;
          color: var(--primary-color, #4a90e2);
        }
        .value {
          font-size: 1.5em;
          font-weight: bold;
        }
      </style>
      <div class="stat">
        <div class="name">${name}</div>
        <div class="value">${value}</div>
      </div>
    `;
    }
}
customElements.define('stat-display', StatDisplay);

class ActionButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const action = this.getAttribute('action');
        this.shadowRoot.innerHTML = `
      <style>
        button {
          background-color: var(--primary-color, #4a90e2);
          color: var(--button-text-color, #fff);
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 1em;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover {
          filter: brightness(1.1);
        }
      </style>
      <button data-action="${action}"><slot></slot></button>
    `;
    }
}
customElements.define('action-button', ActionButton);

const game = {
    followers: 0,
    money: 100,
    energy: 100,
};

const statDisplays = {
    followers: document.querySelector('stat-display[name="Followers"]'),
    money: document.querySelector('stat-display[name="Money"]'),
    energy: document.querySelector('stat-display[name="Energy"]'),
};

const logElement = document.getElementById('log');
const actionsContainer = document.getElementById('actions-container');

// Theme Toggling Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved user preference, if any, on load of the website
const currentTheme = localStorage.getItem('theme');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggleBtn.textContent = '☀️';
} else if (currentTheme === 'light') {
    body.classList.remove('dark-mode');
    themeToggleBtn.textContent = '🌓';
} else if (prefersDarkScheme.matches) {
     // If no preference is stored, check system preference
     body.classList.add('dark-mode');
     themeToggleBtn.textContent = '☀️';
}

themeToggleBtn.addEventListener('click', function () {
    body.classList.toggle('dark-mode');
    let theme = 'light';
    if (body.classList.contains('dark-mode')) {
        theme = 'dark';
        themeToggleBtn.textContent = '☀️';
    } else {
        themeToggleBtn.textContent = '🌓';
    }
    localStorage.setItem('theme', theme);
});

function updateStats() {
    statDisplays.followers.setAttribute('value', game.followers);
    statDisplays.money.setAttribute('value', game.money);
    statDisplays.energy.setAttribute('value', game.energy);
}

function logMessage(message) {
    const p = document.createElement('p');
    p.textContent = message;
    logElement.appendChild(p);
    logElement.scrollTop = logElement.scrollHeight;
}

function checkRandomEvent() {
    const chance = Math.random();
    if (chance < 0.05) { // 5% Viral Post
        const bonusFollowers = Math.floor(Math.random() * 1000) + 500;
        game.followers += bonusFollowers;
        logMessage(`🔥 YOUR POST WENT VIRAL! You gained ${bonusFollowers} extra followers!`);
    } else if (chance < 0.10) { // 5% Hater Attack
        const lostFollowers = Math.floor(Math.random() * 200) + 50;
        if (game.followers >= lostFollowers) {
             game.followers -= lostFollowers;
             logMessage(`😡 Haters attacked your comments. You lost ${lostFollowers} followers.`);
        }
    } else if (chance < 0.15) { // 5% Equipment Break
         const repairCost = Math.floor(Math.random() * 50) + 20;
         if (game.money >= repairCost) {
             game.money -= repairCost;
             logMessage(`📷 Your camera broke! You spent $${repairCost} on repairs.`);
         }
    }
}

function handleAction(action) {
    if (game.energy <= 0 && action !== 'rest') {
        logMessage("You don't have enough energy to do that!");
        return;
    }

    switch (action) {
        case 'post':
            game.energy -= 10;
            const newFollowers = Math.floor(Math.random() * 100) + 10;
            game.followers += newFollowers;
            logMessage(`You posted new content and gained ${newFollowers} followers.`);
            break;
        case 'collaborate':
            game.energy -= 20;
            const collaborationFollowers = Math.floor(Math.random() * 500) + 100;
            game.followers += collaborationFollowers;
            logMessage(`You collaborated with another influencer and gained ${collaborationFollowers} followers.`);
            break;
        case 'brand-deal':
            if (game.followers < 500) {
                logMessage("You need at least 500 followers to get a brand deal.");
                return;
            }
            game.energy -= 30;
            const earnedMoney = Math.floor(Math.random() * 100) + 50;
            game.money += earnedMoney;
            logMessage(`You signed a brand deal and earned $${earnedMoney}!`);
            break;
        case 'rest':
            game.energy = 100;
            logMessage("You rested and restored your energy.");
            break;
    }

    if (action !== 'rest') {
        checkRandomEvent();
    }

    updateStats();
}

actionsContainer.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() === 'action-button') {
        const target = event.target.shadowRoot.querySelector('button');
        if (target && target.dataset.action) {
            handleAction(target.dataset.action);
        }
    }
});

logMessage("Welcome to the Influencer Growth Game! Start by posting some content.");
updateStats();
