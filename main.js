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
          color: var(--white, #fff);
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 1em;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #357abd;
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
        case 'rest':
            game.energy = 100;
            logMessage("You rested and restored your energy.");
            break;
    }
    updateStats();
}

actionsContainer.addEventListener('click', (event) => {
    const target = event.target.shadowRoot.querySelector('button');
    if (target && target.dataset.action) {
        handleAction(target.dataset.action);
    }
});

logMessage("Welcome to the Influencer Growth Game! Start by posting some content.");
updateStats();
