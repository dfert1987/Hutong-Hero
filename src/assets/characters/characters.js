const characters = [
  {
    name: "???",
    class: "???",
    hp: 100,
    startingHP: 100,
    strength: 0,
    defense: 0,
    speed: 0,
    specialAttack: 0,
    startingStrength: 0,
    startingDefense: 0,
    startingSpeed: 0,
    startingSpecialAttack: 0,
    moveOneAnimation: "pulse",
    moveTwoAnimation: "pulse",
    moveThreeAnimation: "pulse",
    moveFourAnimation: "pulse",
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
    },
    image: require("../images/question.jpeg"),
  },
  {
    name: "Kindergarten Teacher",
    class: "LaoWai",
    hp: 90,
    startingHP: 90,
    strength: 75,
    defense: 60,
    speed: 70,
    specialAttack: 60,
    startingStrength: 75,
    startingDefense: 60,
    startingSpeed: 70,
    startingSpecialAttack: 60,
    moveOne: {
      name: "Bu Yao!",
      style: "Basic",
      type: "attack",
      high: 10,
      low: 5,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    moveTwo: {
      name: "Hang Man!",
      style: "Special",
      type: "attack",
      high: 23,
      low: 10,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 5,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    moveThree: {
      name: "Drink Beer!",
      style: "Basic",
      type: "heal",
      high: 20,
      low: 8,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    moveFour: {
      name: "Simon Says!",
      style: "Special",
      type: "attack",
      high: 0,
      low: 0,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 12,
    },
    image: require("../images/laowai.png"),
  },
  {
    name: "Dada DJ",
    class: "LaoWai",
    hp: 80,
    startingHP: 80,
    strength: 70,
    defense: 70,
    speed: 60,
    specialAttack: 75,
    startingStrength: 70,
    startingDefense: 70,
    startingSpeed: 60,
    startingSpecialAttack: 75,
    moveOne: {
      name: "Bathrom Bump!",
      style: "Basic",
      type: "attack",
      high: 12,
      low: 5,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    moveTwo: {
      name: "Drum n Bass!",
      style: "Special",
      type: "attack",
      high: 25,
      low: 18,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    moveThree: {
      name: "Sack Dump!",
      style: "Basic",
      type: "heal",
      high: 22,
      low: 10,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    moveFour: {
      name: "Beat Drop!",
      style: "Special",
      type: "attack",
      high: 0,
      low: 0,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 10,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    image: require("../images/dada.jpeg"),
  },
  {
    name: "Wide Body",
    class: "LaoWai",
    hp: 90,
    startingHP: 90,
    strength: 75,
    defense: 40,
    speed: 30,
    specialAttack: 80,
    startingStrength: 75,
    startingDefense: 40,
    startingSpeed: 30,
    startingSpecialAttack: 80,
    moveOne: {
      name: "Poop!",
      style: "Basic",
      type: "attack",
      high: 9,
      low: 8,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    moveTwo: {
      name: "Spelling Snakes!",
      style: "Special",
      type: "attack",
      high: 23,
      low: 19,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    moveThree: {
      name: "Big Macs for No Reason!",
      style: "Basic",
      type: "heal",
      high: 22,
      low: 10,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    moveFour: {
      name: "Wine Drunk!",
      style: "Basic",
      type: "attack",
      high: 0,
      low: 0,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 10,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    image: require("../images/wb.png"),
  },
  {
    name: "Nigerian Bro",
    class: "LaoWai",
    hp: 85,
    startingHP: 85,
    strength: 80,
    defense: 30,
    speed: 60,
    specialAttack: 80,
    startingStrength: 80,
    startingDefense: 30,
    startingSpeed: 60,
    startingSpecialAttack: 80,
    moveOne: {
      name: "Sup Bro!",
      style: "Basic",
      type: "attack",
      high: 8,
      low: 8,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    moveTwo: {
      name: "You Good?",
      style: "Special",
      type: "attack",
      high: 18,
      low: 14,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    moveThree: {
      name: "Re-up!",
      style: "Basic",
      type: "heal",
      high: 20,
      low: 8,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    moveFour: {
      name: "Step on!",
      style: "Special",
      type: "attack",
      high: 0,
      low: 0,
      strengthDecrease: 10,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },

    image: require("../images/richy.jpeg"),
  },
  {
    name: "Water Man",
    class: "Driver",
    hp: 75,
    startingHP: 75,
    strength: 90,
    defense: 30,
    speed: 95,
    specialAttack: 30,
    startingStrength: 90,
    startingDefense: 30,
    startingSpeed: 95,
    startingSpecialAttack: 30,
    moveOne: {
      name: "Wreckless Driving!",
      style: "Basic",
      type: "attack",
      high: 12,
      low: 5,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    moveTwo: {
      name: "Jug Bash!",
      style: "Basic",
      type: "attack",
      high: 16,
      low: 15,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    moveThree: {
      name: "Refill Jug!",
      style: "Basic",
      type: "heal",
      high: 20,
      low: 8,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    moveFour: {
      name: "Hydrate",
      style: "Basic",
      type: "attack",
      high: 0,
      low: 0,
      strengthDecrease: 0,
      strengthIncrease: 10,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    image: require("../images/water.jpeg"),
  },
  {
    name: "Jinshisong",
    class: "Driver",
    hp: 75,
    startingHP: 75,
    strength: 70,
    defense: 30,
    speed: 95,
    specialAttack: 30,
    startingStrength: 70,
    startingDefense: 30,
    startingSpeed: 95,
    startingSpecialAttack: 30,
    moveOne: {
      name: "Delivery Fee!",
      style: "Basic",
      type: "attack",
      high: 12,
      low: 6,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    moveTwo: {
      name: "Wrong Order!",
      style: "Basic",
      type: "attack",
      high: 22,
      low: 15,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    moveThree: {
      name: "Gets Paid!",
      style: "Basic",
      type: "heal",
      high: 23,
      low: 10,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    moveFour: {
      name: "Gets Lost!",
      style: "Special",
      type: "attack",
      high: 0,
      low: 0,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 15,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    image: require("../images/jinshisong.jpeg"),
  },
  {
    name: "JianBing Queen",
    class: "Vendor",
    hp: 90,
    startingHP: 90,
    strength: 50,
    defense: 60,
    speed: 60,
    specialAttack: 100,
    startingStrength: 50,
    startingDefense: 60,
    startingSpeed: 60,
    startingSpecialAttack: 100,
    moveOne: {
      name: "Scallions!",
      style: "Basic",
      type: "attack",
      high: 8,
      low: 6,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    moveTwo: {
      name: "La Jiao!",
      style: "Special",
      type: "attack",
      high: 26,
      low: 16,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    moveThree: {
      name: "Weixin Zhifu!",
      style: "Basic",
      type: "heal",
      high: 20,
      low: 8,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 0,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    moveFour: {
      name: "Crepe Swirl!",
      style: "Special",
      type: "attack",
      high: 0,
      low: 0,
      strengthDecrease: 0,
      strengthIncrease: 0,
      speedIncrease: 0,
      speedDecrease: 0,
      specialAttackIncrease: 8,
      specialAttackDecrease: 0,
      defenseIncrease: 0,
      defenseDecrease: 0,
    },
    image: require("../images/jian.jpg"),
  },
];

export default characters;
