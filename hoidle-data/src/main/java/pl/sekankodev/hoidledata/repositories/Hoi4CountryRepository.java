package pl.sekankodev.hoidledata.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.sekankodev.hoidledata.model.Hoi4Country;

public interface Hoi4CountryRepository extends JpaRepository<Hoi4Country, Long> {
}
