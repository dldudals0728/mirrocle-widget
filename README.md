# How to deploy github pages

깃허브 페이지 업로드!!

1. gh-pages 설치

```
npm i gh-pages
```

해당 명령어로 gh-pages를 설치한다.

2. package.json 수정

```json
{
  // something
  "homepage": "https://[github username].github.io/[repository name]"
}
```

package.json에 해당 구문을 넣는다.

3. package.json scripts 수정

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",

    // 추가
    "deploy": "gh-pages -d build",
    "predeploy": "npm run build"
  }
}
```

package.json의 scripts에 deploy와 predeploy를 추가한다.

> deploy는 gh-pages를 이용하여 해당 url에 build된 디렉토리를 올리는 작업인데, 그 전에 필수로 npm run build를 실행해야 한다.<br>
> predeploy는 deploy 명령어가 실행될 때 먼저 predeploy를 실행해 준다. ==> deploy만 하면 deploy와 build를 한번에 진행할 수 있다!!

4. project deploy
   이제 deploy 명령어를 실행하면 github page에 업로드가 된다!! (처음엔 오래걸림)

5. 뉴스 위젯 / 달력 위젯 width 고정(참고)
   뉴스 : 80% / 달력 : 60%로 width가 고정되어 동적으로 변형 안됌

# Error Report

### https인 github pages에서 http 통신 시 일어나는 block

```
This request has been blocked; the content must be served over HTTPS.
```

gh-pages로 github page를 publish하면 홈페이지는 HTTPS로 이루어 진다. 이 홈페이지 내에서<br>
암호화 되지 않은 HTTP를 통해 요청할때 해당 에러가 발생하게 된다.
<br>
이를 해결하려면 각각의 조취를 취하면 된다.

1. vanilla JS

```JS
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
```

2. React JS: public > index.html

```JS
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
```

3. Next JS: pages 폴더에 \_document.js 파일을 추가하면 <Head></Head>를 설정할 수 있다. 그 사이에 아래 코드 추가

```JS
<meta
  httpEquiv="Content-Security-Policy"
  content="upgrade-insecure-requests"
/>
```
