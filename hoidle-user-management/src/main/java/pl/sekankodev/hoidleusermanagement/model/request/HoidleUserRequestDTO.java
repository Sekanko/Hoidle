package pl.sekankodev.hoidleusermanagement.model.request;

import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.experimental.Accessors;
import pl.sekankodev.hoidledata.model.Role;

import java.time.LocalDate;

@Data
@Accessors(chain = true)
public class HoidleUserRequestDTO {
    @NotBlank
    private String username;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String password;
    @NotBlank
    private Role role;
    private int streak;
    private int longestStreak;
    private LocalDate lastWin;
}