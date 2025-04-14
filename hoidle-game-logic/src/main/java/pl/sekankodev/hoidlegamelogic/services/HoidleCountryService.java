package pl.sekankodev.hoidlegamelogic.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.sekankodev.hoidledata.model.HoidleDailyCountry;
import pl.sekankodev.hoidledata.repositories.IRepositoryCatalog;
import pl.sekankodev.hoidlegamelogic.modelDto.HoidleDailyCountryDTO;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class HoidleCountryService implements IHoidleDailyCountryService{
    private final IRepositoryCatalog db;

    @Override
    public HoidleDailyCountryDTO getOrSetTodaysCountry() {
        var todaysCountry = db.getHoidleDailyCountryRepository().findByDate(LocalDate.now());

        if (todaysCountry == null) {
            todaysCountry = new HoidleDailyCountry();
            todaysCountry.setDate(LocalDate.now());
            var randomHoi4Country = db.getHoi4CountryRepository().getRandomCountry();

            if (randomHoi4Country == null) {
                throw new RuntimeException("Random hoi4 country not found");
            }
            todaysCountry.setCountry(randomHoi4Country);
            db.getHoidleDailyCountryRepository().save(todaysCountry);
        }

        return mapDailyCountryToDTO(todaysCountry);
    }

    private HoidleDailyCountryDTO mapDailyCountryToDTO(HoidleDailyCountry country) {
        return new HoidleDailyCountryDTO()
                .setCountryId(country.getCountry().getId())
                .setDate(country.getDate());
    }
}
