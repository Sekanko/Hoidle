package pl.sekankodev.hoidleusermanagement.model.request;

import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import pl.sekankodev.hoidledata.model.Role;

import java.time.LocalDate;

@Data
public class HoidleUserRequestDTO {
    @NotBlank
    private String username;
    @Email
    private String email;
    @NotBlank
    private String password;
}