import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import i18n from "i18next";
import reportWebVitals from './reportWebVitals';
import { initReactI18next } from "react-i18next";


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "Back": "Back",
          "Language": "Language",
          "Export to CSV": "Export to CSV",
          'Search by Building Name': 'Search by Building Name',
          'レストラン': 'Resturant',
          'カフェ': 'Cafe',
          'ドラックストア': 'Drog Store',
          '総合病院': 'Hospital',
          '学校': 'School',
          'ジム': 'Gym',
          'コンビニ': 'Convenient Store',
          '公園': 'Park',
          'バス停': 'Bus Station',
          'クリニック': 'Clinic',
          'スーパー': 'Supermarket',
          '体育館': 'Sports Hall',
          'メートル': ' meters',
        }
      },
      ja: {
        translation: {
          "Back": "戻る",
          "Language": "言語",
          "Export to CSV": "CSVを出力",
          'Search by Building Name': '物件名で検索',
          'レストラン': 'レストラン',
          'カフェ': 'カフェ',
          'ドラックストア': 'ドラックストア',
          '総合病院': '総合病院',
          '学校': '学校',
          'ジム': 'ジム',
          'コンビニ': 'コンビニ',
          '公園': '公園',
          'バス停': 'バス停',
          'クリニック': 'クリニック',
          'スーパー': 'スーパー',
          '体育館': '体育館',
          'メートル': 'メートル',
        }
      },
      zh: {
        translation: {
          "Back": "返回",
          "Language": "语言",
          "Export to CSV": "导出CSV",
          'Search by Building Name': '搜索物件名',
          'レストラン': '餐厅',
          'カフェ': '咖啡馆',
          'ドラックストア': '药妆店',
          '総合病院': '综合医院',
          '学校': '学校',
          'ジム': '健身房',
          'コンビニ': '便利店',
          '公園': '公园',
          'バス停': '巴士站',
          'クリニック': '诊所',
          'スーパー': '超市',
          '体育館': '体育館',
          'メートル': '米',
        }
      }
    },
    fallbackLng: "ja",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
