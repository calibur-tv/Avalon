const templates = {
  img: {
    type: 'img',
    url: '',
    width: 0,
    height: 0,
    mime: '',
    text: ''
  },
  txt: {
    type: 'txt',
    text: ''
  }
};

/**
 * section: [
 {
   type: 'img',
   url: 'https://image.calibur.tv/user/1/post/0/1531326716990-ak7.gif',
   width: 600,
   height: 906,
   size: 163171,
   mime: 'image/jpeg',
   text: 'prprpr'
 },
 {
   type: 'txt',
   text: '其实看fz动画入门的话，设定有所欠缺，还得要加fsn，<br>更深的设定得去游戏，抛开部分设定(圣杯战争起源，根源，魔法)，<br>fz是部相当不错的剧情番。等你了解了fate世界的设定后来对比着再看，又有新的体会'
 }
 ]
 */

const state = () => ({
  resource: null,
  selectedIndex: 0,
  sections: [templates.txt]
});

const mutations = {
  SWITCH_SECTION (state, { index }) {
    state.selectedIndex = index
  },
  APPEND_SECTION (state, { type, index }) {
    const temp = templates[type];
    const template = {};
    Object.keys(temp).forEach(key => {
      template[key] = temp[key]
    });
    const targetIndex = index + 1;
    state.sections.splice(targetIndex, 0, template);
    state.selectedIndex = targetIndex
  },
  UPDATE_SECTION_TEXT (state, { value }) {
    state.sections[state.selectedIndex].text = value
  },
  UPDATE_SECTION_IMAGE (state, { url, width, height, size, mime }) {
    state.sections[state.selectedIndex].url = url
    state.sections[state.selectedIndex].width = width
    state.sections[state.selectedIndex].height = height
    state.sections[state.selectedIndex].mime = mime
    state.sections[state.selectedIndex].size = size
  },
  DELETE_SECTION (state, { index }) {
    state.sections.splice(index, 1);
    state.selectedIndex = index - 1
  },
  SORT_SECTION (state, { index }) {
    state.sections.splice(index - 1, 1, ...state.sections.splice(index, 1, state.sections[index - 1]));
  },
  INIT_SECTION (state, data) {
    state.sections = data['content'];
    state.resource = data;
  }
};

const actions = {
  async getData ({ commit }, { api, id }) {
    const data = await api.edit({ id });
    commit('INIT_SECTION', data);
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
