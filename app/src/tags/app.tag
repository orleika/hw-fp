<app>
  <div class="mdc-typography">
    <h1 class="mdc-typography--headline">{this.opts.appName}</h1>
  </div>

  <div class="mdc-text-field mdc-text-field--fullwidth mdc-text-field--textarea mdc-text-field--upgraded">
    <textarea id="smbios-input" class="mdc-text-field__input" rows="10" cols="40" readonly>{this.state.smbios}</textarea>
    <label for="smbios-input" class="mdc-text-field__label mdc-text-field__label--float-above">smbios</label>
  </div>

  <p class="mdc-typography--body2">あなたのマシンの情報は以上の通りです。<br>情報提供に協力いただける場合はお名前を添えて送信をお願いします。提供いただいた情報は研究目的のみに活用されます。また，情報は厳重にデータベースに保管され，事前の告知なく第三者に提供されることはありません。</p>

  <div class="mdc-text-field mdc-text-field--box mdc-text-field--with-trailing-icon">
    <input type="text" id="name-input" class="mdc-text-field__input" oninput="{handleNameInput}" required>
    <label for="name-input" class="mdc-text-field__label">Your name</label>
    <i id="report-send" class="material-icons mdc-text-field__icon" tabindex="0">send</i>
    <div class="mdc-text-field__bottom-line"></div>
  </div>
  <p id="name-input" class="mdc-text-field-helptext mdc-text-field-helptext--validation-msg">お名前を入力してください。</p>

  <message-snackbar></message-snackbar>

  <style>
    app {
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      align-items: center;
      width: 90%;
      margin: 0 auto;
    }
  </style>

  <script>
    import {
      MDCTextField,
      MDCTextFieldFoundation
    } from '@material/textfield'
    import {MDCRipple} from '@material/ripple'
    import {MDCSnackbar} from '@material/snackbar'
    import {
      fetchSmbios,
      sendReport
    } from 'actions'

    let store = this.opts.store

    this.on('before-mount', () => {
      this.state = store.getState()
    })

    this.on('mount', () => {
      store.dispatch(fetchSmbios())

      const textFieldBoxEl = document.querySelector('.mdc-text-field--box')
      const textField = new MDCTextField(textFieldBoxEl, undefined, (el) => {
        return new MDCRipple(el)
      })
      textField.listen('MDCTextField:icon', () => {
        const name = document.getElementById('name-input').value
        if (name) store.dispatch(sendReport(name))
      })

      const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'))

      store.subscribe(() => {
        this.state = store.getState()
        this.update()
        if (this.state.notify) {
          snackbar.show({
            message: this.state.feedback.message,
            actionText: ' ',
            actionHandler: () => {}
          })
        }
      })
    })

    this.handleNameInput = () => {
      const name = document.getElementById('name-input').value
      if (name) {
        document.getElementById('report-send').classList.add('md-valid')
      } else {
        document.getElementById('report-send').classList.remove('md-valid')
      }
    }
  </script>
</app>
