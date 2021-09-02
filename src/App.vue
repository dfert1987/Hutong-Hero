<template>
  <body>
    <header>
      <h1 class="banner-title">Hutong Hero</h1>
    </header>
    <div class="main" id="game">
      <div class="char-container">
        <section id="player" class="container">
          <div class="char-info">
            <h2 class="name">P1: {{ char.name }}</h2>
            <h3 class="class-type">Class: {{ char.class }}</h3>
          </div>
          <img class="player-image" :src="char.image" />
          <div class="bar-and-hp">
            <p class="hp-bar">HP</p>
            <div class="healthbar">
              <div class="healthbar__value" :style="playerBarStyles"></div>
            </div>
          </div>
          <h4 class="hp-fraction">
            {{ getPlayerHealth() }}/ {{ char.startingHP }}
          </h4>
        </section>

        <h2 class="versus">VS</h2>
        <section id="monster" class="container">
          <div class="char-info">
            <h2 class="name">CPU: {{ enemy.name }}</h2>
            <h3 class="class-type">Class: {{ enemy.class }}</h3>
          </div>
          <img class="monster-image" :src="enemy.image" />
          <div class="bar-and-hp">
            <p class="hp-bar">HP</p>
            <div class="healthbar">
              <div class="healthbar__value" :style="monsterBarStyles"></div>
            </div>
          </div>
          <h4 class="hp-fraction">
            {{ getMonsterHealth() }}/{{ enemy.startingHP }}
          </h4>
        </section>
      </div>
      <div class="enemy-p1-choose" v-if="!start">
        <div class="player-select">
          <h2 class="choose-char">Choose Your Hero!</h2>
          <div class="select-char-container">
            <button
              :disabled="index <= 1"
              @click="indexDown"
              class="left-arrow"
            >
              <img
                class="arrow"
                src="./assets/images/white-arrow-png-41962.png"
              />
            </button>
            <button
              :disabled="index === chars.length - 1"
              @click="indexUp"
              class="right-arrow"
            >
              <img
                class="arrow"
                src="./assets/images/white-arrow-png-41958.png"
              />
            </button>
          </div>
        </div>
        <button
          :disabled="enemyIndex === 0 || index === 0"
          @click="start = true"
          class="start"
        >
          START
        </button>
        <div class="randomizer-container">
          <h2 class="enemy-title">Get an Enemy</h2>
          <button @click="getRandomNumber" class="randomizer">
            Randomizer
          </button>
        </div>
      </div>
      <section class="container" v-if="winner">
        <h2 class="game-over">Game Over!</h2>
        <h3 class="loser" v-if="winner === 'monster'">You Lost!</h3>
        <h3 class="winner" v-else-if="winner === 'player'">You Won!</h3>
        <h3 class="draw" v-else>Draw...</h3>
        <button @click="startGame">Start New Game</button>
      </section>
      <div v-if="start" class="control-and-log">
        <section id="controls">
          <button
            class="control"
            :disabled="attacksAvailable === false"
            @click="attackMonster"
          >
            Basic: {{ char.attack }}
          </button>
          <button
            class="control"
            :disabled="specialAttackAvailable || attacksAvailable === false"
            @click="specialAttackMonster"
          >
            Special: {{ char.special }}
          </button>
          <button
            class="control"
            :disabled="attacksAvailable === false"
            @click="healPlayer"
          >
            HEAL: {{ char.heal }}
          </button>
          <button class="control" @click="surrender">SURRENDER</button>
        </section>
        <battle-log
          :character="char"
          :randomEnemy="enemy"
          :loggedMessages="logMessages"
        ></battle-log>
      </div>
    </div>
  </body>
</template>

<script>
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
import enemies from './assets/characters/enemies.js';
import characters from './assets/characters/characters.js';

export default {
  data() {
    return {
      start: false,
      currentRound: 0,
      winner: null,
      message: '',
      logMessages: [],
      attacksAvailable: true,
      char: {
        name: '???',
        class: '???',
        attack: '',
        special: '',
        heal: '',
        hp: 0,
        strength: 0,
        defense: 0,
        speed: 0,
        specialAttack: 0,
        startingHP: 0,
        image: require('./assets/images/question.jpeg'),
      },
      chars: characters,
      enemies: enemies,
      index: 0,
      enemyIndex: 0,
      enemy: {
        name: '???',
        class: '???',
        attack: '',
        special: '',
        heal: '',
        hp: 0,
        strength: 0,
        defense: 0,
        speed: 0,
        startingHP: 0,
        specialAttack: 0,
        image: require('./assets/images/question.jpeg'),
      },
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.enemy.hp < 0) {
        return {width: '0%'};
      }
      return {width: this.enemy.hp + '%'};
    },
    playerBarStyles() {
      if (this.char.hp < 0) {
        return {width: '0%'};
      }
      return {width: this.char.hp + '%'};
    },
    specialAttackAvailable() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.char.hp <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.enemy.hp <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'player';
      }
    },
    index(value) {
      this.char = this.chars[value];
    },
    enemyIndex(value) {
      this.enemy = this.enemies[value];
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomNumber(5, 12);
      this.enemy.hp -= attackValue;
      this.addLogMessage('player', 'attack', attackValue);
      this.attacksAvailable = false;
      setTimeout(() => {
        this.attackPlayer();
      }, 3000);
    },
    attackPlayer() {
      const attackValue = getRandomNumber(8, 15);
      const specialValue = getRandomNumber(10, 18);
      if (this.currentRound % 3 !== 0) {
        this.char.hp -= attackValue;
        this.addLogMessage('monster', 'attack', attackValue);
        this.attacksAvailable = true;
      }
      if (this.currentRound % 3 === 0) {
        this.char.hp -= specialValue;
        this.addLogMessage('monster', 'special', specialValue);
        this.attacksAvailable = true;
      }
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomNumber(10, 25);
      this.enemy.hp -= attackValue;
      this.addLogMessage('player', 'special', attackValue);
      this.attacksAvailable = false;
      setTimeout(() => {
        this.attackPlayer();
      }, 3000);
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomNumber(8, 20);
      if (this.char.hp + healValue > this.char.startingHP) {
        this.char.hp = this.char.startingHP;
      } else {
        this.char.hp += healValue;
      }
      this.addLogMessage('player', 'heal', healValue);
      this.attacksAvailable = false;
      setTimeout(() => {
        this.attackPlayer();
      }, 3000);
    },
    startGame() {
      this.char.hp = this.char.startingHP;
      this.enemy.hp = this.char.startingHP;
      this.winner = null;
      this.currentRound = 0;
      this.logMessages = [];
      this.enemy = this.enemies[0];
      this.char = this.chars[0];
      this.start = false;
    },
    surrender() {
      this.winner = 'monster';
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
      if (this.logMessages.length > 6) {
        this.logMessages.pop();
      }
    },
    getPlayerHealth() {
      if (this.char.hp > 0) {
        return this.char.enemy.hp;
      } else {
        return 0;
      }
    },
    getMonsterHealth() {
      if (this.enemy.hp > 0) {
        return this.enemy.hp;
      } else {
        return 0;
      }
    },
    indexDown() {
      if (this.index > 0) {
        this.index--;
      }
    },
    indexUp() {
      if (this.index < this.chars.length - 1) {
        this.index++;
      }
    },
    getRandomNumber() {
      this.enemyIndex = Math.floor(
        Math.random() * (this.enemies.length - 2) + 1
      );
    },
  },
};
</script>

<style>
@import './assets/styles/main.css';
</style>
