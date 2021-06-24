<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline mt-5">
          Video Player
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="url"
            placeholder="Enter Media URL"
            append-outer-icon="mdi-arrow-right"
            @click:append-outer="validateURL"
          />
          <div v-if="isContentValidated">
            <template v-if="['youtube', 'gdrive'].includes(hostType)">
              <iframe
                :src="contentURL"
                width="700"
                height="500"
                allow="Content-Security-Policy: frame-ancestors 'none'; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            </template>
            <template v-else-if="hostType === 'custom'">
              <video
                width="700"
                height="500"
                autoplay
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                :src="contentURL"
              />
            </template>
          </div>
          <div v-else>
            Invalid URL
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      url: '',
      hostType: null,
      mimeType: null,
      contentId: null,
      isURLValid: false,
      isContentValidated: false,
      message: '',
      contentURL: null,
      mimeTypes: ['video/mp4', 'video/ogg', 'video/webm'],
      // apiURL: 'http://localhost:3001',
      apiURL: 'https://express-player.herokuapp.com/',
    }
  },
  methods: {
    async validateURL () {
      this.hostType = await this.checkHostName(new URL(this.url).hostname)
      this.isURLValid = this.checkURLFormat()
      if (this.isURLValid) {
        if (this.hostType === 'custom') {
          this.mimeType = await this.checkURLConnectivity(this.url)
          this.isContentValidated = this.mimeTypes.includes(this.mimeType)
        } else if (this.hostType === 'youtube') {
          await this.checkYoutubePermission()
        } else if (this.hostType === 'gdrive') {
          await this.checkGDrivePermission()
        }
      } else {
        this.isContentValidated = false
      }
    },
    checkHostName (hostname) {
      if (!hostname) {
        return false
      }
      if (hostname.includes('youtube') || hostname.includes('youtu.be')) {
        return 'youtube'
      } else if (hostname.includes('drive')) {
        return 'gdrive'
      } else {
        return 'custom'
      }
    },
    checkURLFormat () {
      if (this.hostType === 'youtube') {
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
        this.contentId = this.url.match(regExp)[1]
        return this.url.match(
          /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
        )
      } else if (this.hostType === 'gdrive') {
        this.contentId = this.url.split('/')[5]
        this.contentURL = `https://drive.google.com/file/d/${this.contentId}/preview`
        return this.url.match(
          /^(https:\/\/drive\.google\.com\/)file\/d\/([^]+)\/.*$/,
        )
      } else if (this.hostType === 'custom') {
        this.contentURL = this.url
        return this.url.match(
          /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
        )
      }
    },
    checkURLConnectivity (url) {
      return this.$axios
        .get(`http://localhost:3001/check-mime?u=${url}`)
        .then((res) => {
          return res.data
        })
    },
    checkYoutubePermission () {
      this.$axios
        .get(`${this.apiURL}/check-youtube-permissions?contentId=${this.contentId}`)
        .then((res) => {
          if (res && res.data.items.length === 0) {
            this.isContentValidated = false
          } else if (
            res &&
            res.data.items.length > 0 &&
            (res.data.items[0].snippet.liveBroadcastContent === 'live' ||
              res.data.items[0].snippet.liveBroadcastContent === 'upcoming')
          ) {
            this.isContentValidated = false
          } else if (
            res &&
            res.data.items.length > 0 &&
            (res.data.items[0].snippet.liveBroadcastContent === 'none' ||
              res.data.items[0].snippet.liveBroadcastContent === 'completed')
          ) {
            this.isContentValidated = true
            this.contentURL = `https://www.youtube.com/embed/${res.data.items[0].id}`
          } else {
            this.isContentValidated = false
          }
        })
        .catch(() => {
          this.isContentValidated = false
        })
    },
    checkGDrivePermission () {
      this.$axios
        .get(`${this.apiURL}/check-gdrive-permissions?contentId=${this.contentId}`)
        .then((res) => {
          if (this.mimeTypes.includes(res.data.mimeType)) {
            this.isContentValidated = true
          } else {
            this.isContentValidated = false
          }
        })
        .catch(() => {
          this.isContentValidated = false
        })
    },
  },
}
</script>
