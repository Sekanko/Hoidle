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
    public HoidleDailyCountryDTO getTodaysCountry() {
        HoidleDailyCountry todaysCountry = db.getHoidleDailyCountryRepository().findByDate(LocalDate.now());

        if (todaysCountry == null) {
            return setCountryForToday();
        } else {
            return mapDailyCountryToDTO(todaysCountry);
        }
    }
    @Override
    public HoidleDailyCountryDTO setCountryForToday(){
        var hoi4Country = db.getHoi4CountryRepository().getRandomCountry();
        var newDailyCountry = new HoidleDailyCountry();

        newDailyCountry.setCountry(hoi4Country);
        newDailyCountry.setDate(LocalDate.now());

        db.getHoidleDailyCountryRepository().save(newDailyCountry);
        return mapDailyCountryToDTO(newDailyCountry);

    }

    private HoidleDailyCountryDTO mapDailyCountryToDTO(HoidleDailyCountry country) {
        return new HoidleDailyCountryDTO()
                .setCountryId(country.getCountry().getId())
                .setDate(country.getDate());
    }
}
