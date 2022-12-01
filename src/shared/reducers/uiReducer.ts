
export enum UIActionType {
  startLoading = '@ui/startLoading',
  finishLoading = '@ui/finishLoading'
}

export interface UIPayload {
  isLoading?: boolean
}

export interface UIAction {
  type: UIActionType,
  payload?: UIPayload
}

const defaultState: UIPayload = {
  isLoading: false
}

export const uiReducer = (state:UIPayload = defaultState, action: UIAction): UIPayload => {

  switch(action.type) {
    case UIActionType.startLoading:
      return {
        isLoading: true
      }
    case UIActionType.finishLoading:
      return {
        isLoading: false
      }
    default:
      return state;
  }
}