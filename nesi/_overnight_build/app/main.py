import os
import sys
import threading
import socket
import http.server
import functools

import webview


def app_root():
    if getattr(sys, "frozen", False):
        return sys._MEIPASS
    return os.path.dirname(os.path.abspath(__file__))


def free_port():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(("127.0.0.1", 0))
    port = s.getsockname()[1]
    s.close()
    return port


def serve(root, port):
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=root)
    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", port), handler)
    httpd.serve_forever()


def main():
    root = app_root()
    port = free_port()
    t = threading.Thread(target=serve, args=(root, port), daemon=True)
    t.start()

    webview.create_window("NESI", f"http://127.0.0.1:{port}/index.html",
                           width=1280, height=860, min_size=(900, 600))
    webview.start()


if __name__ == "__main__":
    main()
