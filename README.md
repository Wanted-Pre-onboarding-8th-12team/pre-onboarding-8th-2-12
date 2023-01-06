# 동료학습을 통해서 인턴쉽 선발 과제 Best Practice 만들기

## 📕 개요

링크

### 과제 목적

목적

### 기간

기간

---

## 👨‍👩‍👧‍👦 Members

| 류지창                                                                                           | 박준하                                                                                          | 백광천                                                                                          | 유제원                                                                                          | 정세연                                                                                          | 조영일                                                                                          |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| <img src="https://avatars.githubusercontent.com/u/104156381?s=70&v=4" width="100" height="100"/> | <img src="https://avatars.githubusercontent.com/u/85827017?s=70&v=4" width="100" height="100"/> | <img src="https://avatars.githubusercontent.com/u/82658528?s=70&v=4" width="100" height="100"/> | <img src="https://avatars.githubusercontent.com/u/96014828?s=70&v=4" width="100" height="100"/> | <img src="https://avatars.githubusercontent.com/u/79056677?s=70&v=4" width="100" height="100"/> | <img src="https://avatars.githubusercontent.com/u/86599495?s=70&v=4" width="100" height="100"/> |
| [RyuJiChang](https://github.com/RyuJiChang)                                                      | [harseille](https://github.com/harseille)                                                       | [back0202](https://github.com/back0202)                                                         | [LLSJYY](https://github.com/LLSJYY)                                                             | [n0eyes](https://github.com/n0eyes)                                                             | [young1the](https://github.com/young1the)                                                       |

---

## 🖥 Demo

시연영

---

## ⚡️ 사용 라이브러리

2. React
3. React-router-dom
4. Styled-components
5. Axios

---

## ✅ 요구사항

### 1) Auth

- 이메일과 비밀번호의 유효성 검사
  - 이메일 조건: `@` 포함, 비밀번호 조건: 8자 이상
  - 입력된 이메일과 비밀번호가 위 조건을 만족할 때 버튼 활성화

---

## 👍 Best Practice

### 1. 초기 세팅

#### 사용 라이브러리

1. TypeScript
   TypeScript는 취업 시에 필수적인 기술스텍이기 때문에 TypeScript 사용에 **익숙해지기**위해서 사용하는 것으로 결정했습니다.

2. React-router-dom@6.5
   이전 버전과 다른 방식의 동작원리인 react-router-dom@6.5이 `loader`, `action`, 'RouterForm' 등 기능을 사용하여 코드를 간결하게 작성할 수 있어서 best practice로 선정했습니다.

```ts
// action 사용 예시
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' errorElement={<Error />}>
      <Route element={<App />}>
        <Route
          index
          element={
            <Auth to='/todo' login={true}>
              <Login />
            </Auth>
          }
          action={loginAction}
        />
        ...
      </Route>
    </Route>,
  ),
);
```

```ts
// RouterForm 사용 예신
import { Form as RouterForm } from "react-router-dom";

type Unpacked<T> = T extends React.ForwardRefExoticComponent<infer U> ? U : T;

const Form = ({ children, ...props }: PropsWithChildren<Unpacked<typeof RouterForm>>) => {
  return <Styled.Form {...props}>{children}</Styled.Form>;
};
```


### 디렉토리 구조

#### 가장 마지막 디렉토리 (Leaf Directory)

```
todo
└─TodoList
    ├─index.tsx
    └─style.tsx
```

leaf directory에 `index` 파일을 생성해서 directory 이름과 상응하는 component 혹은 page를 두어서 관리했습니다.

#### common, auth, todo

TODO 서비스에서 크게 login과 join을 관리하는 **Auth** 부분 그리고 **Todo** 로 나뉘어집니다.
그에 맞게 components 디렉토리에서 Auth에서 사용되는 파일들은 auth 디렉토리에 (`components/auth/AuthForm`),
Todo에서 사용되는 파일들은 todo 디렉토리에 (`components/todo/TodoList`)두어서 분리하고,
common 디렉토리에는 공통적으로 사용되는 component인 `button`, `input` 과 같은 컴포넌트를 두었습니다.

---

## 📢 프로젝트 실행방법

실행할 때 반드시 다음 파일을 최상단에 생성후 실행 해주셔야 합니다.

```
// .env
REACT_APP_BASE_URL=https://pre-onboarding-selection-task.shop
```

```
npm install
npm start
```

## 📝 문서

[회의록](https://www.notion.so/43f61c18daaf4db68d62863ea539dbf4)
