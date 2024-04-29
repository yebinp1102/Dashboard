# 01. 프로젝트 정보
-----
### (1) 프로젝트 제목
서울시 공공데이터와 카카오 맵 API를 사용한 데이터 도식화
<br><br>

### (2) 프로젝트 소개
대학 졸업 논문을 작성하면서 설문 조사에 대한 통계나 다른 논문의 실험 결과에 대한 통계를 내야하는 상황이 많았다. 여러 상황 속에서 느낀 것은 텍스트로 데이터를 이해하는 것과 표나 그림 등 시각 자료로 데이터를 접할 때의 이해도에 큰 차이가 있다는 점이었다. 이 경험을 토대로 open api를 통해 데이터를 시각화 하는 프로젝트를 설계하게 되었다. 사용한 Open API는 서울시의 공공자전거이용정보와 카카오의 지도 API이다. 단순 데이터를 시각화 하는 것에서 그치지 않고, 데이터를 가공해서 유의미한 자료를 제공할 수 있는 방안에 대해서 끊임 없이 고민한 프로젝트이다. 
<br><br>

### (3) 개발 기간
2024-01-29 ~ 2024-02-06
<br><br>

### (4) 기술 스택
#### Environment
<img src="https://img.shields.io/badge/visual_studio_code-007acc?style=for-the-badge&logo=visualstudio&logoColor=#007acc">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/github-000?style=for-the-badge&logo=github&logoColor=white">

#### Config
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=git&logoColor=white">

#### Development
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
<img src="https://img.shields.io/badge/typescript-00599C?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/tailwind_css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">


<br><br><br>

# 02. 시작 가이드
----
### Installation
```
$ git clone https://github.com/yebinp1102/Dashboard.git
```
<!-- .env.local -->

### Execution 
```
$ npm install
$ npm run dev
```

### env.local 설정
```
VITE_API_KEY = "486b424c5a79656232354365444767"
```

<br><br><br>

# 03. 페이지 구성 
----

|  홈페이지 |  이용방법  |
|:-------:|:--------:|
| ![home] | ![usage] |
---
| 대여소 검색 | 일별 통계  |
|:--------:|:--------:|
| ![search]|  ![day]  |
---
| 월별 통계 |
|:-------:|
| ![month]|

<br><br><br>

# 04. 주요 기능
----

⭐️ 근처 대여소 검색 및 잔여 자전거 개수 조회
- 검색 창에 강남, 논현, 노량진 등 서울 주소 입력 시, 경•위도 ± 0.009 범위(≒ 약 1 정거장 거리)에 있는 대여소를 검색한다.
- 범위 내에 있는 대여소의 위치는 지도의 마커로 표시된다. 
- 각 대여소 별 잔여 자전거 갯수를 출력한다.
- 서울시 공공자전거에 대한 통계이기 때문에 부산과 같은 타지역을 입력시 아무런 데이터도 반환하지 않는다.

⭐️ 일별 통계 
- 날짜별 고장 내용, 고장 접수 시간대, 대여 연령, 이용 시간 통계를 도식화 한다.
- 사용자가 원하는 날짜를 YYYYMMDD 형태로 입력하면 해당 날짜의 통계를 보여준다.

⭐️ 월별 통계 
- 총 대여 건수, 평균 이용 시간, 평균 이용 거리, 탄소 절감량, 가장 대여가 많았던 대여소 탑 5에 대한 자료를 도식화 한다.
- 2023년 8, 9, 10, 11, 12 월 중 통계 기준을 선택 할 수 있다.



<br><br><br>

# 05. 느낀 점
---
### ⭐️ 성장 포인트
사실 처음 프로젝트를 기획할 때 데이터의 도식화만을 궁극적인 목표로 잡았던 것은 아니다. 더 나아가 서버와의 통신 없이 비동기로 데이터를 fetching하고 유의미한 데이터로 재가공하는 과정을 경험해 보고 싶어서 시작한 프로젝트였다. 성공적으로 데이터를 처리하고 나니 더 큰산을 넘어보고 싶었고, 그래서 시도한 것이 두 개의 오픈 API(카카오 맵 API + 공공자전거이용정보 API)를 사용한 대여소 검색 서비스였다. 방대한 양의 데이터 중 필요한 데이터만 선별하고 적재적소에 사용할 수 있게 리팩토링 하는 과정이 힘들면서도 UI로 구현 성공할 때마다 큰 성취감을 느꼈다. 나는 여전히 더 복잡하고 정교한 서비스 구현에 대한 갈증을 느끼고 있고, 이 갈증은 내가 더 나은 개발자로 성장하게 할 디딤돌이라는 것에 믿어 의심치 않는다.


<br>

### ❗️ 아쉬운 점
성능 개선에 대한 지식이 턱없이 부족하다는 점이 아쉬웠다. 사실 월별 통계는 각 월의 통계를 보여주는 것이 아니라 전 월과 비교하는 방식으로 설계했었다. 하지만 각 월별로 1000개씩, 즉 2000개의 데이터를 받아와야 했고 당장 1000개의 데이터만 받아오는데에도 꽤 시간이 걸렸다. fetching 시간이 너무 길어져 UX를 해쳤기 때문에 각 월별 통계를 도식화 하는 것에서 만족해야만 했다. 또한 프로젝트 기간이 8일로 제한되었기 때문에 성능 개선까지 고려할 시간이 부족했다. 다음 프로젝트에서는 기회가 된다면, 이러한 아쉬웠던 점을 꼭 만회하고 싶다. 아마 useMemo를 통해 계산한 데이터를 메모리에 저장해두는 방식을 택했다면 성능 문제를 해결할 수 있었을지도 모르겠다. 


<!-- Img Ref -->

[home]: public/assets/images/dashboard-home.gif
[usage]: public/assets/images/dashboard-rent.gif
[search]: public/assets/images/dashboard-search.gif
[day]: public/assets/images/dashboard-day.gif
[month]: public/assets/images/dashboard-month.gif
