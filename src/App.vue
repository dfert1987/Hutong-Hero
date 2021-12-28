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
          <div class="char-and-animation">
            <img
              class="playerImage"
              v-bind:class="{
                animate__animated: playerAnimate,
                animate__bounce: playerBounce,
                animate__flash: playerFlash,
                animate__pulse: playerPulse,
                animate__rubberBand: playerRubberBand,
                animate__shakeX: playerShakeX,
                animate__shakeY: playerShakeY,
                animate__headShake: playerHeadShake,
                animate__swing: playerSwing,
                animate__tada: playerTada,
                animate__wobble: playerWobble,
                animate__jello: playerJello,
                animate__heartBeat: playerHeartBeat,
              }"
              :src="char.image"
            />
            <transition
              mode="out-in"
              v-bind:enter-active-class="appearPlayer"
              v-bind:leave-active-class="vanishPlayer"
            >
              <img
                v-bind:class="animatePlayerStyle"
                class="animationImagePlayer"
                v-if="playerAnimate"
                :src="animationImage"
              />
            </transition>
          </div>
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
          <div class="monster-and-animations">
            <transition
              mode="out-in"
              v-bind:enter-active-class="appearPlayerRight"
              v-bind:leave-active-class="vanishPlayerRight"
            >
              <img
                v-bind:class="animatePlayerStyleRight"
                class="animationImagePlayer"
                v-if="playerAnimateRight"
                :src="animationImageRight"
              />
            </transition>
            <img
              class="monster-image"
              v-bind:class="{
                animate__animated: enemyAnimate,
                animate__bounce: enemyBounce,
                animate__flash: enemyFlash,
                animate__pulse: enemyPulse,
                animate__rubberBand: enemyRubberBand,
                animate__shakeX: enemyShakeX,
                animate__shakeY: enemyShakeY,
                animate__headShake: enemyHeadShake,
                animate__swing: enemySwing,
                animate__tada: enemyTada,
                animate__wobble: enemyWobble,
                animate__jello: enemyJello,
                animate__heartBeat: enemyHeartBeat,
              }"
              :src="enemy.image"
            />
          </div>
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
      <div class="enemy-p1-choose" v-if="!start && !winner">
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
      <section
        class="container"
        v-if="winner === 'monster' || winner === 'player' || winner === 'draw'"
      >
        <h2 class="game-over">Game Over!</h2>
        <h3 class="loser" v-if="winner === 'monster'">You Lost!</h3>
        <h3 class="winner" v-else-if="winner === 'player'">You Won!</h3>
        <h3 class="draw" v-else-if="winner === 'draw'">Draw...</h3>
        <button @click="startGame">Start New Game</button>
      </section>
      <div v-if="start === true && winner === ''" class="control-and-log">
        <section id="controls" class="=controls">
          <button
            class="control"
            :disabled="attacksAvailable === false"
            @click="
              attackMonster();
              attackMonsterAnimation('one');
              attackMonsterAdvAniUser('one');
            "
          >
            {{ char.moveOne.name }}
          </button>
          <button
            class="control"
            :disabled="specialAttackAvailable || attacksAvailable === false"
            @click="
              specialAttackMonster();
              attackMonsterAnimation('two');
              attackMonsterAdvAniUser('two');
            "
          >
            {{ char.moveTwo.name }}
          </button>
          <button
            class="control"
            :disabled="attacksAvailable === false"
            @click="
              healPlayer();
              attackMonsterAnimation('heal');
              attackMonsterAdvAniUser('heal');
            "
          >
            {{ char.moveThree.name }}
          </button>
          <button
            class="control"
            :disabled="attacksAvailable === false"
            @click="
              altAttack();
              attackMonsterAnimation('alt');
              attackMonsterAdvAniUser('alt');
            "
          >
            {{ char.moveFour.name }}
          </button>
        </section>
        <button class="surrender" @click="surrender">SURRENDER</button>
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
import enemies from "./assets/characters/enemies.js";
import characters from "./assets/characters/characters.js";

