# PAGELIST

<!-- PROJECT -->
<br />
<div align="center">
<h3>Publishing List Viewer System</h3>

  <ul style="list-style: none">
      <li>
         <a href="http://pagelist-domfam.s3-website.ap-northeast-2.amazonaws.com/detail/lcoc3pgz7ic">User - View Demo</a>
      </li>
      <li>
         <a href="http://pagelist-domfam.s3-website.ap-northeast-2.amazonaws.com">Admin - View Demo</a>
      </li>
      <li>
         <a href="https://docs.google.com/spreadsheets/d/1jvHRd4YMYSAPiGti8lbX9Q51749pPijATF2IPUXHVVk/edit#gid=1153770286">API function guide</a>
      </li>
      <li>
         <a href="https://github.com/choi-hyunwon/pagelist/issues">Report Bug</a>
      </li>
      <li>
         <a href="https://github.com/choi-hyunwon/pagelist/issues">Request Feature</a>
      </li>
  </ul>
</div>
<br />

<!-- ABOUT THE PROJECT -->
## About The Project

퍼블리싱 하여 제작 된 페이지를 JAVA 개발자 및 기획자에게 미리 볼 수 있는 페이지를 제공합니다.

* 관리자 : 로그 인 후 프로젝트/카테고리/페이지 관리 (CRUD) 기능 제공
* 사용자 : 카테고리/페이지 뷰어 기능 제공

<br />

## Built With

프로젝트의 주요 프레임워크/라이브러리 입니다.

* ![React Badge](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=flat-square)
* ![React Router Badge](https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=fff&style=flat-square)
* ![Redux Badge](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=fff&style=flat-square)
* ![Ant Design Badge](https://img.shields.io/badge/Ant%20Design-0170FE?logo=antdesign&logoColor=fff&style=flat-square)
* ![Firebase Badge](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=000&style=flat-square)
* ![i18next Badge](https://img.shields.io/badge/i18next-26A69A?logo=i18next&logoColor=fff&style=flat-square)

<br />

<!-- GETTING STARTED -->
## Getting Started

프로젝트를 로컬로 설정하는 방법입니다. 로컬 복사본을 시작하고 실행하려면 아래 단계를 따르세요.

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Serve with hot reload at localhost:3000
   ```sh
   npm start
   ```

<br />

<!-- DIRECTORY STRUCTURE -->
## Directory structure

```bash
┌── .github // github Actions 연동 파일
├── node_modules // CRA를 구성하는 모든 패키지 소스 코드가 존재하는 폴더
├── public // 가상 DOM을 위한 html 파일로 index.html을 포함
├── src // React의 시작 index.js을 포함
│    ├── api // Cloud Firestore 연동 함수 
│    │   └── adaptor.api.js
│    ├── app // 라우터 리스트 및 store를 구성하는 모든 slice와 reducer를 정의
│    │   ├── router.js
│    │   ├── slice.js
│    │   └── store.js 
│    ├── assets // 프로젝트에서 사용할 이미지, 비디오, json, css 파일 등 미디어 파일들을 모아두어 저장하는 곳.
│    │   └── css
│    ├── componenets // pages에서 사용 할 컴포넌트 모음
│    │   ├── popup
│    │   │   ├── Category.jsx
│    │   │   ├── Join.jsx
│    │   │   ├── Page.jsx
│    │   │   └── Project.jsx
│    │   ├── Header.jsx
│    │   └── Modal.jsx
│    ├── firebase // 파이어베이스 연  문서
│    │   └── Firebase.js
│    ├── lang // 다국어 설정 파일 및 언어 리소스 파일
│    │   ├── resources
│    │   │   ├── translation.en.json
│    │   │   └── translation.ko.json
│    │   └── i18n.js
│    ├── pages // 화면 단위의 라우팅 컴포넌트 모음
│    │   ├── Detail.jsx
│    │   ├── Login.jsx
│    │   └── Main.jsx
│    ├── utils // 유틸 함수 모음, birth regex check 등의 함수들 모음
│    │   └── utilCommon.js
│    ├── App.js // 컴포넌트를 정의하는 프로그램이다. 실제로 화면에 표시되는 내용 등은 여기에서 정의된다.
│    ├── index.css
│    └── index.js // 메인 프로그램이라고 할 수 있다. HTML 템플릿 및 JavaScript의 컴포넌트를 조합하여 렌더링하고 실제 표시
├── .gitignore // github에 올리고 싶지 않은 폴더와 파일 모음
├── package.json // CRA 기본 패키지 외 추가로 설치된 라이브러리/패키지 정보(종류, 버전)가 기록되는 파일
├── package-lock.json // 프로그래머가 관리할 필요가 없고 npm이나 yarn이 알아서 관리해 주는 파일 모음
├── README.md
└── webpack.config.js 
```




