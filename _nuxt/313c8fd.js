(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{290:function(t,e,n){var content=n(319);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(58).default)("615f1740",content,!0,{sourceMap:!1})},318:function(t,e,n){"use strict";n(290)},319:function(t,e,n){var o=n(57)(!1);o.push([t.i,"video[data-v-3f11ef12]{position:fixed;right:0;bottom:0;width:auto;height:auto;background-size:cover}img[data-v-3f11ef12],video[data-v-3f11ef12]{min-width:100%;min-height:100%}img[data-v-3f11ef12]{max-height:100%;max-width:100%}",""]),t.exports=o},359:function(t,e,n){"use strict";n.r(e);n(32),n(67),n(196),n(68),n(16);var o={data:function(){return{durationTime:null,duration:2e4,initIndex:0,contents:[{url:"https://www.cdc.gov/coronavirus/2019-ncov/videos/psa-side-effects/tnq1000-testimony-mateo-15-safety-en-v01_lowres.mp4",contentType:"custom",duration:"00:00:15"},{url:"https://www.googleapis.com/drive/v3/files/1WfIDvoGKuCfveBqPjp-JFM0jDh1j3wGF?alt=media&key=AIzaSyC_28L2bV2wGcZZqk_0NbReNJBNV4V5BNI",contentType:"gdrive",duration:"00:00:20"},{url:"https://www.learningcontainer.com/wp-content/uploads/2020/08/Large-Sample-png-Image-download-for-Testing.png",contentType:"image",duration:"00:00:10"},{url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",contentType:"custom",duration:"00:00:20"},{url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",contentType:"custom",duration:"00:00:15"},{url:"https://www.googleapis.com/drive/v3/files/1WfIDvoGKuCfveBqPjp-JFM0jDh1j3wGF?alt=media&key=AIzaSyC_28L2bV2wGcZZqk_0NbReNJBNV4V5BNI",contentType:"gdrive",duration:"00:00:10"}],currentContent:{},contentIndex:0,interval:null}},mounted:function(){this.calculateNextContentIndexToPreview()},methods:{contentDuration:function(t){var e;e=t.split(":");return 1e3*(Number(60*e[0]*60)+Number(60*e[1])+Number(e[2]))},calculateNextContentIndexToPreview:function(){var t=this;this.contents.length>0&&(this.durationTime&&clearTimeout(this.durationTime),this.durationTime=setTimeout((function(){t.startInterval()}),this.contentDuration(this.contents[0].duration)))},startInterval:function(){var t=Object.keys(this.contents).length;t&&(this.initIndex!==t-1?(this.initIndex=this.initIndex+1,this.currentContent=this.contents[this.initIndex],this.duration=this.contentDuration(this.contents[this.initIndex].duration)):(self.initIndex=0,this.currentContent=this.contents[0],this.duration=this.contentDuration(this.contents[this.initIndex].duration)),this.durationTime=setTimeout(this.startInterval,this.duration))}}},r=(n(318),n(73)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",["image"===t.contents[t.initIndex].contentType?n("img",{attrs:{src:t.currentContent.url}}):n("video",{attrs:{controls:"",autoplay:"",muted:""},domProps:{muted:!0}},[n("source",{attrs:{src:t.contents[t.initIndex].url,type:"video/mp4"}}),t._v(" "),n("source",{attrs:{src:t.contents[t.initIndex].url,type:"video/ogg"}}),t._v(" "),n("source",{attrs:{src:t.contents[t.initIndex].url,type:"video/webm"}})])])}),[],!1,null,"3f11ef12",null);e.default=component.exports}}]);