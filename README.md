# 동료학습을 통해서 인턴쉽 선발 과제 Best Practice 만들기

## 📕 개요

배포 링크

### 과제 목표

> 이슈 트래킹 기능 구현(e.g, Jira, Trello)

### 기간

2023.01.03 ~ 2023.01.06

---

## 👨‍👩‍👧‍👦 Members

|                                              류지창                                              |                                             박준하                                              |                                             백광천                                              |                                             유제원                                              |                                             정세연                                              |                                             조영일                                              |
| :----------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/104156381?s=70&v=4" width="100" height="100"/> | <img src="https://avatars.githubusercontent.com/u/85827017?s=70&v=4" width="100" height="100"/> | <img src="https://avatars.githubusercontent.com/u/82658528?s=70&v=4" width="100" height="100"/> | <img src="https://avatars.githubusercontent.com/u/96014828?s=70&v=4" width="100" height="100"/> | <img src="https://avatars.githubusercontent.com/u/79056677?s=70&v=4" width="100" height="100"/> | <img src="https://avatars.githubusercontent.com/u/86599495?s=70&v=4" width="100" height="100"/> |
|                           [RyuJiChang](https://github.com/RyuJiChang)                            |                            [harseille](https://github.com/harseille)                            |                             [back0202](https://github.com/back0202)                             |                               [LLSJYY](https://github.com/LLSJYY)                               |                               [n0eyes](https://github.com/n0eyes)                               |                            [young1the](https://github.com/young1the)                            |

---

## 🖥 Demo

시연영상

---

## ⚡️ 사용 라이브러리

- react: 18.2.0
- react-dom: 18.2.0
- styled-components: 5.3.6
- react-query: 4.20.4
- axios: 1.2.2
- msw: 0.49.2

---

## ✅ 요구 사항 체크리스트

1. 구현 사항

- [x] 각 이슈는 CRUD(생성, 표출, 수정, 삭제)가 적용되어야 한다.
- [x] 이슈는 각각 **고유번호, 제목, 내용, 마감일, 상태, 담당자**가 존재한다.
- [x] 이슈의 상태는 **“할 일”, “진행 중”, 완료”**가 존재하며 칸반보드와 같이 상태별로 분류된다
- [x] 이슈의 작성 폼에서는 **제목, 내용, 마감일, 상태, 담당자**를 입력할 수 있다.
  - [x] 제목은 `<input type=”text”>` 태그를 사용한다.
  - [x] 내용은 `<textarea>` 태그를 사용한다.
  - [x] 마감일은 `<input type=”datetime-local”>` 태그를 사용한다.
  - [x] 담당자 선택은 아래의 방식으로 이루어진다.
    - [x] 사전에 임의의 담당자 목록을 구성한다.
    - [x] `<input type=”text”>` 태그를 이용해 담당자를 검색한다.
    - [x] 검색을 수행하면 검색결과 값이 노출되며 그 중 하나를 선택해서 담당자를 지정한다.
- [x] 각 이슈를 클릭 시 상세정보 창이 표시된다.
  - [x] 상세정보 창에는 **“저장”**버튼이 존재한다.
  - [x] 상세정보창에서는 이슈의 각 정보를 수정할 수 있으며, **“저장”**버튼을 클릭 시 수정한 내용이 반영된다.
- [x] 이슈 상태별 목록은 기본적으로 고유번호 순서대로 오름차순 정렬한다.
- [x] 이슈 목록에서 마우스의 Drag & Drop 이벤트를 활용해 이슈의 순서를 변경할 수 있다. 변경된 순서는 고유번호순 정렬보다 우선해서 적용된다.
- [x] 이슈 목록에서 마우스의 Drag & Drop 이벤트를 활용해 이슈의 상태를 변경할 수 있다.

2. 구현 조건

- [x] 데이터가 로딩중인 경우 사용자가 이를 인식할 수 있도록 UX를 고려해야 하며, 로딩 중에는 액션이 발생하는 것을 방지해야한다.
- [ ] 각 기능들은 실수로 인한 중복 액션을 방지하기 위해 실행 후 0.5초의 딜레이를 적용한다.
- [x] 데이터는 새로고침해도 유지될 수 있도록 관리한다.

## 👍 Best Practice

### 1. 데이터 유지

API가 제공되지 않은 과제이나 데이터를 새로고침 해도 유지될 수 있도록 해야했다.
`MSW(Mock Service Worker)`를 이용해서 간이 서버를 구성하고 데이터를 관리했다.

```js
// src/mocks/handlers.js
// ...
export const handlers = [
  rest.get('/board', (req, res, ctx) => {
    const data = getData();

    return res(ctx.status(200), ctx.json(data));
  }),
];
```

<!-- #### 다른 case

- localStorage를 이용하여 데이터를 유지하는 방법

**비선정 이유**
- 데이터가 늘어날 수록 사용자 환경에서 부담해야하는 데이터의 크기가 커진다.
- 서버를 사용하지 않으므로 데이터 추적이 어렵다 -->

### 2. 이슈 목록 순서 적용 방법

클라이언트에서 데이터를 요청하면, 해당 issue를 state(”todo”,”pending,”fullfied”)로 나뉘어서 각각 state 별로 배열로 만들고 해당 `배열을 order에 따라 sort` 해준다.

```js
const getData = () => {
  const boardTable = getBoardTable();
  return {
    title: boardTable.title,
    owners: boardTable.owners,
    states: boardTable.states.map((state) => {
      const issues = boardTable.issues
        .filter((issue) => issue.state === state.id)
        .sort((a, b) => a.order - b.order);

      return { ...state, issues };
    }),
  };
```

issue의 초기 order값은 1024로 지정한다.

- 배열에 새로운 issue가 **가장 뒤**에 추가될 때
  order에 1024를 더해준다.

```js
[1024, 2048, 4096, …];
```

- 배열에 새로운 issue가 **가장 앞**에 추가될 때
  order를 2로 나누어준다.

```js
[ …, 128, 256, 512, 1024];
```

- 배열에 새로운 isser가 **중간**에 추가될 때
  앞의 배열의 order와 뒤의 배열의 order를 더해주고 2로 나눈다.

```js
[1024, newItem ,2048] ⇒ newItem = 1536
```

```js
const updateDnD = (body) => {
  const { position, targetId, draggingId } = body;

  const db = getDB();
  const data = getData();
  const [draggingIssue] = db.issues.filter((issue) => issue.id === draggingId);
  const [targetIssue] = db.issues.filter((issue) => issue.id === targetId);
  const targetStateId = targetIssue.state;
  const [targetState] = data.states.filter(
    (state) => state.id === targetStateId
  );
  const issues = targetState.issues;

  const targetIssueIdx = issues.findIndex((issue) => issue.id === targetId);

  if (position === 'before') {
    if (targetIssueIdx === 0) {
      draggingIssue.order = targetIssue.order / 2;
    } else {
      draggingIssue.order =
        (issues[targetIssueIdx].order + issues[targetIssueIdx - 1].order) / 2;
    }
  }

  if (position === 'after') {
    if (targetIssueIdx === issues.length - 1) {
      draggingIssue.order = targetIssue.order + 1024;
    } else {
      draggingIssue.order =
        (issues[targetIssueIdx].order + issues[targetIssueIdx + 1].order) / 2;
    }
  }

  draggingIssue.state = targetStateId;

  const newIssues = db.issues
    .map((issue) => (issue.id === draggingId ? draggingIssue : issue))
    .sort((a, b) => a.id - b.id);

  db.issues = newIssues;

  localStorage.setItem('boardTable', JSON.stringify(db));
};
```

[참고문헌](https://blog.hyositive.com/m/55)

### 3. Drag & Drop 구현

`useDnD` 라는 custom hook을 작성해서 관심사를 분리했다.

```jsx
export const useDnD = () => {
  let draggingId = null;
  const [positionInfo, setPositionInfo] = useState({
    position: '',
    targetId: null,
  });

  const handleDragStart = (e) => {
    draggingId = Number(e.target.dataset.id);

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('draggingId', draggingId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    const newPositionInfo = getPositionInfo(e.target, e.clientY);

    if (
      positionInfo.position !== newPositionInfo.position &&
      draggingId !== newPositionInfo.targetId
    ) {
      setPositionInfo((prev) => ({ ...prev, ...newPositionInfo }));
    }
  };

  const handleDrop = (e) => {
    const draggingId = JSON.parse(e.dataTransfer.getData('draggingId'));
  };

  return { handleDragStart, handleDragOver, handleDrop, positionInfo };
};
```

draggable 한 컴포넌트에서 `onDragStart`, `onDragOver`등 반환 받은 메서드를 이벤트핸들러를 사용한다.

```jsx
export const Card = ({ issue, DnD, onClick: deleteIssue }) => {
  const { title, id } = issue;

  const {
    positionInfo: { position, targetId },
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = DnD;

  return (
    <Styled.Root
      draggable
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      data-id={id}
      hover
      {...(targetId === id ? { position } : null)}
    >
      <Styled.Title>{title}</Styled.Title>
      <Styled.DeleteBtn onClick={() => deleteIssue(id)}>삭제</Styled.DeleteBtn>
      {/* <Modal></Modal> */}
    </Styled.Root>
  );
};
```

drag가 끝났을 때 react-query의 mutation을 이용해 `'/board/dnd’ 경로에 put 요청`을 보내서 서버의 데이터를 수정하고 list를 다시 받아온다.

```js
  rest.put('/board/dnd', (req, res, ctx) => {
    updateDnD(req.body);

    const data = getData();

    return res(ctx.status(200), ctx.json(data));
  }),
```

### 4. 데이터 로딩 중일 때 fallback 만들기

react의 Suspense 컴포넌트를 이용해서 로딩에 대한 fallback을 구현했다.
최상단 컴포넌트에 적용했다.

```jsx
// src/App.jsx
<Layout onClick={clickHandler}>
  <Suspense fallback={<div>loading...</div>}>
    <Board />
  </Suspense>
</Layout>
```

### 5. 불필요한 렌더린 방지

- 제자리 DnD 방지

```js
const handleDrop = (e) => {
  const draggingId = e.dataTransfer.getData('draggingId');

  /**
   * 제자리 DnD 방지를 위해 targetId 여부를 확인한다
   * 뮤테이션 후 초기화
   */
  if (positionInfo.targetId && draggingId !== positionInfo.targetId) {
    updateDnD(
      { ...positionInfo, draggingId },
      {
        onSettled() {
          setPositionInfo(initialInfo);
        },
      }
    );
  }
};
```

## 📝 문서

[회의록](https://absorbed-leek-405.notion.site/2-best-practice-9d77b76380b14b8d9357e07dd8e80e17)
