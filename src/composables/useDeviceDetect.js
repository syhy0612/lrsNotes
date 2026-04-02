import {ref, onMounted, onUnmounted} from 'vue'

/**
 * 设备检测 composable
 * 被 main.vue 和 full.vue 共同使用
 */
export function useDeviceDetect() {
    const isPc = ref(true)
    const isWechatBrowser = ref(false)

    const checkIsPc = () => {
        isPc.value = window.innerWidth > 768
    }

    const checkWechatBrowser = () => {
        const ua = navigator.userAgent.toLowerCase()
        return /micromessenger/.test(ua) && /mobile/.test(ua)
    }

    onMounted(() => {
        isWechatBrowser.value = checkWechatBrowser()
        checkIsPc()
        window.addEventListener('resize', checkIsPc)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', checkIsPc)
    })

    return {isPc, isWechatBrowser}
}
