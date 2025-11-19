module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "env",
        env: {
          "PROJECT_ROOT": "{{cwd}}",
          "WEB_PLAYER_PATH": "{{cwd}}/app/web"
        },
        path: "app",
        message: [
          "uv run --no-sync --active uvicorn api.src.main:app --host 0.0.0.0 --port 8880",
        ],
        on: [{
          "event": "/http:\\/\\/[^\\s\\/]+:\\d{2,5}(?=[^\\w]|$)/",
          "done": true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "http://127.0.0.1:{{input.event[0].split(':').pop()}}/web"
      }
    }
  ]
}
