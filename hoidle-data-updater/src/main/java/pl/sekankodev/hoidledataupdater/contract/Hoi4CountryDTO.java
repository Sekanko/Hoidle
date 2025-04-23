package pl.sekankodev.hoidledataupdater.contract;

import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvCustomBindByName;
import lombok.Data;
import lombok.experimental.Accessors;
import pl.sekankodev.hoidledata.model.Continent;
import pl.sekankodev.hoidledata.model.Faction;
import pl.sekankodev.hoidledata.model.Ideology;
import pl.sekankodev.hoidledataupdater.parsers.converters.ToListConverter;

import java.util.List;

@Data
@Accessors(chain = true)
public class Hoi4CountryDTO {
    @CsvBindByName(column = "Name")
    private String name;
    @CsvBindByName(column = "Continents")
    private List<Continent> continents;
    @CsvBindByName(column = "Ideology")
    private Ideology ideology;
    @CsvCustomBindByName(column = "Historical faction", converter = ToListConverter.class)
    private List<Faction> historicalFaction;
    @CsvCustomBindByName(column = "Formable nation", converter = ToListConverter.class)
    private List<String> formableNation;
    @CsvBindByName(column = "Research slots")
    private byte researchSlotsNumber;
    @CsvBindByName(column = "National focus tree")
    private boolean hasNationalFocusTree;
    @CsvBindByName(column = "Access to the see")
    private boolean hasAccessToTheSea;
    @CsvBindByName(column = "Train researched")
    private boolean hasResearchedTrain;
}
