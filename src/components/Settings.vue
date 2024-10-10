<template>
  <div class="settings">
    <div class="settings__header">
      <h1>SETTINGS</h1>
    </div>

    <div class="settings__content">
      <SettingsGroup group-title="Preferences">

        <SettingsGroup group-title="Time" :is-sub-group="true">
          <ToggleSwitch toggle-switch-id="toggle-switch--theme" :toggle-switch-icon-on="Icon.MOON"
            :toggle-switch-icon-off="Icon.SUN" toggle-switch-text-on="Dark theme" toggle-switch-text-off="Light theme"
            v-on:change="setDarkThemeSelected" v-model:toggleSwitchValue="isDarkThemeSelected" />
        </SettingsGroup>

        <SettingsGroup group-title="Clock" :is-sub-group="true">
          <RadioButton radio-button-id="clock-mode--increasing-24h" radio-button-text="Current time (24-hour)"
            v-model:radioButtonValue="clockMode" v-on:change="setClockMode"
            :radio-button-assigned-value="ClockMode.INCREASING_24H" />

          <RadioButton radio-button-id="clock-mode--increasing-12h" radio-button-text="Current time (12-hour)"
            v-model:radioButtonValue="clockMode" v-on:change="setClockMode"
            :radio-button-assigned-value="ClockMode.INCREASING_12H" />

          <RadioButton radio-button-id="clock-mode--decreasing" radio-button-text="Decreasing timer"
            v-model:radioButtonValue="clockMode" v-on:change="setClockMode"
            :radio-button-assigned-value="ClockMode.DECREASING" />
        </SettingsGroup>

      </SettingsGroup>

      <SettingsGroup group-title="Display">

        <Checkbox checkbox-id="display--navigation-arrows" checkbox-text="Navigation arrows"
          v-on:change="setNavigationButtonsVisible" v-model:checkboxValue="areNavigationButtonsVisible" />

        <Checkbox checkbox-id="display--randomize-button" checkbox-text="Randomize button"
          v-on:change="setRandomizeButtonVisible" v-model:checkboxValue="isRandomizeButtonVisible" />

      </SettingsGroup>

      <SettingsGroup group-title="Information">

        <!--
        <IconButton button-text="About page" :button-icon="Icon.QUESTION" v-on:click="onAboutButtonClicked" />
        -->
        

        <IconButton button-text="GitHub page" :button-icon="Icon.GITHUB" v-on:click="onInfoButtonClicked" />

      </SettingsGroup>

    </div>
  </div>
</template>
  
<style>
  @import "/src/assets/css/settings.css";
</style>
  
<script lang="ts">
  import { useRouter } from 'vue-router'
  //     <button><IconSVG :icon="Icon.MOON"/></button>
  // :checkbox-value="bool" v-on:checkboxValueChanged="(val) => {bool = val}
  import { defineComponent, ref, watch, ComputedRef, computed, onMounted} from 'vue';
  import IconSVG from "@/components/IconSVG.vue";
  import { Icon } from '@/scripts/enums/Icon';
  import { ClockMode } from '@/scripts/enums/ClockMode';
  import Checkbox from "@/components/controls/Checkbox.vue";
  import RadioButton from "@/components/controls/RadioButton.vue";
  import ToggleSwitch from "@/components/controls/ToggleSwitch.vue";
  import { getEnumKeyByValue } from '@/scripts/utility';
  import SettingsGroup from "@/components/SettingsGroup.vue";
  import IconButton from "@/components/controls/IconButton.vue";
  import { useStore } from 'vuex';
  import type { Store } from 'vuex'
  import { type SettingsState, type SettingsGetters, type SettingsStore, SettingsActions } from "@/scripts/settingsStore";

  export default defineComponent({
      name: 'SettingsComponent',
      components: {
        IconSVG,
        Checkbox,
        RadioButton,
        ToggleSwitch,
        SettingsGroup,
        IconButton,
      },
      
      setup(props) 
      {
        const router = useRouter()
        const store: SettingsStore = useStore<SettingsState>();

        const onAboutButtonClicked = () =>
        {
          router.push({ name: "about" });
        }

        const onInfoButtonClicked = () =>
        {
          window.open('https://www.example.com', '_blank');
        }
      
        const areNavigationButtonsVisible = ref(store.getters.areNavigationButtonsVisible);
        const isRandomizeButtonVisible = ref(store.getters.isRandomizeButtonVisible);
        const clockMode = ref(store.getters.clockMode);
        const isDarkThemeSelected= ref(store.getters.isDarkThemeSelected);

        const setDarkThemeSelected = () => 
          {store.dispatch(SettingsActions.setDarkThemeSelected, isDarkThemeSelected.value)}

        const setRandomizeButtonVisible = () => 
          {store.dispatch(SettingsActions.setRandomizeButtonVisible, isRandomizeButtonVisible.value)}   

        const setNavigationButtonsVisible = () => 
          {store.dispatch(SettingsActions.setNavigationButtonsVisible, areNavigationButtonsVisible.value)}

        const setClockMode = () => 
          {store.dispatch(SettingsActions.setClockMode, clockMode.value)}  

        return {
          Icon,
          ClockMode,
          areNavigationButtonsVisible,
          isRandomizeButtonVisible,
          isDarkThemeSelected,
          clockMode,
          setDarkThemeSelected,
          setRandomizeButtonVisible,
          setNavigationButtonsVisible,
          setClockMode,
          onInfoButtonClicked,
          onAboutButtonClicked,
        };
      }
    });

</script>
  
