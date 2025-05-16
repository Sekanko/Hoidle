package pl.sekankodev.hoidleusermanagement.service;

import pl.sekankodev.hoidleusermanagement.model.HoidleUserRequestDTO;
import pl.sekankodev.hoidleusermanagement.model.HoidleUserResponseDTO;

public interface IUserService {
    Long createUser(HoidleUserRequestDTO requestUser);
    Long updateUser(HoidleUserRequestDTO requestUser);
    Long deleteUser(HoidleUserRequestDTO requestUser);
    HoidleUserResponseDTO logInUser(HoidleUserRequestDTO requestUser);
}
