interface IBounds {
  width: number;
  height: number;
  phoneBreakpoint: number;
  mobile: boolean;
  headerTrayOpen: boolean;
}

export class Actions {
  public static SCREEN_RESIZE = 'INTERNAL_WINDOW_SCREEN_RESIZE';
  public static HEADER_TRAY_TOGGLE = 'INTERNAL_HEADER_TRAY_TOGGLE';
  public static ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

  public static headerToggle(open?) {
    return {
      type: Actions.HEADER_TRAY_TOGGLE,
      open
    }
  }
}

const phoneBreakpoint = 896;

const initialWindowState: IBounds = {
  phoneBreakpoint,
  width: ENV.BUILD_TARGET === 'client' ? window.innerWidth : 0,
  height: ENV.BUILD_TARGET === 'client' ? window.innerHeight : 0,
  mobile:ENV.BUILD_TARGET === 'client' ? window.innerHeight <= phoneBreakpoint : false,
  headerTrayOpen: false,
};

export default function bounds(state = initialWindowState, action) {
  switch (action.type) {
    case Actions.SCREEN_RESIZE:
      return {
        ...state,
        width: action.width,
        height: action.height,
        phoneBreakpoint,
        mobile: action.width <= phoneBreakpoint
      };
    case Actions.ROUTER_LOCATION_CHANGE:
      return {
        ...state,
        width: window.innerWidth,
        height: window.innerHeight,
        phoneBreakpoint,
        mobile: window.innerWidth <= phoneBreakpoint
      };
    case Actions.HEADER_TRAY_TOGGLE:
      return {
        ...state,
        headerTrayOpen: typeof action.open !== 'undefined'? action.open : !state.headerTrayOpen
      }
  }
  return state;
}