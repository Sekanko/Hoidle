package pl.sekankodev.hoidledata.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

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
    private Role role;
    private int streak;
    private int longestStreak;
    private LocalDate lastWin;
}
