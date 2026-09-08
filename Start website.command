#!/bin/zsh
cd "${0:A:h}"
if curl --silent --fail http://127.0.0.1:4173/ >/dev/null; then
  open http://127.0.0.1:4173/
  exit 0
fi
if command -v node >/dev/null 2>&1; then
  website_node="$(command -v node)"
elif [[ -x /opt/homebrew/bin/node ]]; then
  website_node=/opt/homebrew/bin/node
else
  website_node=/Users/maurice/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node
fi
"$website_node" server.mjs &
website_pid=$!
trap 'kill "$website_pid" 2>/dev/null' EXIT INT TERM
for attempt in {1..30}; do
  if curl --silent --fail http://127.0.0.1:4173/ >/dev/null; then
    open http://127.0.0.1:4173/
    break
  fi
  sleep 0.1
done
wait "$website_pid"
