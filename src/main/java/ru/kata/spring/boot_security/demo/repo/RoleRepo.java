package ru.kata.spring.boot_security.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.kata.spring.boot_security.demo.entity.Role;

import java.util.List;

public interface RoleRepo extends JpaRepository <Role, Integer> {

    List<Role> findAll();
}
