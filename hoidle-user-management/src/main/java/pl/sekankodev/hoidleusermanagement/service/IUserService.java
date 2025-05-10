package pl.sekankodev.hoidleusermanagement.service;

import pl.sekankodev.hoidleusermanagement.model.request.HoidleUserRequestDTO;
import pl.sekankodev.hoidleusermanagement.model.response.HoidleUserResponseDTO;

public interface IUserService {
    Long createUser(HoidleUserRequestDTO requestUser);
    Long updateUser(HoidleUserRequestDTO requestUser);
    Long deleteUser(HoidleUserRequestDTO requestUser);
    HoidleUserResponseDTO logInUser(HoidleUserRequestDTO requestUser);
}
