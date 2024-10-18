<template>
  <button class="icon-button"
    v-on:mouseenter="()=>{icon?.onMouseEnter()}"
    v-on:mouseleave="()=>{icon?.onMouseLeave()}"
    v-on:mousedown="()=>{icon?.onMouseDown()}"
    v-on:mouseup="()=>{icon?.onMouseUp()}">
    <div class="icon-button__content">
      <div class="icon-button__indicator">
        <IconSVG ref="icon" :icon="props.buttonIcon" :is-dependent="true"/>
      </div>

      <div class="icon-button__text">
        {{ props.buttonText }}
      </div>
    </div>
  </button>
</template>
  
<style>
  @import "/src/assets/css/controls.css";
</style>

<script lang="ts">

  import type { PropType} from 'vue';
  import { computed, defineComponent, ref } from 'vue';
  import { Icon } from '@/scripts/enums/Icon';
  import IconSVG from '@/components/IconSVG.vue';
  
  export default defineComponent({
    name: 'IconButtonComponent',
    components: { IconSVG },
    props: 
    {
      buttonIcon: {type: Number as PropType<Icon>,  required: false, default: Icon.QUESTION},
      buttonText: {type: String,  required: false, default: "Default button text"},
    },

    setup(props) 
    {
      const icon = ref< typeof IconSVG | null>(null);

      return {
        props,
        IconSVG,
        Icon,
        icon,
      };
    }
});
</script>