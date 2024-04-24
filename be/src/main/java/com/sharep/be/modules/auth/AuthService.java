package com.sharep.be.modules.auth;

import com.sharep.be.infra.config.JwtUtil;
import com.sharep.be.modules.account.AccountRepository;
import com.sharep.be.modules.auth.dto.AuthDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.sharep.be.modules.auth.dto.AuthDto.*;

@Service
@RequiredArgsConstructor
public class AuthService{

    private final JwtUtil jwtUtil;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    public String login(AuthRequestDto authRequestDto){
        String email = authRequestDto.getEmail();
        String password = authRequestDto.getPassword();
        accountRepository.findByEmail(email).orElseThrow(()-> new IllegalArgumentException("존재하지 않는 이메일 입니다"));

        return "";
    }
}
