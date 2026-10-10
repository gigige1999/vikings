import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, type Plugin} from 'vite';

// Keep large, unreferenced source artwork in public/ out of the production bundle
function pruneUnusedPublicPlugin(): Plugin {
  const unused = ['images/chapters', 'images/milestones'];
  return {
    name: 'prune-unused-public',
    apply: 'build',
    closeBundle() {
      for (const dir of unused) {
        fs.rmSync(path.resolve(__dirname, 'dist', dir), { recursive: true, force: true });
      }
    },
  };
}

// Plugin to suppress WebSocket errors in embedded WebView
function suppressHmrPlugin(): Plugin {
  return {
    name: 'suppress-hmr-websocket',
    enforce: 'pre',
    transformIndexHtml(html) {
      const suppressScript = `<script>
(function(){
  var O=window.WebSocket;
  window.WebSocket=function(u,p){
    try{ var ws=new O(u,p); ws.onerror=function(){}; return ws; }
    catch(e){ return {send:function(){},close:function(){},addEventListener:function(){},removeEventListener:function(){},dispatchEvent:function(){return true},readyState:3,CONNECTING:0,OPEN:1,CLOSING:2,CLOSED:3,binaryType:'blob',bufferedAmount:0,extensions:'',protocol:'',url:'',onopen:null,onclose:null,onmessage:null,onerror:null}; }
  };
  window.WebSocket.prototype=O.prototype;
  window.WebSocket.CONNECTING=0;window.WebSocket.OPEN=1;window.WebSocket.CLOSING=2;window.WebSocket.CLOSED=3;
})();
</script>`;
      return html.replace('<head>', '<head>' + suppressScript);
    },
  };
}

export default defineConfig(() => {
  return {
    // Deploy base path: "/" by default, e.g. BASE_PATH=/vikings/ for GitHub Pages project sites
    base: process.env.BASE_PATH || '/',
    plugins: [suppressHmrPlugin(), react(), tailwindcss(), pruneUnusedPublicPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: false,
    },
  };
});
