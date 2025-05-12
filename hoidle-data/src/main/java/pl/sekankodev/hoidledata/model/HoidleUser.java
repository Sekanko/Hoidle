package pl.sekankodev.hoidledata.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Value;

import java.time.LocalDate;

@Entity
@Data
public class HoidleUser {
    @Id
    @GeneratedValue()
    private Long id;
    private String username;
    private String password;
    private String email;
    @Enumerated(value = EnumType.STRING)
    private Role role;
    private int streak;
    private int longestStreak;
    private LocalDate lastWin;
}
