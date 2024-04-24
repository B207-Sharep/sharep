package com.sharep.be.modules.account;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Account {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;


    String nickname;

    String password;

    String email;

    LocalDateTime createdAt;
}
