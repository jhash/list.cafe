import type { Address } from '@prisma/client'

import {
  addresses,
  address,
  createAddress,
  updateAddress,
  deleteAddress,
} from './addresses'
import type { StandardScenario } from './addresses.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('addresses', () => {
  scenario('returns all addresses', async (scenario: StandardScenario) => {
    const result = await addresses()

    expect(result.length).toEqual(Object.keys(scenario.address).length)
  })

  scenario('returns a single address', async (scenario: StandardScenario) => {
    const result = await address({ id: scenario.address.one.id })

    expect(result).toEqual(scenario.address.one)
  })

  scenario('creates a address', async () => {
    const result = await createAddress({
      input: {
        administrativeArea: 'String',
        alternativeAdministrativeArea: 'String',
        alternativeLocality: 'String',
        alternativeProvince: 'String',
        buildingName: 'String',
        buildingNumber: 'String',
        companyName: 'String',
        countryName: 'String',
        departmentName: 'String',
        dependentLocality: 'String',
        dependentStreetName: 'String',
        dependentStreetSuffix: 'String',
        doubleDependentLocality: 'String',
        levelName: 'String',
        line1: 'String',
        line2: 'String',
        line3: 'String',
        line4: 'String',
        line5: 'String',
        locality: 'String',
        postOfficeBoxNumber: 'String',
        postOfficeReference1: 'String',
        postOfficeReference2: 'String',
        postalCode: 'String',
        province: 'String',
        provinceCode: 'String',
        provinceName: 'String',
        streetName: 'String',
        streetSuffix: 'String',
        subBuildingName: 'String',
        unitName: 'String',
      },
    })

    expect(result.administrativeArea).toEqual('String')
    expect(result.alternativeAdministrativeArea).toEqual('String')
    expect(result.alternativeLocality).toEqual('String')
    expect(result.alternativeProvince).toEqual('String')
    expect(result.buildingName).toEqual('String')
    expect(result.buildingNumber).toEqual('String')
    expect(result.companyName).toEqual('String')
    expect(result.countryName).toEqual('String')
    expect(result.departmentName).toEqual('String')
    expect(result.dependentLocality).toEqual('String')
    expect(result.dependentStreetName).toEqual('String')
    expect(result.dependentStreetSuffix).toEqual('String')
    expect(result.doubleDependentLocality).toEqual('String')
    expect(result.levelName).toEqual('String')
    expect(result.line1).toEqual('String')
    expect(result.line2).toEqual('String')
    expect(result.line3).toEqual('String')
    expect(result.line4).toEqual('String')
    expect(result.line5).toEqual('String')
    expect(result.locality).toEqual('String')
    expect(result.postOfficeBoxNumber).toEqual('String')
    expect(result.postOfficeReference1).toEqual('String')
    expect(result.postOfficeReference2).toEqual('String')
    expect(result.postalCode).toEqual('String')
    expect(result.province).toEqual('String')
    expect(result.provinceCode).toEqual('String')
    expect(result.provinceName).toEqual('String')
    expect(result.streetName).toEqual('String')
    expect(result.streetSuffix).toEqual('String')
    expect(result.subBuildingName).toEqual('String')
    expect(result.unitName).toEqual('String')
  })

  scenario('updates a address', async (scenario: StandardScenario) => {
    const original = (await address({ id: scenario.address.one.id })) as Address
    const result = await updateAddress({
      id: original.id,
      input: { administrativeArea: 'String2' },
    })

    expect(result.administrativeArea).toEqual('String2')
  })

  scenario('deletes a address', async (scenario: StandardScenario) => {
    const original = (await deleteAddress({
      id: scenario.address.one.id,
    })) as Address
    const result = await address({ id: original.id })

    expect(result).toEqual(null)
  })
})
