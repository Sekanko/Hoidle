package pl.sekankodev.hoidlegamelogic.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.sekankodev.hoidledata.model.Hoi4Country;
import pl.sekankodev.hoidledata.repositories.Hoi4CountryRepository;
import pl.sekankodev.hoidledata.repositories.IRepositoryCatalog;
import pl.sekankodev.hoidlegamelogic.modelDto.Hoi4CountryDTO;

import java.util.List;

@Service
@RequiredArgsConstructor
public class Hoi4CountryService  implements IHoi4CountryService {
    private final IRepositoryCatalog db;

    @Override
    public List<Hoi4CountryDTO> getHoi4Countries() {
        List<Hoi4Country> allCountries = db.getHoi4CountryRepository().findAll();
        return mapHoi4CountryListToDTO(allCountries);
    }

    private Hoi4CountryDTO mapHoi4CountryToDTO(Hoi4Country country) {
        return new Hoi4CountryDTO()
                .setName(country.getName())
                .setContinents(country.getContinents())
                .setIdeology(country.getIdeology())
                .setHistoricalFaction(country.getHistoricalFaction())
                .setResearchSlotsNumber(country.getResearchSlotsNumber())
                .setHasNationalFocusTree(country.isHasNationalFocusTree())
                .setHasAccessToTheSea(country.isHasAccessToTheSea())
                .setHasResearchedTrain(country.isHasResearchedTrain());
    }
    private List<Hoi4CountryDTO> mapHoi4CountryListToDTO(List<Hoi4Country> countryList) {
        return countryList.stream()
                .map(this::mapHoi4CountryToDTO)
                .toList();
    }
}
