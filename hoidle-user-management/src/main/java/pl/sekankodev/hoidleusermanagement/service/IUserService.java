package pl.sekankodev.hoidleusermanagement.service;

import pl.sekankodev.hoidleusermanagement.model.AuthenticationResponse;
import pl.sekankodev.hoidleusermanagement.model.HoidleUserRequestDTO;

public interface IUserService {
    Long createUser(HoidleUserRequestDTO requestUser);
    Long updateUser(HoidleUserRequestDTO requestUser);
    Long deleteUser(HoidleUserRequestDTO requestUser);
    AuthenticationResponse logInUser(HoidleUserRequestDTO requestUser);
}
