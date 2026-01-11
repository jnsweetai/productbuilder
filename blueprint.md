# Influencer Growth Game Blueprint

## Overview

This document outlines the design and implementation of a simple web-based game called "Influencer Growth Game". The game is a simulation where the player takes on the role of an aspiring social media influencer. The goal is to grow their follower count and become a top influencer.

## Core Gameplay Mechanics

*   **Stats:** The player has three main stats:
    *   **Followers:** The number of people following the player. This is the primary measure of success.
    *   **Money:** The player's current funds. Money is earned through brand deals and other opportunities.
    *   **Energy:** The player's energy level. Energy is consumed by taking actions and is restored by resting.
*   **Actions:** The player can choose from a variety of actions to take, such as:
    *   **Post Content:** Create and post new content to attract followers.
    *   **Collaborate:** Collaborate with other influencers to reach a wider audience.
    *   **Rest:** Restore energy.
*   **Events:** Random events will occur throughout the game, presenting the player with opportunities and challenges.

## Project Structure

*   `index.html`: The main HTML file.
*   `style.css`: The stylesheet for the game.
*   `main.js`: The JavaScript file containing the game logic.
*   `blueprint.md`: This file.

## Current Plan

### Phase 1: Initial Setup (Completed)

1.  **Create `blueprint.md`**: Establish the project blueprint.
2.  **Modify `index.html`**:
    *   Set up the basic HTML structure for the game interface.
    *   Include a header, a stats display area, an action button area, and a message log.
3.  **Modify `style.css`**:
    *   Apply a modern and clean design to the game interface.
    *   Use CSS variables for a consistent color scheme.
4.  **Modify `main.js`**:
    *   Initialize the game state.
    *   Implement the core game loop.
    *   Define the player actions and their effects on the game state.
    *   Use Web Components to create reusable UI elements for stats and actions.

### Phase 2: Economy & Events (Current)

1.  **Implement Brand Deals (Completed)**:
    *   Add a "Brand Deal" action.
    *   Unlock condition: Requires a certain number of followers.
    *   Effect: Earns Money, consumes Energy.
2.  **Implement Random Events (Completed)**:
    *   Create a system where random events can trigger after an action.
    *   Events can be positive (viral post, gift) or negative (cancel culture, equipment break).
3.  **Implement Shop/Upgrades**:
    *   Allow players to spend Money to upgrade equipment (e.g., "Better Camera").
    *   Effect: "Post Content" gains more followers.
4.  **UI Updates**:
    *   Add generic feedback for unlocked actions.
    *   Improve log readability (maybe color-coded messages).
6.  **Implement Disqus Comments (Completed)**:
    *   Add a comments section using Disqus.
    *   Allow users to leave feedback or chat.
    *   *Note: Requires a Disqus shortname to function correctly.*
