<template>
    <div class="sign" id="quote-box"  ref="resizableElement">

        <div class="sign__header">
          <button 
            v-if="store.getters.areNavigationButtonsVisible" 
            class="sign__button button-prev" 
            v-on:click="getPrevSign" 
            aria-label="Show previous sign">
              <IconSVG :icon="Icon.ARROW_LEFT"/>
          </button>

          <div class="sign__index" id="author">{{ signIndex }}</div>

          <button 
            v-if="store.getters.areNavigationButtonsVisible" 
            class="sign__button button-next" 
            v-on:click="getNextSign" 
            aria-label="Show next sign">
             <IconSVG :icon="Icon.ARROW_RIGHT"/>
          </button>
        </div>

        <div class="sign__timer">
          <Clock :clock-mode="store.getters.clockMode" v-on:newDayStarted="getSign"/>
        </div>

        <div class="sign__image">
          <img id="image" :src="signImage" alt="an image of sign">
        </div>

        <div class="sign__quote">
          <div id="text">{{ signQuote }}</div>
        </div>

  </div>
</template>

<style>
@import "/src/assets/css/sign.css";
</style>


<script lang="ts">
import type { Ref} from 'vue';
import  { defineExpose} from 'vue';
import { defineComponent, ref, onMounted, nextTick, onBeforeUnmount, watchEffect, watch} from 'vue';

import { Icon } from "@/scripts/enums/Icon";


import IconSVG from "@/components/IconSVG.vue";

import {setSignRefs} from "@/scripts/managers/signManager";
import { useRoute } from 'vue-router';
import Clock from './Clock.vue';
import { useResizeObserver } from '@vueuse/core';

import { useStore } from 'vuex';
import type { Store } from 'vuex'
import type { SettingsState } from "@/scripts/settingsStore";


export interface SignRefs
{
    signIndex: Ref<string>;
    signImage: Ref<string>;
    signQuote: Ref<string>;
}

export default defineComponent({
  name: 'SignComponent',
  components: {
    IconSVG,
    Clock,

  },


  setup(props, {emit}) 
  {

    const route = useRoute();

    const signIndex = ref<string>("000");
    const signImage = ref<string>("");
    const signQuote = ref<string>("...");

    const store = useStore<Store<SettingsState>>(); 

    const resizableElement = ref<HTMLElement | null>(null);
    const text = ref("???");


    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
       // width.value = newWidth;
       // height.value = newHeight;
      }
      //console.log("UPDATE !!!!!!!!!!!!!!!1");
    });


    const correctedIndex = (indexString: string = signIndex.value) => 
    {
      return Number(indexString)-1;
    };

    const getPrevSign = () => 
    {
      console.log("Prev", correctedIndex()-1);
      getSign(correctedIndex()-1);
    };

    const getNextSign = () => 
    {
      console.log("Next", correctedIndex()+1);
      getSign(correctedIndex()+1);
    };

    const getSign = (index: number | undefined = undefined) => 
    {
      const refs: SignRefs = 
      {
        signIndex: signIndex,
        signImage: signImage,
        signQuote: signQuote,
      }

      setSignRefs(refs, index);
    };

    
    onMounted(() => 
    {


    
      const index = route.query.sign as string;
      
      //console.log("GET", index);
      //console.log("COR", correctedIndex(index));

      let corrected: number | undefined= correctedIndex(index);

      if ((isNaN(corrected)) || (corrected < 0))
      {
        corrected = undefined;
      }

      const refs: SignRefs = 
      {
        signIndex: signIndex,
        signImage: signImage,
        signQuote: signQuote,
      }

      setSignRefs(refs, corrected);
     
     


    })

      
    const onElementResized = (entries: any) =>
    {

      window.requestAnimationFrame((): void | undefined =>
      {


        if (!Array.isArray(entries) || !entries.length || (resizableElement.value === null)) {
          return;
        }

        const entry = entries[0]
        const { width, height } = entry.contentRect
        text.value = `width: ${width}, height: ${Math.round(height)}`

        emit('elementResized', {width: Math.ceil(width), height: Math.ceil(height)});

      })
    }

    onMounted(() => {console.log("SIGN MOUNTED");});


   useResizeObserver(resizableElement, (entries) => {onElementResized(entries)});


   defineExpose({
    signQuote,
    getSign
    })



    return {
      // Enums
      Icon,

      // Local properties
      store,
      signIndex,
      signImage,
      signQuote,

      getPrevSign,
      getNextSign,
      getSign,

      resizableElement,
      text,
      
      // Event handlers
      onElementResized,
    };
   },


});



</script>

