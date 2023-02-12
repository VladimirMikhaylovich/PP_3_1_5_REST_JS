package ru.kata.spring.boot_security.demo.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.userDao.DaoUser;

import java.util.List;

@Service
public class ServiceUserImp implements ServiceUser {
    @Autowired
    private DaoUser daoUser;

    @Override
    @Transactional
    public List<User> getAllUsers() {
        return daoUser.getAllUsers();
    }

    @Override
    @Transactional
    public void addUser(User user) {
        daoUser.addUser(user);
    }

    @Override
    @Transactional
    public User getUserById(Integer id) {
        return daoUser.getUserById(id);
    }

    @Override
    @Transactional
    public void update(Integer id, User user) {
    daoUser.update(id, user);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
     daoUser.delete(id);
    }
}
