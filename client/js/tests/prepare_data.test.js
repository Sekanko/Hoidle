import {filterCountriesByName, prepareFieldForDisplay} from '../functions/prepare_data.js';

describe('Data prepartion test', () => {
  test('Filtration of countries by name', () => {
    let countries = [
      { name: 'Australia' },
      { name: 'Austria' },
      { name: 'Belarus' },
      { name: 'Belgium' },
      { name: 'Bosnia and Herzegovina' },
      { name: 'Bulgaria' },
      { name: 'Croatia' },
      { name: 'Czechia' },
      { name: 'Denmark' },
      { name: 'Estonia' },
      {name: 'United Kingdom of Great Britain and Northern Ireland'},
    ];

    expect(filterCountriesByName("Au", countries)).toEqual([
      { name: 'Australia' },
      { name: 'Austria' },
    ]);

    expect(filterCountriesByName("B", countries)).toEqual([
      { name: 'Belarus' },
      { name: 'Belgium' },
      { name: 'Bosnia and Herzegovina' },
      { name: 'Bulgaria' },
      {name: 'United Kingdom of Great Britain and Northern Ireland'},
    ]);

    expect(filterCountriesByName("bosniaand", countries)).toEqual([
      {name: 'Bosnia and Herzegovina'}
    ]);

    expect(filterCountriesByName("Britain", countries)).toEqual([
      {name: 'United Kingdom of Great Britain and Northern Ireland'}
    ]);
  });

  test('Prepare string field for display', () => {
    const testValuesArray = [
      "EUROPE",
      "ASIA",
      "NORTH_AMERICA",
    ]

    expect(prepareFieldForDisplay(testValuesArray)).toEqual("Europe, Asia, North America");

    const singleString = "NON_ALIGNED";
    expect(prepareFieldForDisplay(singleString)).toEqual("Non Aligned");
  })

  test('Prepare number field for display', () => {
    const testValuesArray = [
      1,
      2,
      3,
    ];
    expect(prepareFieldForDisplay(testValuesArray)).toEqual(testValuesArray.join(', '));

    const singleNumber = 1;
    expect(prepareFieldForDisplay(singleNumber)).toEqual(singleNumber);
  })
})
