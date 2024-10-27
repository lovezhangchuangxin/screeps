
const getWebviewContent = () => {
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Screeps</title>
    <style>
      #__keqing_terminal {
        font-family: monospace;
        font-size: 16px;
      }
      #__keqing_input {
        position: relative;
      }
      .__keqing_prompt {
        position: absolute;
        top: 0;
        left: 0;
        color: #dfdfdf;
      }
      #__keqing_textarea {
        background: none;
        border: none;
        outline: none;
        all: unset;
        display: block;
        width: 100%;
        margin: 10px 0;
        box-sizing: border-box;
        font-family: monospace;
        resize: none;
        overflow: hidden;
        text-indent: 1em;
      }
      body::-webkit-scrollbar {
        width: 4px;
      }
    </style>
  </head>
  <body>
    <div id="__keqing_terminal">
      <div id="__keqing_input">
        <label class="__keqing_prompt">$ </label>
        <textarea
          type="text"
          id="__keqing_textarea"
          autocomplete="off"
        ></textarea>
      </div>
    </div>

    <script>
      const vscode = window?.acquireVsCodeApi?.()

      const terminal = document.querySelector('#__keqing_terminal')
      const input = document.querySelector('#__keqing_input')
      const textarea = document.querySelector('#__keqing_textarea')

      focus()

      textarea.addEventListener('keydown', (event) => {
        // Resize textarea to fit content
        textarea.style.height = textarea.scrollHeight + 'px'

        if (event.key === 'Enter') {
          const command = textarea.value
          textarea.value = ''
          setTimeout(() => {
            textarea.value = ''
          })
          if (command === 'clear') {
            handleClear()
            return
          }

          genCommandLine(command)
          if (!command) {
            focus()
            return
          }
          vscode?.postMessage(JSON.stringify({ command }))
          input.style.display = 'none'
          textarea.style.height = '1em'
        }
      })

      function handleClear() {
        // 移除所有子节点，除了输入框
        while (terminal.firstChild !== input) {
          terminal.removeChild(terminal.firstChild)
        }
        focus()
      }

      function genCommandLine(command) {
        const html = \`
          <div style="position: relative; font-size: 16px; min-height: 1em;">
            <label class="__keqing_prompt">$ </label>
            <p style="text-indent: 1em; margin: 10px 0;">\${command || ' '}</p>
          </div>
        \`
        input.insertAdjacentHTML('beforebegin', html)
      }

      function focus() {
        textarea.focus()
      }

      window.addEventListener('message', (event) => {
        const message = event.data
        try {
          const { output, done } = JSON.parse(message)
          const html = output
            ? \`
          <div style="position: relative; font-size: 16px">
            \${output}
          </div>
        \`
            : ''
          input.insertAdjacentHTML('beforebegin', html)

          if (done) {
            input.style.display = 'block'
            focus()
            return
          }
        } catch (error) {
          input.style.display = 'block'
          focus()
        }
      })
    </script>
  </body>
</html>
`
}

export default getWebviewContent
