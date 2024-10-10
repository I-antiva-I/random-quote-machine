<template>
  <div :class="className"
    v-on:mouseenter="()=>{icon?.onMouseEnter()}"
    v-on:mouseleave="()=>{icon?.onMouseLeave()}"
    v-on:mousedown="()=>{icon?.onMouseDown()}"
    v-on:mouseup="()=>{icon?.onMouseUp()}">

    <label class="checkbox__content" :for="props.checkboxId">
      
      <input class="checkbox__input" 
        type="checkbox" 
        :id="props.checkboxId"
        :checked="props.checkboxValue" 
        v-on:change="onCheckboxValueChanged">
        
      <div class="checkbox__icon">
        <IconSVG ref="icon" :icon="Icon.CHECK_SQUARE" :is-dependent="true"/>
      </div>
        
      <div class="checkbox__text">
        {{ props.checkboxText }}
      </div>

    </label>

  </div>
</template>
  
<style>
  @import "/src/assets/css/controls.css";
</style>

<script lang="ts">

  import {computed, defineComponent, ref } from 'vue';
  import IconSVG from '@/components/IconSVG.vue';
  import {Icon} from '@/scripts/enums/Icon';
  import { InteractiveState } from '@/scripts/enums/InteractiveState';

  
  export default defineComponent({
    name: 'CheckboxComponent',
    components: { IconSVG },
    props: 
    {
      checkboxId:     {type: String,  required: true},
      checkboxValue:  {type: Boolean, required: true},
      checkboxText:   {type: String,  required: false,    default: "Default checkbox text"},
    },

    setup(props, { emit }) 
    {

      const icon = ref< typeof IconSVG | null>(null);

      const className =  computed(() => 
        {return (props.checkboxValue) ? 'checkbox checkbox--checked' : 'checkbox checkbox--unchecked'; });

      const onCheckboxValueChanged = (event: Event) => 
      {
        if (event?.target !== null )
        {
          const target = event.target as HTMLInputElement;
          emit('update:checkboxValue', target.checked);
        }
      }

      return {
        props,
        IconSVG,
        Icon,
        icon,
        onCheckboxValueChanged,
        className,
        InteractiveState,
      };
    }
});

</script>