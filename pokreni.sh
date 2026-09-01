#!/bin/sh
# Lokalni pregled: http://127.0.0.1:8766
cd "$(dirname "$0")" && python3 -m http.server 8766 --bind 127.0.0.1
