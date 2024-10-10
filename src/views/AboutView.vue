<template>
  <div class="about">
    <h1>This is an about page</h1>


    <div class="checkbox">
      <input class="checkbox__input" type="checkbox">
      <div class="checkbox__icon">
        <IconSVG :icon="Icon.ARROW_LEFT" />
      </div>
      <label class="checkbox__label">Checkbox label text</label>
    </div>


  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Sign from "@/components/Sign.vue";
import Settings from '@/components/Settings.vue';
import Clock from '@/components/Clock.vue';
import { Icon } from '@/scripts/enums/Icon';
import IconSVG from '@/components/IconSVG.vue';


export default defineComponent({
  name: 'AboutView',
  components: {
    IconSVG,
  },
  setup(props) 
    {
        console.log("ABOUT SETUP");
        return {
          IconSVG,
          Icon
        };
    }
});
</script>