const templates = {
  title: {
    type: 'title',
    text: ''
  },
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
  },
  list: {
    type: 'list',
    text: '',
    sort: ''
  },
  use: {
    type: 'use',
    text: ''
  }
}

export const state = () => ({
  resource: null,
  selectedIndex: 0,
  sections: [
    Object.assign({}, templates.title, { id: 0 }),
    Object.assign({}, templates.img, { id: 1 }),
    Object.assign({}, templates.txt, { id: 2 }),
    Object.assign({}, templates.list, { id: 3 }),
    Object.assign({}, templates.use, { id: 4 })
  ]
})

export const mutations = {
  SWITCH_SECTION(state, { index }) {
    state.selectedIndex = index
  },
  APPEND_SECTION(state, { type, index }) {
    const temp = templates[type]
    const template = {
      id: `${state.sections.length}-${Date.now()}`
    }
    Object.keys(temp).forEach(key => {
      template[key] = temp[key]
    })
    const targetIndex = index + 1
    state.sections.splice(targetIndex, 0, template)
    state.selectedIndex = targetIndex
  },
  UPDATE_SECTION_TEXT(state, { value }) {
    state.sections[state.selectedIndex].text = value
  },
  UPDATE_SECTION_SORT(state, { value }) {
    state.sections[state.selectedIndex].sort = value
  },
  UPDATE_SECTION_IMAGE(state, { url, width, height, size, mime }) {
    state.sections[state.selectedIndex].url = url
    state.sections[state.selectedIndex].width = width
    state.sections[state.selectedIndex].height = height
    state.sections[state.selectedIndex].mime = mime
    state.sections[state.selectedIndex].size = size
  },
  DELETE_SECTION(state, { index }) {
    state.sections.splice(index, 1)
    state.selectedIndex = 0
  },
  SORT_SECTION(state, { index }) {
    state.sections.splice(
      index - 1,
      1,
      ...state.sections.splice(index, 1, state.sections[index - 1])
    )
  },
  INIT_SECTION(state, data) {
    const sections = []
    data.content.forEach((section, index) => {
      section.id = `${index}-${Date.now()}`
      sections.push(section)
    })
    state.sections = sections
    state.resource = data
  }
}

export const actions = {
  async getData({ commit }, { api, id }) {
    const data = await api.edit({ id })
    data && commit('INIT_SECTION', data)
  }
}

export const getters = {}
