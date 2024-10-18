<template>
  <div class="action-button"
    v-on:mouseenter="()=>{icon?.onMouseEnter()}"
    v-on:mouseleave="()=>{icon?.onMouseLeave()}"
    v-on:mousedown="()=>{icon?.onMouseDown()}"
    v-on:mouseup="()=>{icon?.onMouseUp()}">
  
    <div class="action-button__content">
       
      <div class="action-button__indicator">
        <IconSVG ref="icon" :icon="actionButtonIcon" :is-dependent="true"/>
      </div>
            
      <div class="action-button__text">
        {{ props.actionButtonText }}
      </div>
    
    </div>
  </div>

</template>
    
  <style>
    @import "/src/assets/css/controls.css";
  </style>
  
  <script lang="ts">
  
    import {computed, defineComponent, PropType, ref } from 'vue';
    import IconSVG from '@/components/IconSVG.vue';
    import {Icon} from '@/scripts/enums/Icon';
    import { InteractiveState } from '@/scripts/enums/InteractiveState';
  
    
    export default defineComponent({
      name: 'ActionButtonComponent',
      components: { IconSVG },
      props: 
      {
        actionButtonIcon:   {type: Number as PropType<Icon>,  required: false, default: Icon.QUESTION},
        actionButtonText:   {type: String,  required: false,    default: "Action text"},
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