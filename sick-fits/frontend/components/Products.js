import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';

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

  // console.log('woo party');
  // console.log('more things here');

  return (
    <div>
      <ProductsListStyles>
        {data.allProducts.map((product) => (
          <p key={product.id}>{`${product.name} ${product.description}`}</p>
        ))}
      </ProductsListStyles>
      <p>Products</p>
    </div>
  );
}
