<template>
  <div class="bg-light">
    <div class="container room-list">
      <div class="my-7 mt-lg-10 mb-lg-9">
        <p class="text-neutral-80 fs-small fs-lg-6">房型選擇</p>
        <h2 class="text-primary fs-lg-1 fs-3 fw-bold">各種房型，任您挑選</h2>
      </div>
      <ul class="ps-0">
        <li v-for="room in roomList" :key="room._id" class="card">
          <div class="row g-0 align-items-center">
            <div class="col-lg-7">
              <swiper
                v-if="roomStatus"
                class="swiper"
                :modules="modules"
                :loop="true"
                :autoplay="true"
                :pagination="pagination"
                :navigation="navigation"
              >
                <swiper-slide>
                  <img :src="room.imageUrl" class="room-img card-img-top rounded-0" alt="room cover">
                </swiper-slide>
                <swiper-slide v-for="(src, i) in room.imageUrlList" :key="i">
                  <img :src="src" class="room-img card-img-top rounded-0" alt="room">
                </swiper-slide>
                <div class="swiper-pagination"></div>
                <div class="swiper-btn bg-white d-none d-lg-flex  swiper-btn-prev">
                  <img src="@/assets/icons/prev.svg" alt="prev arrow">
                </div>
                <div class="swiper-btn bg-white d-none d-lg-flex  swiper-btn-next">
                  <img src="@/assets/icons/next.svg" alt="next arrow">
                </div>
            </swiper>
            </div>
            <div class="col-lg-5">
              <div class="card-body p-4 px-lg-5">
                <h3 class="card-title text-black fw-bold">{{ room.name }}</h3>
                <p class="card-text text-secondary mb-5">享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。</p>
                <ul class="d-flex text-black ps-0">
                  <li class="room-detail-icon border border-primary-40 py-4 px-3 me-3">
                    <img class="mb-2" src="@/assets/icons/roomSize.svg" alt="room size">
                    <p>{{ room.areaInfo }}</p>
                  </li>
                  <li class="room-detail-icon border border-primary-40 py-4 px-3 me-3">
                    <img class="mb-2" src="@/assets/icons/roomBed.svg" alt="room bed">
                    <p>{{ room.bedInfo }}</p>
                  </li>
                  <li class="room-detail-icon border border-primary-40 py-4 px-3">
                    <img class="mb-2" src="@/assets/icons/roomPeople.svg" alt="room people">
                    <p>{{ `1${room.maxPeople ? - `${room.maxPeople}` : ''}人` }}</p>
                  </li>
                </ul>
                <div class="line-deco my-3 my-lg-5"></div>
                <div class="d-flex justify-content-between align-items-center">
                  <p class="mb-0 text-primary fs-3 fw-bold">
                    <span>NT$</span>
                    {{ room.price.toLocaleString() }}
                  </p>
                  <button class="detail-btn" @click="toRoomDetail(room._id)" >
                    <img class="arrow-right-icon" src="@/assets/icons/arrowRight.svg" alt="arrowRight" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="d-flex justify-content-center">
        <!-- <PaginationComponent class="mb-5" :pages="pages" @change="selectPage" /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import  { roomTypeStore }  from '@/stores/room'
// import { paginationStore } from '@/stores/pagination'
// import PaginationComponent from '@/components/Common/PagePagination.vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import router from '@/router';

// Pagination
// const pageStore = paginationStore()
// const { pages } = storeToRefs(pageStore)

// const { turnPage } = pageStore
const selectPage = (page: number) => {
  // turnPage(page)
}
// Swiper
const modules = [Navigation, Pagination]
const navigation = {
  nextEl: '.swiper-btn-next',
  prevEl: '.swiper-btn-prev',
}
const pagination = {
  clickable: true,
  el:'.swiper-pagination'
}

// Room Data
const roomTypeStoreInfo = roomTypeStore()
const { roomList, roomStatus } = storeToRefs(roomTypeStoreInfo)

onMounted(async () => {
  await roomTypeStoreInfo.getRoomList()
});

const toRoomDetail = async (id: string) => {
  await router.push({ name: 'roomDetail', params: { id } })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

</script>

<style lang="scss" scoped>
.room-list {
  .card {
    border-radius: 15px;
    overflow: hidden;
    margin-bottom: 24px;
    .room-img {
      height: 200px;
      object-fit: cover;
    }
    @include lg {
      margin-bottom: 48px;
      .room-img {
        height: 470px;
      }
    }
  }
}
.room-detail-icon {
  color: $black;
  width: 97px;
  height: 97px;
  border-radius: 8px;
}
.arrow-right-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.line-deco {
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, #be9c7c, $white);
}
.swiper {
  width: 100%;
  height: auto;
}
.room-list .swiper-btn {
  position: absolute;
  cursor: pointer;
  z-index: 10;
  color: #be9c7c;
  font-size: 20px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  &-prev {
    top: 45%;
    left: 24px;
  }

  &-next {
    top: 45%;
    right: 24px;
  }
}
.detail-btn {
  background: none;
  border: 0;
}
</style>