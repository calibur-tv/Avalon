import Vue from 'vue'
import Time from '~/assets/js/timeago'
import NotSSR from '~/assets/js/notssr'
import Hr from '~/components/common/Hr'
import Header from '~/components/layouts/Header'
import Dialog from '~/components/common/Dialog'
import Layout from '~/components/layouts/Layout'
import VueClipboards from 'vue-clipboards'
import Affix from '~/components/common/Affix'
import Share from '~/components/common/Share'
import AvaDialog from '~/components/common/AvaDialog'
import LoadMoreBtn from '~/components/common/LoadMoreBtn'
import ReportDialog from '~/components/common/ReportDialog'
import UserCard from '~/components/user/UserCard'
import NoContent from '~/components/NoContent'
import BangumiPanel from '~/components/bangumi/BangumiPanel'
import FlowList from '~/components/flow/FlowList'
import LazyComponent from '~/components/common/LazyComponent'
import BangumiSearch from '~/components/search/BangumiSearch'
import VueImageLazier from 'vue-image-lazier'
import 'vue-image-lazier/dist/vue-image-lazier.css'
import resizeImage from '~/assets/js/resizeImage'

Vue.use(VueClipboards)
Vue.use(VueImageLazier, {
  filter: resizeImage,
  contentWidth: 700
})
Vue.component(LazyComponent.name, LazyComponent)
Vue.component(NotSSR.name, NotSSR)
Vue.component(BangumiSearch.name, BangumiSearch)
Vue.component(Header.name, Header)
Vue.component(Layout.name, Layout)
Vue.component(Time.name, Time)
Vue.component(Hr.name, Hr)
Vue.component(Dialog.name, Dialog)
Vue.component(Affix.name, Affix)
Vue.component(Share.name, Share)
Vue.component(AvaDialog.name, AvaDialog)
Vue.component(LoadMoreBtn.name, LoadMoreBtn)
Vue.component(ReportDialog.name, ReportDialog)

Vue.component(UserCard.name, UserCard)
Vue.component(NoContent.name, NoContent)
Vue.component(BangumiPanel.name, BangumiPanel)
Vue.component(FlowList.name, FlowList)
