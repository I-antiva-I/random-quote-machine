<template>
  <div class="action-menu">

    <button v-show="isReturnButtonVisible" class="action-button" v-on:click="onReturnButtonClicked">
      <IconSVG :icon="Icon.RETURN" />
      <div class="action-button__text">Return</div>
    </button>

    <button v-show="isSettingsButtonVisible" class="action-button" v-on:click="onSettingsButtonClicked">
      <IconSVG :icon="Icon.GEAR" />
      <div class="action-button__text">Settings</div>
    </button>

    <button v-show="isRandomizeButtonVisible" class="action-button" v-on:click="onRandomizeButtonClicked">
      <IconSVG :icon="diceIcon" />
      <div class="action-button__text">Randomize</div>
    </button>

    <button class="action-button" v-on:click="onShareButtonClicked">
      <IconSVG :icon="Icon.SHARE" />
      <div class="action-button__text">Share</div>
    </button>

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
  import IconSVG from "@/components/IconSVG.vue";
  import { getRandomInteger } from '@/scripts/utility';
  import type { SettingsState, SettingsStore } from '@/scripts/settingsStore';

  export default defineComponent({
    name: "ActionMenuComponent",
    components: { IconSVG },
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
