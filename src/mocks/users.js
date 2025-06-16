import usersData from './data/users.json'

export function getUsers() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(usersData)
    }, 600)
  })
}

export function createUser(userData) {
  return new Promise(resolve => {
    setTimeout(() => {
      const newUser = {
        id: usersData.length + 1,
        ...userData,
      }
      // Simula adicionar à lista
      usersData.push(newUser)
      resolve(newUser)
    }, 800)
  })
}
