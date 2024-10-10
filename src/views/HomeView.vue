<template>

  <ActionMenu 
    :current-card-side=currentCardSide
    v-on:settingsButtonClicked="onSettingsButtonClicked"
    v-on:returnButtonClicked="onReturnButtonClicked"
    v-on:shareButtonClicked="onShareButtonClicked"
    v-on:randomizeButtonClicked="onRandomizeButtonClicked"
  />

  <div :class="'card ' + cardClassName">
    <div class="card__wrapper">
      <div :class="'card-side card-side--front '+ frontSideClassName">
        <Sign ref="source" v-on:elementResized="(size) => onSignResized(size)"/>
      </div>

      <div :class="'card-side card-side--back ' + backSideClassName" >
        <Settings ref="target" :style="targetStyle"/>
      </div>
    </div>
  </div>

</template>

<style>
  @import "/src/assets/css/home_view.css";
</style>

<script lang="ts">

  import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
  import Sign from "@/components/Sign.vue";
  import Settings from '@/components/Settings.vue';
  import Clock from '@/components/Clock.vue';

  import { useStore } from 'vuex';
  import type { Store } from 'vuex'
  import type { SettingsState, SettingsStore } from "@/scripts/settingsStore";
  import ActionMenu from "@/components/ActionMenu.vue"

  import { Icon } from '@/scripts/enums/Icon';
  import { CardSide } from '@/scripts/enums/CardSide';
  import IconSVG from '@/components/IconSVG.vue';

  export default defineComponent({
    name: 'HomeView',
    components: {
      Sign,
      Settings,
      Clock,
      IconSVG,
      ActionMenu,
    },

    setup(props, { emit }) 
    {
      const store: SettingsStore = useStore<SettingsState>(); 
      const currentCardSide = ref(CardSide.FRONT);

      const cardClassName = computed(() =>
        { return (currentCardSide.value === CardSide.FRONT) ?  "card--front-visible" : "card--back-visible"; });

      const backSideClassName = computed(() =>
        { return (currentCardSide.value === CardSide.BACK) ?  "card-side--opened" : "card-side--closed"; });
        
      const frontSideClassName = computed(() =>
        { return (currentCardSide.value === CardSide.FRONT) ?  "card-side--opened" : "card-side--closed";});

      const source =  ref<InstanceType<typeof Sign> | null>(null);  // Reference to the source element
      const target = ref<HTMLElement | null>(null);

      const targetStyle = reactive({
        width: 'auto',
        height: 'auto',
        maxHeight: 'auto',
      });

      const onReturnButtonClicked = () =>
      {
          console.log("onReturnButtonClicked");
          currentCardSide.value = CardSide.FRONT;
      }

      const onSettingsButtonClicked = () =>
      {
        console.log("onSettingsButtonClicked");
        currentCardSide.value = CardSide.BACK;
      }

      const onRandomizeButtonClicked = () =>
      {
        console.log("onRandomizeButtonClicked");
        if (source.value)
        {
          source.value.getSign();
        }
      }

      const onShareButtonClicked = () =>
      {
        console.log("onShareButtonClicked");

        let shareText = "";
        if (source.value)
        {
          shareText = encodeURIComponent(source.value.signQuote+" (Antichamber game quote)");
        }

        const steamURL = encodeURIComponent("https://store.steampowered.com/app/219890/Antichamber/")
        const shareURL = `https://twitter.com/intent/tweet?text=${shareText}&url=${steamURL}`;
      
        window.open(shareURL, '_blank');

      }
      
      onMounted(() => {console.log("HV MOUNTED");});

      const onSignResized = (size: {width: number, height: number}) =>
      {
      //size
        console.log("SignResized", size);
        targetStyle.maxHeight = size.height.toString() + "px";
      //  targetStyle.height = size.height.toString() + "px";
        targetStyle.width = size.width.toString()+ "px";
      }

      return {
        Icon,
        CardSide,
        props,
        store,
        source,
        target,
        targetStyle,
        onSignResized,
        onReturnButtonClicked,
        onSettingsButtonClicked,
        onRandomizeButtonClicked,
        onShareButtonClicked,
        currentCardSide,
        frontSideClassName,
        backSideClassName,
        cardClassName,
      };
    }
  });

</script>
