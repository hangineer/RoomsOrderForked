<template>
  <div class="bg-primary-10">
    <RoomBanner :room-info="roomInfo" />
    <main class="rooms-detail container">
      <RoomDetail :room-info="roomInfo" />
      <section class="right d-none d-md-block">
        <div class="booking-box  gap-7  d-flex flex-column">
          <h5 class=" fw-bold border-bottom border-neutral-40 pb-3">預訂房型</h5>
          <div>
            <h2 class="fw-bold text-neutral-80">{{ roomInfo.name }}</h2>
            <p class="text-neutral-80">{{ roomInfo.description }}</p>
          </div>
          <div>
            <div class="d-flex gap-2 mb-3 position-relative">
              <div class="check-date-box" @click="roomTypeStoreInfo.showDatePicker(true)">
                <p class="mb-0 fs-tiny">入住</p>
                <p class="mb-0">
                  {{ dayjs(range.start).format('YYYY/MM/DD') }}
                </p>
              </div>
              <div class="check-date-box" @click="roomTypeStoreInfo.showDatePicker(true)">
                <p class="mb-0 fs-tiny">退房</p>
                <p class="mb-0">
                  {{ dayjs(range.end).format('YYYY/MM/DD') }}
                </p>
              </div>
              <!-- modal -->
              <div class="full-bg-black" v-show="isShowDatePicker" @click="dialog"></div>
              <div :class="{ 'dialog-wrapper': isShowDatePicker }">
                <div class="card-box" v-show="isShowDatePicker">
                  <div class="card text-start">
                    <div class="card-top">
                      <div class="d-flex gap-2 flex-column">
                        <h5 class="mb-2 fw-bold">{{ nightCount }} 晚</h5>
                        <div class="d-flex gap-2">
                          <p class="text-neutral-80 mb-0">{{ dayjs(range.start).format('YYYY/ MM / DD') }}</p>
                          <p class="text-neutral-80 mb-0">-</p>
                          <p class="text-neutral-80 mb-0">{{ dayjs(range.end).format('YYYY/ MM / DD') }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="card-body">

                      <VDatePicker v-model.range="range" mode="date" :columns="columns" :expanded="true" :rows="rows"
                        :masks="{ title: 'YYYY 年 MM 月' }" timezone="UTC" />
                    </div>
                    <div class="card-footer gap-3">
                      <button type="button" class="btn btn-white px-6 py-3" @click="cleanDate">
                        清除日期
                      </button>
                      <button type="button" class="btn btn-primary px-6 py-3" @click="roomTypeStoreInfo.showDatePicker(false)">
                        確定日期
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <p class="fw-bold mb-0">人數</p>
              <div class="d-flex align-items-center justify-content-center gap-3">
                <button type="button" class="btn rounded-circle btn-outline-neutral-40 lh-0 p-3" @click="decBtn"
                  :disabled="chickinPeople === 1">
                  <span class="material-symbols-outlined"
                    :class="{ 'text-black': chickinPeople !== 1, 'text-neutral-40': chickinPeople === 1 }">
                    remove </span>
                </button>
                <h6 class=" fw-bold">
                  {{ chickinPeople }}
                </h6>
                <button type="button" class="btn rounded-circle btn-outline-neutral-40 lh-0 p-3" @click="addBtn"
                  :disabled="chickinPeople === roomInfo.maxPeople">
                  <span class="material-symbols-outlined"
                    :class="{ 'text-black': chickinPeople !== roomInfo.maxPeople, 'text-neutral-40': chickinPeople === roomInfo.maxPeople }">
                    add </span>
                </button>
              </div>
            </div>
          </div>
          <h5 class="text-primary fw-bold">NT$ {{ moneyFormat(roomInfo.price * nightCount) }}</h5>
          <button type="button" class="btn btn-primary w-100 px-6 py-3 fw-bold" @click="toBooking">

            立即預訂
          </button>
        </div>
      </section>
    </main>
    <RoomDatePickerMobile :room-info="roomInfo" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useScreens } from 'vue-screen-utils'
