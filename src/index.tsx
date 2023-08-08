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
          'Search by Building Name': 'Search by Building Name'
        }
      },
      ja: {
        translation: {
          "Back": "戻る",
          "Language": "言語",
          "Export to CSV": "CSVを出力",
          'Search by Building Name': '物件名で検索'
        }
      },
      zh: {
        translation: {
          "Back": "返回",
          "Language": "语言",
          "Export to CSV": "导出CSV",
          'Search by Building Name': '搜索物件名'
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
