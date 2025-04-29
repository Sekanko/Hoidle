package pl.sekankodev.hoidledataupdater;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import pl.sekankodev.hoidledataupdater.parsers.CSVParser;
import pl.sekankodev.hoidledataupdater.update_exceptions.CouldNotParseException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.*;

public class CSVParserTest {
    private CSVParser csvParser;

    @BeforeEach
    public void setup(){
        csvParser = new CSVParser();
    }

    @Test
    public void parseCountriesFromCSVWithWrongFileNameTest(){
        assertThrows(CouldNotParseException.class, () -> csvParser.parseCountriesFromCSV("wrongFileName.csv") );
    }

    @Test
    public void parseCountriesFromCSVWithCorrectFileNameTest() throws IOException {

        Path resourcePath = Paths.get("hoidle-data-updater/src/main/resources/test-countries.csv");

        String csv = """
                Name;Continents;Ideology;Historical faction;Research slots;National focus tree;Access to the see;Train researched;Formable nation
                Kingdom of Afghanistan;Asia;Non-Aligned;None;2;true;false;false;Persian Empire
                Albanian Kingdom;Europe;Non-Aligned;None;2;false;true;false;None
                """;
        Files.createDirectories(resourcePath.getParent());
        Files.write(resourcePath, csv.getBytes());
        String fileName = "test-countries.csv";
        var result = csvParser.parseCountriesFromCSV(fileName);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Kingdom of Afghanistan", result.get(0).getName());
        assertEquals("Albanian Kingdom", result.get(1).getName());

        Files.delete(resourcePath);
    }
}
