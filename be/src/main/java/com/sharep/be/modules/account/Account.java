package com.sharep.be.modules.account;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Account {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(length = 8, nullable = false)
    String nickname;

    @Column(nullable = false)
    String password;

    @Column(nullable = false)
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
