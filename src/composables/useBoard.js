import {ref, computed, watch, onMounted, onUnmounted} from 'vue'
import handUpImage from '@/assets/hand-up.svg?url'
import handDownImage from '@/assets/hand-down.svg?url'
import handOffImage from '@/assets/hand-off.svg?url'
import {ElMessage, ElMessageBox} from 'element-plus'
import {useGameModeStore} from '@/stores/gameModeStore'
import {storeToRefs} from 'pinia'

/**
 * 共享的笔记面板逻辑
 * 被 board.vue 和 board-full.vue 共同使用
 */
export function useBoard() {
    const store = useGameModeStore()
    const {selectedMode} = storeToRefs(store)

    // 自记信息
    const remarks = ref('')

    // 发言信息
    const chatRecords = ref(
        Object.fromEntries(
            Array.from({length: 12}, (_, i) => {
                const playerKey = `player${String(i + 1).padStart(2, '0')}`
                return [playerKey, {
                    election: 3,   // 上警信息 1-警上刚手, 2-警上放手, 3-警下
                    flag: true,    // 是否存在（非12人场预留）
                    message: '',   // 发言信息
                    sign: '',      // 标记信息 如 '狼', '民'
                    status: 1,     // 存活状态 1-存活, 2-放逐出局, 3-其他死亡
                }]
            })
        )
    )

    // 导出相关
    const showExportDialog = ref(false)
    const exportedInfo = ref('')

    // 版型设置
    const showGameSettings = ref(false)
    const showSettings = ref(false)
    const gameSettingsRef = ref(null)

    // 响应式对话框宽度
    const windowWidth = ref(window.innerWidth)
    const dialogWidth = computed(() => windowWidth.value >= 768 ? '50%' : '80%')

    const handleResize = () => {
        windowWidth.value = window.innerWidth
    }

    // 快捷短语选项
    const options = computed(() => selectedMode.value?.phrases || [])

    // 从 localStorage 加载数据
    onMounted(() => {
        const savedRemarks = localStorage.getItem('remarks')
        if (savedRemarks) {
            remarks.value = savedRemarks
        }

        const savedChatRecords = localStorage.getItem('chatRecords')
        if (savedChatRecords) {
            Object.assign(chatRecords.value, JSON.parse(savedChatRecords))
        }

        window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize)
    })

    // 自动保存到 localStorage
    watch(remarks, (newValue) => {
        localStorage.setItem('remarks', newValue)
    }, {deep: true})

    watch(chatRecords, (newValue) => {
        localStorage.setItem('chatRecords', JSON.stringify(newValue))
    }, {deep: true})

    // 处理失焦修剪（修复：key 为 null 时不再报错）
    const handleBlur = (key) => {
        if (key && chatRecords.value[key]) {
            chatRecords.value[key].message = chatRecords.value[key].message.trim()
        }
        remarks.value = remarks.value.trim()
    }

    // 角色更新
    const updatePlayerRole = (playerKey, newRole) => {
        chatRecords.value[playerKey].sign = newRole
    }

    // 上警状态图标
    function getElectionImage(election) {
        switch (election) {
            case 1: return handUpImage
            case 2: return handDownImage
            case 3: return handOffImage
            default: return handOffImage
        }
    }

    function getElectionAlt(election) {
        switch (election) {
            case 1: return '警上刚手'
            case 2: return '警上放手'
            case 3: return '警下'
            default: return '警下'
        }
    }

    function toggleElection(player) {
        player.election = (player.election % 3) + 1
    }

    // 重置自记信息
    const resetRemarks = () => {
        ElMessageBox.confirm('确定要重置自记信息吗？', '重置自记信息', {
            confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', center: true,
        }).then(() => {
            remarks.value = ''
            ElMessage({type: 'success', message: '自记信息已重置', duration: 500})
        }).catch(() => {
            ElMessage({type: 'info', message: '已取消重置', duration: 500})
        })
    }

    // 重置发言信息
    const resetTalks = () => {
        ElMessageBox.confirm('确定要重置所有玩家的发言内容吗？', '重置发言信息', {
            confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', center: true,
        }).then(() => {
            Object.keys(chatRecords.value).forEach(key => {
                chatRecords.value[key].message = ''
                chatRecords.value[key].sign = ''
                chatRecords.value[key].election = 3
            })
            ElMessage({type: 'success', message: '所有发言信息已重置', duration: 500})
        }).catch(() => {
            ElMessage({type: 'info', message: '已取消重置', duration: 500})
        })
    }

    // 一键上警
    const handUp = () => {
        ElMessageBox.confirm('确定要使所有玩家更新为上警举手状态吗？', '一键上警', {
            confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', center: true,
        }).then(() => {
            Object.keys(chatRecords.value).forEach(key => {
                chatRecords.value[key].election = 1
            })
            ElMessage({type: 'success', message: '所有玩家已上警', duration: 500})
        }).catch(() => {
            ElMessage({type: 'info', message: '已取消更新', duration: 500})
        })
    }

    // 导出笔记信息
    const exportInfo = () => {
        let info = `版型：${selectedMode.value ? selectedMode.value.name : '未选择'}\n`
        info += `♫♪♫♪♫♪♫♪♫♪♫♪♫♪\n`
        info += `自记信息：\n${remarks.value.trim()}\n`
        info += `♫♪♫♪♫♪♫♪♫♪♫♪♫♪\n`

        const upPlayers = Object.entries(chatRecords.value)
            .filter(([_, record]) => record.election === 1 || record.election === 2)
            .map(([key]) => key.slice(-2))

        const downPlayers = Object.entries(chatRecords.value)
            .filter(([_, record]) => record.election === 3)
            .map(([key]) => key.slice(-2))

        if (upPlayers.length > 0) {
            if (upPlayers.length === 12) {
                info += `（全员上警）\n`
            } else {
                info += `警上：[${upPlayers.join(',')}]\n`
                info += `警下：[${downPlayers.join(',')}]\n`
            }
            info += `♫♪♫♪♫♪♫♪♫♪♫♪♫♪\n`
        }

        info += `发言信息：\n`
        const allDown = downPlayers.length === 12

        Object.entries(chatRecords.value).forEach(([key, record]) => {
            const playerNumber = key.slice(-2)
            let electionSymbol = ''
            if (!allDown) {
                electionSymbol = (record.election === 1 || record.election === 2) ? '*' : '_'
            }
            const messageLines = record.message.split('\n')
            if (messageLines.length > 0) {
                info += `[${playerNumber}]${electionSymbol} ${messageLines[0]}\n`
                for (let i = 1; i < messageLines.length; i++) {
                    info += `   \t ${messageLines[i]}\n`
                }
            }
        })

        exportedInfo.value = info.trim()
        showExportDialog.value = true
    }

    // 复制导出信息
    const copyExportedInfo = () => {
        navigator.clipboard.writeText(exportedInfo.value).then(() => {
            ElMessage({message: '信息已复制到剪贴板', type: 'success', duration: 2000})
            showExportDialog.value = false
        }).catch(() => {
            ElMessage({message: '复制失败，请手动复制', type: 'error', duration: 2000})
        })
    }

    // 设置对话框
    const openSettings = () => {
        showGameSettings.value = true
    }

    const handleSettingsClose = (done) => {
        if (gameSettingsRef.value) {
            gameSettingsRef.value.handleClose((shouldClose) => {
                if (shouldClose) {
                    showSettings.value = false
                    done()
                }
            })
        } else {
            done()
        }
    }

    const updateConfig = (newConfig) => {
        store.updateGameModes(newConfig)
    }

    return {
        store, selectedMode, remarks, chatRecords,
        showExportDialog, exportedInfo, showGameSettings,
        showSettings, gameSettingsRef, dialogWidth, options,
        handleBlur, getElectionImage, getElectionAlt, toggleElection,
        resetRemarks, resetTalks, handUp, exportInfo, copyExportedInfo,
        handleSettingsClose, openSettings, updatePlayerRole, updateConfig
    }
}
