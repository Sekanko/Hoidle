package pl.sekankodev.hoidleusermanagement.mapper;

import pl.sekankodev.hoidledata.model.HoidleUser;
import pl.sekankodev.hoidleusermanagement.model.request.HoidleUserRequestDTO;
import pl.sekankodev.hoidleusermanagement.model.response.HoidleUserResponseDTO;

public interface IUserMapper {
    HoidleUserResponseDTO toResponseDTO(HoidleUserResponseDTO responseDTO);
    HoidleUser toEntity(HoidleUserRequestDTO responseDTO);
}
