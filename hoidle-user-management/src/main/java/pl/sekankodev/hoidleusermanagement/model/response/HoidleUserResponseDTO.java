package pl.sekankodev.hoidleusermanagement.model.response;

import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.experimental.Accessors;
import pl.sekankodev.hoidledata.model.Role;

import java.time.LocalDate;

@Data
@Accessors(chain = true)
public class HoidleUserResponseDTO {
    private String username;
    private String email;
    private Role role;
    private int streak;
    private int longestStreak;
    private LocalDate lastWin;
}