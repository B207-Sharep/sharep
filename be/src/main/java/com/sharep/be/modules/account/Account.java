package com.sharep.be.modules.account;

import com.sharep.be.modules.auth.RoleType;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static com.sharep.be.modules.auth.RoleType.*;

@Entity
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Getter
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(length = 8, nullable = false, unique = true)
    String nickname;

    @Column(nullable = false)
    String password;

    @Column(nullable = false, unique = true)
    String email;

    LocalDateTime createdAt;

    @Builder
    public Account(String nickname, String password, String email) {
        this.nickname = nickname;
        this.password = password;
        this.email = email;
        this.createdAt = LocalDateTime.now();
    }
}
