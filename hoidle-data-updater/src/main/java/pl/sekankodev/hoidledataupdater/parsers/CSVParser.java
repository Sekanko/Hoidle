package pl.sekankodev.hoidledataupdater.parsers;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import org.springframework.stereotype.Component;
import pl.sekankodev.hoidledataupdater.contract.Hoi4CountryDTO;
import pl.sekankodev.hoidledataupdater.update_exceptions.CouldNotParseException;

import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Component
public class CSVParser implements ICSVParser{
    @Override
    public List<Hoi4CountryDTO> parseCountriesFromCSV(String fileName) {
        Path path = Paths.get("hoidle-data-updater/src/main/resources/" + fileName);
        try(Reader reader = Files.newBufferedReader(path)) {
            CsvToBean<Hoi4CountryDTO> csvToBean = new CsvToBeanBuilder<Hoi4CountryDTO>(reader)
                    .withType(Hoi4CountryDTO.class)
                    .withSeparator(';')
                    .withIgnoreLeadingWhiteSpace(true)
                    .build();
            return csvToBean.parse();

        } catch (Exception e){
            throw new CouldNotParseException();
        }
    }
}
