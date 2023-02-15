package ru.kata.spring.boot_security.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.kata.spring.boot_security.demo.entity.User;

public interface UserRepo extends JpaRepository<User, Integer> {

    User findUserByUsername(String username);
}
