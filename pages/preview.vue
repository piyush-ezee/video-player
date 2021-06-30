<template>
  <div>
    <template v-for="(content, index) in contents">
      <template v-if="content.contentType === 'image'">
        <img :key="index" :src="content.url">
      </template>
      <template v-else>
        <video :key="index" width="auto" height="auto" controls autoplay>
          <source :src="content.url">
        </video>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      contents: [
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
          duration: '00:00:40',
        },
        {
          url:
            'https://www.cdc.gov/coronavirus/2019-ncov/videos/psa-side-effects/tnq1000-testimony-mateo-15-safety-en-v01_lowres.mp4',
          contentType: 'custom',
          duration: '00:00:15',
        },
        {
          url:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          contentType: 'custom',
          duration: '00:00:30',
        },
        {
          url:
            'https://www.googleapis.com/drive/v3/files/1WfIDvoGKuCfveBqPjp-JFM0jDh1j3wGF?alt=media&key=AIzaSyC_28L2bV2wGcZZqk_0NbReNJBNV4V5BNI',
          contentType: 'gdrive',
          duration: '00:01:00',
        },
      ],
    }
  },
  mounted () {},
  methods: {
    calculateMS (duration) {
      let timesplit = []
      timesplit = duration.split(':')
      let total = 0
      total =
        (Number(timesplit[0] * 60 * 60) +
          Number(timesplit[1] * 60) +
          Number(timesplit[2])) *
        1000
      console.log(total)
      return total
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
  z-index: -100;
  background-size: cover;
  object-fit: fill;
}
img {
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
}
</style>
