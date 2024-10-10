import type { Store } from 'vuex';
import { createStore, GetterTree } from 'vuex';
import { ClockMode } from './enums/ClockMode';

export interface SettingsState 
{
  areNavigationButtonsVisible: boolean;
  isRandomizeButtonVisible: boolean;
  isDarkThemeSelected: boolean;
  clockMode: number;
}

export interface SettingsGetters
{
  isRandomizeButtonVisible: (state: SettingsState) => boolean,
  clockMode(state: SettingsState) : number,
  isDarkThemeSelected: (state: SettingsState) => boolean,
  areNavigationButtonsVisible: (state: SettingsState) => boolean,
}

export enum SettingsActions
{
  setDarkThemeSelected = "setDarkThemeSelected",
  setNavigationButtonsVisible = "setNavigationButtonsVisible",
  setRandomizeButtonVisible = "setRandomizeButtonVisible",
  setClockMode = "setClockMode",
  initializeStore = "initializeStore"
}

export const settingsStore = createStore<SettingsState>(
{
  state: (): SettingsState => 
  ({
    areNavigationButtonsVisible: true,
    isRandomizeButtonVisible: true,
    isDarkThemeSelected: true,
    clockMode: ClockMode.DECREASING,
  }),
  
  mutations: 
  {
    SET_THEME(state: SettingsState, value: boolean) 
    {
      state.isDarkThemeSelected = value;
      localStorage.setItem("isDarkThemeSelected", state.isDarkThemeSelected.toString());
    },

    SET_CLOCK(state: SettingsState, value: number) 
    {
      state.clockMode = value;
      localStorage.setItem("clockMode", state.clockMode.toString());
    },

    SET_RANDOM(state: SettingsState, value: boolean) 
    {
      state.isRandomizeButtonVisible = value;
      localStorage.setItem("isRandomizeButtonVisible", state.isRandomizeButtonVisible.toString());
    },

    SET_NAVIGATION(state: SettingsState, value: boolean) 
    {
      state.areNavigationButtonsVisible = value;
      localStorage.setItem("areNavigationButtonsVisible", state.areNavigationButtonsVisible.toString());
    },

    INITIALIZE_STORE(state: SettingsState)
    {
      const localClockMode = localStorage.getItem("clockMode");
      const localIsRandomizeButtonVisible = localStorage.getItem("isRandomizeButtonVisible");
      const localAreNavigationButtonsVisible = localStorage.getItem("areNavigationButtonsVisible");
      const localIsDarkThemeSelected = localStorage.getItem("isDarkThemeSelected");

      if (localClockMode)
      {
        state.clockMode = JSON.parse(localClockMode);
      }
      else
      {
        console.log("localClockMode Not found");
      }

      if (localIsRandomizeButtonVisible)
      {
        state.isRandomizeButtonVisible = JSON.parse(localIsRandomizeButtonVisible);
      }
      else
      {
        console.log("localIsRandomizeButtonVisible Not found");
      }

      if (localAreNavigationButtonsVisible)
      {
        state.areNavigationButtonsVisible = JSON.parse(localAreNavigationButtonsVisible);
      }
      else
      {
        console.log("localAreNavigationButtonsVisible Not found");
      }

      if (localIsDarkThemeSelected)
      {
        state.isDarkThemeSelected = JSON.parse(localIsDarkThemeSelected);
      }
      else
      {
        if (window.matchMedia)
        {
          if (window.matchMedia('(prefers-color-scheme: dark)').matches)
          {
            state.isDarkThemeSelected = true;
          }
          else
          {
            state.isDarkThemeSelected = false;
          }  
        }
        else
        {
          state.isDarkThemeSelected = false;
        }

        console.log("localIsDarkThemeSelected Not found");
      }
    },
  },

  actions: 
  {
    setDarkThemeSelected({ commit }, value: boolean) { commit('SET_THEME', value);},
    setNavigationButtonsVisible({ commit }, value: boolean) { commit('SET_NAVIGATION', value);},
    setRandomizeButtonVisible({ commit }, value: boolean) { commit('SET_RANDOM', value);},
    setClockMode({ commit }, value: number) { commit('SET_CLOCK', value);},
    initializeStore({ commit }) { commit('INITIALIZE_STORE');},
  },
  
  getters:
  {
    isRandomizeButtonVisible: (state: SettingsState) => state.isRandomizeButtonVisible,
    clockMode: (state: SettingsState) => state.clockMode,
    isDarkThemeSelected: (state: SettingsState) => state.isDarkThemeSelected,
    areNavigationButtonsVisible: (state: SettingsState) => state.areNavigationButtonsVisible,
  } 
     
});

// Define a type-safe store
export type SettingsStore = Omit<Store<SettingsState>, 'getters'> & 
{
  getters: 
  {
    [K in keyof SettingsGetters]: ReturnType<SettingsGetters[K]>;
  };
};
  