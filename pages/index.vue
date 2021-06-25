<template>
  <v-row justify="center" align="center">
    <v-col cols="5" md="5">
      <div class="mt-5">
        <h4 class="success--text">
          Valid URLs
        </h4>
        <ul class="mt-2">
          <li>https://www.youtube.com/watch?v=668nUCeBHyY</li>
          <li>
            https://drive.google.com/file/d/1z3POmLuS12FLC0_hksEdVZQWi1gDJ_im/view?usp=sharing
          </li>
          <li>
            https://www.cdc.gov/coronavirus/2019-ncov/videos/psa-side-effects/tnq1000-testimony-mateo-15-safety-en-v01_lowres.mp4
          </li>
        </ul>
        <h4 class="error--text mt-2">
          Invalid/InAccessible URLs
        </h4>
        <ul class="mt-2">
          <li>https://www.youtube.com/watch?v=yijs5GqmgBU</li>
          <li>
            https://drive.google.com/file/d/12NQ9B5pcrMSTHA08ey4s4z8GBA4qXwDj/view?usp=sharing
          </li>
          <li>
            https://www.cdc.gov/coronavirus/2019-ncov/videos/psa-side-effects/tnq1000-testimony-mateo-15-safety-en-v01_lowres.mp
          </li>
        </ul>
      </div>
    </v-col>
    <v-col cols="7" md="7">
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
                width="550"
                height="250"
                allow="Content-Security-Policy: frame-ancestors 'none'; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                autoplay
              />
            </template>
            <template v-else-if="hostType === 'custom'">
              <video
                width="550"
                height="250"
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
      apiURL: 'https://express-player.herokuapp.com',
    }
  },
  methods: {
    async validateURL () {
      this.hostType = null
      this.contentURL = null
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
        const temp = this.url.match(regExp)
        this.contentId = temp ? temp[1] : null
        return this.url.match(
          /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
        )
      } else if (this.hostType === 'gdrive') {
        const temp = this.url.split('/')[5]
        this.contentId = temp || null
        this.contentURL = `https://drive.google.com/file/d/${this.contentId}/preview`
        return this.url.match(
          /^(https:\/\/drive\.google\.com\/)file\/d\/([^]+)\/.*$/,
        )
      } else if (this.hostType === 'custom') {
        this.contentURL = this.url
        return this.url.match(
          /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\\.-]+)+[\w\-\\._~:/?#[\]@!\\$&'\\(\\)\\*\\+,;=.]+$/,
        )
      }
    },
    checkURLConnectivity (url) {
      return this.$axios
        .get(`${this.apiURL}/check-mime?u=${url}`)
        .then((res) => {
          return res.data
        })
    },
    checkYoutubePermission () {
      this.$axios
        .get(
          `${this.apiURL}/check-youtube-permissions?contentId=${this.contentId}`,
        )
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
        .get(
          `${this.apiURL}/check-gdrive-permissions?contentId=${this.contentId}`,
        )
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
