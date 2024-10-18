<template>
  <div class="action-menu">

    <ActionButton  
      v-show="isReturnButtonVisible"  v-on:click="onReturnButtonClicked"
      :action-button-icon="Icon.RETURN" action-button-text="Return"/>

    <ActionButton  
      v-show="isSettingsButtonVisible"  v-on:click="onSettingsButtonClicked"
      :action-button-icon="Icon.GEAR" action-button-text="Settings"/>
    
    <ActionButton  
      v-show="isRandomizeButtonVisible"  v-on:click="onRandomizeButtonClicked" id="new-quote"
      :action-button-icon="diceIcon" action-button-text="Randomize"/>

    <ActionButton  
      v-on:click="onShareButtonClicked" id="tweet-quote"
      :action-button-icon="Icon.SHARE" action-button-text="Share"/>

  </div>
</template>

<style>
  @import "/src/assets/css/action_menu.css";
</style>

<script lang="ts">
  import { defineComponent, ref, onMounted, nextTick, onBeforeUnmount, watchEffect, watch, computed} from 'vue';
  import { useStore } from 'vuex';

  import { Icon } from "@/scripts/enums/Icon";
  import { CardSide } from '@/scripts/enums/CardSide';
  import ActionButton from "@/components/controls/ActionButton.vue";
  import { getRandomInteger } from '@/scripts/utility';
  import type { SettingsState, SettingsStore } from '@/scripts/settingsStore';

  export default defineComponent({
    name: "ActionMenuComponent",
    components: { ActionButton },
    props:
    {
      currentCardSide: { type: Number, required: true },
    },

    setup(props, {emit}) 
    {
      const store: SettingsStore = useStore<SettingsState>();

      const isReturnButtonVisible = computed(() =>
        {return (props.currentCardSide === CardSide.BACK) ?  true : false;});

      const isSettingsButtonVisible = computed(() =>
        {return (props.currentCardSide === CardSide.FRONT) ?  true : false;});

      const isRandomizeButtonVisible = computed(() =>
        {return store.getters.isRandomizeButtonVisible});

      const getRandomDiceIcon =  () => 
      {
        const diceIcons = 
          [Icon.DICE_ONE, Icon.DICE_TWO, Icon.DICE_THREE, Icon.DICE_FOUR, Icon.DICE_FIVE, Icon.DICE_SIX];
            
        const randomNumber = getRandomInteger(diceIcons.length-1);
        console.log("R", randomNumber);
        const icon = diceIcons[randomNumber];
        if (icon === diceIcon.value)
        {
            return diceIcons[(randomNumber+1) % 6];
        }
        else
        {
            return diceIcons[randomNumber];
        }
      };
        
      const diceIcon = ref<Icon>(Icon.DICE_FIVE);

      const onReturnButtonClicked = () =>
      {
        emit("returnButtonClicked");
      }

      const onSettingsButtonClicked = () =>
      {
        emit("settingsButtonClicked");
      }

      const onRandomizeButtonClicked = () =>
      {
        diceIcon.value = getRandomDiceIcon();
        emit("randomizeButtonClicked");
      }

      const onShareButtonClicked = () =>
      {
        emit("shareButtonClicked");
      }

      onMounted(() => 
      {
        diceIcon.value  = getRandomDiceIcon();
      });

      return {
        // Enums
        Icon,
        CardSide,
        //
        diceIcon,
        isReturnButtonVisible,
        isRandomizeButtonVisible,
        isSettingsButtonVisible,
        getRandomDiceIcon,
        // Event handlers
        onReturnButtonClicked,
        onSettingsButtonClicked,
        onRandomizeButtonClicked,
        onShareButtonClicked,
      };
    },
  });

</script>
