import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface EditTaskArgs {
  taskId: number
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const foundTask = tasks.find(task => task.title.toLowerCase().trim() === newTaskTitle.toLowerCase().trim());

    if (foundTask) {
      Alert.alert( 'Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
      return
    }

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

    //Passa pelo map que fizemos e procura pela task que tem o mesmo ID que clicamos.
    const foundItem = updateTasks.find(item => item.id === id)

    //Se não tiver, retorna
    if (!foundItem) return

    //Se tiver, irá alterar o valor do done para o contrário do que já está. 
    foundItem.done = !foundItem.done

    //E então adicionamos essa alteração no novo estado das tasks. 
    setTasks(updateTasks)
  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskArgs) {
    //Percorre por todas as tasks, faz um spread para pegar tudo. 
    const updateTasks = tasks.map(task => ({...task}))
    
    //Passa pelo map que fizemos e procura pela task que tem o mesmo ID que clicamos.
    const taskToBeUpdated = updateTasks.find(item => item.id === taskId)

    //Se não tiver, retorna
    if (!taskToBeUpdated) return

    //Se tiver, irá alterar o valor do título.
    taskToBeUpdated.title = taskNewTitle

    //E então adicionamos essa alteração no novo estado das tasks. 
    setTasks(updateTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: () => setTasks(oldState => oldState.filter(task => task.id !== id)),
        style: 'default'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
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