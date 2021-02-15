import {
    addTaskAC,
    updateTaskAC,
    removeTaskAC,
    RemoveTodolistAC,
    tasksReducer
} from './tasks-reducer';
import {addTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {taskPriorities, taskStatuses} from "../api/task-api";

let startState: TasksStateType = {}
beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: '1',
                title: "CSS",
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: taskPriorities.Low,
                startDate: '',
                status: taskStatuses.New
            },
            {
                id: '2',
                title: "JS",
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: taskPriorities.Low,
                startDate: '',
                status: taskStatuses.Completed
            },
            {
                id: '3',
                title: "React",
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: taskPriorities.Low,
                startDate: '',
                status: taskStatuses.New
            }
        ],
        "todolistId2": [
            {
                id: '1',
                title: "bread",
                todoListId: 'todolistId2',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: taskPriorities.Low,
                startDate: '',
                status: taskStatuses.New
            },
            {
                id: '2',
                title: "milk",
                todoListId: 'todolistId2',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: taskPriorities.Low,
                startDate: '',
                status: taskStatuses.Completed
            },
            {
                id: '3',
                title: "tea",
                todoListId: 'todolistId2',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: taskPriorities.Low,
                startDate: '',
                status: taskStatuses.New
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)
    expect(endState).toEqual({
        "todolistId1": [
            {
                id: '1',
                title: "CSS",
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: taskPriorities.Low,
                startDate: '',
                status: taskStatuses.New
            },
            {
                id: '2',
                title: "JS",
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: taskPriorities.Low,
                startDate: '',
                status: taskStatuses.Completed
            },
            {
                id: '3',
                title: "React",
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: taskPriorities.Low,
                startDate: '',
                status: taskStatuses.New
            }
        ],
        "todolistId2": [
            {
                id: '1',
                title: "bread",
                todoListId: 'todolistId2',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: taskPriorities.Low,
                startDate: '',
                status: taskStatuses.New
            },
            {
                id: '3',
                title: "tea",
                todoListId: 'todolistId2',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: taskPriorities.Low,
                startDate: '',
                status: taskStatuses.New
            }
        ]
    });
});


test('correct task should be added to correct array', () => {
    const action = addTaskAC({
        todoListId: 'todolistId2',
        title: 'juce',
        status: taskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        startDate: '',
        priority: taskPriorities.Low,
        id: '5'
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][3].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(taskStatuses.New);
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC("2", {status: taskStatuses.New}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][2].status).toBe(taskStatuses.New);
});
test('need to change the name of the task', () => {

    const action = updateTaskAC('1', {title: 'sugar'}, "todolistId2")
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId2'][0].title).toBe('sugar')
})

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({
        id: 'blabla',
        title: 'bla',
        order: 0,
        addedDate: ''
    });

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = RemoveTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
test('empty arrays should be added when we set todolists', () => {
    const action = setTodolistsAC([
        {id: '1', title: "What to learn", order: 0, addedDate: ''},
        {id: '2', title: "What to buy", order: 0, addedDate: ''}
    ])
    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)
    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})