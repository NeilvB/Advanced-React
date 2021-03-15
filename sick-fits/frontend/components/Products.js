import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import Product from './Product';

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products() {
  const { loading, error, data } = useQuery(gql`
    query ALL_PRODUCTS_QUERY {
      allProducts {
        id
        name
        price
        description
        photo {
          id
          image {
            publicUrlTransformed
          }
        }
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <ProductsListStyles>
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsListStyles>
      <p>Products</p>
    </div>
  );
}
