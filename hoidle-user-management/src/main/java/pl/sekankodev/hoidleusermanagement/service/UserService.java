package pl.sekankodev.hoidleusermanagement.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.sekankodev.hoidledata.repositories.IRepositoryCatalog;
import pl.sekankodev.hoidleusermanagement.mapper.IUserMapper;
import pl.sekankodev.hoidleusermanagement.model.request.HoidleUserRequestDTO;
import pl.sekankodev.hoidleusermanagement.model.response.HoidleUserResponseDTO;

@Service
@RequiredArgsConstructor
public class UserService implements  IUserService{
    private final IRepositoryCatalog db;
    private final IUserMapper mapper;

    @Override
    public Long createUser(HoidleUserRequestDTO requestUser) {
        return 0L;
    }

    @Override
    public Long updateUser(HoidleUserRequestDTO requestUser) {
        return 0L;
    }

    @Override
    public Long deleteUser(HoidleUserRequestDTO requestUser) {
        return 0L;
    }

    @Override
    public HoidleUserResponseDTO logInUser(HoidleUserRequestDTO requestUser) {
        return null;
    }
}
