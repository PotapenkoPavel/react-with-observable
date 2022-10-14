import { Observable } from '../observable/Observable'

export interface ITodo {
    readonly id: number
    readonly text: string
    readonly completed: boolean
}

export enum VisibilityFilter {
    SHOW_ALL,
    SHOW_COMPLETED,
    SHOW_ACTIVE,
}

const initial_todos = [
    {
        id: 1,
        text: "Go to park",
        completed: false
    },
    {
        id: 2,
        text: "Wash your hands",
        completed: false
    },
    {
        id: 3,
        text: "A little bit learn react docs",
        completed: false
    },
    {
        id: 4,
        text: "Watch TV",
        completed: false
    },
    {
        id: 5,
        text: "Implement Observable",
        completed: true
    }
]

export class TodoService {
    readonly todos = new Observable<ITodo[]>(initial_todos)
    readonly visibilityFilter = new Observable(VisibilityFilter.SHOW_ALL)

    addTodo(text: string) {
        this.todos.set([
            ...this.todos.get(),
            { text, completed: false, id: Date.now() },
        ])
    }

    toggleTodo(id: number) {
        this.todos.set(
            this.todos.get().map((todo) => {
                if (todo.id === id)
                    return { ...todo, completed: !todo.completed }
                return todo
            })
        )
    }

    setVisibilityFilter(filter: VisibilityFilter) {
        this.visibilityFilter.set(filter)
    }
}