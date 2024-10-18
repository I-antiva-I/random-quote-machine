<template>
  <div :class="className"  
    v-on:mouseenter="()=>{icon?.onMouseEnter()}"
    v-on:mouseleave="()=>{icon?.onMouseLeave()}"
    v-on:mousedown="()=>{icon?.onMouseDown()}"
    v-on:mouseup="()=>{icon?.onMouseUp()}">

    <label class="radio-button__content" :for="props.radioButtonId">

      <input class="radio-button__input" 
        type="radio" 
        :id="props.radioButtonId"
        :checked="props.radioButtonValue === props.radioButtonAssignedValue" 
        v-on:change="onRadioButtonValueChanged">

      <div class="radio-button__indicator">
        <IconSVG ref="icon" :icon="Icon.CHECK_CIRCLE" :is-dependent="true"/>
      </div>

      <div class="radio-button__text">
        {{ props.radioButtonText }}
      </div>
    </label>

  </div>
</template>
  
<style>
  @import "/src/assets/css/controls.css";
</style>

<script lang="ts">

  import { computed, defineComponent, ref } from 'vue';
  import { Icon } from '@/scripts/enums/Icon';
  import IconSVG from '@/components/IconSVG.vue';

  export default defineComponent({
    name: 'RadioButtonComponent',
    components: { IconSVG } ,
    props: 
    {
      radioButtonId:              {type: String,  required: true},
      radioButtonName:            {type: String,  required: false},
      radioButtonValue:           {type: Number,  required: true},
      radioButtonAssignedValue:   {type: Number,  required: true},
      radioButtonText:            {type: String,  required: false,    default: "Default radio button text"},
    },

    setup(props, { emit }) 
    {
      const icon = ref< typeof IconSVG | null>(null);

      const className =  computed(() =>
        {return (props.radioButtonValue === props.radioButtonAssignedValue) ?
          'radio-button radio-button--checked' : 'radio-button radio-button--unchecked'; });

      const onRadioButtonValueChanged = (event: Event) => 
      {
        if (event?.target !== null )
        {
          const target = event.target as HTMLInputElement;
          emit('update:radioButtonValue', props.radioButtonAssignedValue);
        }
      }

      return {
        props,
        IconSVG,
        Icon,
        icon,
        onRadioButtonValueChanged,
        className
      };
    }
});
</script>