
<template>
  <section id="log" class="container">
    <h2 class="battle-log">Battle Log</h2>
    <ul>
      <li v-for="logMessage in loggedMessages" :key="logMessage.id">
        <span
          :class="{
            'log--player': logMessage.actionBy === 'player',
            'log--monster': logMessage.actionBy === 'monster',
          }"
          >{{
            logMessage.actionBy === 'player' ? character.name : 'Beijing-Bikini'
          }}</span
        >
        <span v-if="logMessage.actionType === 'heal'">
          heals himself using "{{ character.heal }}" for
          <span class="log--heal">
            {{ logMessage.actionValue }} hp regeneration.</span
          >
        </span>
        <span
          v-else-if="
            logMessage.actionType === 'attack' &&
            logMessage.actionBy === 'player'
          "
        >
          attacks using "{{ character.attack }}" and deals
          <span class="log--damage"
            >{{ logMessage.actionValue }} hp in damage.</span
          >
        </span>
        <span
          v-else-if="
            logMessage.actionType === 'attack' &&
            logMessage.actionBy === 'monster'
          "
        >
          attacks using {{ randomEnemy.attack }} and deals
          <span class="log--damage"
            >{{ logMessage.actionValue }} hp in damage.</span
          >
        </span>
        <span
          v-else-if="
            logMessage.actionType === 'special' &&
            logMessage.actionBy === 'monster'
          "
        >
          attacks using {{ randomEnemy.special }} and deals
          <span class="log--damage"
            >{{ logMessage.actionValue }} hp in damage.</span
          >
        </span>
        <span v-else>
          attacks using "{{ randomEnemy.special }}" and deals
          <span class="log--damage"
            >{{ logMessage.actionValue }} hp in damage.</span
          >
        </span>
      </li>
    </ul>
  </section>
</template>

<script>
console.log('enemy')

export default {
  props: {
      character: Object,
      randomEnemy: Object,
      loggedMessages: Array,
  }

};
</script>

