package pl.sekankodev.hoidledataupdater.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.sekankodev.hoidledata.repositories.IRepositoryCatalog;
import pl.sekankodev.hoidledataupdater.mappers.CountryMapper;
import pl.sekankodev.hoidledataupdater.mappers.IMap;
import pl.sekankodev.hoidledataupdater.parsers.ICSVParser;

@Service
@RequiredArgsConstructor
public class UpdateService {
    private final IRepositoryCatalog db;
    private final ICSVParser parser;
    private final CountryMapper mapper;

    public int UpdateCountryDatabaseFromCSVFile(String fileName) {


        return -1;
    }
}
