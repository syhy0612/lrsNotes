import { defineStore } from 'pinia'
import originalGameModes from '@/data/game-mode-configs.json'

export const useGameModeStore = defineStore('gameModes', {
  state: () => ({
    gameModes: [],
    selectedModeId: null,
    isInitialized: false
  }),
  getters: {
    selectedMode: (state) => state.gameModes.find(mode => mode.id === state.selectedModeId),
    favoriteModes: (state) => state.gameModes.filter(mode => mode.isFavorite)
  },
  actions: {
    updateGameModes(newModes) {
      this.gameModes = newModes
      this.saveToLocalStorage()
    },
    selectMode(modeId) {
      this.selectedModeId = modeId
      this.saveToLocalStorage()
    },
    toggleFavorite(modeId) {
      const mode = this.gameModes.find(m => m.id === modeId)
      if (mode) {
        mode.isFavorite = !mode.isFavorite
        this.saveToLocalStorage()
      }
    },
    resetToOriginal() {
      this.gameModes = JSON.parse(JSON.stringify(originalGameModes))
      this.selectedModeId = null
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem('gameModeConfigs', JSON.stringify({
        gameModes: this.gameModes,
        selectedModeId: this.selectedModeId
      }))
    },
    loadFromLocalStorage() {
      const saved = localStorage.getItem('gameModeConfigs')
      if (saved) {
        const data = JSON.parse(saved)
        this.gameModes = data.gameModes
        this.selectedModeId = data.selectedModeId
      } else {
        this.resetToOriginal()
      }
    },
    async initializeStore() {
      try {
        this.loadFromLocalStorage()
        if (this.gameModes.length === 0) {
          this.resetToOriginal()
        }
        this.isInitialized = true
      } catch (error) {
        console.error('Failed to initialize store:', error)
        this.resetToOriginal()
        this.isInitialized = true
      }
    }
  }
})