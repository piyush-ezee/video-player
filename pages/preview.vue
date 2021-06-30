<template>
  <div>
    <img v-if="contents[initIndex].contentType === 'image'" :src="currentContent.url">

    <video v-else controls autoplay muted>
      <source :src="contents[initIndex].url" type="video/mp4">
      <source :src="contents[initIndex].url" type="video/ogg">
      <source :src="contents[initIndex].url" type="video/webm">
    </video>
  </div>
</template>

<script>
export default {
  data () {
    return {
      durationTime: null,
      duration: 20000,
      initIndex: 0,
      contents: [
        {
          url:
            'https://www.cdc.gov/coronavirus/2019-ncov/videos/psa-side-effects/tnq1000-testimony-mateo-15-safety-en-v01_lowres.mp4',
          contentType: 'custom',
          duration: '00:00:15',
        },
        {
          url:
            'https://www.googleapis.com/drive/v3/files/1WfIDvoGKuCfveBqPjp-JFM0jDh1j3wGF?alt=media&key=AIzaSyC_28L2bV2wGcZZqk_0NbReNJBNV4V5BNI',
          contentType: 'gdrive',
          duration: '00:00:20',
        },
        {
          url:
            'https://www.learningcontainer.com/wp-content/uploads/2020/08/Large-Sample-png-Image-download-for-Testing.png',
          contentType: 'image',
          duration: '00:00:10',
        },
        {
          url:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          contentType: 'custom',
          duration: '00:00:20',
        },
        {
          url:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          contentType: 'custom',
          duration: '00:00:15',
        },
        {
          url:
            'https://www.googleapis.com/drive/v3/files/1WfIDvoGKuCfveBqPjp-JFM0jDh1j3wGF?alt=media&key=AIzaSyC_28L2bV2wGcZZqk_0NbReNJBNV4V5BNI',
          contentType: 'gdrive',
          duration: '00:00:10',
        },
      ],
      currentContent: {},
      contentIndex: 0,
      interval: null,
    }
  },
  mounted () {
    this.calculateNextContentIndexToPreview()
  },
  methods: {
    contentDuration (val) {
      let timesplit = []
      timesplit = val.split(':')
      let total = 0
      total = (Number((timesplit[0] * 60) * 60) + Number(timesplit[1] * 60) + Number(timesplit[2])) * 1000
      return total
    },
    calculateNextContentIndexToPreview () {
      if (this.contents.length > 0) {
        if (this.durationTime) {
          clearTimeout(this.durationTime)
        }
        this.durationTime = setTimeout(() => { this.startInterval() }, this.contentDuration(this.contents[0].duration))
      }
    },
    startInterval () {
      const contentListLength = Object.keys(this.contents).length
      if (contentListLength) {
        if (this.initIndex !== contentListLength - 1) {
          this.initIndex = this.initIndex + 1
          this.currentContent = this.contents[this.initIndex]
          this.duration = this.contentDuration(this.contents[this.initIndex].duration)
        } else {
          self.initIndex = 0
          this.currentContent = this.contents[0]
          this.duration = this.contentDuration(this.contents[this.initIndex].duration)
        }
        this.durationTime = setTimeout(this.startInterval, this.duration)
      }
    },
  },
}
</script>
<style scoped>
video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  background-size: cover;
}
img {
  min-width: 100%;
  min-height: 100%;
  max-height: 100%;
  max-width: 100%;
}
</style>
