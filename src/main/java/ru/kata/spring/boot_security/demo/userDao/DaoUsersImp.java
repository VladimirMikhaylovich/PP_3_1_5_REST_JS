package ru.kata.spring.boot_security.demo.userDao;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

@Repository
public class DaoUsersImp implements DaoUser {
    @Autowired
    private EntityManager entityManager;
//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    @Transactional
    public List<User> getAllUsers() {
        return entityManager.createQuery("FROM User", User.class).getResultList();
    }

    @Override
    @Transactional
    public void addUser(User user) {
            user.setRoles(Collections.singleton(new Role("USER")));
            user.setPassword(user.getPassword());
        entityManager.persist(user);

    }

    @Override
    @Transactional
    public User getUserById(Integer id) {
        return entityManager.find(User.class, id);
    }

    @Override
    @Transactional
    public void update(Integer id, User user) {
      User updated = entityManager.find(User.class, id);
     updated.setName(user.getName());
     updated.setLastname(user.getLastname());
     updated.setAge(user.getAge());
     updated.setUsername(updated.getUsername());
     updated.setPassword(user.getPassword());
     entityManager.persist(updated);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        User user = entityManager.find(User.class, id);
        entityManager.remove(user);
    }
}
