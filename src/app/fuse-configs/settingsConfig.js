const originalLayout = getFromLS('main-theme') || 'beach'


const settingsConfig = {
    layout          : {
        style : 'layout1', // layout-1 layout-2 layout-3
        config: {} // checkout layout configs at app/fuse-configs/layout-1/Layout1Config.js
    },
    customScrollbars: true,
    theme           : {
        main   : originalLayout,
        navbar : 'mainThemeDark',
        toolbar: 'mainThemeLight',
        footer : 'mainThemeDark'
    }
};

function getFromLS (key)
 {
    let ls = {}
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('broadview-theme')) || {}
    } catch (e) {
      
    }
  }
  return ls[key]
}

function saveToLS (key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(
        'broadview-theme',
        JSON.stringify({
          [key]: value
        })
      )
    }
  }

export default settingsConfig;
