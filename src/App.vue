<template>
  <div :class="'app theme '+currentTheme">
    <router-view/>
  </div>
</template>

<style>
  @import "/src/assets/css/app.css";
</style>


<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import type { SettingsState, SettingsStore } from './scripts/settingsStore';
  import { SettingsActions } from './scripts/settingsStore';
  import { useStore } from 'vuex';

  export default defineComponent({
    name: 'App',

    beforeCreate() 
    {
      const store: SettingsStore = useStore<SettingsState>();
      store.dispatch(SettingsActions.initializeStore);
    },

    setup() {

      const store = useStore<SettingsState>();
        const currentTheme = computed(() => {
      return store.state.isDarkThemeSelected ? 'theme--dark' : 'theme--light';
    });


      return {
        currentTheme

    };}

  });
</script>