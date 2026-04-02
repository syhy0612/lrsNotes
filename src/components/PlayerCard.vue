<template>
  <div class="player-card" :class="{'player-card--compact': compact}">
    <div class="player-left">
      <img :src="getElectionImage(player.election)" :alt="getElectionAlt(player.election)"
           :title="getElectionAlt(player.election)" @click="toggleElection(player)" class="election-icon">
      <div class="badge">{{ playerNumber }}</div>
      <RoleSelector :currentRole="player.sign" @update:role="(r) => $emit('update:role', r)" :placement="placement"/>
    </div>
    <div class="player-right">
      <el-mention v-model="player.message" type="textarea" :rows="rows"
                  :placeholder="`${parseInt(playerNumber)}号发言`"
                  :prefix="['A','C']" :options="options" @blur="$emit('blur')"/>
    </div>
  </div>
</template>

<script setup>
import RoleSelector from './roleSelector.vue'
import {useBoard} from '@/composables/useBoard'

defineProps({
  player: {type: Object, required: true},
  playerNumber: {type: String, required: true},
  options: {type: Array, default: () => []},
  rows: {type: Number, default: 3},
  placement: {type: String, default: 'right'},
  compact: {type: Boolean, default: false}
})

defineEmits(['update:role', 'blur'])
const {getElectionImage, getElectionAlt, toggleElection} = useBoard()
</script>

<style scoped lang="scss">
.player-card {
  margin-bottom: 10px;
  display: flex;
  &--compact { margin-bottom: 4px; }
}

.player-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 34px;
  margin-right: 8px;
  flex-shrink: 0;
}

.election-icon {
  cursor: pointer;
  width: 16px; height: 16px;
  margin-bottom: 3px;
  opacity: 0.5;
  transition: var(--transition);
  &:hover { opacity: 1; transform: scale(1.2); }
}

.badge {
  font-size: 11px;
  font-weight: 600;
  margin: 1px 0 3px;
  width: 20px; height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  background: var(--bg-input);
  border: 1px solid var(--border-color);
}

.player-right {
  flex-grow: 1;

  :deep(.el-textarea__inner) {
    resize: none !important;
    border-radius: var(--radius-sm);
    font-size: 13px;
    background: var(--bg-input);
    border-color: var(--border-color);
    transition: var(--transition);
    &:focus { border-color: #6e6e73; box-shadow: 0 0 0 2px rgba(0,0,0,0.06); }
  }
}

@media (max-width: 768px) {
  .player-left { width: 28px; margin-right: 5px; }
  .election-icon { width: 13px; height: 13px; }
  .badge { font-size: 9px; width: 16px; height: 16px; }
  .player-right :deep(.el-textarea__inner) { font-size: 11px; padding: 4px 6px; }
}
</style>
