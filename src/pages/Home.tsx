import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldState => [...oldState, data])
  }

  function handleToggleTaskDone(id: number) {
    //Percorre por todas as tasks, faz um spread para pegar tudo. 
    const updateTasks = tasks.map(task => ({...task}))
    console.log(updateTasks)
    //Passa pelo map que fizemos e procura pela task que tem o mesmo ID que clicamos.
    const foundItem = updateTasks.find(item => item.id === id)

    //Se não tiver, retorna
    if (!foundItem) return

    //Se tiver, irá alterar o valor do done para o contrário do que já está. 
    foundItem.done = !foundItem.done

    //E então adicionamos essa alteração no novo estado das tasks. 
    setTasks(updateTasks)
  }

  function handleRemoveTask(id: number) {
    setTasks(oldState => oldState.filter(task => task.id !== id))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})