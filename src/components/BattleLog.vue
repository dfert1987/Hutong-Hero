<template>
  <section id="log" class="log-container">
    <h2 class="battle-log">Battle Log</h2>
    <ul>
      <li v-for="logMessage in loggedMessages" :key="logMessage.id">
        <span
          :class="{
            'log--player': logMessage.actionBy === 'player',
            'log--monster': logMessage.actionBy === 'monster',
          }"
          >{{
            logMessage.actionBy === 'player' ? character.name : randomEnemy.name
          }}</span
        >
        <span
          v-if="
            logMessage.actionType === 'heal' && logMessage.actionBy === 'player'
          "
        >
          heals using "{{ character.moveThree.name }}" for
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
          attacks using "{{ character.moveOne.name }}" and deals
          <span class="log--damage"
            >{{ logMessage.actionValue }} hp in damage.</span
          >
        </span>
        <span
          v-else-if="
            logMessage.actionType === 'altAttackStrength' &&
            logMessage.actionBy === 'player'
          "
        >
          attacks using "{{ character.moveFour.name }}" and reduces opponent's
          strength by {{ logMessage.actionValue }}.
        </span>
        <span
          v-else-if="
            logMessage.actionType === 'altAttackSpeed' &&
            logMessage.actionBy === 'player'
          "
        >
          attacks using "{{ character.moveFour.name }}" and reduces opponent's
          speed by {{ logMessage.actionValue }}.
        </span>
        <span
          v-else-if="
            logMessage.actionType === 'altAttackSpecial' &&
            logMessage.actionBy === 'player'
          "
        >
          attacks using "{{ character.moveFour.name }}" and reduces opponent's
          Special Ability by {{ logMessage.actionValue }}.
        </span>
        <span
          v-else-if="
            logMessage.actionType === 'altAttackDefense' &&
            logMessage.actionBy === 'player'
          "
        >
          attacks using "{{ character.moveFour.name }}" and reduces opponent's
          defense by {{ logMessage.actionValue }}
        </span>
        <span
          v-else-if="
            logMessage.actionType === 'altImproveStrength' &&
            logMessage.actionBy === 'player'
          "
        >
          uses "{{ character.moveFour.name }}" and increases their own strength
          by {{ logMessage.actionValue }}
        </span>
        <span
          v-else-if="
            logMessage.actionType === 'altImproveSpeed' &&
            logMessage.actionBy === 'player'
          "
        >
          uses "{{ character.moveFour.name }}" and increases their own speed by
          {{ logMessage.actionValue }}
        </span>
        <span
          v-else-if="
            logMessage.actionType === 'altImproveSpecial' &&
            logMessage.actionBy === 'player'
          "
        >
          uses "{{ character.moveFour.name }}" and increases their own special
          ability by {{ logMessage.actionValue }}
        </span>
        <span
          v-else-if="
            logMessage.actionType === 'altImproveDefense' &&
            logMessage.actionBy === 'player'
          "
        >
          uses "{{ character.moveFour.name }}" and increases their own defense
          by {{ logMessage.actionValue }}
        </span>
        <span
          v-else-if="
            logMessage.actionType === 'attack' &&
            logMessage.actionBy === 'monster'
          "
        >
          attacks using {{ randomEnemy.moveOne.name }} and deals
          <span class="log--damage"
            >{{ logMessage.actionValue }} hp in damage.</span
          >
        </span>
        <span
          v-else-if="
            logMessage.actionType === 'heal' &&
            logMessage.actionBy === 'monster'
          "
        >
          heals using {{ randomEnemy.moveThree.name }} for
          <span class="log--heal"
            >{{ logMessage.actionValue }} hp regeneration.</span
          >
        </span>

        <span
          v-else-if="
            logMessage.actionType === 'altAttackStrength' &&
            logMessage.actionBy === 'monster'
          "
        >
          attacks using "{{ randomEnemy.moveFour.name }}" and reduces opponent's
          strength by {{ logMessage.actionValue }}.
        </span>

        <span
          v-else-if="
            logMessage.actionType === 'altImproveStrength' &&
            logMessage.actionBy === 'monster'
          "
        >
          uses "{{ randomEnemy.moveFour.name }}" and increases own strength by
          {{ logMessage.actionValue }}.
        </span>

        <span
          v-else-if="
            logMessage.actionType === 'altAttackSpeed' &&
            logMessage.actionBy === 'monster'
          "
        >
          attacks using "{{ randomEnemy.moveFour.name }}" and reduces opponent's
          speed by {{ logMessage.actionValue }}.
        </span>

        <span
          v-else-if="
            logMessage.actionType === 'altImproveSpeed' &&
            logMessage.actionBy === 'monster'
          "
        >
          uses "{{ randomEnemy.moveFour.name }}" and improves own speed by
          {{ logMessage.actionValue }}.
        </span>

        <span
          v-else-if="
            logMessage.actionType === 'altAttackSpecial' &&
            logMessage.actionBy === 'monster'
          "
        >
          attacks using "{{ randomEnemy.moveFour.name }}" and reduces opponent's
          special by {{ logMessage.actionValue }}.
        </span>

        <span
          v-else-if="
            logMessage.actionType === 'altImproveSpecial' &&
            logMessage.actionBy === 'monster'
          "
        >
          uses "{{ randomEnemy.moveFour.name }}" and improves own special by
          {{ logMessage.actionValue }}.
        </span>

        <span
          v-else-if="
            logMessage.actionType === 'altAttackDefense' &&
            logMessage.actionBy === 'monster'
          "
        >
          attacks using "{{ randomEnemy.moveFour.name }}" and reduces opponent's
          defense by {{ logMessage.actionValue }}.
        </span>

        <span
          v-else-if="
            logMessage.actionType === 'altImproveDefense' &&
            logMessage.actionBy === 'monster'
          "
        >
          uses "{{ randomEnemy.moveFour.name }}" and improves own defense by
          {{ logMessage.actionValue }}.
        </span>

        <span
          v-else-if="
            logMessage.actionType === 'special' &&
            logMessage.actionBy === 'monster'
          "
        >
          attacks using {{ randomEnemy.moveTwo.name }} and deals
          <span class="log--damage"
            >{{ logMessage.actionValue }} hp in damage.</span
          >
        </span>

        <span v-else>
          attacks using "{{ character.moveTwo.name }}" and deals
          <span class="log--damage"
            >{{ logMessage.actionValue }} hp in damage.</span
          >
        </span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    character: Object,
    randomEnemy: Object,
    loggedMessages: Array,
  },
};
</script>
