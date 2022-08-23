import gql from "graphql-tag";

export const GetCurrencies = gql`
  query GetCurrencies {
    currencies {
      label
      symbol
    }
  }
`;

export const GetProducts = gql`
  query GetProducts($title: String!) {
    category(input: { title: $title }) {
      products {
        id
        brand
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

export const GetCategories = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;

export const GetDescription = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      name
      brand
      inStock
      gallery
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`;
