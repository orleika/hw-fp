import { ipcRenderer } from 'electron'

export const SMBIOS_RECEIVED = 'SMBIOS_RECEIVED'
export const REPORT_SENDING = 'REPORT_SENDING'
export const REPORT_SENT = 'REPORT_SENT'
export const ERROR_SHOWING = 'ERROR_SHOWING'

export const fetchSmbios = () => dispatch => {
  ipcRenderer.send('dmidecode')
  ipcRenderer.on('dmidecode', (event, args) => {
    switch (args.status) {
      case 'success':
        return dispatch(smbiosReceived(args.data))
      case 'fail':
      case 'error':
        return dispatch(errorShowing({
          'action': '',
          'message': 'Fatal Error: seems not supported'
        }))
    }
  })
}

export const sendReport = (name) => (dispatch, getState) => {
  dispatch(reportSending(name))
  return window.fetch(REPORT_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      smbios: getState().smbios,
      version: APP_VERSION
    })
  })
  .then(response => response.json())
  .then(json => dispatch(reportSent({
    'action': '',
    'message': json.result
  })))
  .catch(error => dispatch(errorShowing({
    'action': '',
    'message': error
  })))
}

const smbiosReceived = smbios => ({
  type: SMBIOS_RECEIVED,
  smbios
})

const reportSending = name => ({
  type: REPORT_SENDING,
  name
})

const reportSent = feedback => ({
  type: REPORT_SENT,
  feedback
})

const errorShowing = feedback => ({
  type: ERROR_SHOWING,
  feedback
})
