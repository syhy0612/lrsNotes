import AV from 'leancloud-storage';

const appId = import.meta.env.VITE_LEANCLOUD_APP_ID;
const appKey = import.meta.env.VITE_LEANCLOUD_APP_KEY;
const serverURL = import.meta.env.VITE_LEANCLOUD_SERVER_URL;

if (!appId || !appKey || !serverURL) {
    throw new Error('缺少LeanCloud应用ID、应用密钥或服务器URL');
}

AV.init({
    appId,
    appKey,
    serverURL,
});

export default AV;
