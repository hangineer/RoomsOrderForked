<template>
  <main class="bg-neutral-bg text-white">
    <div class="container">
      <div class="row">
        <div class="p-5 d-flex gap-3 align-item-center"></div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-md-7">
            <div class="d-flex gap-4">
              <div class="d-flex justify-content-center">
                <img
                  class="rounded img-fluid"
                  src="../../assets//svg/BookingSuccess.svg"
                  alt="Room Image"
                />
              </div>
              <div>
                <h3>恭喜，{{ data.name }}！</h3>
                <h3>您已預訂成功</h3>
              </div>
            </div>
            <div class="py-3"></div>

            <div class="d-flex justify-content-between">
              <span>
                <p>
                  我們已發送訂房資訊及詳細內容至你的電子信箱，入住時需向櫃檯人員出示訂房人證件。
                </p>

                <br />
              </span>
            </div>

            <hr />
            <div class="py-5"></div>

            立即查看您的訂單紀錄
            <div class="py-4"></div>

            <div class="d-flex">
              <button @click="gotoHistoryOrderPage" class="btn btn-primary">前往我的訂單</button>
            </div>

            <div class="py-5"></div>

            <hr />

            <h4>訂房人資訊</h4>

            <div class="py-3"></div>

            <div>姓名</div>
            <span>{{ data.name }} </span>
            <div class="py-3"></div>

            <div>手機號碼</div>
            <span>{{ data.phone }} </span>
            <div class="py-3"></div>

            <div>電子信箱</div>
            <span>{{ data.email }} </span>
            <div class="py-3"></div>
          </div>
          <div class="col-md-5 rounded text-black">
            {{ roomInfo }}
            <NextRoom :room-info="_OrderData" />
            <!-- <NextRoom :room-info="{} as orderData" /> -->
          </div>
        </div>
      </div>
      <img src="../../assets/image/desktop/Line.png" alt="Line" class="mt-8 py-5" />
    </div>
  </main>
</template>

<style scoped lang="scss">
.flex-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: blue;
}

.flex-item {
  flex-basis: calc(15% - 10px); /* 20% width with 10px spacing */
  margin-bottom: 10px; /* Adjust spacing as needed */
}
</style>

<script setup lang="ts">

import { useRouter } from 'vue-router'
import { ref, watch, onMounted } from 'vue'
import NextRoom from '../../components/UserCenter/NextRoom.vue'
import fetchAPI from '../../mixin/fetchAPI'
import type { orderData } from '../../interface/order'
import { type userInfo } from '@/interface/user'
const router = useRouter()
const _OrderData = ref<orderData>({
  _id: '',
  checkInDate: '',
  checkOutDate: '',
  peopleNum: 0,
  roomId: {
    name: '',
    amenityInfo: [],
    facilityInfo: [],
    imageUrl: '',
    layoutInfo: [],
    price: 0
  }
})

const { roomInfo } = defineProps(['roomInfo'])
const userData = JSON.parse(localStorage.getItem('user') as string)
const data = ref<userInfo>({

  _id: '',
  name: '',
  phone: '',
  birthday: '',
  address: {
    zipcode: 1,
    detail: ''
  },
  email: '',
  createdAt: '',
  updatedAt: ''
})
// const _userName = ref<string>('')
// const _phone = ref<string>('')
// const _email = ref<string>('')

onMounted(() => {
  data.value.name = userData.name
  data.value.phone = userData.phone
  data.value.email = userData.email
  fetchOrderDetail()
})
function gotoHistoryOrderPage() {
  router.push('/user/myOrder')
}
async function fetchOrderDetail() {
  const res = await fetchAPI(`/api/v1/orders/`, 'GET')
  const { result } = res
    _OrderData.value = result.sort((a:any, b:any) => new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime()).filter((item: any) => new Date(item.checkInDate).getTime() >= new Date().getTime() && item.status !== -1)[0]
}
</script>