import dayjs from 'dayjs'
import mixin from '@/mixin/globalMix'
import { roomTypeStore } from '@/stores/room'
// @ts-ignore
import RoomBanner from '@/components/Room/RoomBanner.vue'
// @ts-ignore
import RoomDetail from '@/components/Room/RoomDetail.vue'
// @ts-ignore
import RoomDatePickerMobile from '@/components/Room/RoomDatePickerMobile.vue'

const { moneyFormat } = mixin.methods
const router = useRouter()
const route = useRoute()
const roomTypeStoreInfo = roomTypeStore()
const { id } = route.params
const chickinPeople = ref<number>(2)

onMounted(async () => {
  const { end, people, start } = route.query
  if (end && people && start) {
    range.value = {
      start: dayjs.unix(Number(start) / 1000).format('YYYY-MM-DD') as any,
      end: dayjs.unix(Number(end) / 1000).format('YYYY-MM-DD') as any
    }
    chickinPeople.value = Number(people)
  }

  const roomId: string = Array.isArray(id) ? id[0] : id.toString()
  await roomTypeStoreInfo.getRoomInfo(roomId)
})

const { roomInfo, isShowDatePicker } = storeToRefs(roomTypeStoreInfo)

const { mapCurrent } = useScreens({ xs: '0px', sm: '640px', md: '768px', lg: '1024px' })
const columns = mapCurrent({ lg: 2 }, 1)
const rows = mapCurrent({ lg: 1 }, 2)

const tomorrow = dayjs().add(1, "day");
const defaultEndDay = tomorrow.add(5, "day");

function toBooking() {
  const startdate = new Date(range.value.start.toISOString()).getTime();
  router.push({ name: 'roomsReserved', params: { id, startdate, days: nightCount.value, people: chickinPeople.value } })
}

let range = ref({
  start: new Date(tomorrow.format('YYYY-MM-DD')),
  end: new Date(defaultEndDay.format('YYYY-MM-DD')),
});

const nightCount = ref<number>(0);

watchEffect(() => {
  nightCount.value = dayjs(range.value.end).diff(range.value.start, 'day');
});


function cleanDate() {
  range.value = {
    start: new Date(),
    end: new Date(),
  }
}
function addBtn() {
  if (chickinPeople.value < roomInfo.value.maxPeople) {
    chickinPeople.value += 1
  }

}

function decBtn() {
  if (chickinPeople.value > 1) {
    chickinPeople.value -= 1
  }
}

function dialog(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target.classList.contains('full-bg-black')) {
    roomTypeStoreInfo.showDatePicker(false)
  }
}
</script>

<style lang="scss" scoped>
.rooms-detail {
  margin-top: 40px;
  margin-bottom: 40px;

  .right {
    flex: 1 1 478px;
    position: relative;

    .booking-box {
      background-color: white;
      border-radius: 20px;
      padding: 40px;
      position: sticky;
      top: 160px;
    }
  }
}

.check-date-box {
  cursor: pointer;
  border: 1px solid black;
  border-radius: 8px;
  padding: 16px;
  flex-grow: 1;
  position: relative;
  z-index: 4;
}

.full-bg-black {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  top: 0;
  left: 0;
  transition: all 0.3s;
  z-index: 990;
}

.card-box {
  width: 740px;
  top: -32px;
  right: -32px;
  position: absolute;
  z-index: 3;
  transition: all 0.3s;
}

.card {
  padding: 32px;
  border: 0;
}

.card-top {
  min-height: 74px;
  margin-bottom: 40px;
}

.card-body {
  margin-bottom: 40px;
}

.dialog-wrapper {
  position: fixed;
  top: 100px;
  left: -320px;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.card-footer {
  display: flex;
  justify-content: end;
  background-color: white;
  border: 0;
  padding: 0;
}

@include media-breakpoint-up(md) {
  .rooms-detail {
    margin-top: 120px;
    margin-bottom: 120px;
    display: flex;
    gap: 72px;
  }

}
</style>

