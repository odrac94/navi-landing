# Captura cada skin del demo (skins/demo.html?skin=<id>) como imagen fija para
# las tarjetas de atrás del mazo del hero. La tarjeta del frente es el demo en
# vivo; las de atrás son estas capturas, para no cargar ocho iframes.
#
# Uso (después de `pnpm run sync-skins`):  python scripts/capture-skins.py
# Requiere Chrome y Pillow (pip install pillow). Escribe assets/skins/<id>.webp
import http.server
import shutil
import subprocess
import sys
import tempfile
import threading
from functools import partial
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets' / 'skins'
SKINS = ['navi', 'crt-amber', 'y2k', 'eink', 'ascii', 'arcade', 'hifi-80s', 'mecha']
# Tamaño del PiP del hero en escritorio (index.html: lg:max-w-[440px] lg:h-[580px])
W, H, SCALE = 440, 580, 2
CHROME = [
    r'C:\Program Files\Google\Chrome\Application\chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    shutil.which('google-chrome') or '',
    shutil.which('chromium') or '',
]


class Handler(http.server.SimpleHTTPRequestHandler):
    # Chrome headless no baja de ~500px de ancho: el demo se monta en un
    # iframe de W×H dentro de una página propia y luego se recorta.
    def do_GET(self):
        if self.path.startswith('/__capture'):
            skin = self.path.split('skin=')[-1]
            body = (
                '<!doctype html><style>body{margin:0;background:#000}'
                f'iframe{{display:block;width:{W}px;height:{H}px;border:0}}</style>'
                f'<iframe src="/skins/demo.html?skin={skin}"></iframe>'
            ).encode()
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()

    def log_message(self, *args):
        pass


def main():
    chrome = next((c for c in CHROME if c and Path(c).exists()), None)
    if not chrome:
        sys.exit('No se encontró Chrome.')

    server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), partial(Handler, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    port = server.server_address[1]
    OUT.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory() as tmp:
        for skin in SKINS:
            png = Path(tmp) / f'{skin}.png'
            subprocess.run([
                chrome, '--headless=new', '--disable-gpu', '--hide-scrollbars',
                f'--force-device-scale-factor={SCALE}', '--window-size=600,700',
                '--virtual-time-budget=4000', f'--user-data-dir={tmp}/profile',
                f'--screenshot={png}', f'http://127.0.0.1:{port}/__capture?skin={skin}',
            ], check=True, capture_output=True)
            img = Image.open(png).crop((0, 0, W * SCALE, H * SCALE)).convert('RGB')
            dest = OUT / f'{skin}.webp'
            img.save(dest, 'WEBP', quality=72, method=6)
            print(f'{dest.relative_to(ROOT)}  {dest.stat().st_size // 1024} KB')

    server.shutdown()


if __name__ == '__main__':
    main()
