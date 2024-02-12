<script>
import userService from '../services/user.service.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      formState: {
        email: '',
        password: ''
      },
      headerStyle: {
        textAlign: 'center',
        color: '#fff',
        height: 150,
        paddingInline: 50,
        lineHeight: '64px'
      }
    }
  },
  components: {},
  computed: {
    ...mapGetters(['getUserInfoState']),
    isLoggedIn() {
      return this.getUserInfoState
    }
  },
  watch: {
    isLoggedIn() {
      this.$router.push('/')
    }
  },
  methods: {
    onFinish(values) {
      userService.login(values).then(
        (res) => {
          if (res) {
            this.$store.dispatch('setUserInformation')
          } else {
            alert('Email or password wrong!')
          }
        },
        (err) => {
          console.log('Somethings went wrong!', err.response.data.error)
        }
      )
    },
    onFinishFailed(errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }
}
</script>

<template>
  <div :style="headerStyle" class="headerLogin"><img src="/Screenshot_1.png" alt="" /></div>
  <div class="contentLogin">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item name="email" label="Email" :rules="[{ type: 'email' }]">
        <a-input v-model:value="formState.email" />
      </a-form-item>
      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Login</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped lang="scss">
.headerLogin {
  height: 150px;
  background: transparent;
}

.contentLogin {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
</style>
