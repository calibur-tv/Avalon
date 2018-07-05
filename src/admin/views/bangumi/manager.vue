<template>
  <div id="bangumi-manager">
    <header>
      <bangumi-search @submit="searchBangumiManager"/>
    </header>
  </div>
</template>

<script>
  import Api from '~/api/adminApi'
  import BangumiApi from '~/api/bangumiApi'

  export default {
    components: {

    },
    props: {

    },
    data () {
      return {
        bangumiId: 0,
        list: [],
        loading: false
      }
    },
    computed: {

    },
    watch: {

    },
    created () {

    },
    mounted () {

    },
    methods: {
      searchBangumiManager (id) {
//        if (id === this.bangumiId) {
//          return
//        }
//        if (this.loading) {
//          return
//        }
//        this.loading = true;
//        this.bangumiId = id;
//        this.searchManagers()
      },
      async searchManagers() {
        const api = new BangumiApi(this);
        try {
          this.list = await api.getBangumiManagers({
            bangumiId: this.bangumiId
          })
        } catch (err) {
          this.$toast.error(err)
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>
