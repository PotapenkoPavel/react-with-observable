import React from 'react'
import { useObservable } from './hooks/useObservable'
import { todoService } from './services'
import { ITodo, VisibilityFilter } from './services/todo.service'

function App() {
    return (
        <div className="App">
            <TodoList />
        </div>
    )
}

export const TodoList = () => {
    const todos = useObservable(todoService.todos)
    const filter = useObservable(todoService.visibilityFilter)
    const visibleTodos = getVisibleTodos(todos, filter)

    return (
        <div>
            <ul>
                {visibleTodos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ul>
            <p>
                Show:
                <FilterLink filter={VisibilityFilter.SHOW_ALL}>All</FilterLink>
                <FilterLink filter={VisibilityFilter.SHOW_ACTIVE}>
                    Active
                </FilterLink>
                <FilterLink filter={VisibilityFilter.SHOW_COMPLETED}>
                    Completed
                </FilterLink>
            </p>
        </div>
    )
}

const TodoItem = ({ todo: { id, text, completed } }: { todo: ITodo }) => {
    return <li onClick={() => todoService.toggleTodo(id)}>{text}</li>
}

const FilterLink = ({
    filter,
    children,
}: {
    filter: VisibilityFilter
    children: React.ReactNode
}) => {
    const activeFilter = useObservable(todoService.visibilityFilter)
    const active = filter === activeFilter

    return active ? (
        <span>{children}</span>
    ) : (
        <span
            style={{ textDecoration: 'underline' }}
            onClick={() => todoService.setVisibilityFilter(filter)}
        >
            {children}
        </span>
    )
}

function getVisibleTodos(todos: ITodo[], filter: VisibilityFilter) {
    switch (filter) {
        case VisibilityFilter.SHOW_ALL:
            return todos
        case VisibilityFilter.SHOW_ACTIVE:
            return todos.filter((todo) => !todo.completed)
        case VisibilityFilter.SHOW_COMPLETED:
            return todos.filter((todo) => todo.completed)
    }
}

export default App
