export const serviceResultMixin = {
  methods: {
    displayError (reason) {
      this.$q.notify("Erreur lors de l'éxécution")
      this.$q.notify(
        'Code erreur : ' +
          reason.code +
          ' ; Message : ' +
          reason.statusText +
          ' ; RequestId : ' +
          reason.requestId
      )
    }
  }
}
