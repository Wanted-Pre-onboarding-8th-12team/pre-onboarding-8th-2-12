import { rest } from 'msw';

const initial = {
  title: '제목 없음',
  owners: [
    {
      id: 1,
      name: 'seyeon',
    },
    {
      id: 2,
      name: 'Park',
    },
    {
      id: 3,
      name: 'Lee',
    },
    {
      id: 4,
      name: 'John',
    },
  ],
  states: [
    {
      id: 1,
      state: 'idle',
    },
    {
      id: 2,
      state: 'pending',
    },
    {
      id: 3,
      state: 'fulfilled',
    },
  ],

  issues: [
    {
      id: 1,
      state: 1,
      order: 1024,
      title: '제목1111111',
      content: '내용1',
      endDate: '2023-03-01',
      owner: 'seyeon1',
    },
    {
      id: 2,
      state: 1,
      order: 2048,
      title: '제목22222222',
      content: '내용2',
      endDate: '2023-03-02',
      owner: 'seyeon2',
    },
    {
      id: 3,
      state: 1,
      order: 3072,
      title: '제목33333333',
      content: '내용3',
      endDate: '2023-03-03',
      owner: 'seyeon3',
    },
    {
      id: 4,
      state: 2,
      order: 1024,
      title: '제목4444',
      content: '내용1',
      endDate: '2023-03-01',
      owner: 'seyeon1',
    },
    {
      id: 5,
      state: 2,
      order: 2048,
      title: '제목555555',
      content: '내용2',
      endDate: '2023-03-02',
      owner: 'seyeon2',
    },
    {
      id: 6,
      state: 2,
      order: 3072,
      title: '제목66666',
      content: '내용3',
      endDate: '2023-03-03',
      owner: 'seyeon3',
    },
    {
      id: 7,
      state: 3,
      order: 1024,
      title: '제목777',
      content: '내용1',
      endDate: '2023-03-01',
      owner: 'seyeon1',
    },
    {
      id: 8,
      state: 3,
      order: 2048,
      title: '제목888888888',
      content: '내용2',
      endDate: '2023-03-02',
      owner: 'seyeon2',
    },
    {
      id: 9,
      state: 3,
      order: 3072,
      title: '제목9999999',
      content: '내용3',
      endDate: '2023-03-03',
      owner: 'seyeon3',
    },
  ],
};
const getBoardTable = () =>
  JSON.parse(localStorage.getItem('boardTable')) ??
  (localStorage.setItem('boardTable', JSON.stringify(initial)) ||
    JSON.parse(localStorage.getItem('boardTable')));

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
};

const getDB = () => JSON.parse(localStorage.getItem('boardTable'));

const updateBoardTitle = (title) => {
  const db = getDB();

  db.title = title;

  localStorage.setItem('boardTable', JSON.stringify(db));
};

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

const deleteIssue = (id) => {
  const db = getDB();
  const newIssues = db.issues.filter((issue) => issue.id !== id);

  db.issues = newIssues;

  localStorage.setItem('boardTable', JSON.stringify(db));
};

export const handlers = [
  rest.get('/board', (req, res, ctx) => {
    const data = getData();

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.put('/board/title', (req, res, ctx) => {
    updateBoardTitle(req.body);

    const data = getData();

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.put('/board/dnd', (req, res, ctx) => {
    updateDnD(req.body);

    const data = getData();

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.delete('/board/issue/:id', (req, res, ctx) => {
    deleteIssue(Number(req.params.id));

    const data = getData();

    return res(ctx.status(200), ctx.json(data));
  }),
];