export default {
  data() {
    return {
      start: false,
      currentRound: 0,
      winner: "",
      message: "",
      logMessages: [],
      attacksAvailable: true,
      playerAnimate: false,
      playerAnimateRight: false,
      playerBounce: false,
      playerFlash: false,
      playerPulse: false,
      playerRubberBand: false,
      playerShakeX: false,
      playerShakeY: false,
      playerHeadShake: false,
      playerSwing: false,
      playerTada: false,
      playerWobble: false,
      playerJello: false,
      playerHeartBeat: false,
      enemyAnimate: false,
      enemyBounce: false,
      enemyFlash: false,
      enemyPulse: false,
      enemyRubberBand: false,
      enemyShakeX: false,
      enemyShakeY: false,
      enemyHeadShake: false,
      enemySwing: false,
      enemyTada: false,
      enemyWobble: false,
      enemyJello: false,
      enemyHeartBeat: false,
      appearPlayer: "",
      vanishPlayer: "",
      appearPlayerRight: "",
      vanishPlayerRight: "",
      animatePlayerStyle: "",
      animatePlayerStyleRight: "",
      animationImage: "",
      animationImageRight: "",
      poop: false,
      spellingSnakes: false,
      deliveryFee: false,
      drumNBass: false,
      buYao: false,
      scallions: false,
      supBro: false,
      wrecklessDriving: false,
      bathroomBump: false,
      weixinZhifu: false,
      bigMacs: false,
      drinkBeer: false,
      getsPaid: false,
      refillJug: false,
      pencil: false,
      reUp: false,
      sackDump: false,
      hydrate: false,
      crepeSwirl: false,
      simonSays: false,
      wineDrunk: false,
      getsLost: false,
      stepOn: false,
      jugBash: false,
      wrongOrder: false,
      youGood: false,
      laJiao: false,
      beatDrop: false,
      char: {
        name: "???",
        class: "???",
        attack: "",
        special: "",
        heal: "",
        hp: 100,
        strength: 0,
        defense: 0,
        speed: 0,
        specialAttack: 0,
        startingHP: 100,
        startingStrength: 0,
        startingDefense: 0,
        startingSpeed: 0,
        startingSpecialAttack: 0,
        moveOneAnimation: "",
        moveTwoAnimation: "",
        moveThreeAnimation: "",
        moveFourAnimation: "",
        image: require("./assets/images/question.jpeg"),
        moveOne: {
          name: "",
          style: "",
          type: "",
          high: 0,
          low: 0,
          strengthDecrease: 0,
          strengthIncrease: 0,
          speedIncrease: 0,
          speedDecrease: 0,
          specialAttackIncrease: 0,
          specialAttackDecrease: 0,
          defenseIncrease: 0,
          defenseDecrease: 0,
          animationPlayerImage: "",
          animationAppearPlayer: "",
          animationVanishPlayer: "",
          animationCPUImage: "",
          animationAppearCPU: "",
          animationVanishCPU: "",
        },
        moveTwo: {
          name: "",
          style: "",
          type: "",
          high: 0,
          low: 0,
          strengthDecrease: 0,
          strengthIncrease: 0,
          speedIncrease: 0,
          speedDecrease: 0,
          specialAttackIncrease: 0,
          specialAttackDecrease: 0,
          defenseIncrease: 0,
          defenseDecrease: 0,
          animationPlayerImage: "",
          animationAppearPlayer: "",
          animationVanishPlayer: "",
          animationCPUImage: "",
          animationAppearCPU: "",
          animationVanishCPU: "",
        },
        moveThree: {
          name: "",
          style: "",
          type: "",
          high: 0,
          low: 0,
          strengthDecrease: 0,
          strengthIncrease: 0,
          speedIncrease: 0,
          speedDecrease: 0,
          specialAttackIncrease: 0,
          specialAttackDecrease: 0,
          defenseIncrease: 0,
          defenseDecrease: 0,
          animationPlayerImage: "",
          animationAppearPlayer: "",
          animationVanishPlayer: "",
        },
        moveFour: {
          name: "",
          style: "",
          type: "",
          high: 0,
          low: 0,
          strengthDecrease: 0,
          strengthIncrease: 0,
          speedIncrease: 0,
          speedDecrease: 0,
          specialAttackIncrease: 0,
          specialAttackDecrease: 0,
          defenseIncrease: 0,
          defenseDecrease: 0,
          animationPlayerImage: "",
          animationAppearPlayer: "",
          animationVanishPlayer: "",
          animationCPUImage: "",
          animationAppearCPU: "",
          animationVanishCPU: "",
        },
      },
      chars: characters,
      enemies: enemies,
      index: 0,
      enemyIndex: 0,
      enemy: {
        name: "???",
        class: "???",
        attack: "",
        special: "",
        heal: "",
        hp: 100,
        strength: 0,
        defense: 0,
        speed: 0,
        startingHP: 100,
        startingStrength: 0,
        startingDefense: 0,
        startingSpeed: 0,
        startingSpecialAttack: 0,
        specialAttack: 0,
        moveOneAnimation: "",
        moveTwoAnimation: "",
        moveThreeAnimation: "",
        moveFourAnimation: "",
        image: require("./assets/images/question.jpeg"),
      },
      monsterHealth: null,
      playerHealth: null,
      baseDodgePercentagePlayer1: 0.15,
      baseDodgePercentageEnemy: 0.15,
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.enemy.hp < 0) {
        return { width: "0%" };
      }
      return { width: (this.enemy.hp / this.enemy.startingHP) * 100 + "%" };
    },
    playerBarStyles() {
      if (this.char.hp < 0) {
        return { width: "0%" };
      }
      return { width: (this.char.hp / this.char.startingHP) * 100 + "%" };
    },
    specialAttackAvailable() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.enemy.hp <= 0) {
        this.winner = "draw";
        this.resetValues();
      } else if (value <= 0) {
        this.winner = "monster";
        this.resetValues();
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.char.hp <= 0) {
        this.winner = "draw";
        this.resetValues();
      } else if (value <= 0) {
        this.winner = "player";
        this.resetValues();
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
      const randomize = Math.random();
      if (this.addressSpeedEnemy(this.enemy, this.char) > randomize) {
        this.addLogMessage("player", "dodge", 0);
        console.log("dodge normal");
      } else {
        const attackValue = getRandomNumber(
          this.char.moveOne.low,
          this.char.moveOne.high
        );
        const adjustedAttack = this.addressClass(
          this.char.class,
          this.enemy.class,
          attackValue
        );
        const defenseFactor = this.addressDefense(this.enemy);
        const adjustedForDefense = Math.floor(adjustedAttack * defenseFactor);

        const strengthFactor = this.addressStrength(
          this.char,
          this.char.moveOne
        );
        const adjustedForStrength = Math.floor(
          adjustedForDefense * strengthFactor
        );

        const specialFactor = this.addressSpecial(this.char, this.char.moveOne);
        const adjustedForSpecial = Math.floor(
          adjustedForStrength * specialFactor
        );

        this.enemy.hp -= adjustedForSpecial;
        this.addLogMessage("player", "attack", adjustedForSpecial);
      }
      this.attacksAvailable = false;
      setTimeout(() => {
        this.attackPlayer();
      }, 5000);
      setTimeout(() => {
        this.attackMonsterAdvAniRight("one");
      }, 3000);
    },

    attackPlayer() {
      const attackValue = getRandomNumber(
        this.enemy.moveOne.low,
        this.enemy.moveOne.high
      );

      const adjustedAttack = this.addressClass(
        this.enemy.class,
        this.char.class,
        attackValue
      );
      const defenseFactor = this.addressDefense(this.char);
      const adjustedForDefense = Math.floor(adjustedAttack * defenseFactor);

      const strengthFactor = this.addressStrength(
        this.enemy,
        this.enemy.moveOne
      );
      const adjustedForStrength = Math.floor(
        adjustedForDefense * strengthFactor
      );

      const specialFactor = this.addressSpecial(this.enemy, this.enemy.moveOne);
      const adjustedForSpecial = Math.floor(
        adjustedForStrength * specialFactor
      );

      const specialValue = getRandomNumber(
        this.enemy.moveTwo.low,
        this.enemy.moveTwo.high
      );

      const adjustedSpecial = this.addressClass(
        this.char.class,
        this.enemy.class,
        specialValue
      );

      const adjustedSpecialDefense = Math.floor(
        adjustedSpecial * defenseFactor
      );

      const specialStrengthFactor = this.addressStrength(
        this.enemy,
        this.enemy.moveTwo
      );
      const adjustedSpecialForStrength = Math.floor(
        adjustedSpecialDefense * specialStrengthFactor
      );

      const specialOnSpecialFactor = this.addressSpecial(
        this.enemy,
        this.enemy.moveTwo
      );
      const adjustedForSpecialOnSpecial = Math.floor(
        adjustedSpecialForStrength * specialOnSpecialFactor
      );

      const healValue = getRandomNumber(
        this.enemy.moveThree.low,
        this.enemy.moveThree.high
      );

      const moveChoice = getRandomNumber(1, 4);

      if (this.currentRound % 3 !== 0) {
        if (moveChoice === 1 || moveChoice === 4) {
          this.enemyAnimation("one");
          const randomize = Math.random();
          if (this.addressSpeedPlayer(this.char, this.enemy) > randomize) {
            this.addLogMessage("monster", "dodge", 0);
          } else {
            this.char.hp -= adjustedForSpecial;
            this.addLogMessage("monster", "attack", adjustedForSpecial);
          }
        } else if (moveChoice === 2) {
          this.enemyAnimation("heal");
          if (this.enemy.hp + healValue > this.enemy.startingHP) {
            this.enemy.hp = this.enemy.startingHP;
          } else {
            this.enemy.hp += healValue;
          }
          this.addLogMessage("monster", "heal", healValue);
        } else if (moveChoice === 3) {
          this.cpuAltAttack();
          this.enemyAnimation("alt");
        }
      } else {
        const randomize = Math.random();
        this.enemyAnimation("two");
        if (this.addressSpeedPlayer(this.char, this.enemy) > randomize) {
          this.addLogMessage("monster", "dodge-special", 0);
        } else {
          this.char.hp -= adjustedForSpecialOnSpecial;
          this.addLogMessage("monster", "special", adjustedForSpecialOnSpecial);
        }
      }
      setTimeout(() => {
        this.attacksAvailable = true;
      }, 2000);
    },
    specialAttackMonster() {
      this.currentRound++;
      const randomize = Math.random();
      if (this.addressSpeedEnemy(this.enemy, this.char) > randomize) {
        this.addLogMessage("player", "dodge-special", 0);
      } else {
        const attackValue = getRandomNumber(
          this.char.moveTwo.low,
          this.char.moveTwo.high
        );

        const adjustedAttack = this.addressClass(
          this.char.class,
          this.enemy.class,
          attackValue
        );

        const defenseFactor = this.addressDefense(this.enemy);
        const adjustedForDefense = Math.floor(adjustedAttack * defenseFactor);

        const strengthFactor = this.addressStrength(
          this.char,
          this.char.moveTwo
        );
        const adjustedForStrength = Math.floor(
          adjustedForDefense * strengthFactor
        );

        const specialFactor = this.addressSpecial(this.char, this.char.moveTwo);
        const adjustedForSpecial = Math.floor(
          adjustedForStrength * specialFactor
        );

        this.enemy.hp -= adjustedForSpecial;
        this.addLogMessage("player", "special", adjustedForSpecial);
      }
      this.attacksAvailable = false;
      setTimeout(() => {
        this.attackPlayer();
      }, 5000);
      setTimeout(() => {
        this.attackMonsterAdvAniRight("two");
      }, 3000);
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomNumber(
        this.char.moveThree.low,
        this.char.moveThree.high
      );
      if (this.char.hp + healValue > this.char.startingHP) {
        this.char.hp = this.char.startingHP;
      } else {
        this.char.hp += healValue;
      }
      this.addLogMessage("player", "heal", healValue);
      this.attacksAvailable = false;
      setTimeout(() => {
        this.attackPlayer();
      }, 5000);
      setTimeout(() => {
        this.attackMonsterAdvAniRight("heal");
      }, 3000);
    },
    cpuAltAttack() {
      if (this.enemy.moveFour.strengthDecrease > 0) {
        this.char.strength -= this.enemy.moveFour.strengthDecrease;
        this.addLogMessage(
          "monster",
          "altAttackStrength",
          this.enemy.moveFour.strengthDecrease
        );
        this.attacksAvailable = true;
      } else if (this.enemy.moveFour.strengthIncrease > 0) {
        this.enemy.strength += this.char.moveFour.strengthIncrease;
        this.addLogMessage(
          "monster",
          "altImproveStrength",
          this.enemy.moveFour.strengthIncrease
        );
        this.attacksAvailable = true;
      } else if (this.enemy.moveFour.speedIncrease > 0) {
        this.enemy.speed += this.enemy.moveFour.strengthIncrease;
        this.addLogMessage(
          "monster",
          "altImproveSpeed",
          this.enemy.moveFour.speedIncrease
        );
        this.attacksAvailable = true;
      } else if (this.enemy.moveFour.speedDecrease > 0) {
        this.char.speed -= this.enemy.speedDecrease;
        this.addLogMessage(
          "monster",
          "altAttackSpeed",
          this.enemy.moveFour.speedDecrease
        );
        this.attacksAvailable = true;
      } else if (this.enemy.moveFour.specialAttackIncrease > 0) {
        this.enemy.specialAttack += this.enemy.moveFour.specialAttackIncrease;
        this.addLogMessage(
          "monster",
          "altImproveSpecial",
          this.enemy.moveFour.specialAttackIncrease
        );
        this.attacksAvailable = true;
      } else if (this.enemy.moveFour.specialAttackDecrease > 0) {
        this.char.specialAttack -= this.enemy.moveFour.specialAttackDecrease;
        this.addLogMessage(
          "monster",
          "altAttackSpecial",
          this.enemy.moveFour.specialAttackDecrease
        );
        this.attacksAvailable = true;
      } else if (this.enemy.moveFour.defenseIncrease > 0) {
        this.enemy.defense += this.enemy.moveFour.defenseIncrease;
        this.addLogMessage(
          "monster",
          "altImproveDefense",
          this.enemy.moveFour.defenseIncrease
        );
        this.attacksAvailable = true;
      } else if (this.enemy.moveFour.defenseDecrease > 0) {
        this.char.defense -= this.enemy.moveFour.defenseDecrease;
        this.addLogMessage(
          "monster",
          "altAttackDefense",
          this.enemy.moveFour.defenseDecrease
        );
        this.attacksAvailable = true;
      } else if (this.enemy.moveFour.defenseIncrease > 0) {
        this.enemy.defense += this.enemy.moveFour.defenseIncrease;
        this.addLogMessage(
          "monster",
          "altImproveDefense",
          this.enemy.moveFour.defenseIncrease
        );
        this.attacksAvailable = true;
      }
    },
    altAttack() {
      this.currentRound++;
      if (this.char.moveFour.strengthDecrease > 0) {
        this.enemy.strength -= this.char.moveFour.strengthDecrease;
        this.addLogMessage(
          "player",
          "altAttackStrength",
          this.char.moveFour.strengthDecrease
        );
      } else if (this.char.moveFour.strengthIncrease > 0) {
        this.char.strength += this.char.moveFour.strengthIncrease;
        this.addLogMessage(
          "player",
          "altImproveStrength",
          this.char.moveFour.strengthIncrease
        );
      } else if (this.char.moveFour.speedIncrease > 0) {
        this.char.speed += this.char.moveFour.speedIncrease;
        this.addLogMessage(
          "player",
          "altImproveSpeed",
          this.char.moveFour.speedIncrease
        );
      } else if (this.char.moveFour.speedDecrease > 0) {
        this.enemy.speed -= this.char.moveFour.speedDecrease;
        this.addLogMessage(
          "player",
          "altAttackSpeed",
          this.char.moveFour.speedDecrease
        );
      } else if (this.char.moveFour.specialAttackIncrease > 0) {
        this.char.specialAttack += this.char.moveFour.specialAttackIncrease;
        this.addLogMessage(
          "player",
          "altImproveSpecial",
          this.char.moveFour.specialAttackIncrease
        );
      } else if (this.char.moveFour.specialAttackDecrease > 0) {
        this.enemy.specialAttack -= this.char.moveFour.specialAttackDecrease;
        this.addLogMessage(
          "player",
          "altAttackSpecial",
          this.char.moveFour.specialAttackDecrease
        );
      } else if (this.char.moveFour.defenseIncrease > 0) {
        this.char.defense += this.char.moveFour.defenseIncrease;
        this.addLogMessage(
          "player",
          "altImproveDefense",
          this.char.moveFour.defenseIncrease
        );
      } else if (this.char.moveFour.defenseDecrease > 0) {
        this.enemy.defense -= this.char.moveFour.defenseDecrease;
        this.addLogMessage(
          "player",
          "altAttackDefense",
          this.char.moveFour.defenseDecrease
        );
      }
      setTimeout(() => {
        this.attackPlayer();
      }, 5000);
      setTimeout(() => {
        this.attackMonsterAdvAniRight("alt");
      }, 5000);
    },
    startGame() {
      this.winner = "";
      this.currentRound = 0;
      this.logMessages = [];
      this.enemy = this.enemies[0];
      this.index = 0;
      this.enemyIndex = 0;
      this.char = this.chars[0];
      this.start = false;
      this.enemy;
      console.log(this.winner);
    },
    surrender() {
      this.winner = "monster";
      this.resetValues();
      this.enemy;
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
      if (this.logMessages.length > 5) {
        this.logMessages.pop();
      }
    },
    getPlayerHealth() {
      if (this.char.hp > 0) {
        this.playerHealth = this.char.hp;
        return this.char.hp;
      } else {
        this.playerHealth = 0;
        return 0;
      }
    },
    getMonsterHealth() {
      if (this.enemy.hp > 0) {
        this.monsterHealth = this.enemy.hp;
        return this.enemy.hp;
      } else {
        this.monsterHealth = 0;
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
    addressClass(attacker, attackee, damage) {
      if (attacker === "LaoWai" && attackee === "XiaoPengyou") {
        const adjustedDamage = Math.floor(damage * 0.4 + damage);
        return adjustedDamage;
      } else if (attacker === "LaoWai" && attackee === "Authority") {
        const adjustedDamage = Math.floor(damage * 0.6);
        return adjustedDamage;
      } else if (attacker === "Auhtority" && attackee === "LaoWai") {
        const adjustedDamage = Math.floor(damage * 0.4 + damage);
        return adjustedDamage;
      } else if (attacker === "Beijinger" && attackee === "Authority") {
        const adjustedDamage = Math.floor(damage * 0.4 + damage);
        return adjustedDamage;
      } else if (attacker === "Authority" && attackee === "Beijinger") {
        const adjustedDamage = Math.floor(damage * 0.6);
        return adjustedDamage;
      } else if (attacker === "Beijinger" && attackee === "Authority") {
        const adjustedDamage = Math.floor(damage * 0.4 + damage);
        return adjustedDamage;
      } else if (attacker === "Beijinger" && attackee === "LaoRen") {
        const adjustedDamage = Math.floor(damage * 0.6);
        return adjustedDamage;
      } else if (attacker === "LaoRen" && attackee === "Beijinger") {
        const adjustedDamage = Math.floor(damage * 0.4 + damage);
        return adjustedDamage;
      } else if (attacker === "LaoRen" && attackee === "XiaoPengyou") {
        const adjustedDamage = Math.floor(damage * 0.6);
        return adjustedDamage;
      } else if (attacker === "XiaoPengyou" && attackee === "LaoRen") {
        const adjustedDamage = Math.floor(damage * 0.4 + damage);
        return adjustedDamage;
      } else if (attacker === "XiaoPengyou" && attackee === "LaoWai") {
        const adjustedDamage = Math.floor(damage * 0.6);
        return adjustedDamage;
      } else if (attacker === "Animal" && attackee === "Vendor") {
        const adjustedDamage = Math.floor(damage * 0.4 + damage);
        return adjustedDamage;
      } else if (attacker === "Vendor" && attackee === "Animal") {
        const adjustedDamage = Math.floor(damage * 0.6);
        return adjustedDamage;
      } else if (attacker === "Animal" && attackee === "Driver") {
        const adjustedDamage = Math.floor(damage * 0.6);
        return adjustedDamage;
      } else if (attacker === "Driver" && attackee === "Animal") {
        const adjustedDamage = Math.floor(damage * 0.4 + damage);
        return adjustedDamage;
      } else if (attacker === "Driver" && attackee === "Vendor") {
        const adjustedDamage = Math.floor(damage * 0.6);
        return adjustedDamage;
      } else if (attacker === "Vendor" && attackee === "Driver") {
        const adjustedDamage = Math.floor(damage * 0.4 + damage);
        return adjustedDamage;
      } else return damage;
    },
    addressDefense(character) {
      if (character.defense === 50) {
        return 1;
      } else if (character.defense > 50) {
        const preMultiplier = character.defense - 50;
        const multiplier = (100 - preMultiplier) * 0.01;
        return multiplier;
      } else if (character.defense < 50) {
        const preBadMultiplier = 50 - character.defense;
        const badMultiplier = (100 + preBadMultiplier) * 0.01;
        return badMultiplier;
      }
    },
    addressStrength(character, move) {
      if (character.strength === 50 || move.style === "Special") {
        return 1;
      } else if (character.strength > 50) {
        const strongMultiplier = character.strength - 50;
        const multiplier = (100 + strongMultiplier) * 0.01;
        return multiplier;
      } else if (character.strength < 50) {
        const preBadMultiplier = 50 - character.strength;
        const badMultiplier = (100 - preBadMultiplier) * 0.01;
        return badMultiplier;
      }
    },
    addressSpecial(character, move) {
      if (character.specialAttack === 50) {
        return 1;
      } else if (move.style === "Basic") {
        return 1;
      } else if (character.specialAttack > 50) {
        const strongMultiplier = character.specialAttack - 50;
        const multiplier = (100 + strongMultiplier) * 0.01;
        return multiplier;
      } else if (character.specialAttack < 50) {
        const preBadMultiplier = 50 - character.specialAttack;
        const badMultiplier = (100 - preBadMultiplier) * 0.01;
        return badMultiplier;
      }
    },
    addressSpeedPlayer(characterOne, characterTwo) {
      if (characterOne.speed === characterTwo.speed) {
        return this.baseDodgePercentagePlayer1;
      } else if (characterOne.speed > characterTwo.speed) {
        return (
          this.baseDodgePercentagePlayer1 +
          (characterOne.speed - characterTwo.speed) / 2
        );
      } else if (characterOne.speed < characterTwo.speed) {
        return (
          this.baseDodgePercentagePlayer1 *
          (1 - (characterTwo.speed - characterOne.speed) * 0.01)
        );
      }
    },
    addressSpeedEnemy(characterOne, characterTwo) {
      if (characterOne.speed === characterTwo.speed) {
        return this.baseDodgePercentageEnemy;
      } else if (characterOne.speed > characterTwo.speed) {
        return (
          this.baseDodgePercentageEnemy +
          ((characterOne.speed - characterTwo.speed) / 1.5) * 0.01
        );
      } else if (characterOne.speed < characterTwo.speed) {
        return (
          this.baseDodgePercentageEnemy *
          (1 - (characterTwo.speed - characterOne.speed) * 0.01)
        );
      }
    },
    resetValues() {
      this.char.hp = this.char.startingHP;
      this.enemy.hp = this.enemy.startingHP;
      this.baseDodgePercentagePlayer1 = 0.15;
      this.baseDodgePercentageEnemy = 0.15;
      this.char.strength = this.char.startingStrength;
      this.enemy.strength = this.enemy.startingStrength;
      this.char.speed = this.char.startingSpeed;
      this.enemy.speed = this.enemy.startingSpeed;
      this.char.specialAttack = this.char.startingSpecialAttack;
      this.enemy.specialAttack = this.enemy.startingSpecialAttack;
      this.char.defense = this.char.startingDefense;
      this.enemy.defense = this.enemy.startingDefense;
      this.char.playerAnimate = false;
      this.char.moveOneAnimation = "";
      this.char.playerBounce = false;
      this.char.playerFlash = false;
      this.char.playerPulse = false;
      this.char.playerRubberBand = false;
      this.char.playerShakeX = false;
      this.char.playerShakeY = false;
      this.char.playerHeadShake = false;
      this.char.playerSwing = false;
      this.char.playerHeartBeat = false;
      this.char.playerJello = false;
      this.char.playerWobble = false;
      this.char.playerTada = false;
    },
    attackMonsterAdvAniUser(moveType) {
      this.playerAnimate = true;
      if (moveType === "one") {
        this.playerAnimateOnePlayer = true;
        this.animationImage = this.char.moveOne.animationPlayerImage;
        if (this.char.moveOne.name === "Poop!") {
          this.appearPlayer = "animate__animated animate__slideInDown";
          this.vanishPlayer = "animate__animated animate__slideOutDown";
          this.animatePlayerStyle = "poop";
        } else if (this.char.moveOne.name === "Bu Yao!") {
          this.appearPlayer = "animate__animated animate__bounceIn";
          this.vanishPlayer = "animate__animated animate__bounceOut";
          this.animatePlayerStyle = "buYao";
        } else if (this.char.moveOne.name === "Bathroom Bump!") {
          this.appearPlayer = "animate__animated animate__bounceIn";
          this.vanishPlayer = "animate__animated animate__bounceOutUp";
          this.animatePlayerStyle = "bathroomBump";
        } else if (this.char.moveOne.name === "Sup Bro!") {
          this.appearPlayer = "animate__animated animate__bounceIn";
          this.vanishPlayer = "animate__animated animate__fadeOut";
          this.animatePlayerStyle = "supBro";
        } else if (this.char.moveOne.name === "Wreckless Driving!") {
          this.appearPlayer = "animate__animated animate__lightSpeedInLeft";
          this.vanishPlayer = "animate__animated animate__lightSpeedOutRight";
          this.animatePlayerStyle = "wrecklessDriving";
        } else if (this.char.moveOne.name === "Delivery Fee!") {
          this.appearPlayer = "animate__animated animate__lightSpeedInLeft";
          this.vanishPlayer = "animate__animated animate__lightSpeedOutRight";
          this.animatePlayerStyle = "deliveryFee";
        } else if (this.char.moveOne.name === "Scallions!") {
          this.appearPlayer = "animate__animated animate__fadeIn";
          this.vanishPlayer = "animate__animated animate__rollOut";
          this.animatePlayerStyle = "scallions";
        }
      } else if (moveType === "two") {
        this.playerAnimateOnePlayer = true;
        this.animationImage = this.char.moveTwo.animationPlayerImage;
        if (this.char.moveTwo.name === "Spelling Snakes!") {
          this.appearPlayer = "animate__animated animate__bounceInLeft";
          this.vanishPlayer = "animate__animated animate__bounceOutRight";
          this.animatePlayerStyle = "spellingSnakes";
        } else if (this.char.moveTwo.name === "Hang Man!") {
          this.appearPlayer = "animate__animated animate__rotateIn";
          this.vanishPlayer = "animate__animated animate__rotateOut";
          this.animatePlayerStyle = "pencil";
        } else if (this.char.moveTwo.name === "Drum n Bass!") {
          this.appearPlayer = "animate__animated animate__slideInUp";
          this.vanishPlayer = "animate__animated animate__slideOutDown";
          this.animatePlayerStyle = "drumNBass";
        } else if (this.char.moveTwo.name === "You Good?") {
          this.appearPlayer = "animate__animated animate__bounceIn";
          this.vanishPlayer = "animate__animated animate__fadeOut";
          this.animatePlayerStyle = "youGood";
        } else if (this.char.moveTwo.name === "Jug Bash!") {
          this.appearPlayer = "animate__animated animate__rotateIn";
          this.vanishPlayer = "animate__animated animate__rollOut";
          this.animatePlayerStyle = "jugBash";
        } else if (this.char.moveTwo.name === "Wrong Order!") {
          this.appearPlayer = "animate__animated animate__jackInTheBox";
          this.vanishPlayer = "animate__animated animate__rollOut";
          this.animatePlayerStyle = "wrongOrder";
        } else if (this.char.moveTwo.name === "La Jiao!") {
          this.appearPlayer = "animate__animated animate__fadeIn";
          this.vanishPlayer = "animate__animated animate__rollOut";
          this.animatePlayerStyle = "laJiao";
        }
      } else if (moveType === "heal") {
        this.playerAnimateOnePlayer = true;
        this.animationImage = this.char.moveThree.animationPlayerImage;
        if (this.char.moveThree.name === "Drink Beer!") {
          this.appearPlayer = "animate__animated animate__rotateInDownLeft";
          this.vanishPlayer = "animate__animated animate__rotateOutDownLeft";
          this.animatePlayerStyle = "drinkBeer";
        } else if (this.char.moveThree.name === "Sack Dump!") {
          this.appearPlayer = "animate__animated animate__rotateInDownLeft";
          this.vanishPlayer = "animate__animated animate__rotateOutUpRight";
          this.animatePlayerStyle = "sackDump";
        } else if (this.char.moveThree.name === "Big Macs For No Reason!") {
          this.appearPlayer = "animate__animated animate__jackInTheBox";
          this.vanishPlayer = "animate__animated animate__rollOut";
          this.animatePlayerStyle = "bigMacs";
        } else if (this.char.moveThree.name === "Re-Up!") {
          this.appearPlayer = "animate__animated animate__fadeIn";
          this.vanishPlayer = "animate__animated animate__fadeOut";
          this.animatePlayerStyle = "reUp";
        } else if (this.char.moveThree.name === "Refill Jug!") {
          this.appearPlayer = "animate__animated animate__fadeIn";
          this.vanishPlayer = "animate__animated animate__zoomOut";
          this.animatePlayerStyle = "refillJug";
        } else if (this.char.moveThree.name === "Gets Paid!") {
          this.appearPlayer = "animate__animated animate__fadeIn";
          this.vanishPlayer = "animate__animated animate__fadeOut";
          this.animatePlayerStyle = "getsPaid";
        } else if (this.char.moveThree.name === "Weixin Zhifu!") {
          this.appearPlayer = "animate__animated animate__fadeIn";
          this.vanishPlayer = "animate__animated animate__zoomOutUp";
          this.animatePlayerStyle = "weixinZhifu";
        }
      } else if (moveType === "alt") {
        this.playerAnimateOnePlayer = true;
        this.animationImage = this.char.moveFour.animationPlayerImage;
        if (this.char.moveFour.name === "Simon Says!") {
          this.appearPlayer = "animate__animated animate__bounceIn";
          this.vanishPlayer = "animate__animated animate__bounceOut";
          this.animatePlayerStyle = "simonSays";
        } else if (this.char.moveFour.name === "Beat Drop!") {
          this.appearPlayer = "animate__animated animate__slideInUp";
          this.vanishPlayer = "animate__animated animate__slideOutDown";
          this.animatePlayerStyle = "beatDrop";
        } else if (this.char.moveFour.name === "Wine Drunk!") {
          this.appearPlayer = "animate__animated animate__jackInTheBox";
          this.vanishPlayer = "animate__animated animate__rollOut";
          this.animatePlayerStyle = "wineDrunk";
        } else if (this.char.moveFour.name === "Step on!") {
          this.appearPlayer = "animate__animated animate__fadeIn";
          this.vanishPlayer = "animate__animated animate__fadeOut";
          this.animatePlayerStyle = "stepOn";
        } else if (this.char.moveFour.name === "Hydrate!") {
          this.appearPlayer = "animate__animated animate__fadeIn";
          this.vanishPlayer = "animate__animated animate__rotateOutUpLeft";
          this.animatePlayerStyle = "hydrate";
        } else if (this.char.moveFour.name === "Gets Lost!") {
          this.appearPlayer = "animate__animated animate__bounceIn";
          this.vanishPlayer = "animate__animated animate__bounceOut";
          this.animatePlayerStyle = "getsLost";
        } else if (this.char.moveFour.name === "Crepe Swirl!") {
          this.appearPlayer = "animate__animated animate__rotateIn";
          this.vanishPlayer = "animate__animated animate__rotateOut";
          this.animatePlayerStyle = "crepeSwirl";
        }
      }
      setTimeout(() => (this.playerAnimateOnePlayer = false), 1000);
      setTimeout(() => (this.playerAnimate = false), 1000);
      setTimeout(() => (this.appearPlayer = ""), 1000);
      setTimeout(() => (this.vanishPlayer = ""), 1000);
      setTimeout(() => (this.animationImage = ""), 1000);
    },
    attackMonsterAnimation(moveType) {
      this.playerAnimate = true;
      if (moveType === "one") {
        if (this.char.moveOneAnimation === "bounce") {
          this.playerBounce = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerBounce = false), 1000);
        } else if (this.char.moveOneAnimation === "flash") {
          this.playerFlash = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerFlash = false), 1000);
        } else if (this.char.moveOneAnimation === "pulse") {
          this.playerPulse = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerPulse = false), 1000);
        } else if (this.char.moveOneAnimation === "rubberband") {
          this.playerRubberBand = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerRubberBand = false), 1000);
        } else if (this.char.moveOneAnimation === "shake-x") {
          this.playerShakeX = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerShakeX = false), 1000);
        } else if (this.char.moveOneAnimation === "shake-y") {
          this.playerShakeY = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerShakeY = false), 1000);
        } else if (this.char.moveOneAnimation === "headshake") {
          this.playerHeadShake = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerHeadShake = false), 1000);
        } else if (this.char.moveOneAnimation === "swing") {
          this.playerSwing = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerSwing = false), 1000);
        } else if (this.char.moveOneAnimation === "tada") {
          this.playerTada = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerTada = false), 1000);
        } else if (this.char.moveOneAnimation === "wobble") {
          this.playerWobble = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerWobble = false), 1000);
        } else if (this.char.moveOneAnimation === "jello") {
          this.playerJello = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerJello = false), 1000);
        } else if (this.char.moveOneAnimation === "heartbeat") {
          this.playerHeartBeat = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerHeartBeat = false), 1000);
        }
      } else if (moveType === "two") {
        if (this.char.moveTwoAnimation === "bounce") {
          this.playerBounce = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerBounce = false), 1000);
        } else if (this.char.moveTwoAnimation === "flash") {
          this.playerFlash = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerFlash = false), 1000);
        } else if (this.char.moveTwoAnimation === "pulse") {
          this.playerPulse = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerPulse = false), 1000);
        } else if (this.char.moveTwoAnimation === "rubberband") {
          this.playerRubberBand = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerHeadRubberBand = false), 1000);
        } else if (this.char.moveTwoAnimation === "shake-x") {
          this.playerShakeX = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerShakeX = false), 1000);
        } else if (this.char.moveTwoAnimation === "shake-y") {
          this.playerShakeY = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerShakeY = false), 1000);
        } else if (this.char.moveTwoAnimation === "headshake") {
          this.playerHeadShake = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerHeadShake = false), 1000);
        } else if (this.char.moveTwoAnimation === "swing") {
          this.playerSwing = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerSwing = false), 1000);
        } else if (this.char.moveTwoAnimation === "tada") {
          this.playerTada = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerTada = false), 1000);
        } else if (this.char.moveTwoAnimation === "wobble") {
          this.playerWobble = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerWobble = false), 1000);
        } else if (this.char.moveTwoAnimation === "jello") {
          this.playerJello = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerJello = false), 1000);
        } else if (this.char.moveTwoAnimation === "heartbeat") {
          this.playerHeartBeat = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerHeartBeat = false), 1000);
        }
      } else if (moveType === "heal") {
        if (this.char.moveThreeAnimation === "bounce") {
          this.playerBounce = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerBounce = false), 1000);
        } else if (this.char.moveThreeAnimation === "flash") {
          this.playerFlash = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerFlash = false), 1000);
        } else if (this.char.moveThreeAnimation === "pulse") {
          this.playerPulse = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerPulse = false), 1000);
        } else if (this.char.moveThreeAnimation === "rubberband") {
          this.playerRubberBand = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerHeadRubberBand = false), 1000);
        } else if (this.char.moveThreeAnimation === "shake-x") {
          this.playerShakeX = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerShakeX = false), 1000);
        } else if (this.char.moveThreeAnimation === "shake-y") {
          this.playerShakeY = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerShakeY = false), 1000);
        } else if (this.char.moveThreeAnimation === "headshake") {
          this.playerHeadShake = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerHeadShake = false), 1000);
        } else if (this.char.moveThreeAnimation === "swing") {
          this.playerSwing = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerSwing = false), 1000);
        } else if (this.char.moveThreeAnimation === "tada") {
          this.playerTada = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerTada = false), 1000);
        } else if (this.char.moveThreeAnimation === "wobble") {
          this.playerWobble = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerWobble = false), 1000);
        } else if (this.char.moveThreeAnimation === "jello") {
          this.playerJello = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerJello = false), 1000);
        } else if (this.char.moveThreeAnimation === "heartbeat") {
          this.playerHeartBeat = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerHeartBeat = false), 1000);
        }
      } else if (moveType === "alt") {
        if (this.char.moveFourAnimation === "bounce") {
          this.playerBounce = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerBounce = false), 1000);
        } else if (this.char.moveFourAnimation === "flash") {
          this.playerFlash = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerFlash = false), 1000);
        } else if (this.char.moveFourAnimation === "pulse") {
          this.playerPulse = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerPulse = false), 1000);
        } else if (this.char.moveFourAnimation === "rubberband") {
          this.playerRubberBand = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerHeadRubberBand = false), 1000);
        } else if (this.char.moveFourAnimation === "shake-x") {
          this.playerShakeX = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerShakeX = false), 1000);
        } else if (this.char.moveFourAnimation === "shake-y") {
          this.playerShakeY = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerShakeY = false), 1000);
        } else if (this.char.moveFourAnimation === "headshake") {
          this.playerHeadShake = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerHeadShake = false), 1000);
        } else if (this.char.moveFourAnimation === "swing") {
          this.playerSwing = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerSwing = false), 1000);
        } else if (this.char.moveFourAnimation === "tada") {
          this.playerTada = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerTada = false), 1000);
        } else if (this.char.moveFourAnimation === "wobble") {
          this.playerWobble = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerWobble = false), 1000);
        } else if (this.char.moveFourAnimation === "jello") {
          this.playerJello = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerJello = false), 1000);
        } else if (this.char.moveFourAnimation === "heartbeat") {
          this.playerHeartBeat = true;
          setTimeout(() => (this.playerAnimate = false), 1000);
          setTimeout(() => (this.playerHeartBeat = false), 1000);
        }
      }
      setTimeout(() => (this.playerAnimateOnePlayer = false), 1000);
      setTimeout(() => (this.playerAnimate = false), 1000);
      setTimeout(() => (this.appearPlayer = ""), 1000);
      setTimeout(() => (this.vanishPlayer = ""), 1000);
      setTimeout(() => (this.animationImage = ""), 1000);
    },
    enemyAnimation(moveType) {
      this.enemyAnimate = true;
      if (moveType === "one") {
        if (this.enemyMoveOneAnimation === "bounce") {
          this.enemyBounce = true;
          setTimeout(() => (this.enemeyAnimate = false), 1000);
          setTimeout(() => (this.enemyBounce = false), 1000);
        } else if (this.enemy.moveOneAnimation === "flash") {
          this.enemyFlash = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyFlash = false), 1000);
        } else if (this.enemy.moveOneAnimation === "pulse") {
          this.enemyPulse = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyPulse = false), 1000);
        } else if (this.enemy.moveOneAnimation === "rubberband") {
          this.enemyRubberBand = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyRubberBand = false), 1000);
        } else if (this.enemy.moveOneAnimation === "shake-x") {
          this.enemyShakeX = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyShakeX = false), 1000);
        } else if (this.enemy.moveOneAnimation === "shake-y") {
          this.enemyShakeY = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyShakeY = false), 1000);
        } else if (this.enemy.moveOneAnimation === "headshake") {
          this.enemyHeadShake = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyHeadShake = false), 1000);
        } else if (this.enemy.moveOneAnimation === "swing") {
          this.enemySwing = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemySwing = false), 1000);
        } else if (this.enemy.moveOneAnimation === "tada") {
          this.enemyTada = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyTada = false), 1000);
        } else if (this.enemy.moveOneAnimation === "wobble") {
          this.enemyWobble = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyWobble = false), 1000);
        } else if (this.enemy.moveOneAnimation === "jello") {
          this.enemyJello = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyJello = false), 1000);
        } else if (this.enemy.moveOneAnimation === "heartbeat") {
          this.enemyHeartBeat = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyHeartBeat = false), 1000);
        }
      } else if (moveType === "two") {
        if (this.enemy.moveTwoAnimation === "bounce") {
          this.enemyBounce = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyBounce = false), 1000);
        } else if (this.enemy.moveTwoAnimation === "flash") {
          this.enemyFlash = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyFlash = false), 1000);
        } else if (this.enemy.moveTwoAnimation === "pulse") {
          this.enemyPulse = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyPulse = false), 1000);
        } else if (this.enemy.moveTwoAnimation === "rubberband") {
          this.enemyRubberBand = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyRubberBand = false), 1000);
        } else if (this.enemy.moveTwoAnimation === "heeadshake") {
          this.enemyHeadShake = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyHeadShake = false), 1000);
        } else if (this.enemy.moveTwoAnimation === "shake-x") {
          this.enemyShakeX = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyShakeX = false), 1000);
        } else if (this.enemy.moveTwoAnimation === "shake-y") {
          this.enemyShakeY = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyShakeY = false), 1000);
        } else if (this.enemy.moveTwoAnimation === "wobble") {
          this.enemyWobble = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyWobble = false), 1000);
        } else if (this.enemy.moveTwoAnimation === "jello") {
          this.enemyJello = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyJello = false), 1000);
        } else if (this.enemy.moveTwoAnimation === "swing") {
          this.enemySwing = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemySwing = false), 1000);
        } else if (this.enemy.moveTwoAnimation === "tada") {
          this.enemyTada = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyFlash = false), 1000);
        } else if (this.enemy.moveTwoAnimation === "heartbeat") {
          this.enemyHeartBeat = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyHeartBeat = false), 1000);
        }
      } else if (moveType === "heal") {
        if (this.enemy.moveThreeAnimation === "bounce") {
          this.enemyBounce = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyBounce = false), 1000);
        } else if (this.enemy.moveThreeAnimation === "pulse") {
          this.enemyPulse = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyPulse = false), 1000);
        } else if (this.enemy.moveThreeAnimation === "rubberband") {
          this.enemyRubberBand = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyRubberBand = false), 1000);
        } else if (this.enemy.moveThreeAnimation === "headshake") {
          this.enemyHeadShake = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyHeadShake = false), 1000);
        } else if (this.enemy.moveThreeAnimation === "shake-x") {
          this.enemyShakeX = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyShakeX = false), 1000);
        } else if (this.enemy.moveThreeAnimation === "shake-y") {
          this.enemyShakeY = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyShakeY = false), 1000);
        } else if (this.enemy.moveThreeAnimation === "swing") {
          this.enemySwing = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemySwing = false), 1000);
        } else if (this.enemy.moveThreeAnimation === "tada") {
          this.enemyTada = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyTada = false), 1000);
        } else if (this.enemy.moveThreeAnimation === "jello") {
          this.enemyJello = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyJello = false), 1000);
        } else if (this.enemy.moveThreeAnimation === "wobble") {
          this.enemyWobble = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyWobble = false), 1000);
        } else if (this.enemy.moveThreeAnimation === "pulse") {
          this.enemyPulse = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyPulse = false), 1000);
        } else if (this.enemy.moveThreeAnimation === "flash") {
          this.enemyFlash = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyFlash = false), 1000);
        } else if (this.enemy.moveThreeAnimation === "heartbeat") {
          this.enemyHeartBeat = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyHeartBeat = false), 1000);
        }
      } else if (moveType === "alt") {
        if (this.enemy.moveFourAnimation === "bounce") {
          this.enemyBounce = true;
          setTimeout(() => (this.enemy.Animate = false), 1000);
          setTimeout(() => (this.enemy.enemyBounce = false), 1000);
        } else if (this.enemy.moveFourAnimation === "pulse") {
          this.enemyPulse = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyPulse = false), 1000);
        } else if (this.enemy.moveFourAnimation === "flash") {
          this.enemyFlash = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyFlash = false), 1000);
        } else if (this.enemy.moveFourAnimation === "rubberband") {
          this.enemyRubberBand = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyRubberBand = false), 1000);
        } else if (this.enemy.moveFourAnimation === "headshake") {
          this.enemyHeadShake = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyHeadShake = false), 1000);
        } else if (this.enemy.moveFourAnimation === "shake-x") {
          this.enemyShakeX = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyShakeX = false), 1000);
        } else if (this.enemy.moveFourAnimation === "shake-y") {
          this.enemyShakeY = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyShakeY = false), 1000);
        } else if (this.enemy.moveFourAnimation === "swing") {
          this.enemySwing = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemySwing = false), 1000);
        } else if (this.enemy.moveFourAnimation === "tada") {
          this.enemyTada = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyTada = false), 1000);
        } else if (this.enemy.moveFourAnimation === "wobble") {
          this.enemyWobble = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyWobble = false), 1000);
        } else if (this.enemy.moveFourAnimation === "jello") {
          this.enemyJello = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyJello = false), 1000);
        } else if (this.enemy.moveFourAnimation === "heartbeat") {
          this.enemyHeartBeat = true;
          setTimeout(() => (this.enemyAnimate = false), 1000);
          setTimeout(() => (this.enemyHeartBeat = false), 1000);
        }
      }
    },
    attackMonsterAdvAniRight(moveType) {
      this.playerAnimateRight = true;
      if (moveType === "one") {
        this.animationImageRight = this.char.moveOne.animationCPUImage;
        if (this.char.moveOne.name === "Poop!") {
          this.appearPlayerRight = "animate__animated animate__slideInDown";
          this.vanishPlayerRight = "animate__animated animate__fadeOut";
          this.animatePlayerStyleRight = "poop-right";
        }
      }
      setTimeout(() => (this.playerAnimateRight = false), 1000);
      setTimeout(() => (this.appearPlayerRight = ""), 1000);
      setTimeout(() => (this.vanishPlayerRight = ""), 1000);
      setTimeout(() => (this.animationImageRight = ""), 1000);
    },
  },
};
</script>

<style>
@import "./assets/styles/main.css";
</style>
