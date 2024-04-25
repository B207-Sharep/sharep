package com.sharep.be.modules.auth;

import com.sharep.be.modules.auth.dto.AuthDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.sharep.be.modules.auth.dto.AuthDto.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody AuthRequestDto authRequestDto){
        System.out.println("login");
        return ResponseEntity.ok(authService.login(authRequestDto));
    }

}
