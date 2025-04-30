import {filterCountriesByName, prepareFieldForDisplay} from '../functions/prepareData.js';

describe('Data prepartion test', () => {
  test('Filtration of coutnries by name', () => {
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
      { name: 'Estonia' }
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
    ]);

    expect(filterCountriesByName("bosniaand", countries)).toEqual([
      {name: 'Bosnia and Herzegovina'}
    ]);
  });

  test('Prepare field for display', () => {
    const testValuesArray = [
      "EUROPE",
      "ASIA",
      "NORTH_AMERICA",
    ]

    expect(prepareFieldForDisplay(testValuesArray)).toEqual("Europe, Asia, North America");

    const singleString = "NON_ALIGNED";
    expect(prepareFieldForDisplay(singleString)).toEqual("Non Aligned");
  })
})
