export const schema = gql`
  type Address {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    administrativeArea: String!
    alternativeAdministrativeArea: String!
    alternativeLocality: String!
    alternativeProvince: String!
    buildingName: String!
    buildingNumber: String!
    companyName: String!
    countryName: String!
    departmentName: String!
    dependentLocality: String!
    dependentStreetName: String!
    dependentStreetSuffix: String!
    doubleDependentLocality: String!
    levelName: String!
    line1: String!
    line2: String!
    line3: String!
    line4: String!
    line5: String!
    locality: String!
    postOfficeBoxNumber: String!
    postOfficeReference1: String!
    postOfficeReference2: String!
    postalCode: String!
    province: String!
    provinceCode: String!
    provinceName: String!
    streetName: String!
    streetSuffix: String!
    subBuildingName: String!
    unitName: String!
    person: Person
    personId: Int
  }

  type Query {
    addresses: [Address!]! @requireAuth
    address(id: Int!): Address @requireAuth
  }

  input CreateAddressInput {
    administrativeArea: String!
    alternativeAdministrativeArea: String!
    alternativeLocality: String!
    alternativeProvince: String!
    buildingName: String!
    buildingNumber: String!
    companyName: String!
    countryName: String!
    departmentName: String!
    dependentLocality: String!
    dependentStreetName: String!
    dependentStreetSuffix: String!
    doubleDependentLocality: String!
    levelName: String!
    line1: String!
    line2: String!
    line3: String!
    line4: String!
    line5: String!
    locality: String!
    postOfficeBoxNumber: String!
    postOfficeReference1: String!
    postOfficeReference2: String!
    postalCode: String!
    province: String!
    provinceCode: String!
    provinceName: String!
    streetName: String!
    streetSuffix: String!
    subBuildingName: String!
    unitName: String!
    personId: Int
  }

  input UpdateAddressInput {
    administrativeArea: String
    alternativeAdministrativeArea: String
    alternativeLocality: String
    alternativeProvince: String
    buildingName: String
    buildingNumber: String
    companyName: String
    countryName: String
    departmentName: String
    dependentLocality: String
    dependentStreetName: String
    dependentStreetSuffix: String
    doubleDependentLocality: String
    levelName: String
    line1: String
    line2: String
    line3: String
    line4: String
    line5: String
    locality: String
    postOfficeBoxNumber: String
    postOfficeReference1: String
    postOfficeReference2: String
    postalCode: String
    province: String
    provinceCode: String
    provinceName: String
    streetName: String
    streetSuffix: String
    subBuildingName: String
    unitName: String
    personId: Int
  }

  type Mutation {
    createAddress(input: CreateAddressInput!): Address! @requireAuth
    updateAddress(id: Int!, input: UpdateAddressInput!): Address! @requireAuth
    deleteAddress(id: Int!): Address! @requireAuth
  }
`
