import { userRepository } from "../repositories/userRepository.js";

class UserService {

  search(search) {
    const user = userRepository.getOne(search);
    if (!user) {
      return null;
    }
    return user;
  }

  getAll() {
    const users = userRepository.getAll();
    if(!users) {
      return null
    }
    return users
  }

  create(data) {
    const newUser = userRepository.create(data);
    if(!newUser) {
      return null
    }
    return newUser
  }

  update(id, data) {
    const updateUser = userRepository.update(id, data);
    if(!updateUser) {
      return null
    }
    return updateUser
  }

  delete(id) {
    const deleteUser = userRepository.delete(id);
    if(!deleteUser) {
      return null
    }
    return deleteUser
  }
}

const userService = new UserService();

export { userService };
