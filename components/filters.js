import _ from "lodash"

export default {
  methods: {
    passwordFilter(p) {
      /** 8 characters min, 1 special, 1 number */
      return /(?=.*\d)(?=.*[~!@#$%\^&\*_\-\+\=\`|\(\){}\[\]\:;\"\'<>\,\.\?\/])/i.exec(
        p
      )
    },
    emailFilter(s) {
      return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.exec(
        s
      )
    },
    urlFilter(s) {
      let url
      try {
        url = new URL(s)
      } catch (_) {
        return false
      }
      return url.protocol === "http:" || url.protocol === "https:"
    },
    textFilter(s) {
      return _.trim(s)
    },
  },
}
