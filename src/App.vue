<template>
  <router-view/>
</template>

<style>
  @import "/src/assets/css/app.css";
</style>


<script lang="ts">
  import { defineComponent } from 'vue';
  import type { SettingsState, SettingsStore } from './scripts/settingsStore';
  import { SettingsActions } from './scripts/settingsStore';
  import { useStore } from 'vuex';

  export default defineComponent({
    name: 'App',

    // Prepare store
    beforeCreate() 
    {
      const store: SettingsStore = useStore<SettingsState>();
      store.dispatch(SettingsActions.initializeStore);
    },

  });
</script>