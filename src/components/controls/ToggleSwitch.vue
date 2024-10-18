<template>
  <div :class="className"       
    v-on:mouseenter="()=>{icon?.onMouseEnter()}"
    v-on:mouseleave="()=>{icon?.onMouseLeave()}"
    v-on:mousedown="()=>{icon?.onMouseDown()}"
    v-on:mouseup="()=>{icon?.onMouseUp()}">

    <label class="toggle-switch__content" :for="props.toggleSwitchId">

      <input class="toggle-switch__input" 
        type="checkbox" 
        :id="props.toggleSwitchId"
        :checked="props.toggleSwitchValue" 
        v-on:change="onToggleSwitchValueChanged">
        
      <div class="toggle-switch__indicator">
        <IconSVG ref="icon" :icon="toggleSwitchIcon" :is-dependent="true" />
      </div> 

      <div class="toggle-switch__text">
        {{ toggleSwitchText }}
      </div>

    </label>

  </div>
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
    name: 'ToggleSwitchComponent',
    components: { IconSVG },
    props: 
    {
      toggleSwitchId:         {type: String,  required: true},
      toggleSwitchValue:      {type: Boolean, required: true},
      toggleSwitchTextOn:     {type: String,  required: false,    default: "Switch ON"},
      toggleSwitchTextOff:    {type: String,  required: false,    default: "Switch OFF"},
      toggleSwitchIconOn:     {type: Number as PropType<Icon>,  required: true},
      toggleSwitchIconOff:    {type: Number as PropType<Icon>,  required: true},
    },

    setup(props, { emit }) 
    {
      const icon = ref< typeof IconSVG | null>(null);

      const toggleSwitchIcon =  computed(() => 
        { return (props.toggleSwitchValue) ? props.toggleSwitchIconOn : props.toggleSwitchIconOff; });

      const toggleSwitchText =  computed(() => 
        { return (props.toggleSwitchValue) ? props.toggleSwitchTextOn : props.toggleSwitchTextOff; });

      const className =  computed(() => 
        { return (props.toggleSwitchValue) ? 'toggle-switch toggle-switch--on' : 'toggle-switch toggle-switch--off'; });

      const onToggleSwitchValueChanged = (event: Event) => 
      {
        if (event?.target !== null )
        {
          const target = event.target as HTMLInputElement;
          emit('update:toggleSwitchValue', target.checked);
        }
      }

      return {
        props,
        IconSVG,
        Icon,
        icon,
        onToggleSwitchValueChanged,
        className,
        toggleSwitchIcon,
        toggleSwitchText
      };
    }
});
</script>