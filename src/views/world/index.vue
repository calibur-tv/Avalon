<style lang="scss">
#the-world {
  .col-left {
    width: 280px;
    height: 1px;
    float: left;
    margin-right: 40px;
    margin-left: 5px;

    .side-bar {
      .router-link-active {
        background-color: $color-gray-normal;
      }

      a {
        display: block;
        padding: 15px;
        transition: 0.5s;
        border-radius: 5px;

        &:hover {
          background-color: $color-gray-normal;
        }
      }
    }
  }

  .col-right {
    overflow: hidden;

    .flow-intro {
      @extend %clearfix;
      margin-bottom: 20px;

      .img {
        width: 80px;
        height: 80px;
        border-radius: 8px;
        margin-right: 20px;
        float: left;
        color: #fff;
        text-align: center;
        cursor: default;
        font-weight: bold;
        user-select: none;
        font-size: 36px;
        line-height: 80px;
      }

      .intro {
        overflow: hidden;

        .summary {
          overflow: hidden;

          .title {
            margin-top: 10px;
            font-size: 17px;
          }

          .extra {
            margin-top: 8px;
            font-size: 14px;
            color: $color-text-normal;
          }
        }

        .control {
          float: right;
          margin-top: 10px;
          margin-left: 10px;
        }
      }

      .detail {
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 8px;
        padding-right: 25px;
        background-color: $color-gray-normal;
        color: $color-text-normal;

        p {
          margin-bottom: 5px;
          font-size: 13px;
          line-height: 18px;
        }

        a {
          color: $color-blue-normal;
          transition: 0.4s;

          &:hover {
            color: $color-blue-deep;
          }
        }
      }
    }

    .load-more-btn {
      width: 100%;
    }
  }
}
</style>

<template>
  <div id="the-world">
    <v-header type="pure"/>
    <div class="container">
      <div class="col-left">
        <v-affix
          relative-element-selector="#the-world"
          style="width: 280px"
        >
          <ul class="side-bar">
            <li>
              <router-link :to="$alias.world('post')">
                帖子
              </router-link>
            </li>
            <li>
              <router-link :to="$alias.world('image')">
                相册
              </router-link>
            </li>
            <li>
              <router-link :to="$alias.world('review')">
                漫评
              </router-link>
            </li>
            <li>
              <router-link :to="$alias.world('qaq')">
                问答
              </router-link>
            </li>
          </ul>
        </v-affix>
      </div>
      <div class="col-right">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheWorld"
};
</script>
