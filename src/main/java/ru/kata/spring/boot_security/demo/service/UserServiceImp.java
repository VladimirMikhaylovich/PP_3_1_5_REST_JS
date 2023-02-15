package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.repo.RoleRepo;
import ru.kata.spring.boot_security.demo.repo.UserRepo;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
@Service
public class UserServiceImp implements ServiceUser, UserDetailsService {


    @Autowired
    private UserRepo repository;
    @Autowired
    private  RoleRepo roleRepo;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @Override
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    @Override
    public void addUser(User user) {
        User userFromDB = repository.findUserByUsername(user.getUsername());

        if (userFromDB != null) {
            throw new IllegalArgumentException("user is on DB");
        }
        user.setRoles(Collections.singleton(new Role("ROLE_USER")));
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        repository.save(user);
    }

    @Override
    public User getUserById(Integer id) {
        Optional<User> optional = repository.findById(id);
        User user = (optional.isPresent())? optional.get() : null;
        return user;
    }

    @Override
    public void update(Integer id, User user) {
        Optional<User> optional = repository.findById(id);
         User userToUpd = (optional.isPresent())? optional.get() : null;
        userToUpd.setName(user.getName());
        userToUpd.setLastname(user.getLastname());
        userToUpd.setAge(user.getAge());
        userToUpd.setPassword(user.getPassword());
        userToUpd.setUsername(user.getUsername());
        userToUpd.setRoles(user.getRoles());
        repository.save(userToUpd);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public List<Role> getRoles() {
        return roleRepo.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       User user = repository.findUserByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }

}
