import {
  SMBIOS_RECEIVED,
  REPORT_SENDING,
  REPORT_SENT,
  ERROR_SHOWING
 } from 'actions'

const reducer = (state = {
  smbios: '',
  name: '',
  notify: false,
  feedback: {
    action: '',
    message: ''
  }
}, action) => {
  switch (action.type) {
    case SMBIOS_RECEIVED:
      return {
        ...state,
        smbios: action.smbios
      }
    case REPORT_SENDING:
      return {
        ...state,
        name: action.name,
        notify: false
      }
    case REPORT_SENT:
      return {
        ...state,
        notify: true,
        feedback: action.feedback
      }
    case ERROR_SHOWING:
      return {
        ...state,
        notify: true,
        feedback: action.feedback
      }
    default:
      return state
  }
}

export default reducer
