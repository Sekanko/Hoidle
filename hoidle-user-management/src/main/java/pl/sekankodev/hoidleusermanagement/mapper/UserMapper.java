package pl.sekankodev.hoidleusermanagement.mapper;
import org.springframework.stereotype.Component;
import pl.sekankodev.hoidledata.model.HoidleUser;
import pl.sekankodev.hoidleusermanagement.model.HoidleUserRequestDTO;
import pl.sekankodev.hoidleusermanagement.model.HoidleUserResponseDTO;

@Component
public class UserMapper implements IUserMapper {
    @Override
    public HoidleUserResponseDTO toResponseDTO(HoidleUser user) {
        return null;
    }

    @Override
    public HoidleUser toEntity(HoidleUserRequestDTO requestDTO) {
        return new HoidleUser()
                .setEmail(requestDTO.getEmail())
                .setPassword(requestDTO.getPassword())
                .setRole(requestDTO.getRole())
                .setUsername(requestDTO.getUsername())
                .setLastWin(requestDTO.getLastWin())
                .setStreak(requestDTO.getStreak())
                .setLongestStreak(requestDTO.getLongestStreak());
    }
}
