<style lang="scss" module>
.container {
  position: relative;
  margin: 0 auto;
  @extend %clearfix;

  .main-left,
  .main-right {
    overflow: hidden;
  }

  .main-left {
    padding-left: 15px;
  }

  .main-right {
    padding-right: 15px;
  }

  .aside-left {
    float: left;
  }

  .aside-right {
    float: right;
  }

  @media (min-width: 1050px) {
    width: 1170px;

    .aside-left,
    .aside-right {
      width: 280px;
    }

    .aside-right {
      margin-left: 40px;
    }

    .aside-left {
      margin-right: 40px;
    }
  }

  @media (max-width: 1080px) {
    width: 880px;

    .aside-left,
    .aside-right {
      width: 220px;
    }

    .aside-right {
      margin-left: 30px;
    }

    .aside-left {
      margin-right: 30px;
    }
  }
}
</style>

<template>
  <section :class="[$style.container, customClass]">
    <template v-if="left">
      <aside :class="$style.asideRight">
        <slot name="aside"/>
      </aside>
      <main :class="$style.mainLeft">
        <slot/>
      </main>
    </template>
    <template v-else>
      <aside :class="$style.asideLeft">
        <v-affix
          v-if="fixed"
          :offset-top="affixTop"
        >
          <slot name="aside"/>
        </v-affix>
        <slot
          v-else
          name="aside"
        />
      </aside>
      <main :class="$style.mainRight">
        <slot/>
      </main>
    </template>
  </section>
</template>

<script>
export default {
  name: 'VLayout',
  props: {
    left: {
      type: Boolean,
      default: true
    },
    affixTop: {
      type: Number,
      default: 85
    },
    customClass: {
      type: String,
      default: ''
    },
    fixed: {
      type: Boolean,
      default: true
    }
  }
}
</script>
