package ru.kata.spring.boot_security.demo.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImp;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/admin/")
public class AdminController {

    private final UserServiceImp serviceUser;

    public AdminController(UserServiceImp serviceUser) {
        this.serviceUser = serviceUser;
    }

    @GetMapping()
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> response = serviceUser.getAllUsers();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<HttpStatus> createUser(@RequestBody User user) {
         serviceUser.addUser(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Integer id) {
        User response = serviceUser.getUserById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<HttpStatus> update(@RequestBody User user, @PathVariable("id") Integer id) {
        serviceUser.update(id, user);
        return ResponseEntity.ok(HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") Integer id) {
        serviceUser.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }
    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getAllRoles() {
        List<Role> response= serviceUser.getRoles();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/user")
    public ResponseEntity<User> getUser(Principal principal) {
        User user = serviceUser.findByUsername(principal.getName());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}