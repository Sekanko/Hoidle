package pl.sekankodev.hoidleusermanagement.mapper;
import org.springframework.stereotype.Component;
import pl.sekankodev.hoidledata.model.HoidleUser;
import pl.sekankodev.hoidleusermanagement.model.request.HoidleUserRequestDTO;
import pl.sekankodev.hoidleusermanagement.model.response.HoidleUserResponseDTO;

@Component
public class UserMapper implements IUserMapper {
    @Override
    public HoidleUserResponseDTO toResponseDTO(HoidleUserResponseDTO responseDTO) {
        return null;
    }

    @Override
    public HoidleUser toEntity(HoidleUserRequestDTO responseDTO) {
        return null;
    }
}
