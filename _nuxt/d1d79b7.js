(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{353:function(t,e,n){"use strict";n.r(e);var o=n(14),c=(n(76),n(13),n(39),n(41),n(203),n(66),n(68),n(32),n(110),n(67),n(27),{data:function(){return{url:"",hostType:null,mimeType:null,contentId:null,isURLValid:!1,isContentValidated:!1,message:"",contentURL:null,apiKey:"AIzaSyC_28L2bV2wGcZZqk_0NbReNJBNV4V5BNI",mimeTypes:["video/mp4","video/ogg","video/webm"]}},methods:{validateURL:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.checkHostName(new URL(t.url).hostname);case 2:if(t.hostType=e.sent,t.isURLValid=t.checkURLFormat(),!t.isURLValid){e.next=22;break}if("custom"!==t.hostType){e.next=12;break}return e.next=8,t.checkURLConnectivity(t.url);case 8:t.mimeType=e.sent,t.isContentValidated=t.mimeTypes.includes(t.mimeType),e.next=20;break;case 12:if("youtube"!==t.hostType){e.next=17;break}return e.next=15,t.checkYoutubePermission();case 15:e.next=20;break;case 17:if("gdrive"!==t.hostType){e.next=20;break}return e.next=20,t.checkGDrivePermission();case 20:e.next=23;break;case 22:t.isContentValidated=!1;case 23:case"end":return e.stop()}}),e)})))()},checkHostName:function(t){return!!t&&(t.includes("youtube")||t.includes("youtu.be")?"youtube":t.includes("drive")?"gdrive":"custom")},checkURLFormat:function(){if("youtube"===this.hostType){return this.contentId=this.url.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/)[1],this.url.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/)}return"gdrive"===this.hostType?(this.contentId=this.url.split("/")[5],this.contentURL="https://drive.google.com/file/d/".concat(this.contentId,"/preview"),this.url.match(/^(https:\/\/drive\.google\.com\/)file\/d\/([^]+)\/.*$/)):"custom"===this.hostType?(this.contentURL=this.url,this.url.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)):void 0},checkURLConnectivity:function(t){return this.$axios.get("http://localhost:3001/check-mime?u=".concat(t)).then((function(t){return t.data}))},checkYoutubePermission:function(){var t=this;this.$axios.get("https://www.googleapis.com/youtube/v3/videos?id=".concat(this.contentId,"&part=snippet,contentDetails&key=").concat(this.apiKey)).then((function(e){e&&0===e.data.items.length||e&&e.data.items.length>0&&("live"===e.data.items[0].snippet.liveBroadcastContent||"upcoming"===e.data.items[0].snippet.liveBroadcastContent)?t.isContentValidated=!1:e&&e.data.items.length>0&&("none"===e.data.items[0].snippet.liveBroadcastContent||"completed"===e.data.items[0].snippet.liveBroadcastContent)?(t.isContentValidated=!0,t.contentURL="https://www.youtube.com/embed/".concat(e.data.items[0].id)):t.isContentValidated=!1})).catch((function(){t.isContentValidated=!1}))},checkGDrivePermission:function(){var t=this;this.$axios.get("https://www.googleapis.com/drive/v3/files/".concat(this.contentId,"?key=").concat(this.apiKey)).then((function(e){t.mimeTypes.includes(e.data.mimeType)?t.isContentValidated=!0:t.isContentValidated=!1})).catch((function(){t.isContentValidated=!1}))}}}),r=n(73),d=n(105),l=n.n(d),h=n(354),m=n(298),v=n(287),y=n(349),w=n(350),f=n(351),V=n(352),component=Object(r.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-row",{attrs:{justify:"center",align:"center"}},[n("v-col",{attrs:{cols:"12",sm:"8",md:"6"}},[n("v-card",[n("v-card-title",{staticClass:"headline mt-5"},[t._v("\n        Video Player\n      ")]),t._v(" "),n("v-card-text",[n("v-text-field",{attrs:{placeholder:"Enter Media URL","append-outer-icon":"mdi-arrow-right"},on:{"click:append-outer":t.validateURL},model:{value:t.url,callback:function(e){t.url=e},expression:"url"}}),t._v(" "),t.isContentValidated?n("div",[["youtube","gdrive"].includes(t.hostType)?[n("iframe",{attrs:{src:t.contentURL,width:"700",height:"500",allow:"Content-Security-Policy: frame-ancestors 'none'; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""}})]:"custom"===t.hostType?[n("video",{attrs:{width:"700",height:"500",autoplay:"",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:"",src:t.contentURL}})]:t._e()],2):n("div",[t._v("\n          Invalid URL\n        ")])],1),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"primary"}},[t._v("\n          Continue\n        ")])],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;l()(component,{VBtn:h.a,VCard:m.a,VCardActions:v.a,VCardText:v.b,VCardTitle:v.c,VCol:y.a,VRow:w.a,VSpacer:f.a,VTextField:V.a})}}]);