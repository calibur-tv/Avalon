<template>
  <v-modal class="create-post-modal"
           v-model="showModal"
           :footer="false"
           header-text="新建帖子">
    <v-form></v-form>
  </v-modal>
</template>

<script>
  import vForm from '~/components/creates/CreatePostForm'

  export default {
    name: 'create-post-modal',
    components: {
      vForm
    },
    data () {
      return {
        showModal: false
      }
    },
    mounted () {
      this.$channel.$on('show-create-post-modal', () => {
        this.$store.state.login
          ? this.showModal = true
          : this.$channel.$emit('sign-in')
      })
    }
  }
</script>
