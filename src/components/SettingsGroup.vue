<template>

<div :class="'settings-'+classModifier+' settings-'+classModifier+'--'+classModifierGroup">
    <div :class="'settings-'+classModifier+'__header'">
        <h3 v-if="props.isSubGroup">{{ props.groupTitle }}</h3>
        <h2 v-else>{{ props.groupTitle  }}</h2>
    </div>

    <div :class="'settings-'+classModifier+'__content'">
        <slot></slot>
    </div>
</div>

</template>

<style>

</style>
 
<script lang="ts">

//     <button><IconSVG :icon="Icon.MOON"/></button>
// :checkbox-value="bool" v-on:checkboxValueChanged="(val) => {bool = val}
import { computed, defineComponent, ref, watch } from 'vue';
import IconSVG from "@/components/IconSVG.vue";
import { Icon } from '@/scripts/enums/Icon';
import { ClockMode } from '@/scripts/enums/ClockMode';
import Checkbox from "@/components/controls/Checkbox.vue";
import RadioButton from "@/components/controls/RadioButton.vue";
import ToggleSwitch from "@/components/controls/ToggleSwitch.vue";
import { getEnumKeyByValue, stringAsClassName } from '@/scripts/utility';
  
import { useStore } from 'vuex';
import type { Store } from 'vuex'
import type { SettingsState } from "@/scripts/settingsStore";

export default defineComponent({
    name: 'SettingsGroupComponent',
    components: 
    {

    },
    props: 
    {
        groupTitle: {type: String,  required: true},
        isSubGroup: {type: Boolean,  required: false, default: false},
    },
    setup(props) 
    {
        const classModifier = computed(() => {return (props.isSubGroup) ? "sub-group" : "group";});
        const classModifierGroup = computed(() => {return stringAsClassName(props.groupTitle)});

        return {
          props,
          classModifier,
          classModifierGroup
        };
    }

  });
</script>
  
