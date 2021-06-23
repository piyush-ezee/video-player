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
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary">
            Continue
          </v-btn>
        </v-card-actions>
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
      contentURL: null,
      apiKey: 'AIzaSyC_28L2bV2wGcZZqk_0NbReNJBNV4V5BNI',
    }
  },
  methods: {
    async validateURL () {
      this.hostType = await this.checkHostName(new URL(this.url).hostname)
      this.isURLValid = this.checkURLFormat()
      if (this.isURLValid) {
        if (this.hostType === 'custom') {
          this.mimeType = await this.checkURLConnectivity(this.url)
          this.isContentValidated = [
            'video/mp4',
            'video/ogg',
            'video/webm',
          ].includes(this.mimeType)
        } else {
          this.isContentValidated = true
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
        const videoId = this.url.match(regExp)
        this.contentURL = `https://www.youtube.com/embed/${videoId[1]}?key=${this.apiKey}`
        return this.url.match(
          /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
        )
      } else if (this.hostType === 'gdrive') {
        // https://drive.google.com/file/d/1zwNlzfY25YGnpGMInrir0mqqeKQq2xIY/preview
        // `https://www.googleapis.com/drive/v3/files/${this.url.split('/')[5]}?key=${this.apiKey}`
        this.contentURL = `https://drive.google.com/file/d/${this.url.split('/')[5]}/preview`
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
      return new Promise(function (resolve) {
        const xhttp = new XMLHttpRequest()
        xhttp.open('HEAD', url)
        xhttp.onreadystatechange = function () {
          if (this.readyState === this.DONE) {
            resolve(this.getResponseHeader('Content-Type'))
          }
        }
        xhttp.send()
      })
    },
  },
}
</script>
