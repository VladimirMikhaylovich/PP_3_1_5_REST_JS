package ru.kata.spring.boot_security.demo.userDao;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.entity.User;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class DaoUsersImp implements DaoUser {
    @Autowired
    private EntityManager entityManager;

    @Override
    @Transactional
    public List<User> getAllUsers() {
        return entityManager.createQuery("FROM User", User.class).getResultList();
    }

    @Override
    @Transactional
    public void addUser(User user) {
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
//      User updated = entityManager.find(User.class, id);
//      updated = user;
     entityManager.persist(entityManager.find(User.class, id));
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        User user = entityManager.find(User.class, id);
        entityManager.remove(user);
    }
}
