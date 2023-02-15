package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.ServiceUser;
import ru.kata.spring.boot_security.demo.service.UserServiceImp;

@Controller
//@RequestMapping(value = "/admin")
public class UserController {

    @Autowired
    private UserServiceImp serviceUser;


    @GetMapping(value = "/greeting")
    public String helloWorldController() {
        return "greeting";
    }


    @GetMapping("/admin")
    public String getAllUsers(Model model) {
        model.addAttribute("users", serviceUser.getAllUsers());
        return "users";
    }



//    add user step 1
    @GetMapping(value = "/admin/new")
    public String addUser(Model model) {
        model.addAttribute("user", new User());
        return "new";
    }
    //    add user step 2
    @PostMapping("admin")
    public String createUser(@ModelAttribute("user") User user) {
        serviceUser.addUser(user);
        return "redirect:/admin";
    }

    @GetMapping(value = "/user/{id}")
    public String getUserById(@PathVariable Integer id, Model model) {
        model.addAttribute("user", serviceUser.getUserById(id));
        return "get_user";
    }
    //    update user step 1
    @GetMapping(value = "/admin/{id}/edit")
    public String editUser(@PathVariable Integer id, Model model) {
        model.addAttribute("user", serviceUser.getUserById(id));
        return "edit";
    }
    //    update user step 2
    @PatchMapping(value = "/admin/{id}")
    public String update(@ModelAttribute("user") User user, @PathVariable Integer id) {
        serviceUser.update(id, user);
        return "redirect:/admin";
    }

    @DeleteMapping(value = "/admin/{id}")
    public String deleteUser(@PathVariable Integer id) {
        serviceUser.delete(id);
        return "redirect:/admin";
    }

}