package com.canva.canvaapi.controller;

import com.canva.canvaapi.model.entity.UserEntity;
import com.canva.canvaapi.repo.UserCanvaRepo;
import com.canva.canvaapi.service.AppUserDetailService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/register")
class RegistrationController {
    private final PasswordEncoder passwordEncoder;
    private final UserCanvaRepo userCanvaRepo;

    public RegistrationController(AppUserDetailService userService, PasswordEncoder passwordEncoder, UserCanvaRepo userCanvaRepo) {
        this.passwordEncoder = passwordEncoder;
        this.userCanvaRepo = userCanvaRepo;
    }

    @GetMapping
    public String showRegistrationForm(Model model) {
        model.addAttribute("user", new UserEntity());
        return "register";
    }

    @PostMapping
    public String registerUser(@ModelAttribute UserEntity user) {
        if (userCanvaRepo.usernameExist(user.getUserName())){
            return "redirect:/register?errors=Username exist";
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userCanvaRepo.save(user);
        return "redirect:/login";
    }
}