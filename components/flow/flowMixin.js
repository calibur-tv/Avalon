export default {
  props: {
    id: {
      type: [Number, String],
      default: ''
    },
    func: {
      required: true,
      type: String
    },
    type: {
      required: true,
      type: String
    },
    sort: {
      required: true,
      type: String
    },
    changing: {
      type: String,
      default: 'id'
    },
    auto: {
      type: Boolean,
      default: true
    }
  }
}
