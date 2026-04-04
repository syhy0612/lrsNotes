import {ref} from 'vue'

function createBackgroundState(key, defaultBg) {
    const initialVal = localStorage.getItem(key)
    const backgroundImage = ref(initialVal !== null ? (initialVal === 'white' ? null : initialVal) : defaultBg)

    const setBackground = (dataUrl) => {
        backgroundImage.value = dataUrl === 'white' ? null : dataUrl
        if (dataUrl) {
            localStorage.setItem(key, dataUrl)
        } else {
            localStorage.setItem(key, 'white')
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
    const setDefaultStarry = () => setBackground('/bg.webp')

    return {backgroundImage, setBackground, uploadBackground, clearBackground, setDefaultStarry}
}

const wolfState = createBackgroundState('customBackground', null)
const spyState = createBackgroundState('spyBackground', null) // default pure color

/**
 * 自定义背景图管理
 * 按模式隔离背景图
 * @param {string} mode 'wolf' 或 'spy'
 */
export function useBackground(mode = 'wolf') {
    return mode === 'spy' ? spyState : wolfState
}

