package pl.sekankodev.hoidlegamelogic.services;

import pl.sekankodev.hoidledata.model.HoidleDailyCountry;
import pl.sekankodev.hoidlegamelogic.modelDto.HoidleDailyCountryDTO;

public interface IHoidleDailyCountryService {
    HoidleDailyCountryDTO getTodaysCountry();
    HoidleDailyCountryDTO setCountryForToday();
}
