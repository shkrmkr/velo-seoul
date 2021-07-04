# VélôSéoul: 서울시 공공자전거 실시간 현황

[Live Demo](https://velo-seoul.netlify.app)

## stack

React, TypeScript, Sass, Google Maps API, 서울시 공공 데이터 API, Netlify

## todo

1. ~~legend 생성~~
2. geolocation api 사용
3. cluster 클릭하면 pan + zoom
4. ~~Mixed Content 문제 해결:~~ => netlify serverless function으로 우회
   > **Mixed Content:** The page at 'https://my-web-site.com' was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint 'http://api-end-point.com'. This request has been blocked; the content must be served over HTTPS.
