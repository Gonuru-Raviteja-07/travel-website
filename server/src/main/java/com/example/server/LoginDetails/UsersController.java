package com.example.server.LoginDetails;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class UsersController {
    @Autowired
    UsersRepo user;
  
    @GetMapping("/users")
    public Iterable<Users> getAllUsers() {
      return user.findAll();
    }
  
    @PostMapping("/users/save")
    public void addNewUser(@RequestBody Users newUser) {
      user.save(newUser);
    }
}
