<template>
  <div :class="className">
    <div v-if="shouldRenderClockPeriod" class="clock__placeholder"></div>
    <div class="clock__time">{{ clockTime }}</div>
    <div v-if="shouldRenderClockPeriod" class="clock__period">{{ clockPeriod }}</div>
  </div>
</template>
  
<style>
  /* Should be defined in sign.scss */
</style>
 
<script lang="ts">

  import { ClockMode } from '@/scripts/enums/ClockMode';
  import { rightJustify } from '@/scripts/utility';
  import { computed, defineComponent, ref, onMounted, onUnmounted } from 'vue';

  export default defineComponent({
    name: "ClockComponent",
    props:
    {
        clockMode: {type: Number, required: false, default: ClockMode.DECREASING},
    },

    setup(props, {emit}) 
    {
      const clockTime = ref("00:00:00");
      const clockPeriod = ref("AM");
      const clockInterval = ref<number | undefined>(undefined);
      const previousTime = ref<Date>(new Date());

      const shouldRenderClockPeriod = computed(() => 
        { return (props.clockMode === ClockMode.INCREASING_12H) ? true : false; });

      const className = computed(() => 
      {
        switch (props.clockMode)
        {
          case ClockMode.INCREASING_24H:
            return "clock clock--increasing clock--24h";
          
          case ClockMode.INCREASING_12H:
            return "clock clock--increasing clock--12h clock--"+clockPeriod.value.toLowerCase();
          
          case ClockMode.DECREASING:
            return "clock clock--decreasing";
          
          default:
            return "clock clock--unknown";
        } 
      });

      const updateClock = () => 
      {   
        const currentTime = new Date();

        if (previousTime.value.getDate() !== currentTime.getDate())
        {
          emit('newDayStarted');
          previousTime.value = currentTime;
        }
       
        switch (props.clockMode)
        {
          case ClockMode.INCREASING_24H:
          {
            const hours = rightJustify(currentTime.getHours().toString(), 2, "0");
            const minutes = rightJustify(currentTime.getMinutes().toString(), 2, "0");
            const seconds = rightJustify(currentTime.getSeconds().toString(), 2, "0");

            clockTime.value =  hours+":"+minutes+":"+seconds;

            break;
          }
         
          case ClockMode.INCREASING_12H:
          {
            let hoursValue = currentTime.getHours();
            
            if (hoursValue < 12)
            {
              clockPeriod.value = "AM";
            }
            else
            {
              clockPeriod.value = "PM";
              if (hoursValue != 12)
              {
                hoursValue = hoursValue % 12;
              }
            }

            const hours = rightJustify(hoursValue.toString(), 2, "0");
            const minutes = rightJustify(currentTime.getMinutes().toString(), 2, "0");
            const seconds = rightJustify(currentTime.getSeconds().toString(), 2, "0");

            clockTime.value =  hours+":"+minutes+":"+seconds;

            break;
          }
               
          case ClockMode.DECREASING:
          {
            const endTime = 24 * 60 * 60;
            let remainingTime =
              endTime - (currentTime.getHours() * 60 * 60 + currentTime.getMinutes() * 60 + currentTime.getSeconds());

            const hours = rightJustify(Math.floor(remainingTime / (60 * 60)).toString(), 2, "0");
            remainingTime = remainingTime - Math.floor(remainingTime / (60 * 60))  * (60 * 60);

            const minutes = rightJustify(Math.floor(remainingTime / (60)).toString(), 2, "0");
            remainingTime = remainingTime - Math.floor(remainingTime / (60))  * (60);
              
            const seconds = rightJustify(Math.floor(remainingTime).toString(), 2, "0");
              
            clockTime.value =  hours+":"+minutes+":"+seconds;

            break;
          }   
        }
      };

      onMounted(() =>
      { 
        updateClock();
        clockInterval.value = setInterval(updateClock, 1000);
      });

      onUnmounted(() => 
      {
        clearInterval(clockInterval.value);
      });

      return {
        clockTime,
        clockPeriod,
        className,
        shouldRenderClockPeriod,
        previousTime
      };
    }
  });

</script>
  