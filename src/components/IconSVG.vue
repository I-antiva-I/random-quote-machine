<!-- Icons are provided by Font Awesome (https://fontawesome.com) -->
<template>

  <div v-if="props.isDependent" :class="className">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path :transform="iconData.transform" :d="iconData.path" />
    </svg>
  </div>

  <div v-else :class="className" 
    v-on:mouseenter="onMouseEnter" 
    v-on:mouseleave="onMouseLeave"
    v-on:mousedown="onMouseDown" 
    v-on:mouseup="onMouseUp">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path :transform="iconData.transform" :d="iconData.path" />
    </svg>
  </div>

</template>

<script lang="ts">

  import { ComputedRef, PropType, defineComponent, computed, ref, watch } from 'vue';
  import { IconData, getIconData } from "@/scripts/managers/iconManager";
  import { getInteractiveStateName, InteractiveState } from "@/scripts/enums/InteractiveState";
  import { Icon } from "@/scripts/enums/Icon";
  import { getEnumName, stringAsClassName } from '@/scripts/utility';

  export default defineComponent({
    name: "IconSVG",
    props: 
    {
      icon:           {type: Number as PropType<Icon>, required: true},
      isDependent:    {type: Boolean, required: false, default: false},
    },

    setup(props) 
    {
      const iconData: ComputedRef<IconData> = computed(() => {return getIconData(props.icon)});

      const currentState = ref<InteractiveState>(InteractiveState.DEFAULT);
      const previousState = ref<InteractiveState>(InteractiveState.DEFAULT);
      
      const className = computed(() => 
      {
        return "svg-icon svg-icon--" + iconData.value.classModifier + 
          " svg-icon--" + stringAsClassName(getEnumName(InteractiveState,currentState.value));
      });
    
      watch(currentState, (newState, oldState) => 
      {
        previousState.value = oldState;
      });

      const onMouseEnter = () => 
      {
        currentState.value = InteractiveState.HOVERED;
      };

      const onMouseLeave = () => 
      {
        currentState.value = InteractiveState.DEFAULT; 
      };

      const onMouseUp = () => 
      {
        currentState.value = previousState.value;  
      };

      const onMouseDown = () => 
      {
        currentState.value = InteractiveState.PRESSED; 
      };

      return {
        // Passed properties
        props,
        // Local properties
        currentState,
        className,
        iconData,
        // Event handlers
        onMouseEnter,
        onMouseLeave,
        onMouseUp,
        onMouseDown,
      };
    },
  });
  
</script>
