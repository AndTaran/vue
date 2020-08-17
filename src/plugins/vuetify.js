import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'


Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
          light: {
            primary: colors.red.darken2, // #FFCDD2
            accent: colors.indigo.base, // #3F51B5
          },
        },
      },
   icons: {
       iconfont: 'mdiSvg' || 'mdi' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
});
