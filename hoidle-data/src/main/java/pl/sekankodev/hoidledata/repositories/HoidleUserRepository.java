package pl.sekankodev.hoidledata.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.sekankodev.hoidledata.model.HoidleUser;

public interface HoidleUserRepository extends JpaRepository<HoidleUser, Long> {
    HoidleUser findByEmail(String email);
}
