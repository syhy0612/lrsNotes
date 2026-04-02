import {ref} from 'vue'

const BG_KEY = 'customBackground'
const DEFAULT_BG = '/bg.webp'

// The initial logic: if not set in localStorage, use default image. If they deliberately chose white, we save 'white' in localStorage.
const initialVal = localStorage.getItem(BG_KEY)
const backgroundImage = ref(initialVal !== null ? (initialVal === 'white' ? null : initialVal) : DEFAULT_BG)

/**
 * 自定义背景图管理
 * 模块级别共享状态，所有组件实例共用同一份数据
 */
export function useBackground() {
    const setBackground = (dataUrl) => {
        backgroundImage.value = dataUrl === 'white' ? null : dataUrl
        if (dataUrl) {
            localStorage.setItem(BG_KEY, dataUrl)
        } else {
            // Because null means we haven't selected anything, we probably want to save 'white' to insist pure white rather than falling back to default image next load.
            // But dataUrl is null. Let's just set 'white' to represent blank.
            localStorage.setItem(BG_KEY, 'white')
            backgroundImage.value = null
        }
    }

    const uploadBackground = () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = (e) => {
            const file = e.target.files[0]
            if (!file) return
            const reader = new FileReader()
            reader.onload = (ev) => setBackground(ev.target.result)
            reader.readAsDataURL(file)
        }
        input.click()
    }

    const clearBackground = () => setBackground(null) // This becomes "Pure White"
    const setDefaultStarry = () => setBackground(DEFAULT_BG)

    return {backgroundImage, setBackground, uploadBackground, clearBackground, setDefaultStarry}
}
