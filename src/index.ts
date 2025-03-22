//1. HTML 요소 선택 (자바스크립트 편 참고)
const todoInput = document.getElementById('todo_input') as HTMLInputElement;
const todoForm = document.getElementById('todo_form') as HTMLFormElement;
const todoList = document.getElementById('todo_list') as HTMLUListElement;
const doneList = document.getElementById('done_list') as HTMLUListElement;
//2. 할 일이 어떻게 생긴 애인지 Type 정의
type Todo ={
    id: number;
    text: string;
};


let todos: Todo[] =[];
let doneTasks: Todo[]=[];

//할 일 목록 렌더링 하는 함수 정의 
const renderTasks = (): void =>{
    todoList.innerHTML ='';
    doneList.innerHTML = '';

    todos.forEach((todo): void=>{
        const li = createTodoElement(todo,false)
        todoList.appendChild(li);
    });

    doneTasks.forEach((todo):void=>{
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    })
};

//3. 할 일 텍스트 입력 처리 함수 (trum 처리)
const getTodoText = (): string => {
  return todoInput.value.trim();  
};

//4. 할 일 추가 처리 함수
const addTodo = (text:string) : void => {
    todos.push({id: Date.now(), text});
    todoInput.value = '';
    renderTasks(); //매번 DOM 초기화 하므로 메모리 낭비아닌가..?
};

//5. 할 일 상태 변경 (완료로 이동)
const completeTodo = (todo: Todo): void => {
    todos = todos.filter((t):boolean => t.id !==todo.id);
    //todos 배열에서 todo.id와 다른 항목만 다시 저장한다는 뜻
    doneTasks.push(todo);
    renderTasks();
};

//6. 삭제 함수
const deleteTodo =(todo:Todo): void => {
    doneTasks = doneTasks.filter((t):Boolean =>t.id !== todo.id);
    renderTasks();
};

//7. 폼 제출 이벤트 리스너
todoForm.addEventListener('submit', (event:Event):void =>{
    event.preventDefault(); //새로고침 및 초기화 되지 않도록 해줌
    const text = getTodoText(); //공백삭제
    if(text) {
        addTodo(text);
    }
});

renderTasks(); //언제나 맨 처음에는 렌더링을 해줘야함
//추가)) 내가 추가한 css 말고, 완료 여부에 따라 버튼 텍스트, 색상 설정
const createTodoElement = (todo:Todo, isDone:boolean): HTMLLIElement => {
    const li =document.createElement('li');
    li.classList.add('render-container__item'); //class 이름을 붙이기!
    li.textContent = todo.text;

    const button =document.createElement('button');
    button.classList.add('render-container__item-button');

    if (isDone) {
        button.textContent ='삭제';
        button.style.backgroundColor='#dc3545';
    }
    else {
        button.textContent = '완료';
        button.style.backgroundColor='#28a745';
    }

    button.addEventListener('click', ():void => {
        if(isDone){
            deleteTodo(todo);
        }else{
            completeTodo(todo);
        }
    });
    li.appendChild(button);
    return li;
};
// <ul 
//     id="todo_list"
//     class="render-container__list">
//     <li class="render-container__item">
//         <p class="render-container__item-text">2주차 워크북</p>
//         <button class="render-container__item-button">
//             완료
//         </button>
//     </li>
// </ul>