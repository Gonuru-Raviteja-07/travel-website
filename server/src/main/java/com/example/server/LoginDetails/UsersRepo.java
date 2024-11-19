package com.example.server.LoginDetails;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepo extends JpaRepository<Users,Integer>{

    //String findByUserNameAndUserPassword(String username,String password);
} 
