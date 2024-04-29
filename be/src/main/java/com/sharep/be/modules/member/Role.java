package com.sharep.be.modules.member;

import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Entity
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@Getter
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private RoleType role;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @AllArgsConstructor
    public enum RoleType {
        BACK_END, FRONT_END, INFRA, DESIGNER;

        @JsonCreator
        public static RoleType from(String sub){
//            return RoleType.valueOf(sub);
            for(RoleType roleType : RoleType.values()){
                System.out.println("check " + roleType.toString());
                if(roleType.toString().equals(sub))return roleType;
            }
            throw new RuntimeException("no type enum"); // TODO exception
        }
    }

    @Builder
    public Role(RoleType role, Member member) {
        this.role = role;
        this.member = member;
    }
}
