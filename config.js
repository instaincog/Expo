// Yahan Vercel ka base URL dalen bina trailing slash ke
const API_BASE = "https://photo-blush-five.vercel.app"; 

const firebaseConfig = {
    apiKey: "AIzaSyDq3jnK4Y3W0T4H1m2HXRFRLpLQc8hiYlQ",
    authDomain: "taitan-bot-hosting.firebaseapp.com",
    databaseURL: "https://taitan-bot-hosting-default-rtdb.firebaseio.com",
    projectId: "taitan-bot-hosting",
    storageBucket: "taitan-bot-hosting.firebasestorage.app",
    messagingSenderId: "939903690873",
    appId: "1:939903690873:android:ae3fe159c7dd73abea8ca8"
};

// Common UI Styles
const COMMON_CSS = `
    :root { --primary: #7c3aed; --bg: #f1f5f9; --surface: #ffffff; --text: #0f172a; --text-sub: #64748b; --danger: #ef4444; --border: #e2e8f0; }
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; -webkit-tap-highlight-color: transparent; }
    body { background-color: var(--bg); color: var(--text); height: 100vh; overflow: hidden; display: flex; flex-direction: column; }
    
    .app-header { background: var(--surface); padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); box-shadow: 0 2px 4px rgba(0,0,0,0.02); z-index: 50; }
    .logo { font-size: 1.4rem; font-weight: 800; color: var(--text); display: flex; align-items: center; gap: 8px; }
    .logo i { color: var(--primary); }
    
    .warning-strip { background: #fff7ed; border-bottom: 1px solid #fed7aa; color: #9a3412; font-size: 0.8rem; padding: 8px 20px; text-align: center; font-weight: 500; display: flex; align-items: center; justify-content: center; gap: 6px; }

    .scroll-area { flex: 1; overflow-y: auto; padding: 20px; scroll-behavior: smooth; }
    .container { max-width: 600px; margin: 0 auto; padding-bottom: 40px; }

    .card { background: var(--surface); border-radius: 20px; padding: 20px; margin-bottom: 20px; border: 1px solid var(--border); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
    .card-title { font-weight: 700; font-size: 1.1rem; }

    .input-box { position: relative; width: 100%; margin-bottom: 15px; }
    .input-box i { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: var(--text-sub); font-size: 1.2rem; }
    input { width: 100%; padding: 14px 14px 14px 45px; border-radius: 14px; border: 2px solid var(--bg); background: var(--bg); font-size: 0.95rem; outline: none; transition: 0.2s; }
    input:focus { background: var(--surface); border-color: var(--primary); }

    .btn { width: 100%; padding: 14px; border-radius: 14px; border: none; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.95rem; transition: 0.2s; }
    .btn-primary { background: var(--primary); color: white; box-shadow: 0 4px 12px rgba(124, 58, 237, 0.2); }
    .btn-primary:active { transform: scale(0.98); }
    .btn-icon { background: transparent; padding: 8px; font-size: 1.5rem; color: var(--text); width: auto; }
    
    .link-card { background: var(--surface); border-radius: 16px; padding: 16px; margin-bottom: 12px; border: 1px solid var(--border); }
    .link-top { display: flex; justify-content: space-between; margin-bottom: 10px; }
    .badge { background: #ede9fe; color: var(--primary); padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; }
    .url-text { font-family: monospace; color: var(--text-sub); font-size: 0.85rem; word-break: break-all; margin-bottom: 12px; display: block; }
    
    .meta-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
    .meta-tag { font-size: 0.75rem; padding: 4px 8px; background: #f8fafc; border: 1px solid var(--border); border-radius: 6px; color: var(--text-sub); display: flex; align-items: center; gap: 4px; }

    .actions { display: flex; gap: 8px; border-top: 1px solid var(--bg); padding-top: 12px; }
    .act-btn { flex: 1; padding: 10px; border-radius: 10px; border: none; font-size: 1.2rem; cursor: pointer; transition: 0.2s; }
    .act-edit { background: #e0f2fe; color: #0284c7; }
    .act-copy { background: #f1f5f9; color: var(--text); }
    .act-del { background: #fee2e2; color: #dc2626; }

    .gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-bottom: 12px; }
    .img-box { aspect-ratio: 1; position: relative; background: #000; border-radius: 8px; overflow: hidden; }
    .img-box img { width: 100%; height: 100%; object-fit: cover; }
    .img-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.4); opacity: 0; display: flex; align-items: center; justify-content: center; gap: 10px; transition: 0.2s; }
    .img-box:hover .img-overlay { opacity: 1; }
    .ovl-icon { color: white; font-size: 1.2rem; cursor: pointer; }

    .sidebar { position: fixed; top: 0; right: -280px; width: 280px; height: 100%; background: var(--surface); box-shadow: -5px 0 25px rgba(0,0,0,0.1); z-index: 100; transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1); padding: 25px; display: flex; flex-direction: column; }
    .sidebar.open { right: 0; }
    .menu-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
    .menu-item { display: flex; align-items: center; gap: 15px; padding: 15px; color: var(--text); text-decoration: none; font-weight: 500; border-radius: 12px; margin-bottom: 5px; }
    .menu-item:hover { background: var(--bg); }
    .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 90; display: none; backdrop-filter: blur(2px); }

    .footer { text-align: center; padding: 30px 20px; color: var(--text-sub); font-size: 0.8rem; border-top: 1px solid var(--border); margin-top: 20px; background: var(--surface); }
    .footer strong { color: var(--text); display: block; margin-bottom: 5px; font-size: 0.9rem; }

    .modal-wrap { position: fixed; inset: 0; z-index: 200; display: flex; align-items: center; justify-content: center; pointer-events: none; opacity: 0; transition: 0.2s; }
    .modal-wrap.active { pointer-events: auto; opacity: 1; }
    .modal-card { background: var(--surface); width: 90%; max-width: 320px; padding: 25px; border-radius: 24px; text-align: center; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); transform: scale(0.9); transition: 0.2s; }
    .modal-wrap.active .modal-card { transform: scale(1); }
    .m-btns { display: flex; gap: 10px; margin-top: 20px; }
    .m-btn { flex: 1; padding: 12px; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; }

    .toast { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(20px); background: #1e293b; color: white; padding: 12px 24px; border-radius: 50px; font-size: 0.9rem; opacity: 0; transition: 0.3s; pointer-events: none; z-index: 300; display: flex; align-items: center; gap: 8px; box-shadow: 0 10px 15px rgba(0,0,0,0.2); }
    .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
    .loader { width: 40px; height: 40px; border: 4px solid var(--bg); border-top-color: var(--primary); border-radius: 50%; animation: spin 1s linear infinite; margin: 40px auto; }
    @keyframes spin { to { transform: rotate(360deg); } }
`;

async function getToken() {
    return await firebase.auth().currentUser.getIdToken(true);
}