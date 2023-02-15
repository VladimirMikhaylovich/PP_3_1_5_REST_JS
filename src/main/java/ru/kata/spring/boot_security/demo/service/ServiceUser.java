package ru.kata.spring.boot_security.demo.service;


import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;

import java.util.List;

public interface ServiceUser {
    List<User> getAllUsers();
    void addUser(User user);

    User getUserById(Integer id);

    void update(Integer id, User user);

    void delete(Integer id);

    List<Role> getRoles();


}
