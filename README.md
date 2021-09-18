<p align="center">
<img src="docs/icon-original.png" width="200" height="200">
</p>

# FMBlocker

에펨코리아 (fmkorea.com) 에서 원하는 갤러리 또는 서브 갤러리를 필터/블라인드 해 주는 Chrome 플러그인 입니다.

## 프로젝트 구조
### 필터링
모든 필터링은 `/src/pages/index.js` 안에 있으며, Chrome의 Extension Storage Sync API를 이용합니다.

### 설정 페이지
모든 설정 페이지및 팝업 rendering은 `src/pages/Options/*`에서 확인 하실수 있습니다. `src/pages/popup`은 Options 폴더에서 import 하여 사용합니다.

## 기여하기
### 라이센싱
MIT 라이센스.

### 실행하기
`npm install` 후 `npm run start` 실행. Chrome의 Extension Tab를 이용하여 Developer Mode를 킨 후, `Load Unpacked` 버튼을 눌러주어 프로젝트의 `build/` 폴더를 선택해주시면 됩니다.

### Pull Request
모든 Pull request는 환영합니다. Github의 Tag system을 잘 준수해주시기 바랍니다.
