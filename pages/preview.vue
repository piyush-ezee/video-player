<template>
  <div>
    <template v-if="contents[initIndex].contentType === 'image'">
      <img
        :src="contents[initIndex].url"
        :width="windowSize.x"
        :height="windowSize.y"
      >
    </template>

    <template v-else>
      <video
        id="video_id"
        autoplay
        muted
        :width="windowSize.x"
        :height="windowSize.y"
        poster="https://i0.wp.com/thumbs.gfycat.com/LittleBestAmoeba-size_restricted.gif"
      >
        <source :src="contents[initIndex].url" type="video/mp4">
        <source :src="contents[initIndex].url" type="video/ogg">
        <source :src="contents[initIndex].url" type="video/webm">
      </video>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      durationTime: null,
      duration: 20000,
      initIndex: 0,
      windowSize: { x: window.innerWidth, y: window.innerHeight },
      contents: [
        {
          url: 'https://www.googleapis.com/drive/v3/files/1z3POmLuS12FLC0_hksEdVZQWi1gDJ_im?alt=media&key=AIzaSyC_28L2bV2wGcZZqk_0NbReNJBNV4V5BNI',
          contentType: 'gdrive',
          duration: '00:00:30',
        },
        {
          url: 'https://drive.google.com/uc?export=download&id=1z3POmLuS12FLC0_hksEdVZQWi1gDJ_im',
          contentType: 'gdrive',
          duration: '00:00:30',
        },
        {
          url:
            'https://www.learningcontainer.com/wp-content/uploads/2020/08/Large-Sample-png-Image-download-for-Testing.png',
          contentType: 'image',
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
      total =
        (Number(timesplit[0] * 60 * 60) +
          Number(timesplit[1] * 60) +
          Number(timesplit[2])) *
        1000
      return total
    },
    calculateNextContentIndexToPreview () {
      if (this.contents.length > 0) {
        if (this.durationTime) {
          clearTimeout(this.durationTime)
        }
        this.durationTime = setTimeout(() => {
          this.startInterval()
        }, this.contentDuration(this.contents[0].duration))
      }
    },
    startInterval () {
      const contentListLength = this.contents.length
      if (contentListLength) {
        const videoElement = document.getElementById('video_id')
        if (videoElement != null) {
          videoElement.pause()
          videoElement.removeAttribute('src')
          videoElement.load()
        }
        if (this.initIndex !== contentListLength - 1) {
          this.initIndex = this.initIndex + 1
          this.currentContent = this.contents[this.initIndex]
          videoElement?.addEventListener('durationchange', function () {
            console.log('Duration change Seconds - ', videoElement.duration)
          })
          this.duration = this.contentDuration(
            this.contents[this.initIndex].duration,
          )
        } else {
          this.initIndex = 0
          this.currentContent = this.contents[0]
          this.duration = this.contentDuration(
            this.contents[this.initIndex].duration,
          )
        }
        this.durationTime = setTimeout(this.startInterval, this.duration)
      }
    },
  },
}
</script>
